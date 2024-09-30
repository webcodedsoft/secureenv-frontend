import useDarkMode from 'common/hooks/useDarkMode'
import Button from 'components/Forms/Button'
import { Icon, Icons } from 'components/Icon'
import { UserInfoDto } from 'services/dtos/user.dto'

type IProps = {
  user: UserInfoDto
}

export default function TwoFASettings({ user }: IProps) {
  const isDarkMode = useDarkMode()

  return (
    <div className="border bg-neutral-bg border-neutral dark:bg-dark-neutral-bg dark:border-dark-neutral-border rounded-2xl ">
      <div className="bg-neutral rounded-t-lg py-4 pl-5 dark:bg-dark-neutral-border">
        <p className="text-gray-1100 leading-4 font-semibold dark:text-gray-dark-1100 text-sm">
          Two-Factor Authentication
        </p>
      </div>
      <div className="flex flex-col px-5">
        <div className="flex items-center justify-between py-5">
          <div className='flex items-center gap-x-5'>
            <Icon name={Icons.TwoFa}
              width={32}
              height={32}
              fill={isDarkMode ? 'none' : '#FFFFFF'} stroke={isDarkMode ? '#FFFFFF' : '#000000'}
            />
            <p className="text-desc text-gray-400 dark:text-gray-dark-400">
              Authenticator App
            </p>
          </div>
          <div className="rounded grid place-items-center">
            <Button
              type="submit"
              variant="primary"
              size="sm"
              className="mb-3 rounded-md py-4 text-base text-white"
              label="Add"
            ></Button>
          </div>
        </div>
      </div>
    </div>
  )
}
