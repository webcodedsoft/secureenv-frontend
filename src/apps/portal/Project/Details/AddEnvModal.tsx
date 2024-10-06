import CloseBtn from '../../../../assets/icons/icon-close-modal.svg'
import { InfoModal } from 'components/Modal'
import Button from 'components/Forms/Button'
import TextField from 'components/Forms/TextField'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useEffect, useMemo, useState } from 'react'
import CustomSelect from 'components/Forms/CustomSelect'
import {
  useCreateEnv,
  useGetProjectEnvs
} from 'common/queries-and-mutations/environment'
import { toast } from 'react-toastify'
import { Alert } from 'components/Toast'

type IProps = {
  onClose: () => void
  projectId?: number
}

export default function AddEnvModal({ onClose, projectId }: IProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { data, isFetching } = useGetProjectEnvs(+projectId!)

  const { mutate, isSuccess, isError } = useCreateEnv()

  const normalizedEnvs = useMemo(() => {
    return (data ?? [])?.map((env) => {
      return {
        label: env.environmentName,
        value: Number(env.enviromentId)
      }
    })
  }, [data])

  const formik = useFormik({
    initialValues: {
      environmentName: '',
      copyEnv: false,
      envId: { label: '', value: '' }
    },
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
      handleSubmit()
    }
  })

  const handleSubmit = () => {
    const payload = {
      copyEnviromentId: Number(formik.values.envId.value),
      environmentName: formik.values.environmentName,
      projectId: Number(projectId)
    }
    mutate(payload)
  }

  const hasData = useMemo(() => {
    const dt = data?.find(
      (env) => Number(env.enviromentId) === Number(formik.values.envId.value)
    )
    return dt?.hasData
  }, [data, formik.values.envId.value])

  useEffect(() => {
    if (isSuccess && !isError) {
      setIsSubmitting(false)
      onClose()
      toast(
        <Alert
          type="success"
          message="Success! Environment successfully added!"
        />
      )
    } else if (isError) {
      setIsSubmitting(false)
    }
  }, [isSuccess, isError])

  return (
    <InfoModal
      width={`w-full max-w-[594px]`}
      className="mt-24 flex h-fit w-full flex-col justify-center rounded-md pb-5 md:mt-0"
    >
      <div className="relative w-full max-w-[794px] rounded-lg p-10 scrollbar-hide md:p-14">
        <button
          className="absolute right-2 top-2 cursor-pointer"
          type="button"
          onClick={onClose}
        >
          <img src={CloseBtn} alt="close modal button" />
        </button>
        <div className="flex flex-col items-center justify-center">
          <h6 className="mb-[50px] text-center text-header-6 font-semibold text-gray-500 dark:text-gray-dark-500">
            Create a New Environment
          </h6>
          <form
            className="flex w-full max-w-[531px] flex-col gap-[30px]"
            onSubmit={formik.handleSubmit}
          >
            <div className="w-full">
              <TextField
                name="environmentName"
                placeholder="Environment Name"
                label="Environment Name"
                size="lg"
                isRequired
                type="text"
                value={formik.values.environmentName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.environmentName
                    ? formik.errors.environmentName
                    : ''
                }
              />
            </div>

            <div className="flex items-center gap-x-3">
              <input
                className="checkbox checkbox-primary size-4 rounded border-2"
                value={formik.values.copyEnv ? 'yes' : 'no'}
                defaultChecked={formik.values.copyEnv}
                type="checkbox"
                onChange={() =>
                  formik.setFieldValue('copyEnv', !formik.values.copyEnv)
                }
              ></input>
              <span className="text-xs font-normal text-gray-500 dark:text-gray-dark-500">
                Copy from existing environment
              </span>
            </div>
            {formik.values.copyEnv && (
              <div>
                <div>
                  <CustomSelect
                    options={normalizedEnvs}
                    selectedOption={formik.values.envId}
                    handleOptionChange={(option) => {
                      formik.setFieldValue(`envId`, option)
                    }}
                    isLoading={isFetching}
                    placeholder="Select environment"
                    label="Select environment you want to copy"
                    disabled={isSubmitting}
                    isSearchable
                    className="h-11 rounded text-left"
                    error={
                      formik.touched.envId?.label
                        ? formik.errors.envId?.label
                        : ''
                    }
                  />
                </div>
                <div className="my-1 text-sm font-normal italic leading-6 text-red">
                  {!hasData && formik.values.envId.value && (
                    <span>
                      The selected environment don&apos;t have anything to copy
                    </span>
                  )}
                </div>
              </div>
            )}

            <div className="flex items-center justify-end">
              <Button
                type="submit"
                variant="primary"
                size="md"
                className="mb-3 rounded-md py-4 text-base text-white"
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
