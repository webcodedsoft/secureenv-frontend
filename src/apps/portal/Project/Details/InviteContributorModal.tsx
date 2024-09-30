import { InfoModal } from 'components/Modal'
import CloseBtn from '../../../../assets/icons/icon-close-modal.svg'
import { useGetTeamList } from 'common/queries-and-mutations/team'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import useDebounce from 'common/hooks/useDebounce'
import { ListOrder, PaginatedListMeta } from 'types/general.type'
import { TeamDaum } from 'services/dtos/team.dto'
import { Loader } from 'components/Loader'
import AvatarInitial from 'components/Avatar/Initial'
import { capitalizeFirstLetter } from 'utils'
import Button from 'components/Forms/Button'
import { selectAccountDetails } from 'selectors/account-selector'
import { useAppSelector } from 'store/hooks'
import { UserInfoDto } from 'services/dtos/user.dto'
import { AccountTypeEnum, RolesEnum } from 'types/user.type'
import { useHandleContributor } from 'common/queries-and-mutations/project'
import { toast } from 'react-toastify'
import { Alert } from 'components/Toast'
import EmptyState from 'components/EmptyState'

type IProps = {
  onClose: () => void
  contributors: string[]
  owner: UserInfoDto
  projectId: number
}

export default function InviteContributorModal({ onClose, contributors, owner, projectId }: IProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [urlParams, setUrlParams] = useSearchParams()
  const [isExecutingSearch, setIsExecutingSearch] = useState<boolean>(true)
  const searchQueryString = urlParams.get('search_query') ?? ''
  const currentPage = urlParams.get('page') ?? '1'
  const numberOfItemsPerPage = urlParams.get('items_per_page') || 100
  const status = urlParams.get('status') || 'ALL'
  const debounceSearch = useDebounce(searchQueryString, 1300)
  const { user } = useAppSelector(selectAccountDetails)
  const navigate = useNavigate()
  const { mutate, isSuccess, isError } = useHandleContributor()

  const getPaginationParams = useCallback(() => {
    return {
      page: +currentPage,
      take: +numberOfItemsPerPage,
      order: ListOrder.DESC
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
    data: teamList,
    isFetching,
    refetch
  } = useGetTeamList({
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

  const data = useMemo<TeamDaum[]>(() => {
    const normalizedResult: TeamDaum[] = (teamList?.data ?? []).map(
      (item) => item
    )
    return normalizedResult
  }, [teamList])

  const listMetaData = (teamList?.meta ?? {}) as PaginatedListMeta

  const handleInvite = (projectId: number, accountId: number) => {
    setIsSubmitting(true)
    mutate({ projectId, accountId })
  }

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

  const pendingTeams = useMemo(() => {
    return (data ?? []).filter(obj => !contributors.map((i) => Number(i)).includes(obj.id))
  }, [data, contributors]);

  useEffect(() => {
    if (isSuccess && !isError) {
      setIsSubmitting(false)
      toast(<Alert type="success" message="Success! Invite successfully sent" />)
    } else if (isError) {
      setIsSubmitting(false)
    }
  }, [isSuccess, isError])

  if (isFetching) {
    return (
      <div className="mt-40 flex flex-col items-center justify-center">
        <Loader height={50} width={50} />
      </div>
    )
  }


  // TODO: Implement pagination
  return (
    <InfoModal
      width={`w-full max-w-[694px]`}
      className="h-fit mt-24 md:mt-0 rounded-md pb-5 flex w-full flex-col"
    >
      <div className="scrollbar-hide w-full md:p-10 p-5 rounded-lg">
        <button
          className="absolute right-2 top-2 cursor-pointer"
          type="button"
          onClick={onClose}
        >
          <img src={CloseBtn} alt="close modal button" />
        </button>
        <div className="flex items-center justify-center flex-col">
          <h6 className="text-header-6 font-semibold text-gray-500 text-center dark:text-gray-dark-500 mb-[53px]">
            Invite team members
          </h6>
          <div className="w-full bg-neutral h-[1px] dark:bg-dark-neutral-border mb-10" />
          <div className="w-full mb-6">
            <p className="text-gray-1100 text-base leading-4 font-medium mb-2 dark:text-gray-dark-1100">
              Search team member
            </p>
            <div className="flex items-center gap-5">
              <input
                className="bg-transparent text-sm leading-4 text-gray-400 border border-neutral flex-1 rounded-md focus:outline-none p-2 dark:text-gray-dark-400 placeholder:text-inherit dark:border-dark-neutral-border"
                type="text"
                name="search_query"
                value={searchQueryString}
                placeholder="Search members by name or email"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="w-full flex items-center justify-between mb-[30px]">
            <div className="flex items-center gap-3">
              <AvatarInitial name={owner.name || owner.accountStatus} avatarColor={owner.avatarColor} />
              <p className="text-sm leading-4 text-gray-400 dark:text-gray-dark-400">
                {owner.name}
              </p>
            </div>
            <p className="text-sm leading-4 text-gray-400 dark:text-gray-dark-400">
              Owner
            </p>
          </div>
          <div className="w-full bg-neutral h-[1px] dark:bg-dark-neutral-border mb-10" />
          <div className="w-full">
            <p className="text-subtitle font-medium text-gray-1100 dark:text-gray-dark-1100">
              Members
            </p>

            {pendingTeams.map((team) => {
              return (
                <div className="flex items-center justify-between border-b border-neutral w-full flex-wrap gap-4 py-5 dark:border-dark-neutral-border last:border-none">
                  <div className="flex items-center flex-wrap gap-4 md:gap-20">
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10">
                        <AvatarInitial name={team.name || team.accountStatus} avatarColor={team.avatarColor} />
                      </div>
                      <div className="flex-1 w-40 pl-3">
                        <p className="text-normal font-semibold text-gray-1100 dark:text-gray-dark-1100 mb-[5px]">{team.name || team.accountStatus}</p>
                        <p className="text-desc text-gray-500 dark:text-gray-dark-500 md:truncate">{team.emailAddress}</p>
                      </div>
                    </div>
                    <p className="text-desc text-gray-400 dark:text-gray-dark-400">{capitalizeFirstLetter(team.accountRole)}</p>
                  </div>
                  <div className="flex items-center gap-[14px]">
                    {(user.accountRole === RolesEnum.ADMIN || owner.id === user.id) && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        label="Invite"
                        disabled={isSubmitting}
                        loading={isSubmitting}
                        className={`rounded-md text-base w-32 text-color-brands hover:text-gray-400`}
                        onClick={() => handleInvite(projectId, Number(team.accountId))}
                      />
                    )}
                  </div>
                </div>
              )
            })}
            {!pendingTeams.length && (
              <EmptyState
                onClick={() => navigate(`/workspace/${user.workspaceId}/teams`)}
                title={'No team member found'}
                content={'No worries—good things come to those who wait (and code)!'}
                btnTitle={'Create more team member '}
                doneUserImage={true}
              />
            )}
          </div>
        </div>
      </div>
    </InfoModal>
  )
}
