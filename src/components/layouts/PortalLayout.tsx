import SideBar from './SideBar'
import TopBar from './TopBar'
import { Outlet, useNavigate } from 'react-router-dom'
import { useUserAuth } from 'common/queries-and-mutations/authentication'
import { useAppSelector } from 'store/hooks'
import { selectAccountDetails } from 'selectors/account-selector'
import { ErrorBoundary } from 'react-error-boundary'
import { ErrorFallback } from 'components/ErrorFallback'
import { Loader } from 'components/Loader'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { Alert } from 'components/Toast'
import { AccountTypeEnum } from 'types/user.type'

export default function PortalLayout() {
  const { user } = useAppSelector(selectAccountDetails);
  const { isLoading } = useUserAuth()
  const navigate = useNavigate()

  // Prevent any access without workspace being setup
  useEffect(() => {
    if (user && !user.workspace) {
      toast(<Alert type="warning" message={"No workspace? No problem! Let's get you set up!"} />)
      navigate('/auth/workspace-setup');
    }
  }, []);

  return (
    <div
      className="wrapper mx-auto text-gray-900 font-normal md:grid scrollbar-hide grid-cols-[257px,1fr] grid-rows-[auto,1fr] h-screen"
    >
      {!isLoading ? (
        <ErrorBoundary FallbackComponent={ErrorFallback as any}>
          <>
            <SideBar
              orgId={user.workspace.workspaceId}
              isCompany={user.accountType === AccountTypeEnum.COMPANY} />
            <TopBar />
            <main className="overflow-x-scroll scrollbar-hide flex flex-col justify-between pt-[42px] px-[23px] pb-[28px] dark:bg-black md:w-full w-screen">
              <Outlet />
            </main>
          </>
        </ErrorBoundary>
      ) : (
        <div className='flex min-h-screen items-center justify-center'>
          <Loader height={100} width={100} color='#264653' />
        </div>
      )}
    </div>
  )
}
