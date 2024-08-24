import React from 'react'

import Button from './Forms/Button'

interface IErrorFallbackProps {
  resetErrorBoundary: () => void
}
export const ErrorFallback: React.FC<IErrorFallbackProps> = ({ resetErrorBoundary }) => (
  <div className="fixed left-0 top-0 z-50 min-h-screen w-full bg-grey-600">
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="m-auto flex w-[320px] max-w-[90%] flex-col items-center rounded-lg bg-white p-5 shadow-xl">
        <h1 className="text-lg font-semibold text-[#FF6606]">Something went wrong...</h1>
        <p className="my-3 text-sm text-[#353535]">Sorry, an error occurred, reload the page</p>
        <Button
          variant="primary"
          size="md"
          className="mt-3 items-center justify-center rounded"
          onClick={resetErrorBoundary}
          label="Reload"
        ></Button>
      </div>
    </div>
  </div>
)
