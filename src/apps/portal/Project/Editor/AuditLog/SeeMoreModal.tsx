import { Icon, Icons } from 'components/Icon'
import { InfoModal } from 'components/Modal'

type Props = {
  item: { title?: string; text: any[] }
  onClose: () => void
}

export default function SeeMoreModal({ item, onClose }: Props) {
  return (
    <InfoModal
      width={`w-full max-w-[694px]`}
      className="justify-centers pb-5s mt-24 flex h-fit w-full flex-col rounded-lg md:mt-0"
    >
      <div className="relative w-full max-w-3xl rounded-lg p-4 scrollbar-hide md:p-8">
        <div className="mb-6 rounded-2xl border border-neutral bg-neutral-bg pb-7 pt-[19px] dark:border-dark-neutral-border dark:bg-dark-neutral-bg">
          <div className="mb-[12px] flex items-center justify-between border-b border-neutral px-[25px] pb-[16px] dark:border-dark-neutral-border">
            <div className="text-base font-semibold leading-5 text-gray-1100 dark:text-gray-dark-1100">
              {item?.title}
            </div>
            <button type="button" onClick={onClose}>
              <Icon name={Icons.Cancel} fill="#9a9aaf" />
            </button>
          </div>
          <div className="pl-7 pr-4">
            <div className="flex flex-col">
              {(item.text ?? []).map((item, idx) => (
                <div
                  className="flex items-center justify-between border-b border-dashed border-neutral py-2 dark:border-dark-neutral-border"
                  key={idx}
                >
                  <div className="flex items-center gap-2">
                    <div className="flex flex-col gap-y-1">
                      <h3 className="text-xs leading-3 text-gray-1100 dark:text-gray-dark-1100">
                        {item.key}:
                      </h3>
                      {(item?.value ?? [])?.length > 0 && (
                        <span className="text-xs leading-3 text-gray-400 dark:text-gray-dark-400">
                          {item.value}
                        </span>
                      )}
                      {(item?.oldValue ?? [])?.length > 0 && (
                        <>
                          <span className="text-sm font-semibold leading-4 text-color-brands">
                            Old Value:
                          </span>
                          <span className="text-xs leading-3 text-gray-400 dark:text-gray-dark-400">
                            {item.oldValue}
                          </span>
                        </>
                      )}

                      {(item.newValue ?? []).length > 0 && (
                        <>
                          <span className="text-sm font-semibold leading-4 text-color-brands">
                            New Value:
                          </span>
                          <span className="text-xs leading-3 text-gray-400 dark:text-gray-dark-400">
                            {item.newValue}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </InfoModal>
  )
}
