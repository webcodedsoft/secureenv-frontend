import clsx from 'clsx'
import React from 'react'
import ResultsPerPageDropdown from './ResultsPerPageDropdown'
import { Icon, Icons } from 'components/Icon'

interface PaginatorProps {
  numberOfPages: number
  page: number
  hasNext: boolean
  hasPrevious: boolean
  numberOfItemsPerPage: number
  setNumberOfItemsPerPage: (arg: number) => void
  goToNextPage: any
  goToPreviousPage: any
  showPageNumber?: boolean
}

const Paginator: React.FC<PaginatorProps> = ({
  numberOfPages,
  page,
  hasNext,
  hasPrevious,
  numberOfItemsPerPage,
  setNumberOfItemsPerPage,
  goToNextPage,
  goToPreviousPage,
  showPageNumber = true
}) => {
  return (
    <div className="flex w-full items-center justify-between">
      <div>
        {showPageNumber && (
          <div className="absolute z-50 flex items-center gap-x-4">
            <p className="text-[10px] font-medium text-gray-1100 dark:text-gray-dark-1100">
              Result(s) per page
            </p>
            <div className="relative w-[45px] ">
              <ResultsPerPageDropdown
                selectedOption={{
                  label: numberOfItemsPerPage,
                  value: numberOfItemsPerPage
                }}
                setSelectedOption={(option) => {
                  setNumberOfItemsPerPage(option.value)
                }}
              />
              {/* <Filter
                label={'Result per page'}
                options={[
                  { value: '10', label: '10' },
                  { value: '20', label: '20' },
                  { value: '50', label: '50' },
                ]}
                onSelect={(val) => setNumberOfItemsPerPage(Number(val))} /> */}
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center">
        <button
          type="button"
          className={clsx({
            'border-none outline-none flex items-center text-[10px] font-medium':
              true,
            'text-gray-400 dark:text-gray-dark-400': !hasPrevious,
            'text-[#C9CED1]': hasPrevious
          })}
          onClick={() => {
            goToPreviousPage()
          }}
          disabled={!hasPrevious}
        >
          <div className="mr-2">
            <Icon
              name={Icons.ArrowLeft}
              stroke={hasPrevious ? '#C9CED1' : '#273143'}
              width={24}
              height={24}
            />
          </div>
          Prev
        </button>
        <>
          <div className="w-[10px]" />

          <span className="flex size-6 items-center justify-center rounded bg-[#EDF3FF] text-[10px] font-medium">
            {page}
          </span>
          <div className="w-[4px]" />

          <p className="text-[10px] font-medium">of {numberOfPages}</p>
          <div className="w-[10px]" />
        </>
        <button
          type="button"
          className={clsx({
            'border-none outline-none flex items-center text-[10px] font-medium':
              true,
            'text-gray-400 dark:text-gray-dark-400': !hasNext,
            'text-[#C9CED1]': hasNext
          })}
          onClick={() => {
            goToNextPage()
          }}
          disabled={!hasNext}
        >
          Next
          <div className="ml-2">
            <Icon
              name={Icons.ArrowRight}
              stroke={hasNext ? '#C9CED1' : '#273143'}
              width={24}
              height={24}
            />
          </div>
        </button>
      </div>
    </div>
  )
}

export default Paginator
