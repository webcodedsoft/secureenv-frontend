import withCreatePortal from 'components/HOC/withCreatePortal'
import DetailsCard from './DetailsCard'
import Button from 'components/Forms/Button'
import AddEnvModal from './AddEnvModal'
import { useEffect, useState } from 'react'
import ContributorCard from './ContributorCard'
import InviteContributorModal from './InviteContributorModal'
import Dropdown from 'components/Dropdown'
import {
  useDeleteProject,
  useGetProject,
  useGetProjectContributors,
  useToggleProjectLock
} from 'common/queries-and-mutations/project'
import { useParams } from 'react-router-dom'
import { Loader } from 'components/Loader'
import { format } from 'date-fns'
import { selectAccountDetails } from 'selectors/account-selector'
import { useAppSelector } from 'store/hooks'
import EmptyState from 'components/EmptyState'
import { AccountTypeEnum } from 'types/user.type'
import ConfirmModal from 'components/Modal/ConfirmModal'
import { toast } from 'react-toastify'
import { Alert } from 'components/Toast'
import EditProjectModal from './EditProjectModal'
import CopyToClipboard from 'react-copy-to-clipboard'
import { Icon, Icons } from 'components/Icon'
import Paginator from 'components/Table/TableWidget/Paginator'

const EnhancedAddEnvModal = withCreatePortal(AddEnvModal)
const EnhancedInviteContributorModal = withCreatePortal(InviteContributorModal)
const EhanchedConfirm = withCreatePortal(ConfirmModal)
const EhanchedEditProjectModal = withCreatePortal(EditProjectModal)
export default function ProjectDetails() {
  const [showAddEnv, setShowAddEnv] = useState(false)
  const [showInvite, setShowInvite] = useState(false)
  const { projectSlug, projectId } = useParams()
  const { user } = useAppSelector(selectAccountDetails)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false)
  const [showEditProjectModal, setShowEditProjectModal] = useState(false)
  const [page, setPage] = useState(1)
  const [itemPerPage, setItemPerPage] = useState(10)
  const [isExecutingSearch, setIsExecutingSearch] = useState<boolean>(true)

  const { data, isFetching } = useGetProject(+projectId!, projectSlug!)
  const { data: contributors } = useGetProjectContributors(
    +projectId!,
    projectSlug!,
    page,
    itemPerPage,
    isExecutingSearch
  )

  useEffect(() => {
    if (!isFetching && isExecutingSearch) {
      setIsExecutingSearch(false)
    }
  }, [isFetching, isExecutingSearch])

  const { mutate, isSuccess, isError } = useToggleProjectLock()
  const {
    mutate: deleteProject,
    isSuccess: isDeleteSuccess,
    isError: isDeleteError
  } = useDeleteProject()

  const handleLock = () => {
    mutate({ projectId: Number(projectId!), isLocked: !data?.isLocked })
  }

  useEffect(() => {
    if (isSuccess && !isError) {
      setIsSubmitting(false)
      setShowConfirmModal(false)
      toast(
        <Alert
          type="success"
          message="Project locking status successfully changed!"
        />
      )
    } else if (isError) {
      setIsSubmitting(false)
    }
  }, [isSuccess, isError])

  useEffect(() => {
    if (isDeleteSuccess && !isDeleteError) {
      setIsSubmitting(false)
      setShowConfirmModal(false)
      toast(<Alert type="success" message="Project successfully deleted!" />)
    } else if (isDeleteError) {
      setIsSubmitting(false)
    }
  }, [isDeleteSuccess, isDeleteError])

  const handleDelete = () => {
    deleteProject({ projectId: Number(projectId) })
  }

  const getPageStatus = (pageNum: number, totalPages: number) => {
    const hasNextPage = pageNum < totalPages
    const hasPreviousPage = pageNum > 1

    return {
      hasNextPage,
      hasPreviousPage
    }
  }

  const goToNextPage = () => {
    if (page) {
      const nextPageValue = page ? page + 1 : 2
      setPage(nextPageValue)
      setIsExecutingSearch(true)
    }
  }

  const goToPreviousPage = () => {
    if (page > 1) {
      const previousPageValue = page - 1
      setPage(previousPageValue)
      setIsExecutingSearch(true)
    }
  }

  if (isFetching) {
    return (
      <div className="mt-40 flex flex-col items-center justify-center">
        <Loader height={50} width={50} />
      </div>
    )
  }

  return (
    <div>
      <div className="mb-[46px] flex items-end justify-between">
        <div className="flex flex-col items-start gap-x-3">
          <h2 className="mb-3 text-2xl font-bold capitalize leading-9 text-gray-1100 dark:text-gray-dark-1100">
            {data?.projectName}
          </h2>
          <div className="hidden md:block">
            <CopyToClipboard
              text={data?.projectId.toString() || ''}
              onCopy={() => {
                toast.success(
                  <Alert message="Copied to clipboard" type="success" />
                )
              }}
            >
              <button
                type="button"
                className="flex size-full items-center justify-center gap-x-3 text-gray-1100 dark:text-gray-dark-1100"
              >
                Copy Project ID: #{data?.projectId.toString()}{' '}
                <Icon
                  name={Icons.Copy}
                  height={20}
                  width={20}
                  className="fill-gray-400 group-hover:fill-color-brands dark:fill-gray-dark-400"
                />
              </button>
            </CopyToClipboard>
          </div>
        </div>
        <div>
          <div className="flex gap-x-5">
            <div className="flex flex-col items-end justify-end">
              <Button
                type="button"
                variant="primary"
                size="md"
                className="mb-3 w-fit rounded-md py-4 text-base text-white"
                label="Add Env"
                onClick={() => setShowAddEnv(true)}
              ></Button>
            </div>
            <div className="flex size-10 items-center justify-center rounded-lg bg-color-brands">
              <div className="">
                <Dropdown
                  options={[
                    {
                      label: 'Edit project',
                      onClick: () => setShowEditProjectModal(true)
                    },
                    {
                      label: `${data?.isLocked ? 'Unlocked' : 'Lock'}`,
                      onClick: () => setShowConfirmModal(true)
                    },
                    {
                      label: 'Delete',
                      onClick: () => setShowConfirmDeleteModal(true),
                      isDlete: true
                    }
                  ]}
                  className="mr-8"
                  modalPosition="mr-6"
                />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-x-2">
            <Icon name={Icons.Calendar} />
            <time className="text-xs text-gray-500">
              {format(new Date(data!.createdAt), 'MMM dd yy')}{' '}
              {`${
                data!.updatedAt
                  ? `- ${format(new Date(data!.updatedAt), 'MMM dd yy')}`
                  : ``
              } `}
            </time>
          </div>
        </div>
      </div>
      <div className="mb-[33px] grid grid-cols-1 gap-6 xl:grid-cols-4">
        {(data?.environments ?? [])
          // .splice(1,2)
          .sort((a, b) => a.id - b.id)
          .map((env) => (
            <DetailsCard
              key={env.id}
              label={env.environmentName}
              envId={env.enviromentId}
              envSlug={env.environmentSlug}
              commitCount={env.commitCount}
              workspaceId={Number(data?.workspace?.workspaceId)}
              projectId={Number(data?.projectId)}
              projectSlug={data?.projectSlug ?? ''}
              comparison={data?.comparison}
            />
          ))}
      </div>
      <div className="rounded-2xl border border-neutral bg-neutral-bg px-5 pb-6 pt-4 dark:border-dark-neutral-border dark:bg-dark-neutral-bg">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-subtitle-semibold font-semibold text-gray-1100 dark:text-gray-dark-1100">
            Contributors
          </p>
          {user.accountType === AccountTypeEnum.COMPANY && (
            <Button
              type="button"
              variant="primary"
              size="md"
              className="mb-3 w-fit rounded-md py-4 text-base text-white"
              label="Invite Contributor"
              onClick={() => setShowInvite(true)}
            ></Button>
          )}
        </div>
        <div className="mb-7 h-px w-full bg-neutral dark:bg-dark-neutral-border" />
        {user.accountType === AccountTypeEnum.INDIVIDUAL && (
          <div className="mb-7 flex flex-col gap-3">
            <EmptyState
              title={'Access Denied! Team Member Adding is Off-Limits!'}
              content={
                'Your account type doesn’t come with the ‘add teammates’ superpower. Upgrade needed!, you might need to switch your account to company type'
              }
              doneUserImage
            />
          </div>
        )}
        {user.accountType === AccountTypeEnum.COMPANY && (
          <div className="mb-7 flex flex-col gap-3">
            {contributors?.users.map((contributor) => (
              <ContributorCard
                key={contributor.id}
                name={contributor.name}
                email={contributor.emailAddress}
                role={contributor.accountRole}
                avatarColor={contributor.avatarColor}
                contributorId={contributor.accountId}
                currentUserId={user.accountId}
                ownerId={data?.user.accountId ?? null}
                projectId={Number(data?.projectId)!}
              />
            ))}
            {!contributors?.total && (
              <EmptyState
                onClick={() => setShowInvite(true)}
                title={
                  'Heads up! No contributor invite here, but there’s always room for future collaborations!'
                }
                content={
                  'No worries—good things come to those who wait (and code)!'
                }
                btnTitle={'Add Contributor'}
              />
            )}
          </div>
        )}
        {(contributors?.pageNum ?? 0) > 1 && (
          <div className="mt-5 p-5">
            <Paginator
              numberOfPages={contributors!.totalPages}
              page={1}
              hasNext={
                getPageStatus(
                  contributors?.pageNum ?? 0,
                  contributors?.totalPages ?? 0
                ).hasNextPage
              }
              hasPrevious={
                getPageStatus(
                  contributors?.pageNum ?? 0,
                  contributors?.totalPages ?? 0
                ).hasPreviousPage
              }
              goToNextPage={goToNextPage}
              goToPreviousPage={goToPreviousPage}
              numberOfItemsPerPage={10}
              setNumberOfItemsPerPage={(items_per_page) => {
                setItemPerPage(items_per_page)
                setIsExecutingSearch(true)
              }}
              showPageNumber={false}
            />
          </div>
        )}
      </div>
      {showAddEnv && (
        <EnhancedAddEnvModal
          projectId={data?.id}
          onClose={() => setShowAddEnv(false)}
        />
      )}
      {showInvite && (
        <EnhancedInviteContributorModal
          contributors={data?.contributorIds}
          projectId={data?.projectId}
          owner={data?.user}
          onClose={() => setShowInvite(false)}
        />
      )}

      {showConfirmModal && (
        <EhanchedConfirm
          title={`Are you sure you want to
          ${data?.isLocked ? 'unlock' : 'lock'} this project? 🛑`}
          content={
            data?.isLocked
              ? 'Project unlocked! Now you’re free to make changes and edit environments again. Go wild!'
              : 'Locking means no more edits, no environment changes, nada. Make sure you’re ready for that!'
          }
          actionText="Yes, continue"
          cancelText="No"
          onConfirm={handleLock}
          onCancel={() => setShowConfirmModal(false)}
          isSubmitting={isSubmitting}
        />
      )}
      {showConfirmDeleteModal && (
        <EhanchedConfirm
          title={`Are you sure you want to delete this project? 🛑`}
          content="Whoa there! Deleting this project means poof—all the environments and it's data will vanish into the abyss, never to return. And yep, the environment itself? Gone like it never existed. Sure you wanna do that?"
          actionText="Yes, continue"
          cancelText="No"
          onConfirm={handleDelete}
          onCancel={() => setShowConfirmDeleteModal(false)}
          isSubmitting={isSubmitting}
        />
      )}
      {showEditProjectModal && (
        <EhanchedEditProjectModal
          onClose={() => setShowEditProjectModal(false)}
          projectId={Number(projectId!)}
          repositoryUrl={data?.repositoryUrl}
        />
      )}
    </div>
  )
}
