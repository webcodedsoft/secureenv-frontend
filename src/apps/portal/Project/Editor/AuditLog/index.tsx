import React, { useCallback, useEffect, useMemo, useState } from 'react'
import AuditLogItem from './AuditLogItem'
import { useGetEnvAuditList } from 'common/queries-and-mutations/environment'
import { Loader } from 'components/Loader'
import { ListOrder, PaginatedListMeta } from 'types/general.type'
import { AuditDaum } from 'services/dtos/environment.dto'
import Paginator from 'components/Table/TableWidget/Paginator'

type Props = {
  proId: number
  envId: number
  isAccessGrant: boolean
}

export default function AuditLogList({ envId, proId, isAccessGrant }: Props) {
  const [isExecutingSearch, setIsExecutingSearch] = useState<boolean>(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemPerPage, setItemPerPage] = useState(10)

  const getPaginationParams = useCallback(() => {
    return {
      page: +currentPage,
      take: +itemPerPage,
      order: ListOrder.DESC
    }
  }, [currentPage, itemPerPage])

  const computedWhereOptions = useCallback(() => {
    return {
      projectId: proId,
      environmentId: envId,
      isAccessGrant
    }
  }, [proId, envId, isAccessGrant])

  const { data, isFetching } = useGetEnvAuditList({
    whereOptions: computedWhereOptions(),
    paginationOptions: getPaginationParams(),
    enabled: isExecutingSearch
  })

  const auditList = useMemo<AuditDaum[]>(() => {
    const normalizedResult: AuditDaum[] = (data?.data ?? []).map((item) => item)
    return normalizedResult
  }, [data])

  const listMetaData = (data?.meta ?? {}) as PaginatedListMeta

  useEffect(() => {
    if (!isFetching && isExecutingSearch) {
      setIsExecutingSearch(false)
    }
  }, [isFetching, isExecutingSearch])

  const goToNextPage = () => {
    if (currentPage) {
      const nextPageValue = currentPage ? currentPage + 1 : 2
      setCurrentPage(nextPageValue)
    }
  }

  const goToPreviousPage = () => {
    if (currentPage) {
      const previousPageValue = currentPage - 1
      setCurrentPage(previousPageValue)
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
      <div
        className={`h-[530px] max-h-[660px] overflow-y-auto px-4 ${
          !auditList?.length ? 'flex h-[530px] items-center justify-center' : ''
        } `}
      >
        {!auditList?.length ? (
          <div className="text-center">
            <h1 className="mb-2 text-2xl font-semibold leading-8 text-gray-1100 dark:text-gray-dark-1100">
              No audit Yet!
            </h1>
            <p className="mb-9 text-sm leading-4 text-gray-500 dark:text-gray-dark-500">
              Once you start adding environment, it will magically appear right
              here. Go ahead, jot something down!
            </p>
          </div>
        ) : (
          <>
            {auditList.slice(0, 2).map((item) => (
              <AuditLogItem
                key={item.id}
                added={item.added}
                edited={item.edited}
                removed={item.removed}
                user={item.user}
                createdAt={item.createdAt}
              />
            ))}
          </>
        )}
      </div>
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
            setItemPerPage(items_per_page)
          }}
          showPageNumber={false}
        />
      </div>
    </div>
  )
}
