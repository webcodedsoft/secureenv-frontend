import Button, { ButtonProps } from 'components/Forms/Button'
import withCreatePortal from 'components/HOC/withCreatePortal'
import { useCallback, useEffect, useMemo, useState } from 'react'
import AddTeamModal from './AddTeamModal'
import Filter from 'components/Filter'
import TextField from 'components/Forms/TextField'
import { Icon, Icons } from 'components/Icon'
import {
  useDeleteTeamMember,
  useGetTeamList
} from 'common/queries-and-mutations/team'
import { useSearchParams } from 'react-router-dom'
import { selectAccountDetails } from 'selectors/account-selector'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import useDebounce from 'common/hooks/useDebounce'
import { ListOrder, PaginatedListMeta } from 'types/general.type'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable
} from '@tanstack/react-table'
import { TeamDaum } from 'services/dtos/team.dto'
import AvatarInitial from 'components/Avatar/Initial'
import { format } from 'date-fns'
import { Loader } from 'components/Loader'
import clsx from 'clsx'
import Paginator from 'components/Table/TableWidget/Paginator'
import { AccountStatus, RolesEnum } from 'types/user.type'
import ConfirmModal from 'components/Modal/ConfirmModal'
import { logout } from 'thunks/account-thunk'
import { toast } from 'react-toastify'
import { Alert } from 'components/Toast'

const EhancedAddTeamModal = withCreatePortal(AddTeamModal)
const EhanchedConfirm = withCreatePortal(ConfirmModal)
export default function ManageTeam() {
  const [showInviteModal, setShowInviteModal] = useState(false)
  const [sorting, setSorting] = useState<SortingState>([])
  const [urlParams, setUrlParams] = useSearchParams()
  const [isExecutingSearch, setIsExecutingSearch] = useState<boolean>(true)
  const searchQueryString = urlParams.get('search_query') ?? ''
  const currentPage = urlParams.get('page') ?? '1'
  const numberOfItemsPerPage = urlParams.get('items_per_page') || 10
  const status = urlParams.get('status') || 'ALL'
  const { user } = useAppSelector(selectAccountDetails)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [removedUserId, setRemovedUserId] = useState<null | number>()
  const dispatch = useAppDispatch()
  const { mutate, isSuccess, isError } = useDeleteTeamMember()

  const debounceSearch = useDebounce(searchQueryString, 1300)

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

  const columnHelper = createColumnHelper<TeamDaum>()

  const determineActionBtn = (member: TeamDaum) => {
    const isCurrentUser = user.id === member.id
    const isAdmin = user.accountRole === RolesEnum.ADMIN

    const buttonProps: ButtonProps = {
      type: 'button',
      variant: 'outline',
      size: 'sm',
      className: `rounded-md text-base w-32 ${
        isCurrentUser ? 'text-white bg-red' : 'text-red'
      }`,
      label: isCurrentUser ? 'Leave' : 'Remove',
      onClick: () => {
        setShowConfirmModal(true)
        setRemovedUserId(member.id)
      },
      icon: (
        <Icon
          name={Icons.Cancel}
          fill={isCurrentUser ? '#FFFFFF' : '#e23738'}
        />
      )
    }

    return (isAdmin || isCurrentUser) && <Button {...buttonProps} />
  }

  const columns = [
    columnHelper.accessor((row) => row.name, {
      enableSorting: true,
      id: 'name',
      cell: (info) => (
        <div className="flex items-center gap-2">
          <div className="overflow-hidden rounded-full">
            <AvatarInitial
              name={
                info.row.original.accountStatus === AccountStatus.ACTIVATED
                  ? info.getValue()
                  : info.row.original.accountStatus
              }
              avatarColor={info.row.original.avatarColor}
              className="size-10"
            />
          </div>
          <p className="text-normal text-gray-1100 dark:text-gray-dark-1100">
            {info.row.original.accountStatus === AccountStatus.ACTIVATED
              ? info.getValue()
              : info.row.original.accountStatus}
          </p>
        </div>
      ),
      header: () => (
        <span className="text-xs font-semibold text-[#848484]">Name</span>
      )
    }),
    columnHelper.accessor((row) => row.emailAddress, {
      enableSorting: true,
      id: 'emailAddress',
      cell: (info) => (
        <span className="text-xs font-normal">{info.getValue()}</span>
      ),
      header: () => (
        <span className="text-xs font-semibold text-[#848484]">
          Email Address
        </span>
      )
    }),
    columnHelper.accessor((row) => row.accountRole, {
      enableSorting: true,
      id: 'accountRole',
      cell: (info) => (
        <span className="text-xs font-normal">{info.getValue()}</span>
      ),
      header: () => (
        <span className="text-xs font-semibold text-[#848484]">Role</span>
      )
    }),
    columnHelper.accessor((row) => row.accountStatus, {
      enableSorting: true,
      id: 'accountStatus',
      cell: (info) => (
        <span className="text-xs text-gray-1100 dark:text-gray-dark-1100">
          <div className="flex items-center gap-x-2">
            <div
              className={`size-2 rounded-full ${
                info.getValue() === AccountStatus.ACTIVATED
                  ? 'bg-green'
                  : 'bg-red'
              }`}
            ></div>
            <p className="text-normal text-gray-1100 dark:text-gray-dark-1100">
              {info.getValue()}
            </p>
          </div>
        </span>
      ),
      header: () => (
        <span className="text-xs font-semibold text-[#848484]">Status</span>
      )
    }),
    columnHelper.accessor((row) => row.createdAt, {
      enableSorting: false,
      id: 'createdAt',
      cell: (info) => (
        <span className="text-xs font-normal">
          {format(new Date(info.getValue()), 'dd MMM yyyy')}
        </span>
      ),
      header: () => (
        <span className="text-xs font-semibold text-[#848484]">Date Added</span>
      )
    }),
    columnHelper.accessor((row) => row.id, {
      enableSorting: false,
      id: 'id',
      cell: (info) => <div>{determineActionBtn(info.row.original)}</div>,
      header: () => (
        <span className="text-xs font-semibold text-[#848484]">Action</span>
      )
    })
  ]

  const data = useMemo<TeamDaum[]>(() => {
    const normalizedResult: TeamDaum[] = (teamList?.data ?? []).map(
      (item) => item
    )
    return normalizedResult
  }, [teamList])

  const listMetaData = (teamList?.meta ?? {}) as PaginatedListMeta

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting
    },
    // initialState: {
    //   pagination: {
    //     pageSize: 2
    //   }
    // },
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel()
  })

  const handleFilter = (currentTab: string) => {
    if (currentTab === 'ALL') {
      urlParams.delete('status')
      setUrlParams(urlParams)
    }
    urlParams.set('status', currentTab)
    setUrlParams(urlParams)
    setIsExecutingSearch(true)
    refetch()
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

  const handleRemove = () => {
    setIsSubmitting(true)
    mutate({ userId: removedUserId! })
  }

  useEffect(() => {
    if (isSuccess && !isError) {
      setIsSubmitting(false)
      setShowConfirmModal(false)
      setRemovedUserId(null)
      refetch()
      toast(<Alert type="success" message="Account successfully removed" />)
      if (user.id === removedUserId) {
        dispatch(logout())
      }
    } else if (!isError) {
      setIsSubmitting(false)
    }
  }, [isSuccess, isError])

  const modalText = useMemo(() => {
    const isCurrentUser = removedUserId === user.id
    return {
      title: isCurrentUser
        ? 'Are you absolutely sure you want to delete your account? 🛑'
        : "Are you absolutely sure you want to delete this user's account? 🛑",
      content: isCurrentUser
        ? 'Warning: This is a one-way trip! Hit the delete button, and poof—your data’s gone forever, and there’s no turning back. Still want to go through with it?'
        : "Careful now! Once you delete this, it’s like the user's account data went on vacation and forgot to come back—no logging in, no take-backs. Are you sure?"
    }
  }, [removedUserId])

  if (isFetching) {
    return (
      <div className="mt-40 flex flex-col items-center justify-center">
        <Loader height={50} width={50} />
      </div>
    )
  }

  return (
    <div>
      <div className="smd:mr-[70rem]">
        <div className="mb-[25px] flex items-end justify-between">
          <div>
            <h2 className="mb-[13px] text-[28px] font-bold capitalize leading-[35px] text-gray-1100 dark:text-gray-dark-1100">
              Manage Team
            </h2>
          </div>
          <div className="flex items-center gap-x-2">
            <Button
              type="button"
              variant="primary"
              size="md"
              className="mb-3 w-fit rounded-md py-4 text-base text-white"
              label="Invite Teams"
              onClick={() => setShowInviteModal(true)}
            ></Button>
          </div>
        </div>
        <div className="mb-[27px] flex items-center justify-between gap-5">
          <TextField
            name="search_query"
            placeholder="Search team"
            label=""
            size="md"
            className="w-44s"
            isRequired
            type="search"
            value={searchQueryString}
            onChange={handleChange}
          />
          <div className="flex items-center gap-3">
            <Filter
              label={'Filters'}
              options={[
                { value: 'ALL', label: 'All' },
                { value: RolesEnum.VIEWER, label: 'Viewer' },
                { value: RolesEnum.COLLABORATOR, label: 'Collaborator' },
                { value: RolesEnum.ADMIN, label: 'Admin' }
              ]}
              onSelect={(val) => handleFilter(val)}
            />
          </div>
        </div>
        <div className="mb-[25px] overflow-x-scroll rounded-2xl border border-neutral bg-neutral-bg p-[25px] scrollbar-hide dark:border-dark-neutral-border dark:bg-dark-neutral-bg">
          <div className="mb-3 flex items-center justify-between border-b border-neutral pb-4 dark:border-dark-neutral-border">
            <p className="text-subtitle-semibold font-semibold text-gray-1100 dark:text-gray-dark-1100">
              Teams
            </p>
          </div>
          <table className="w-full min-w-[900px]">
            {table.getRowModel().rows.length >= 1 && (
              <tbody className="">
                {table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b border-neutral text-normal text-gray-1100 dark:border-dark-neutral-border dark:text-gray-dark-1100"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className={clsx({
                          'py-3': true
                          // [className]: className,
                        })}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            )}
          </table>
          {table.getRowModel().rows.length === 0 && (
            <p className="mx-auto my-10 flex w-full flex-col items-center justify-center text-xl font-bold text-gray-1100 dark:text-gray-dark-1100">
              No team added yet
            </p>
          )}
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
                urlParams.set('items_per_page', items_per_page.toString())
                setUrlParams(urlParams)
                setIsExecutingSearch(true)
              }}
              showPageNumber={false}
            />
          </div>
        </div>
      </div>
      {showInviteModal && (
        <EhancedAddTeamModal onClose={() => setShowInviteModal(false)} />
      )}

      {showConfirmModal && removedUserId && (
        <EhanchedConfirm
          title={modalText.title}
          content={modalText.content}
          actionText="No"
          cancelText="Yes, please"
          onConfirm={() => {
            setShowConfirmModal(false)
            setRemovedUserId(null)
          }}
          onCancel={handleRemove}
          isSubmitting={isSubmitting}
        />
      )}
    </div>
  )
}
