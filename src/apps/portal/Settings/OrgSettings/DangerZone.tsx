import Button from 'components/Forms/Button'
import TextField from 'components/Forms/TextField'
import { useState } from 'react'
import { UserInfoDto } from 'services/dtos/user.dto'
import DecryptionSetting from './DecryptionSetting'
import withCreatePortal from 'components/HOC/withCreatePortal'
import ConfirmModal from 'components/Modal/ConfirmModal'
import { useDeleteWorkspace } from 'common/queries-and-mutations/workspace'

type IProps = {
  user: UserInfoDto
}
const EhanchedConfirm = withCreatePortal(ConfirmModal);
export default function DangerZone({ user }: IProps) {
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { mutate: deleteWorkspace } = useDeleteWorkspace();

  const handleAccountDelete = () => {
    setIsSubmitting(true)
    deleteWorkspace()
  }

  return (
    <div>
      <div className='flex flex-col gap-y-6'>
        <div className="border bg-neutral-bg border-red dark:bg-dark-neutral-bg rounded-2xl h-56">
          <div className="rounded-t-lg py-4 pl-5 bg-red">
            <p className="text-white leading-4 font-semibold text-sm">
              Danger Zone
            </p>
          </div>
          <div className="flex flex-col px-5">
            <div className="flex flex-col py-5">
              <p className="text-desc text-gray-400 dark:text-gray-dark-400">
                Deleting the workspace <span className='text-red font-semibold'>{user.workspace.workspaceName}</span> will immediately delete the workspace data and remove its members. Please use caution as you cannot undo this action.
              </p>
              <div className="rounded grid place-items-center mt-10">
                <Button
                  type="button"
                  variant="outline"
                  size="md"
                  className="mb-3 rounded-md py-4 text-base text-red border-red"
                  label="Delete workspace"
                  onClick={() => setShowConfirmModal(true)}
                ></Button>
              </div>
            </div>
          </div>
        </div>
        <DecryptionSetting user={user} />
      </div>
      {showConfirmModal && (
        <EhanchedConfirm
          title="Are you absolutely sure you want to delete your workspace? 🛑"
          content="Hold up! Deleting this is like sending your data on a one-way ticket to Neverland—gone forever, and no way back. Are you absolutely positive?"
          actionText="No"
          cancelText="Yes, delete"
          onConfirm={() => setShowConfirmModal(false)}
          onCancel={handleAccountDelete}
          isSubmitting={isSubmitting}
        />
      )}
    </div>
  )
}
