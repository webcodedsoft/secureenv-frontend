import useDarkMode from 'common/hooks/useDarkMode'
import Dropdown from 'components/Dropdown'
import { Icon, Icons } from 'components/Icon'
import { languages } from 'constants/languages'
import { format } from 'date-fns'
import { Link, useNavigate } from 'react-router-dom'
import { ProjectDaum } from 'services/dtos/project.dto'

type Props = {
  project: ProjectDaum
}

export default function ProjectCard({ project }: Props) {
  const isDarkMode = useDarkMode();
  const navigate = useNavigate()
  const language = languages.find((lang) => lang.value === project.language)

  return (
    <Link to={`${project.projectSlug}/${project.projectId}`}>
      <div className="bg-neutral-bg border border-neutral dark:bg-dark-neutral-bg rounded-lg px-6 pb-6 pt-7 dark:border-dark-neutral-border">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center flex-1 gap-x-3">
            <Icon
              name={language?.icon || '' as Icons}
              fill={isDarkMode ? '#FFFFFF' : '#262631'}
              width={60}
              height={60}
            />
            <h4 className="text-gray-500 font-semibold text-left flex-1 dark:text-gray-dark-500 max-w-52 text-xs leading-4">
              {project.projectName}
            </h4>
          </div>
          {/* <Dropdown options={[
          {
            label: 'View details', onClick: () =>
              navigate(`${project.projectSlug}/${project.projectId}`)
          },
          { label: 'Pin Project', onClick: () => { } },
          { label: 'Delete', onClick: () => { }, isDlete: true },
        ]}
        /> */}
        </div>
        <div className="flex items-center gap-x-5 border-b border-neutral mb-[19px] pb-[19px] dark:border-dark-neutral-border">
          <div className="flex items-center gap-x-1">
            {' '}
            <Icon name={Icons.Calendar} />
            <span className="text-gray-500 dark:text-gray-dark-500 text-[12px] leading-[15px]">
              Added Date {format(new Date(project.createdAt), 'MMM dd yy')}
            </span>
          </div>
          <div className="flex items-center gap-x-1">
            <Icon name={Icons.Users} />
            <span className="text-gray-500 dark:text-gray-dark-500 text-[12px] leading-[15px]">
              {(project.contributorIds ?? []).length} Contributors
            </span>
          </div>
        </div>
        <div className="flex justify-between border-b border-neutral mb-[23px] pb-[17px] dark:border-dark-neutral-border">
          <div className="flex items-center gap-x-[5px]">
            <span className="text-gray-500 font-semibold text-left flex-1 dark:text-gray-dark-500 max-w-52 text-xs leading-4">
              ID: {project.projectId}
            </span>
          </div>
          <div className="flex items-center gap-x-[5px]">
            <div className={`rounded-full w-2 h-2 ${project.isActive ? 'bg-[#96DE95]' : 'bg-red'}`} />
            <span className="text-gray-500 dark:text-gray-dark-500 text-[11px] leading-[15px]">
              {project.isActive ? 'Active' : 'Inactive'}
            </span>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex items-center gap-x-3">
            <p className="py-1 text-xs bg-neutral text-gray-900 px-3 dark:bg-dark-neutral-border rounded-[5px] dark:text-gray-dark-900">
              {project.envFileName}
            </p>
            <p className="py-1 text-xs bg-neutral text-gray-900 px-3 dark:bg-dark-neutral-border rounded-md dark:text-gray-dark-900">
              {project.language}
            </p>
          </div>
          <div className="flex items-center gap-x-10">
            <Icon name={project.isLocked ? Icons.Locked : Icons.Unlock} fill={isDarkMode ? 'white' : 'black'} />
            {project.isRequireEncyptPassword && (
              <Icon name={Icons.Shield} fill={isDarkMode ? 'white' : 'black'} />
            )}
          </div>
        </div>
      </div>
    </Link>

  )
}
