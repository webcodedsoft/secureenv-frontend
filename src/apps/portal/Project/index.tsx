import Dropdown from 'components/Dropdown'
import ProjectCard from './ProjectCard'
import EmptyProject from './EmptyProject'
import Button from 'components/Forms/Button'
import { Icon, Icons } from 'components/Icon'
import AddProjectModal from './AddProjectModal'
import { InfoModal } from 'components/Modal'
import withCreatePortal from 'components/HOC/withCreatePortal'
import { Link, useSearchParams } from 'react-router-dom'
import { useAppSelector } from 'store/hooks'
import { selectAccountDetails } from 'selectors/account-selector'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useGetProjects } from 'common/queries-and-mutations/project'
import useDebounce from 'common/hooks/useDebounce'
import { ListOrder, PaginatedListMeta } from 'types/general.type'
import { ProjectDaum } from 'services/dtos/project.dto'
import { Loader } from 'components/Loader'

const EnhancedAddProjectModal = withCreatePortal(AddProjectModal)
export default function Project() {
  const { user } = useAppSelector(selectAccountDetails)
  const [urlParams, setUrlParams] = useSearchParams()
  const [isExecutingSearch, setIsExecutingSearch] = useState<boolean>(true)
  const searchQueryString = urlParams.get('search_query') ?? ''
  const currentPage = urlParams.get('page') ?? '1'
  const numberOfItemsPerPage = urlParams.get('items_per_page') || 10
  const status = urlParams.get('status') || 'ALL'
  const debounceSearch = useDebounce(searchQueryString, 1300)

  const getPaginationParams = useCallback(() => {
    return {
      page: +currentPage,
      take: +numberOfItemsPerPage,
      order: ListOrder.ASC,
    }
  }, [currentPage, numberOfItemsPerPage])

  const computedWhereOptions = useCallback(() => {
    const trimmedSearch = searchQueryString.trim()
    if (trimmedSearch.length > 2) {
      return {
        search_query: trimmedSearch,
        status,
      }
    }
    return {
      search_query: '',
      status,
    }
  }, [searchQueryString, status])

  const {
    data: projects,
    isFetching,
    refetch,
  } = useGetProjects({
    whereOptions: computedWhereOptions(),
    paginationOptions: getPaginationParams(),
    enabled: isExecutingSearch,
  })

  useEffect(() => {
    if (!isFetching && isExecutingSearch) {
      setIsExecutingSearch(false)
    }
  }, [isFetching, isExecutingSearch])

  useEffect(() => {
    if (debounceSearch.length > 3) {
      setIsExecutingSearch(true)
      refetch()
    }
  }, [debounceSearch, refetch])

  const data = useMemo<ProjectDaum[]>(() => {
    const normalizedResult: ProjectDaum[] = (projects?.data ?? []).map((item) => item)
    return normalizedResult
  }, [projects])

  const listMetaData = (projects?.meta ?? {}) as PaginatedListMeta

  if (isFetching) {
    return (
      <div className="mt-40 flex flex-col items-center justify-center">
        <Loader height={50} width={50} />
      </div>
    )
  }

  return (
    <div>
      <div className='flex items-center justify-between md:pr-5'>
        <h2 className="capitalize text-gray-1100 font-bold text-[28px] leading-[35px] dark:text-gray-dark-1100 mb-[13px]">
          Howdy Steven!
        </h2>
        <Link to={`/workspace/${user.workspace.workspaceId}/add-project`}>
          <Button
            type="button"
            variant="primary"
            size="md"
            className="mb-3 rounded-md py-4 text-base text-white w-fit"
            label="Add a new project"
            icon={<Icon name={Icons.AddProject} stroke='#FFFFFF' />}
          ></Button>
        </Link>
      </div>
      <section>
        <div className="flex flex-col justify-between gap-5 xl:flex-row md:pr-5">
          <div className="border bg-neutral-bg border-neutral dark:bg-dark-neutral-bg dark:border-dark-neutral-border rounded-2xl pt-6 flex-1 pb-[23px] shadow-lg">
            <div className="flex items-center justify-between border-b border-neutral dark:border-dark-neutral-border mb-[33px] pb-[19px] px-[25px]">
              <div className="text-base leading-5 text-gray-1100 font-semibold dark:text-gray-dark-1100">
                All Projects
              </div>
              <Dropdown
                options={[
                  { label: 'Sale Reports', onClick: () => { } },
                  { label: 'Export Reports', onClick: () => { } },
                  { label: 'Remove', onClick: () => { }, isDlete: true }
                ]}
              />
            </div>
            <div className="px-[25px]">
              {!data.length && (
                <EmptyProject user={user} />
              )}
              {data.length > 0 && (
                <div className="grid grid-cols-1 gap-6 mb-[31px] lg:grid-cols-3">
                  {data.map((project) => (
                    <ProjectCard project={project} />
                  ))}
                </div>
              )}

              {/*
              <div className="flex items-center gap-x-10">
                <div>
                  <button className="btn text-sm h-fit min-h-fit capitalize leading-4 border-0 bg-color-brands font-semibold py-[11px] px-[18px] hover:bg-color-brands">
                    1
                  </button>
                  <button className="btn text-sm h-fit min-h-fit capitalize leading-4 border-0 bg-transparent font-semibold text-gray-1100 py-[11px] px-[18px] hover:bg-color-brands dark:text-gray-dark-1100">
                    2
                  </button>
                  <button className="btn text-sm h-fit min-h-fit capitalize leading-4 border-0 bg-transparent font-semibold text-gray-1100 py-[11px] px-[18px] hover:bg-color-brands dark:text-gray-dark-1100">
                    3
                  </button>
                  <button className="btn text-sm h-fit min-h-fit capitalize leading-4 border-0 bg-transparent font-semibold text-gray-1100 py-[11px] px-[18px] hover:bg-color-brands dark:text-gray-dark-1100">
                    4
                  </button>
                  <button className="btn text-sm h-fit min-h-fit capitalize leading-4 border-0 bg-transparent font-semibold text-gray-1100 py-[11px] px-[18px] hover:bg-color-brands dark:text-gray-dark-1100">
                    5
                  </button>
                </div>
                <a
                  className="items-center justify-center border rounded-lg border-neutral hidden gap-x-[10px] px-[18px] py-[11px] dark:border-dark-neutral-border lg:flex"
                  href="#"
                >
                  {' '}
                  <span className="text-gray-400 text-xs font-semibold leading-[18px] dark:text-gray-dark-400">
                    Next
                  </span>
                  <img
                    src="assets/images/icons/icon-arrow-right-long.svg"
                    alt="arrow right icon"
                  />
                </a>
              </div> */}
            </div>
          </div>
        </div>
      </section>
      {/* <EnhancedAddProjectModal /> */}
    </div>
  )
}
