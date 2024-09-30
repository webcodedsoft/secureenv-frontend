import { useGetNoteList } from 'common/queries-and-mutations/environment';
import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { ListOrder } from 'types/general.type';
import NoteItem from './NoteItem';
import { Loader } from 'components/Loader';
import { NoteDaum } from 'services/dtos/environment.dto';
import withCreatePortal from 'components/HOC/withCreatePortal';
import AddNoteModal from './AddNoteModal';
import Button from 'components/Forms/Button';

type Props = {
  projectId: number
  environmentId: number
  handleNoteClick: (note: NoteDaum, highlighted: boolean) => void
  proId: number
  isEnvLocked: boolean
  isProjectLocked: boolean
  envId: number
  setSelectedText: Dispatch<SetStateAction<{
    text: any;
    range: any;
  } | null>>
  selectedText: any
}

const EhanchedAddNoteModal = withCreatePortal(AddNoteModal)

export default function NoteList({
  projectId,
  environmentId,
  handleNoteClick,
  envId,
  proId,
  setSelectedText,
  selectedText,
  isEnvLocked,
  isProjectLocked
}: Props) {
  const [urlParams, setUrlParams] = useSearchParams()
  const [isExecutingSearch, setIsExecutingSearch] = useState<boolean>(true)
  const currentPage = urlParams.get('page') ?? '1'
  const numberOfItemsPerPage = urlParams.get('items_per_page') || 10
  const [showAddNoteModal, setShowAddNoteModal] = useState(false)

  const getPaginationParams = useCallback(() => {
    return {
      page: +currentPage,
      take: +numberOfItemsPerPage,
      order: ListOrder.DESC,
    }
  }, [currentPage, numberOfItemsPerPage])

  const computedWhereOptions = useCallback(() => {
    return {
      projectId: proId,
      environmentId: envId,
    }
  }, [projectId, environmentId])

  const {
    data: noteList,
    isFetching,
    refetch,
  } = useGetNoteList({
    whereOptions: computedWhereOptions(),
    paginationOptions: getPaginationParams(),
    enabled: isExecutingSearch,
  })

  useEffect(() => {
    if (!isFetching && isExecutingSearch) {
      setIsExecutingSearch(false)
    }
  }, [isFetching, isExecutingSearch])

  if (isFetching) {
    return (
      <div className="mt-40 flex flex-col items-center justify-center">
        <Loader height={50} width={50} />
      </div>
    )
  }

  return (
    <div className="flex flex-col flex-1 w-full gap-7 lg:flex-row xl:flex-col">
      <div className="rounded-2xl border border-neutral bg-neutral-bg dark:border-dark-neutral-border dark:bg-dark-neutral-bg flex-1 pt-4">
        <div className='flex justify-end px-4'>
          <Button
            type="button"
            variant="primary"
            size="sm"
            className="mb-3 rounded-md py-4 text-base text-white w-fit"
            label="Add note"
            onClick={() => setShowAddNoteModal(true)}
            disabled={isEnvLocked || isProjectLocked}
          ></Button>
        </div>
        <div className='border-b border-neutral dark:border-dark-neutral-border' />

        <div className={`px-4 overflow-y-auto max-h-[700px] ${!noteList?.data?.length ? 'h-[700px] flex justify-center items-center' : ''} `}>
          {!noteList?.data?.length ? (
            <div className='text-center'>
              <h1 className='font-semibold text-gray-1100 text-2xl leading-8 dark:text-gray-dark-1100 mb-2'>No Notes Yet!</h1>
              <p className="leading-4 text-gray-500 mb-9 text-sm dark:text-gray-dark-500">
                Once you add a note, it will magically appear right here. Go ahead, jot something down!
              </p>
            </div>
          ) : (
            <>
              {(noteList.data ?? [])?.map((note) => (
                <NoteItem
                  note={note}
                  handleNoteClick={handleNoteClick}
                />
              ))}
              {/* TODO: Implement pagination */}
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
