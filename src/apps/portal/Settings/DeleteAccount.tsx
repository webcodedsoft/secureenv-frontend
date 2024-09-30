import { useDeleteAccount } from 'common/queries-and-mutations/user'
import Button from 'components/Forms/Button'
import withCreatePortal from 'components/HOC/withCreatePortal'
import ConfirmModal from 'components/Modal/ConfirmModal'
import { Alert } from 'components/Toast'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { UserInfoDto } from 'services/dtos/user.dto'
import { useAppDispatch } from 'store/hooks'
import { logout } from 'thunks/account-thunk'

type IProps = {
  user: UserInfoDto
}

const EhanchedConfirm = withCreatePortal(ConfirmModal);

export default function DeleteAccount({ user }: IProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const { mutate, isSuccess, isError } = useDeleteAccount();
  const dispatch = useAppDispatch();
  const navigate = useNavigate()

  const handleAccountDelete = () => {
    setIsSubmitting(true)
    mutate()
  }

  useEffect(() => {
    if (isSuccess && !isError) {
      setIsSubmitting(false)
      setShowConfirmModal(false)
      toast(<Alert type="success" message="Account Password Successfully Reset" />)
      dispatch(logout());
      navigate("/auth/login");
    } else if (isError) {
      setIsSubmitting(false)
    }
  }, [isSuccess, isError])

  return (
    <div>
      <div className="border bg-neutral-bg border-red dark:bg-dark-neutral-bg rounded-2xl h-56">
        <div className="rounded-t-lg py-4 pl-5 bg-red">
          <p className="text-white leading-4 font-semibold text-sm">
            Danger Zone
          </p>
        </div>
        <div className="flex flex-col px-5">
          <div className="flex flex-col py-5">
            <p className="text-desc text-gray-400 dark:text-gray-dark-400">
              Poof! Once you delete your account, all your data will vanish into thin air, and there’s no logging back in—ever. So, proceed with caution, because there’s no magic spell to undo this one! ✨
            </p>
            <div className="rounded grid place-items-center mt-10">
              <Button
                type="submit"
                variant="outline"
                size="md"
                className="mb-3 rounded-md py-4 text-base text-red border-red"
                label="Delete account"
                onClick={() => setShowConfirmModal(true)}
              ></Button>
            </div>
          </div>
        </div>
      </div>
      {showConfirmModal && (
        <EhanchedConfirm
          title="Are you absolutely sure you want to delete your account? 🛑"
          content="This action is irreversible—once it’s gone, all your data will be permanently deleted, and you won’t be able to log back in. Please confirm that you want to proceed."
          actionText="Yes, delete"
          cancelText="No"
          onConfirm={handleAccountDelete}
          onCancel={() => setShowConfirmModal(false)}
          isSubmitting={isSubmitting}
        />
      )}
    </div>

  )
}
