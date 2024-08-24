import Button from 'components/Forms/Button'
import { Icon, Icons } from 'components/Icon'
import React from 'react'
import PasswordSetting from './PasswordSetting'
import ProfileSettings from './ProfileSettings'
import TwoFASettings from './TwoFASettings'
import BasicDetails from './BasicDetails'
import OrgSettings from './OrgSettings'
import DeleteAccount from './DeleteAccount'

export default function Settings() {
  return (
    <div>
      <div className='flex items-center justify-between'>
        <div>
          <h2 className="capitalize text-gray-1100 font-bold text-3xl leading-9 dark:text-gray-dark-1100 mb-3">
            Settings
          </h2>
          <div className="flex justify-between flex-col gap-y-2 sm:flex-row mb-[32px]">
            <div className="flex items-center text-xs gap-x-3">
              <span className="text-gray-500 dark:text-gray-dark-500">Settings</span>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col flex-1 gap-y-7">
          <ProfileSettings />
          <OrgSettings />
        </div>
        <div className="flex flex-col flex-1 gap-y-5">
          <BasicDetails />
          <PasswordSetting />
          <TwoFASettings />
          <DeleteAccount />
        </div>
      </div>
    </div>
  )
}
