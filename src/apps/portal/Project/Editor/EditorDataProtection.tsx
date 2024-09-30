import Button from 'components/Forms/Button'
import TextField from 'components/Forms/TextField'
import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useValidateDecryptionPassword } from 'common/queries-and-mutations/environment'
import { EnvironmentDto } from 'services/dtos/environment.dto'

type Props = {
  onSuccess: (data: EnvironmentDto | undefined) => void
  environmentId: number
  projectId: number
}

export default function EditorDataProtection({ onSuccess, environmentId, projectId }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { mutate, isSuccess, isError, data } = useValidateDecryptionPassword();

  const formik = useFormik({
    initialValues: {
      decryptionPassword: '',
    },
    validationSchema: Yup.object({
      decryptionPassword: Yup.string().required("Decryption password is required").nullable(),
    }),
    enableReinitialize: true,
    onSubmit: (values, { setFieldTouched }) => {
      setIsSubmitting(true)
      for (const key in values) {
        setFieldTouched(key, true)
      }
      mutate({
        password: values.decryptionPassword,
        environmentId,
        projectId
      })
    },
  })

  useEffect(() => {
    if (isSuccess && data && !isError) {
      setIsSubmitting(false)
      onSuccess(data)
      formik.resetForm()
    } else if (isError) {
      setIsSubmitting(false)
    }
  }, [isSuccess, isError])

  return (
    <form onSubmit={formik.handleSubmit} autoComplete='off'>
      <div className="absolute inset-0 md:top-56 md:left-[17rem] bg-black bg-opacity-80 flex items-center justify-center z-10">
        <div className="bg-neutral-bg dark:bg-dark-neutral-bg p-6 rounded-lg shadow-lg text-center">
          <h3 className="text-lg font-bold mb-4 text-gray-1100 dark:text-gray-dark-1100">Access Protected Data</h3>
          <p className="mb-4 text-gray-1100 dark:text-gray-dark-1100">
            Your decryption password is required to ensure that sensitive information remains secure.
          </p>
          <div className='flex items-center flex-col'>
            <TextField
              name="decryptionPassword"
              placeholder="Decryption password"
              label="Set Decryption Password"
              size="lg"
              type='password'
              isRequired
              value={formik.values.decryptionPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-32"
            />
            <Button
              type="submit"
              variant="primary"
              size="md"
              className="rounded-md py-4 mt-5 w-32 text-base text-white"
              label="Validate"
              disabled={isSubmitting}
              loading={isSubmitting}
            ></Button>
          </div>
        </div>
      </div>
    </form>
  )
}
