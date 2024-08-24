import Dropdown from 'components/Dropdown'
import React from 'react'

type Props = {}

export default function ProjectCard({ }: Props) {
  return (
    <div className="bg-neutral-bg border border-neutral dark:bg-dark-neutral-bg rounded-[10px] px-[25px] pb-[25px] pt-[30px] dark:border-dark-neutral-border">
      <div className="flex justify-between items-start mb-[23px]">
        <div className="flex items-center flex-1 gap-x-[11px]">
          <img
            src="assets/images/icons/icon-bootstrap.svg"
            alt="bootstrap logo"
          />
          <h4 className="text-gray-500 font-semibold text-left flex-1 dark:text-gray-dark-500 max-w-[202px] text-[13px] leading-[15px]">
            Bootstrap 5 Course: The Complete Guide Step by Step
          </h4>
        </div>
        <Dropdown options={[
          { label: 'View details', onClick: () => { } },
          { label: 'Pin Project', onClick: () => { } },
          { label: 'Delete', onClick: () => { }, isDlete: true },
        ]}
        />
      </div>
      <div className="flex items-center gap-x-5 border-b border-neutral mb-[19px] pb-[19px] dark:border-dark-neutral-border">
        <div className="flex items-center gap-x-1">
          {' '}
          <img
            src="assets/images/icons/icon-clock.svg"
            alt="clock icon"
          />
          <span className="text-gray-500 dark:text-gray-dark-500 text-[12px] leading-[15px]">
            6.5 hours
          </span>
        </div>
        <div className="flex items-center gap-x-1">
          {' '}
          <img
            src="assets/images/icons/icon-video.svg"
            alt="video icon"
          />
          <span className="text-gray-500 dark:text-gray-dark-500 text-[12px] leading-[15px]">
            68 lectures
          </span>
        </div>
      </div>
      <p className="text-gray-500 text-left lg:max-w-[292px] text-[11px] leading-[15px] dark:text-gray-dark-500 mb-[37px]">
        It is a long established fact that a reader will be
        distracted by the readable content of a page when
        looking at its layout.
      </p>
      <div className="flex justify-between border-b border-neutral mb-[23px] pb-[17px] dark:border-dark-neutral-border">
        <div className="flex items-center gap-x-[5px]">
          <div className="rounded-full w-[6px] h-[6px] bg-[#96DE95]" />
          <span className="text-color-brands text-[11px] leading-[15px]">
            Ali Education
          </span>
        </div>
        <p className="text-color-brands font-semibold leading-4 text-[18px] mr-[10px]">
          $500
          <span className="font-normal leading-4 text-[11px] text-[#878D96]">
            /Hour
          </span>
        </p>
      </div>
      <div className="flex justify-between">
        <div className="flex items-center gap-x-[10px]">
          <p className="py-1 text-xs bg-neutral text-gray-900 px-[10px] dark:bg-dark-neutral-border rounded-[5px] dark:text-gray-dark-900">
            Developer
          </p>
          <p className="py-1 text-xs bg-neutral text-gray-900 px-[10px] dark:bg-dark-neutral-border rounded-[5px] dark:text-gray-dark-900">
            Front-end
          </p>
        </div>
        <div className="flex items-center gap-x-[11px]">
          <img
            src="assets/images/icons/icon-shield-check.svg"
            alt="shield check icon"
          />
          <img
            src="assets/images/icons/icon-bookmark.svg"
            alt="bookmark icon"
          />
        </div>
      </div>
    </div>
  )
}
