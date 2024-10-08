import React from 'react'
import { UserInfoDto } from 'services/dtos/user.dto'
import { AccountStatus } from 'types/user.type'
import { format } from 'date-fns'

type IProps = {
  user: UserInfoDto
}
export default function BasicDetails({ user }: IProps) {
  return (
    <div className="border border-neutral rounded-lg bg-neutral-bg dark:border-dark-neutral-border pb-[31px] dark:bg-dark-neutral-bg">
      <div className="bg-neutral rounded-t-lg py-4 pl-5 mb-7 dark:bg-dark-neutral-border">
        <p className="text-gray-1100 leading-4 font-semibold dark:text-gray-dark-1100 text-sm">
          Basic Details
        </p>
      </div>
      <div className="grid grid-cols-3 md:grid-cols-4 gap-6 pl-5 gap-y-4 py-2">
        <div className="flex items-center gap-x-2">
          <span className="text-gray-500 text-xs dark:text-gray-dark-500">
            Name:
          </span>
          <span className="text-gray-1100 text-xs dark:text-gray-dark-1100">
            {user?.name}
          </span>
        </div>
        <div className="flex items-center gap-x-2">
          <span className="text-gray-500 text-xs dark:text-gray-dark-500">
            Email:
          </span>
          <span className="text-gray-1100 text-xs dark:text-gray-dark-1100">
            {user.emailAddress}
          </span>
        </div>
        <div className="flex items-center gap-x-2">
          <span className="text-gray-500 text-xs dark:text-gray-dark-500">
            Status:
          </span>
          <span className="text-gray-1100 text-xs dark:text-gray-dark-1100">
            <div className="flex items-center gap-x-2">
              <div className={`w-2 h-2 rounded-full ${user.accountStatus === AccountStatus.ACTIVATED ? 'bg-green' : 'bg-red'}`}></div>
              <p className="text-normal text-gray-1100 dark:text-gray-dark-1100">{user.accountStatus}</p>
            </div>
          </span>
        </div>
        <div className="flex items-center gap-x-2">
          <span className="text-gray-500 text-xs dark:text-gray-dark-500">
            Added:
          </span>
          <span className="text-gray-1100 text-xs dark:text-gray-dark-1100">
            {format(new Date(user.createdAt), 'yyyy MMMM, dd')}
          </span>
        </div>
      </div >
    </div >
  )
}
