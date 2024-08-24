import { InfoModal } from 'components/Modal'
import CloseBtn from '../../../../assets/icons/icon-close-modal.svg'

type IProps = {
  onClose: () => void
}

export default function InviteContributorModal({ onClose }: IProps) {
  return (
    <InfoModal
      width={`w-full max-w-[694px]`}
      className="h-fit mt-24 md:mt-0 rounded-md pb-5 justify-center flex w-full flex-col"
    >
      <div className="relative scrollbar-hide w-full max-w-[794px] md:p-20 p-10 rounded-lg">
        <button
          className="absolute right-2 top-2 cursor-pointer"
          type="button"
          onClick={onClose}
        >
          <img
            src={CloseBtn}
            alt="close modal button"
          />
        </button>
        <div className="flex items-center justify-center flex-col">
          <h6 className="text-header-6 font-semibold text-gray-500 text-center dark:text-gray-dark-500 mb-[53px]">
            Invite team members
          </h6>
          <div className="w-full bg-neutral h-[1px] dark:bg-dark-neutral-border mb-10" />
          <div className="w-full mb-[24px]">
            <p className="text-gray-1100 text-base leading-4 font-medium mb-[10px] dark:text-gray-dark-1100">
              Invite with email
            </p>
            <div className="flex items-center gap-5">
              <input
                className="bg-transparent text-sm leading-4 text-gray-400 border border-neutral flex-1 rounded-md focus:outline-none p-[10px] dark:text-gray-dark-400 placeholder:text-inherit dark:border-dark-neutral-border"
                type="text"
                placeholder="Add project members by name or email"
              />
              <button className="btn normal-case h-fit min-h-fit transition-all duration-300 border-4 bg-color-brands hover:bg-color-brands hover:border-[#B2A7FF] dark:hover:border-[#B2A7FF] border-neutral-bg dark:border-dark-neutral-bg py-[11px] px-[23px]">
                Invite
              </button>
            </div>
          </div>
          <div className="w-full flex items-center justify-between mb-[30px]">
            <div className="flex items-center gap-3">
              {' '}
              <a
                className="block rounded-full border-neutral overflow-hidden border-[1.4px] dark:border-gray-dark-100 w-9 h-9 border-none"
                href="seller-details.html"
              >
                <img
                  className="w-full h-full object-cover"
                  src="assets/images/avatar-layouts-1.png"
                  alt="user avatar"
                />
              </a>
              <p className="text-sm leading-4 text-gray-400 dark:text-gray-dark-400">
                Theresa Webb
              </p>
            </div>
            <p className="text-sm leading-4 text-gray-400 dark:text-gray-dark-400">
              Owner
            </p>
          </div>
          <div className="w-full bg-neutral h-[1px] dark:bg-dark-neutral-border mb-[35px]" />
          <div className="w-full mb-[42px]">
            <p className="text-subtitle font-medium text-gray-1100 mb-8 dark:text-gray-dark-1100">
              Members
            </p>
            <div className="flex flex-col items-center gap-6 w-full">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-3">
                  <a
                    className="block rounded-full border-neutral overflow-hidden border-[1.4px] dark:border-gray-dark-100 w-9 h-9 border-none"
                    href="seller-details.html"
                  >
                    <img
                      className="w-full h-full object-cover"
                      src="assets/images/avatar-layouts-2.png"
                      alt="user avatar"
                    />
                  </a>
                  <div>
                    <p className="text-normal text-gray-1100 mb-[2px] dark:text-gray-dark-1100">
                      Bessie Cooper
                    </p>
                    <p className="text-desc text-gray-400 dark:text-gray-dark-400">
                      binhan628@gmail.com
                    </p>
                  </div>
                </div>
                <p className="text-normal text-gray-1100 mb-[2px] dark:text-gray-dark-1100">
                  Contributor
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </InfoModal>
  )
}
