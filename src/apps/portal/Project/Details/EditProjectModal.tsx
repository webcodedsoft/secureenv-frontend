import { InfoModal } from 'components/Modal'
import Button from 'components/Forms/Button'
import TextField from 'components/Forms/TextField'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useEffect, useState } from 'react'
import { Alert } from 'components/Toast'
import { toast } from 'react-toastify'
import { useEditProject } from 'common/queries-and-mutations/project'

type IProps = {
  projectId: number
  onClose: () => void
  repositoryUrl?: string
}
export default function EditProjectModal({ projectId, onClose, repositoryUrl }: IProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { mutate, isSuccess, isError } = useEditProject();

  const formik = useFormik({
    initialValues: {
      repositoryUrl: repositoryUrl ?? ''
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      repositoryUrl: Yup.string().nullable(),
    }),
    onSubmit: (values, { setFieldTouched }) => {
      setIsSubmitting(true)
      for (const key in values) {
        setFieldTouched(key, true)
      }
      mutate({ projectId: projectId, updateProjectDto: values })
    },
  })

  useEffect(() => {
    if (isSuccess && !isError) {
      setIsSubmitting(false)
      toast(<Alert type="success" message="Success! Project repository successfully changed!" />)
      onClose()
    } else if (isError) {
      setIsSubmitting(false)
    }
  }, [isSuccess, isError])

  return (
    <InfoModal width={`w-full max-w-[694px]`} className="h-fit mt-24 md:mt-0 rounded-lg pb-5 justify-centers flex w-full flex-col">
      <div className="relative scrollbar-hide w-full max-w-3xl md:p-8 p-4 rounded-lg">
        <div className="flex items-centers justify-centers flex-col">
          <h6 className="text-header-6 font-semibold text-gray-500 dark:text-gray-dark-500">
            Edit project
          </h6>

          <form onSubmit={formik.handleSubmit} className='mt-7'>
            <div className="form-control mb-5">
              <TextField
                name="repositoryUrl"
                placeholder="Enter repository url"
                label="Repository Url"
                size="lg"
                disabled={isSubmitting}
                type='text'
                value={formik.values.repositoryUrl ?? ''}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.repositoryUrl ? formik.errors.repositoryUrl : ''}
              />
            </div>

            <div className='flex items-center justify-end mt-9'>
              <div className='flex justify-end items-center gap-x-3'>
                <Button
                  type="button"
                  variant="outline"
                  size="md"
                  className="rounded-md py-4 text-base dark:text-white w-fit"
                  label="Cancel"
                  onClick={onClose}
                ></Button>

                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  className="rounded-md py-4 text-base text-white w-fit"
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
