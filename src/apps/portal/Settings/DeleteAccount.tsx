import Button from 'components/Forms/Button'
import React from 'react'

export default function DeleteAccount() {
  return (
    <div className="border bg-neutral-bg border-red dark:bg-dark-neutral-bg rounded-2xl ">
      <div className="rounded-t-lg py-4 pl-5 bg-red">
        <p className="text-white leading-4 font-semibold text-sm">
          Danger Zone
        </p>
      </div>
      <div className="flex flex-col px-5">
        <div className="flex flex-col py-5">
          <p className="text-desc text-gray-400 dark:text-gray-dark-400">
            Deleting the organization <span className='text-red font-semibold'>webtech</span> workplace will immediately delete the workplace data and remove its members. Please use caution as you cannot undo this action.
          </p>
          <div className="rounded grid place-items-center mt-10">
            <Button
              type="submit"
              variant="outline"
              size="md"
              className="mb-3 rounded-md py-4 text-base text-red border-red"
              label="Delete org"
            ></Button>
          </div>
        </div>
      </div>
    </div>
  )
}
