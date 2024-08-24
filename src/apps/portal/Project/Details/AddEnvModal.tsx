import CloseBtn from '../../../../assets/icons/icon-close-modal.svg'
import { InfoModal } from 'components/Modal'
import Button from 'components/Forms/Button'
import TextField from 'components/Forms/TextField'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useState } from 'react'

type IProps = {
  onClose: () => void
}

export default function AddEnvModal({ onClose }: IProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formik = useFormik({
    initialValues: {
      environmentName: '',
    },
    validationSchema: Yup.object({
      environmentName: Yup.string().required('Environment name is required').nullable(),
    }),
    onSubmit: (values, { setFieldTouched }) => {
      setIsSubmitting(true)
      for (const key in values) {
        setFieldTouched(key, true)
      }
    },
  })


  return (
    <InfoModal width={`w-full max-w-[594px]`} className="h-fit mt-24 md:mt-0 rounded-md pb-5 justify-center flex w-full flex-col">
      <div className="relative scrollbar-hide w-full max-w-[794px] md:p-20 p-10 rounded-lg">
        <button
          className="absolute right-2 top-2 cursor-pointer"
          type="button"
          onClick={onClose}
        >
          <img
            src={CloseBtn}
            alt="close modal button"
          />
        </button>
        <div className="flex items-center justify-center flex-col">
          <h6 className="text-header-6 font-semibold text-gray-500 text-center dark:text-gray-dark-500 mb-[50px]">
            Create a New Environment
          </h6>
          <form className="w-full flex flex-col max-w-[531px] gap-[30px]" onSubmit={formik.handleSubmit}>
            <div className="w-full">
              <TextField
                name="environmentName"
                placeholder="Environment Name"
                label="Environment Name"
                size="lg"
                isRequired
                type='text'
                value={formik.values.environmentName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.environmentName ? formik.errors.environmentName : ''}
              />
            </div>
            <div className='flex items-center justify-center'>
              <Button
                type="submit"
                variant="primary"
                size="md"
                className="mb-3 rounded-sm py-4 text-base text-white w-full"
                label="Create Environment"
                disabled={isSubmitting}
                loading={isSubmitting}
              ></Button>
            </div>
          </form>

        </div>
      </div>
    </InfoModal>
  )
}
