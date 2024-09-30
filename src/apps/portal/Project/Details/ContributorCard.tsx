import { useHandleContributor } from 'common/queries-and-mutations/project'
import AvatarInitial from 'components/Avatar/Initial'
import Button from 'components/Forms/Button'
import withCreatePortal from 'components/HOC/withCreatePortal'
import ConfirmModal from 'components/Modal/ConfirmModal'
import { Alert } from 'components/Toast'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { capitalizeFirstLetter } from 'utils'

type IProps = {
  name: string,
  email: string,
  role: string,
  avatarColor: string,
  currentUserId: number | null
  contributorId: number | null
  ownerId: number | null
  projectId: number | null
}

const EhanchedConfirm = withCreatePortal(ConfirmModal);

export default function ContributorCard({ name, email, role, avatarColor, currentUserId, contributorId, ownerId, projectId }: IProps) {
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selecteduser, setSelecteduser] = useState<number>()

  const { mutate, isSuccess, isError } = useHandleContributor()

  const isCurrentUser = currentUserId === contributorId;

  useEffect(() => {
    if (isSuccess && !isError) {
      setIsSubmitting(false)
      setShowConfirmModal(false)
      toast(<Alert type="success" message="Contributor successfully removed" />)
    } else if (isError) {
      setIsSubmitting(false)
    }
  }, [isSuccess, isError])

  const handleContributor = () => {
    setIsSubmitting(true)
    mutate({ projectId: projectId!, accountId: selecteduser! })
  }

  return (
    <div className="flex flex-col gap-y-6">
      <div className="flex justify-between items-center">
        <div className="flex gap-x-3 items-center w-52">
          <AvatarInitial name={name} avatarColor={avatarColor} />
          <div className="flex flex-col gap-y-[7px]">
            <h4 className="text-gray-1100 text-sm leading-4 dark:text-gray-dark-1100">{name}
            </h4>
            <span className="text-gray-400 text-xs dark:text-gray-dark-400">{email}</span>
          </div>
        </div>
        <div className="flex flex-col gap-y-2 items-start w-5">
          <h5 className="text-sm leading-4 text-gray-1100 font-semibold dark:text-gray-dark-1100">Role</h5>
          <span className="text-gray-400 text-xs dark:text-gray-dark-400">{capitalizeFirstLetter(role)}</span>
        </div>
        <div>
          {contributorId !== ownerId ? (
            <Button
              type="button"
              variant="outline"
              size="sm"
              label={isCurrentUser ? "Leave" : "Remove"}
              className={`rounded-md text-base w-32 ${isCurrentUser ? "text-white bg-red" : "text-red"}`}
              onClick={() => {
                setSelecteduser(contributorId!)
                setShowConfirmModal(true)
              }}
            />
          ) : (
            <div className='w-32'>
              <p className="text-sm leading-4 text-gray-400 dark:text-gray-dark-400">
                Owner
              </p>
            </div>
          )}

        </div>
      </div>

      {showConfirmModal && (
        <EhanchedConfirm
          title={`Are you absolutely sure you want to remove ${isCurrentUser ? 'yourself as a contributor' : 'this contributor'} from this project? 🛑`}
          content="This action is irreversible—once it’s gone. Please confirm that you want to proceed."
          actionText="Yes, remove"
          cancelText="No"
          onConfirm={handleContributor}
          onCancel={() => setShowConfirmModal(false)}
          isSubmitting={isSubmitting}
        />
      )}
    </div>
  )
}
