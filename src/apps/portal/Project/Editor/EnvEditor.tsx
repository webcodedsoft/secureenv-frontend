import { useGetEnvironment } from 'common/queries-and-mutations/environment'
import { Loader } from 'components/Loader'
import { Link, useParams } from 'react-router-dom'
import CopyToClipboard from 'react-copy-to-clipboard'
import { Alert } from 'components/Toast'
import { toast } from 'react-toastify'
import { Icon, Icons } from 'components/Icon'
import DefaultEditor from '.'
import useDarkMode from 'common/hooks/useDarkMode'
import { selectAccountDetails } from 'selectors/account-selector'
import { useAppSelector } from 'store/hooks'

const EnvEditor = () => {
  const { envId, projectId } = useParams()
  const isDark = useDarkMode()
  const { user } = useAppSelector(selectAccountDetails);

  const { data, isFetching, isRefetching } = useGetEnvironment(
    Number(projectId!),
    Number(envId!)
  )

  if (isFetching && !isRefetching) {
    return (
      <div className="mt-40 flex flex-col items-center justify-center">
        <Loader height={50} width={50} />
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-end justify-between mb-8">
        <div className="flex flex-col items-start gap-x-3">
          <h2 className="capitalize text-gray-1100 font-bold text-2xl leading-9 dark:text-gray-dark-1100 mb-3">
            {data?.project.projectName} - {data?.environmentName}
          </h2>
          <div className="hidden md:block">
            <CopyToClipboard
              text={data?.enviromentId.toString() || ''}
              onCopy={() => {
                toast.success(
                  <Alert message="Copied to clipboard" type="success" />
                )
              }}
            >
              <button
                type="button"
                className="flex gap-x-3 h-full w-full items-center justify-center text-gray-1100 dark:text-gray-dark-1100"
              >
                Environment ID: #{data?.enviromentId.toString()}{' '}
                <Icon
                  name={Icons.Copy}
                  height={20}
                  width={20}
                  className="fill-gray-400 dark:fill-gray-dark-400 group-hover:fill-color-brands"
                />
              </button>
            </CopyToClipboard>
          </div>
          <div className="hidden md:block">
            <CopyToClipboard
              text={data?.environmentSlug.toString() || ''}
              onCopy={() => {
                toast.success(
                  <Alert message="Copied to clipboard" type="success" />
                )
              }}
            >
              <button
                type="button"
                className="flex gap-x-3 h-full w-full items-center justify-center text-gray-1100 dark:text-gray-dark-1100"
              >
                Environment Slug: {data?.environmentSlug.toString()}{' '}
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
        <Link to={`/workspace/${user.workspace.workspaceId}/project/${data?.project.projectSlug}/${data?.project.projectId}`} className='flex items-center gap-x-2 text-normal font-semibold text-gray-1100 mb-2 dark:text-gray-dark-1100'>
          <Icon
            name={Icons.LongBackArrow}
            fill={isDark ? '#FFFFFF' : ''}
          />
          Back
        </Link>
      </div>

      <DefaultEditor
        selectedLanguage={data?.project.language || 'env'}
        isEnvLocked={data?.isLocked!}
        isProjectLocked={data?.project.isLocked!}
        isRequireEncyptPassword={data?.project.isRequireEncyptPassword}
        environmentId={+data?.enviromentId!}
        projectId={+data?.project.projectId!}
        envId={+data?.id!}
        proId={+data?.projectId!}
        currentEnvVersion={data?.commitCount!}
        variable={data?.variables}
      />
    </div>
  )
}

export default EnvEditor
