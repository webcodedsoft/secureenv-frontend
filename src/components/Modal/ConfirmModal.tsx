import logo from '@assets/images/leadway-logo.png'

import Button from '../Forms/Button'
import { Icon, Icons } from '../Icon'
import { InfoModal } from './InfoModal'

type Props = {
  title?: string
  content: string
  actionText?: string
  cancelText?: string
  onConfirm: () => void
  onCancel: () => void
  onClose?: () => void
  isSubmitting?: boolean
  bgColor?: string
  className?: string
}

export default function ConfirmModal({
  title,
  content,
  actionText,
  cancelText,
  onConfirm,
  onCancel,
  onClose,
  isSubmitting,
  bgColor,
  className = 'md:w-[40%] sm:w-[30%]',
}: Props) {
  return (
    <InfoModal width={`${className}`} className="h-fit rounded-md pb-5">
      <div className="flex flex-col items-center justify-between rounded-lg bg-white font-circular text-2xl font-bold text-[#353535]">
        <div className="flex w-full items-center justify-between gap-4 rounded-t bg-[#DEDEDE] p-2 px-4">
          <div className="flex w-full items-center gap-4">
            <img src={logo} className="size-10" />
            <p className="border-l-2 pl-3 text-base text-primary-900" style={{ color: bgColor }}>
              {title}
            </p>
          </div>
          {onClose && (
            <div className="justify-end" role="button" onClick={onClose} tabIndex={-1} onKeyDown={onClose}>
              <Icon name={Icons.Cancel} fill={bgColor} />
            </div>
          )}
        </div>
        <div className="px-8">
          <p className="mt-5 text-base">{content}</p>
          <div className="my-3 mt-10 flex w-full items-center justify-end gap-3">
            <Button
              variant="outline"
              size="md"
              className="w-full rounded text-sm font-normal"
              label={cancelText || 'No'}
              onClick={onCancel}
              disabled={isSubmitting}
              loading={isSubmitting}
              bgColor={bgColor}
            ></Button>
            <Button
              variant="primary"
              size="md"
              className="w-full rounded text-sm font-normal"
              label={actionText || 'Yes'}
              onClick={onConfirm}
              disabled={isSubmitting}
              loading={isSubmitting}
              bgColor={bgColor}
            ></Button>
          </div>
        </div>
      </div>
    </InfoModal>
  )
}
