import { InfoModal } from 'components/Modal'
import Button from 'components/Forms/Button'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useEffect, useState } from 'react'
import { Alert } from 'components/Toast'
import { toast } from 'react-toastify'
import TextAreaFieldWithAutoHeightResize from 'components/Forms/TextAreaFieldWithAutoHeightResize'
import { useCreateNote } from 'common/queries-and-mutations/environment'

type IProps = {
  projectId: number
  envId: number
  onClose: () => void
  onSuccess: () => void
  selectedText: { text: any; range: any } | null
}
export default function AddNoteModal({
  projectId,
  onClose,
  onSuccess,
  envId,
  selectedText
}: IProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { mutate, isSuccess, isError } = useCreateNote()

  const formik = useFormik({
    initialValues: {
      note: '',
      selectedText: selectedText
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      note: Yup.string().required('Note is required').nullable()
    }),
    onSubmit: (values, { setFieldTouched }) => {
      setIsSubmitting(true)
      for (const key in values) {
        setFieldTouched(key, true)
      }
      const note = {
        text: values.selectedText?.text,
        range: values.selectedText?.range,
        note: values.note,
        projectId,
        environmentId: envId
      }
      mutate(note)
    }
  })

  useEffect(() => {
    if (isSuccess && !isError) {
      setIsSubmitting(false)
      toast(
        <Alert type="success" message="Success! Note successfully added!" />
      )
      onClose()
      onSuccess()
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
            Add note
          </h6>
          <form onSubmit={formik.handleSubmit} className="mt-7">
            <div className="flex w-full flex-col rounded-lg border border-neutral p-3 dark:border-dark-neutral-border">
              <TextAreaFieldWithAutoHeightResize
                label=""
                name="note"
                value={formik.values.note}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter note"
                rows={6}
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
                  label="Add Note"
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
