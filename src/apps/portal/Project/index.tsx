import ProjectCard from './ProjectCard'
import EmptyProject from './EmptyProject'
import Button from 'components/Forms/Button'
import { Icon, Icons } from 'components/Icon'
import { Link, useSearchParams } from 'react-router-dom'
import { useAppSelector } from 'store/hooks'
import { selectAccountDetails } from 'selectors/account-selector'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useGetProjects } from 'common/queries-and-mutations/project'
import useDebounce from 'common/hooks/useDebounce'
import { ListOrder, PaginatedListMeta } from 'types/general.type'
import { ProjectDaum } from 'services/dtos/project.dto'
import { Loader } from 'components/Loader'
import Paginator from 'components/Table/TableWidget/Paginator'

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
      order: ListOrder.ASC
    }
  }, [currentPage, numberOfItemsPerPage])

  const computedWhereOptions = useCallback(() => {
    const trimmedSearch = searchQueryString.trim()
    if (trimmedSearch.length > 2) {
      return {
        search_query: trimmedSearch,
        status
      }
    }
    return {
      search_query: '',
      status
    }
  }, [searchQueryString, status])

  const {
    data: projects,
    isFetching,
    refetch
  } = useGetProjects({
    whereOptions: computedWhereOptions(),
    paginationOptions: getPaginationParams(),
    enabled: isExecutingSearch
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
    const normalizedResult: ProjectDaum[] = (projects?.data ?? []).map(
      (item) => item
    )
    return normalizedResult
  }, [projects])

  const listMetaData = (projects?.meta ?? {}) as PaginatedListMeta

  const handleChange = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target
    if (value.trim() === '') {
      urlParams.delete(name)
      setUrlParams(urlParams)
    }
    if (value.trim()) {
      urlParams.set(name, value)
      setUrlParams(urlParams)
    }
  }

  const goToNextPage = () => {
    if (currentPage && urlParams && setUrlParams) {
      const nextPageValue = currentPage ? `${+currentPage + 1}` : '2'
      urlParams.set('page', nextPageValue)
      setUrlParams(urlParams)
    }
  }

  const goToPreviousPage = () => {
    if (currentPage && +currentPage > 1 && urlParams && setUrlParams) {
      const previousPageValue = `${+currentPage - 1}`
      urlParams.set('page', previousPageValue)
      setUrlParams(urlParams)
    }
  }

  if (isFetching) {
    return (
      <div className="mt-40 flex flex-col items-center justify-center">
        <Loader height={50} width={50} />
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between md:pr-5">
        <h2 className="mb-[13px] text-[28px] font-bold capitalize leading-[35px] text-gray-1100 dark:text-gray-dark-1100">
          Howdy {user.name}!
        </h2>
        <Link to={`/workspace/${user.workspace.workspaceId}/add-project`}>
          <Button
            type="button"
            variant="primary"
            size="md"
            className="mb-3 w-fit rounded-md py-4 text-base text-white"
            label="Add a new project"
            icon={<Icon name={Icons.AddProject} stroke="#FFFFFF" />}
          ></Button>
        </Link>
      </div>
      <section>
        <div className="flex flex-col justify-between gap-5 md:pr-5 xl:flex-row">
          <div className="flex-1 rounded-2xl border border-neutral bg-neutral-bg pb-[23px] pt-6 shadow-lg dark:border-dark-neutral-border dark:bg-dark-neutral-bg">
            <div className="mb-[33px] flex items-center justify-between border-b border-neutral px-[25px] pb-[19px] dark:border-dark-neutral-border">
              <div className="flex items-center gap-x-4">
                <div className="text-base font-semibold leading-5 text-gray-1100 dark:text-gray-dark-1100">
                  All Projects
                </div>
                <div className="flex w-72 items-center gap-2 rounded-lg border border-neutral py-3 pl-4 dark:border-dark-neutral-border">
                  <Icon name={Icons.Search} width={20} height={20} />
                  <input
                    className="w-full border-none bg-transparent pr-5 text-xs font-normal text-gray-400 outline-none dark:text-gray-dark-400"
                    type="search"
                    name="search_query"
                    value={searchQueryString}
                    placeholder="Search projects"
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="px-[25px]">
              {!data.length && <EmptyProject user={user} />}
              {data.length > 0 && (
                <div className="mb-[31px] grid grid-cols-1 gap-6 lg:grid-cols-3">
                  {data.map((project) => (
                    <ProjectCard project={project} key={project.id} />
                  ))}
                </div>
              )}
            </div>
            {listMetaData && listMetaData.pageCount > 1 && (
              <div className="mt-5 p-5">
                <Paginator
                  numberOfPages={listMetaData.pageCount}
                  page={+currentPage}
                  hasNext={listMetaData.hasNextPage}
                  hasPrevious={listMetaData.hasPreviousPage}
                  goToNextPage={goToNextPage}
                  goToPreviousPage={goToPreviousPage}
                  numberOfItemsPerPage={10}
                  setNumberOfItemsPerPage={(items_per_page) => {
                    if (urlParams && setUrlParams) {
                      urlParams.set('items_per_page', items_per_page.toString())
                      setUrlParams(urlParams)
                    }
                  }}
                  showPageNumber={false}
                />
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
