import PasswordSetting from './PasswordSetting'
import ProfileSettings from './ProfileSettings'
// import TwoFASettings from './TwoFASettings'
import BasicDetails from './BasicDetails'
import DeleteAccount from './DeleteAccount'
import { useAppSelector } from 'store/hooks'
import { selectAccountDetails } from 'selectors/account-selector'

export default function Settings() {
  const { user } = useAppSelector(selectAccountDetails)

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="mb-3 text-3xl font-bold capitalize leading-9 text-gray-1100 dark:text-gray-dark-1100">
            Settings
          </h2>
          <div className="mb-[32px] flex flex-col justify-between gap-y-2 sm:flex-row">
            <div className="flex items-center gap-x-3 text-xs">
              <span className="text-gray-500 dark:text-gray-dark-500">
                Settings
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="flex flex-1 flex-col gap-y-7">
          <ProfileSettings user={user} />
          <DeleteAccount user={user} />
        </div>
        <div className="flex flex-1 flex-col gap-y-5">
          <BasicDetails user={user} />
          <PasswordSetting user={user} />
          {/* <TwoFASettings user={user} /> */}
        </div>
      </div>
    </div>
  )
}
