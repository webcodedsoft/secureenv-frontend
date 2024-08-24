import CloseBtn from '../../../assets/icons/icon-close-modal.svg'
import { InfoModal } from 'components/Modal'
import Button from 'components/Forms/Button'
import TextField from 'components/Forms/TextField'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useState } from 'react'

export default function AddProjectModal() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formik = useFormik({
    initialValues: {
      projectName: '',
      language: '',
    },
    validationSchema: Yup.object({
      password: Yup.string().required('Password is required').nullable(),
      emailAddress: Yup.string().email('Invalid email address').required('Email is required').nullable(),
    }),
    onSubmit: (values, { setFieldTouched }) => {
      setIsSubmitting(true)
      for (const key in values) {
        setFieldTouched(key, true)
      }
      try {
      } catch (error) {
        console.log('Error', error)
      }
    },
  })


  return (
    <InfoModal width={`w-full max-w-[594px]`} className="h-fit mt-24 md:mt-0 rounded-md pb-5 justify-center flex w-full flex-col">
      <div className="relative scrollbar-hide w-full max-w-[794px] md:p-20 p-10 rounded-lg">
        <button
          className="absolute right-2 top-2 cursor-pointer"
          type="button"
        >
          <img
            src={CloseBtn}
            alt="close modal button"
          />
        </button>
        <div className="flex items-center justify-center flex-col">
          <h6 className="text-header-6 font-semibold text-gray-500 text-center dark:text-gray-dark-500 mb-[50px]">
            Create a New Project
          </h6>
          <div className="w-full flex flex-col max-w-[531px] gap-[30px]">
            <div className="w-full">
              <p className="text-gray-1100 text-base leading-4 font-medium capitalize mb-[10px] dark:text-gray-dark-1100">
                Project Name
              </p>
              <div className="input-group border rounded-lg border-[#E8EDF2] dark:border-[#313442] sm:min-w-[252px]">
                <input
                  className="input bg-transparent text-sm leading-4 text-gray-400 h-fit min-h-fit py-4 focus:outline-none pl-[13px] dark:text-gray-dark-400 placeholder:text-inherit"
                  type="text"
                  placeholder="Type name here"
                />
              </div>
            </div>
            <div className="w-full">
              <p className="text-gray-1100 text-base leading-4 font-medium capitalize mb-[10px] dark:text-gray-dark-1100">
                Description
              </p>
              <div className="rounded-lg border border-neutral flex flex-col dark:border-dark-neutral-border p-[13px] h-[218px]">
                <textarea
                  className="textarea w-full p-0 text-gray-400 resize-none rounded-none bg-transparent flex-1 focus:outline-none dark:text-gray-dark-400 placeholder:text-inherit"
                  placeholder="Type description here"
                  defaultValue={''}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </InfoModal>
  )
}
