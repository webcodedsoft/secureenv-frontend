import CopyToClipboard from 'react-copy-to-clipboard'
import Button from '../Forms/Button'
import { Icon, Icons } from '../Icon'
import { InfoModal } from './InfoModal'
import { toast } from 'react-toastify'
import { Alert } from 'components/Toast'

type Props = {
  title?: string
  content: string
  value?: string
  onCancel: () => void
  className?: string
}

export default function RecoveryKeyModal({
  title,
  content,
  value,
  onCancel,
  className = 'md:w-[30%] sm:w-[20%]',
}: Props) {
  return (
    <InfoModal width={`${className}`} className="h-fit rounded-md pb-5 modal-box relative bg-neutral-bg scrollbar-hide dark:bg-dark-neutral-bg text-gray-1100 dark:text-gray-dark-1100">
      <div className="flex flex-col items-center justify-between rounded-lg font-circular text-2xl font-bold ">
        <div className="flex w-full items-center justify-between gap-4 rounded-t p-2">
          <div className="flex w-full items-center gap-4">
            <p className="border-l-2 border-r-2 px-3 text-base text-color-brands">
              {title}
            </p>
          </div>
          <button type='button' className='mx-4' onClick={onCancel}>
            <Icon name={Icons.Cancel} fill='#9a9aaf' />
          </button>
        </div>
        <div className="px-8">
          <p className="mt-5 text-base text-gray-500 dark:text-gray-dark-500">
            {content}
          </p>
          <div className='pb-4'>
            <CopyToClipboard
              text={value || ''}
              onCopy={() => {
                toast.success(
                  <Alert message="Copied to clipboard" type="success" />
                )
              }}
            >
              <button
                type="button"
                className="flex mt-9 gap-x-3 h-full w-full items-center justify-center leading-4 text-gray-1100 font-semibold mb-4 text-sm dark:text-gray-dark-1100"
              >
                {value}
                <Icon
                  name={Icons.Copy}
                  height={20}
                  width={20}
                  className="fill-gray-400 dark:fill-gray-dark-400 group-hover:fill-color-brands"
                />
              </button>
            </CopyToClipboard>
          </div>
        </div>
      </div>
    </InfoModal>
  )
}
