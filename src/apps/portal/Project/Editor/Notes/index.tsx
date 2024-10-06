import { useGetNoteList } from 'common/queries-and-mutations/environment'
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState
} from 'react'
import { ListOrder, PaginatedListMeta } from 'types/general.type'
import NoteItem from './NoteItem'
import { Loader } from 'components/Loader'
import { NoteDaum } from 'services/dtos/environment.dto'
import withCreatePortal from 'components/HOC/withCreatePortal'
import AddNoteModal from '../AddNoteModal'
import Button from 'components/Forms/Button'
import Paginator from 'components/Table/TableWidget/Paginator'

type Props = {
  projectId: number
  environmentId: number
  handleNoteClick: (note: NoteDaum, highlighted: boolean) => void
  proId: number
  isEnvLocked: boolean
  isProjectLocked: boolean
  envId: number
  setSelectedText: Dispatch<
    SetStateAction<{
      text: any
      range: any
    } | null>
  >
  selectedText: any
}

const EhanchedAddNoteModal = withCreatePortal(AddNoteModal)

export default function NoteList({
  projectId,
  handleNoteClick,
  envId,
  proId,
  setSelectedText,
  selectedText,
  isEnvLocked,
  isProjectLocked
}: Props) {
  const [isExecutingSearch, setIsExecutingSearch] = useState<boolean>(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemPerPage, setItemPerPage] = useState(10)

  const [showAddNoteModal, setShowAddNoteModal] = useState(false)

  const getPaginationParams = useCallback(() => {
    return {
      page: currentPage,
      take: itemPerPage,
      order: ListOrder.DESC
    }
  }, [currentPage, itemPerPage])

  const computedWhereOptions = useCallback(() => {
    return {
      projectId: proId,
      environmentId: envId
    }
  }, [proId, envId])

  const {
    data: noteList,
    isFetching,
    refetch
  } = useGetNoteList({
    whereOptions: computedWhereOptions(),
    paginationOptions: getPaginationParams(),
    enabled: isExecutingSearch
  })

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
  const listMetaData = (noteList?.meta ?? {}) as PaginatedListMeta

  if (isFetching) {
    return (
      <div className="mt-40 flex flex-col items-center justify-center">
        <Loader height={50} width={50} />
      </div>
    )
  }

  return (
    <div className="flex w-full flex-1 flex-col gap-7 pt-2 lg:flex-row xl:flex-col">
      <div className="flex-1">
        <div className="flex justify-end px-4">
          <Button
            type="button"
            variant="primary"
            size="sm"
            className="mb-3 w-fit rounded-md py-4 text-base text-white"
            label="Add note"
            onClick={() => setShowAddNoteModal(true)}
            disabled={isEnvLocked || isProjectLocked}
          ></Button>
        </div>
        <div className="border-b border-neutral dark:border-dark-neutral-border" />

        <div
          className={`max-h-[660px] overflow-y-auto px-4 ${
            !noteList?.data?.length
              ? 'flex h-[690px] items-center justify-center'
              : ''
          } `}
        >
          {!noteList?.data?.length ? (
            <div className="text-center">
              <h1 className="mb-2 text-2xl font-semibold leading-8 text-gray-1100 dark:text-gray-dark-1100">
                No Notes Yet!
              </h1>
              <p className="mb-9 text-sm leading-4 text-gray-500 dark:text-gray-dark-500">
                Once you add a note, it will magically appear right here. Go
                ahead, jot something down!
              </p>
            </div>
          ) : (
            <>
              {(noteList.data ?? [])?.map((note) => (
                <NoteItem
                  key={note.id}
                  note={note}
                  handleNoteClick={handleNoteClick}
                />
              ))}
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
            </>
          )}
        </div>
      </div>
      {showAddNoteModal && (
        <EhanchedAddNoteModal
          projectId={projectId}
          envId={envId}
          onClose={() => {
            setShowAddNoteModal(false)
            setSelectedText(null)
          }}
          onSuccess={() => {
            setSelectedText(null)
            refetch()
          }}
          selectedText={selectedText}
        />
      )}
    </div>
  )
}
