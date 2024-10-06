import { InfoModal } from 'components/Modal'
import Button from 'components/Forms/Button'
import TextField from 'components/Forms/TextField'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useEffect, useState } from 'react'
import { Alert } from 'components/Toast'
import { toast } from 'react-toastify'
import { useEditEnvironment } from 'common/queries-and-mutations/environment'

type IProps = {
  projectId: number
  environmentId: number
  onClose: () => void
  environmentName?: string
}

export default function EditEnvironmentModal({
  projectId,
  environmentId,
  onClose,
  environmentName
}: IProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { mutate, isSuccess, isError } = useEditEnvironment()

  const formik = useFormik({
    initialValues: {
      environmentName: environmentName ?? ''
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      environmentName: Yup.string()
        .required('Environment name is required')
        .nullable()
    }),
    onSubmit: (values, { setFieldTouched }) => {
      setIsSubmitting(true)
      for (const key in values) {
        setFieldTouched(key, true)
      }
      const payload = {
        environmentName: values.environmentName,
        projectId: Number(projectId),
        environmentId: Number(environmentId)
      }
      mutate(payload)
    }
  })

  useEffect(() => {
    if (isSuccess && !isError) {
      setIsSubmitting(false)
      toast(
        <Alert
          type="success"
          message="Success! Environment successfully updated!"
        />
      )
      onClose()
    } else if (isError) {
      setIsSubmitting(false)
    }
  }, [isSuccess, isError])

  return (
    <InfoModal
      width={`w-full max-w-[694px]`}
      className="justify-centers mt-24 flex h-fit w-full flex-col rounded-lg pb-5 md:mt-0"
    >
      <div className="relative w-full max-w-3xl rounded-lg p-4 scrollbar-hide md:p-8">
        <div className="items-centers justify-centers flex flex-col">
          <h6 className="text-header-6 font-semibold text-gray-500 dark:text-gray-dark-500">
            Edit Environment
          </h6>

          <form onSubmit={formik.handleSubmit} className="mt-7">
            <div className="form-control mb-5">
              <TextField
                name="environmentName"
                placeholder="Enter environment name"
                label="Environment Name"
                size="lg"
                disabled={isSubmitting}
                type="text"
                value={formik.values.environmentName ?? ''}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.environmentName
                    ? formik.errors.environmentName
                    : ''
                }
              />
            </div>

            <div className="mt-9 flex items-center justify-end">
              <div className="flex items-center justify-end gap-x-3">
                <Button
                  type="button"
                  variant="outline"
                  size="md"
                  className="w-fit rounded-md py-4 text-base dark:text-white"
                  label="Cancel"
                  onClick={onClose}
                ></Button>

                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  className="w-fit rounded-md py-4 text-base text-white"
                  label="Save changes"
                  disabled={isSubmitting}
                  loading={isSubmitting}
                ></Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </InfoModal>
  )
}
