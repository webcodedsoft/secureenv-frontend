import {
  useGetEnvironment,
  useGetProjectEnvs
} from 'common/queries-and-mutations/environment'
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
import Dropdown from 'components/Dropdown'

const EnvEditor = () => {
  const { envId, projectId } = useParams()
  const isDark = useDarkMode()
  const { user } = useAppSelector(selectAccountDetails)

  const { data, isFetching, isRefetching } = useGetEnvironment(
    Number(projectId!),
    Number(envId!)
  )
  const { data: envs } = useGetProjectEnvs(Number(data?.projectId))

  const options = (envs ?? [])?.map((option) => ({
    label: option.environmentName,
    onClick: () =>
      (window.location.href = `/workspace/${user.workspace.workspaceId}/project/${data?.project.projectSlug}/${data?.project.projectId}/env-editor/${option.enviromentId}`)
    // onClick: () =>
    //   navigate(
    //     `/workspace/${user.workspace.workspaceId}/project/${data?.project.projectSlug}/${data?.project.projectId}/env-editor/${option.enviromentId}`
    //   )
  }))

  if (isFetching && !isRefetching) {
    return (
      <div className="mt-40 flex flex-col items-center justify-center">
        <Loader height={50} width={50} />
      </div>
    )
  }

  return (
    <div className="">
      <div className="mb-8 flex items-end justify-between">
        <div className="flex flex-col items-start gap-x-3">
          <div className="flex items-center gap-x-4 z-50">
            <h2 className="mb-3 text-2xl font-bold capitalize leading-9 text-gray-1100 dark:text-gray-dark-1100">
              {data?.project.projectName} - {data?.environmentName}{' '}
              <Dropdown
                options={options}
                className="mr-8"
                modalPosition="mr-6"
              />
            </h2>
          </div>
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
                className="flex size-full items-center justify-center gap-x-3 text-gray-1100 dark:text-gray-dark-1100"
              >
                Environment ID: #{data?.enviromentId.toString()}{' '}
                <Icon
                  name={Icons.Copy}
                  height={20}
                  width={20}
                  className="fill-gray-400 group-hover:fill-color-brands dark:fill-gray-dark-400"
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
                className="flex size-full items-center justify-center gap-x-3 text-gray-1100 dark:text-gray-dark-1100"
              >
                Environment Slug: {data?.environmentSlug.toString()}{' '}
                <Icon
                  name={Icons.Copy}
                  height={20}
                  width={20}
                  className="fill-gray-400 group-hover:fill-color-brands dark:fill-gray-dark-400"
                />
              </button>
            </CopyToClipboard>
          </div>
        </div>
        <Link
          to={`/workspace/${user.workspace.workspaceId}/project/${data?.project.projectSlug}/${data?.project.projectId}`}
          className="mb-2 flex items-center gap-x-2 text-normal font-semibold text-gray-1100 dark:text-gray-dark-1100"
        >
          <Icon name={Icons.LongBackArrow} fill={isDark ? '#FFFFFF' : ''} />
          Back
        </Link>
      </div>

      <DefaultEditor
        selectedLanguage={data?.project.language || 'env'}
        isEnvLocked={!!data?.isLocked}
        isProjectLocked={!!data?.project.isLocked}
        isRequireEncyptPassword={data?.project.isRequireEncyptPassword}
        environmentId={Number(data?.enviromentId)}
        projectId={Number(data?.project.projectId)}
        envId={Number(data?.id)}
        proId={Number(data?.projectId)}
        currentEnvVersion={Number(data?.commitCount)}
        variable={data?.variables}
      />
    </div>
  )
}

export default EnvEditor
