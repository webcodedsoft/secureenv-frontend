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
  isSubmitting?: boolean
  className?: string
}

export default function ConfirmModal({
  title,
  content,
  actionText,
  cancelText,
  onConfirm,
  onCancel,
  isSubmitting,
  className = 'md:w-[30%] sm:w-[20%]',
}: Props) {
  return (
    <InfoModal width={`${className}`} className="h-fit rounded-md pb-5">
      <div className="flex flex-col items-center justify-between rounded-lg bg-white font-circular text-2xl font-bold text-[#353535]">
        <div className="flex w-full items-center justify-between gap-4 rounded-t bg-white p-2">
          <div className="flex w-full items-center gap-4">
            <p className="border-l-2 border-r-2 px-3 text-base text-color-brands">
              {title}
            </p>
          </div>
        </div>
        <div className="px-8">
          <p className="mt-5 text-base" dangerouslySetInnerHTML={{ __html: content }} />
          <div className='pb-4'>
            <div className="my-3 mt-10 flex items-center justify-end gap-3">
              <Button
                variant="outline"
                size="sm"
                className="rounded text-sm font-normal w-32 hover:bg-transparent"
                label={cancelText || 'No'}
                onClick={onCancel}
                disabled={isSubmitting}
                loading={isSubmitting}
              ></Button>
              <Button
                variant="primary"
                size="sm"
                className="rounded text-sm font-normal w-32"
                label={actionText || 'Yes'}
                onClick={onConfirm}
                disabled={isSubmitting}
                loading={isSubmitting}
              ></Button>
            </div>
          </div>
        </div>
      </div>
    </InfoModal>
  )
}
