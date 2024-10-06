import Dropdown from 'components/Dropdown'
import withCreatePortal from 'components/HOC/withCreatePortal'
import { Icon, Icons } from 'components/Icon'
import { Alert } from 'components/Toast'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import EditEnvironmentModal from './EditEnvironmentModal'
import { useEffect, useState } from 'react'
import { useDeleteEnvironment } from 'common/queries-and-mutations/environment'
import ConfirmModal from 'components/Modal/ConfirmModal'

type Props = {
  label: string
  envSlug: string
  envId: number | string
  commitCount: number
  workspaceId: number
  projectId: number
  projectSlug: string
  comparison: Record<string, any[]>[] | undefined
}

const EhanchedConfirm = withCreatePortal(ConfirmModal)
const EhanchedEditEnvironmentModal = withCreatePortal(EditEnvironmentModal)
export default function DetailsCard({
  label,
  envSlug,
  envId,
  commitCount,
  workspaceId,
  projectId,
  projectSlug,
  comparison
}: Props) {
  const navigate = useNavigate()
  const [showEditModal, setShowEditModal] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)

  const { mutate, isSuccess, isError } = useDeleteEnvironment()

  const getEnvByKey = (key: string) => {
    const found = (comparison ?? []).find((env) => env[key])
    return found ? found[key] : null
  }

  const handleDelete = () => {
    setIsSubmitting(true)
    mutate({ projectId, environmentId: Number(envId) })
  }

  useEffect(() => {
    if (isSuccess && !isError) {
      toast(
        <Alert
          type="success"
          message="Success! Environment successfully deleted!"
        />
      )
      setIsSubmitting(false)
    } else if (isError) {
      setIsSubmitting(false)
    }
  }, [isSuccess, isError])

  return (
    <div>
      <div className="rounded-2xl border border-neutral bg-neutral-bg px-6 pb-6 pt-4 dark:border-dark-neutral-border dark:bg-dark-neutral-bg">
        <div className="mb-[15px] flex items-center justify-between">
          <Link
            to={`/workspace/${workspaceId}/project/${projectSlug}/${projectId}/env-editor/${envId}`}
          >
            <p className="text-subtitle-semibold font-semibold text-gray-1100 dark:text-gray-dark-1100">
              {label}
            </p>
          </Link>

          <Dropdown
            options={[
              {
                label: 'Open',
                onClick: () =>
                  navigate(
                    `/workspace/${workspaceId}/project/${projectSlug}/${projectId}/env-editor/${envId}`
                  )
              },
              { label: 'Rename', onClick: () => setShowEditModal(true) },
              // { label: 'Lock', onClick: () => {} },
              {
                label: 'Delete',
                onClick: () => setShowConfirmModal(true),
                isDlete: true
              }
            ]}
          />
        </div>
        <div className="mb-6 h-px w-full bg-neutral dark:bg-dark-neutral-border" />
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-start gap-3">
              <div>
                <p className="mb-4 text-normal text-gray-1100 dark:text-gray-dark-1100">
                  ID:
                </p>
                <div className="flex items-center gap-x-2">
                  <p className="text-desc text-gray-400 dark:text-gray-dark-400">
                    #{envId}
                  </p>
                  <CopyToClipboard
                    text={envId?.toString() || ''}
                    onCopy={() => {
                      toast.success(
                        <Alert message="Copied to clipboard" type="success" />
                      )
                    }}
                  >
                    <button
                      type="button"
                      className="flex size-full items-center justify-center"
                    >
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
            </div>
            <Link
              to={`/workspace/${workspaceId}/project/${projectSlug}/${projectId}/env-editor/${envId}`}
            >
              <div>
                <p className="mb-4 text-normal font-semibold text-gray-1100 dark:text-gray-dark-1100">
                  Commit Count
                </p>
                <p className="text-desc text-gray-400 dark:text-gray-dark-400">
                  #{commitCount}
                </p>
              </div>
            </Link>
          </div>
          {/* TODO:! I am not sure if this is okay here */}
          <Link
            to={`/workspace/${workspaceId}/project/${projectSlug}/${projectId}/env-editor/${envId}`}
          >
            {!!(getEnvByKey(envSlug) ?? []).length && (
              <div className="hiddens rounded bg-neutral px-2 py-1 text-xs leading-4 text-orange dark:bg-dark-neutral-border">
                {(getEnvByKey(envSlug) ?? [])?.map((com) => (
                  <p key={com}>{com}</p>
                ))}
              </div>
            )}
          </Link>
        </div>
      </div>
      {showEditModal && (
        <EhanchedEditEnvironmentModal
          onClose={() => setShowEditModal(false)}
          projectId={Number(projectId!)}
          environmentId={Number(envId)}
          environmentName={label}
        />
      )}
      {showConfirmModal && (
        <EhanchedConfirm
          title={`Are you sure you want to delete this environment? 🛑`}
          content={
            'Whoa there! Deleting this environment means poof—all the data will vanish into the abyss, never to return. And yep, the environment itself? Gone like it never existed. Sure you wanna do that?'
          }
          actionText="Yes, continue"
          cancelText="No"
          onConfirm={handleDelete}
          onCancel={() => setShowConfirmModal(false)}
          isSubmitting={isSubmitting}
        />
      )}
    </div>
  )
}
