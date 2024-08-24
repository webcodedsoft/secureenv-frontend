import Avatar from 'components/Avatar'
import React from 'react'

export default function ContributorCard() {
  return (
    <div className="flex flex-col gap-y-[23px]">
      <div className="flex justify-between">
        <div className="flex gap-x-3">
          <Avatar />
          <div className="flex flex-col gap-y-[7px]">
            <h4 className="text-gray-1100 text-sm leading-4 dark:text-gray-dark-1100">Sikiru Adesola
            </h4>
            <span className="text-gray-400 text-xs dark:text-gray-dark-400">adedejisikiruadesola@gmail.com</span>
          </div>
        </div>
        <div className="flex flex-col gap-y-2 items-end">
          <h5 className="text-sm leading-4 text-gray-1100 font-semibold dark:text-gray-dark-1100">Role</h5><span className="text-gray-400 text-xs dark:text-gray-dark-400">Admin</span>
        </div>
      </div>
    </div>
  )
}
