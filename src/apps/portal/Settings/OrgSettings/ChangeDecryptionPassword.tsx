import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import withCreatePortal from 'components/HOC/withCreatePortal'
import RecoveryKeyModal from 'components/Modal/RecoveryKeyModal'
import Button from 'components/Forms/Button'
import TextField from 'components/Forms/TextField'
import { generateStrongPassword } from 'utils'
import { toast } from 'react-toastify'
import { Alert } from 'components/Toast'
import { useChangeDecryptionPassword } from 'common/queries-and-mutations/settings'

type Props = {}

const EhanchedRecoveryKeyModal = withCreatePortal(RecoveryKeyModal)
export default function ChangeDecryptionPassword({}: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showRecoveryModal, setShowRecoveryModal] = useState(false)
  const [showForm, setShowForm] = useState(false)

  const { mutate, isSuccess, isError, data } = useChangeDecryptionPassword()

  const formik = useFormik({
    initialValues: {
      decryptionPassword: '',
      recoveryKey: ''
    },
    validationSchema: Yup.object({
      decryptionPassword: Yup.string()
        .matches(
          // eslint-disable-next-line no-useless-escape
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*()_+{}\[\]:;<>,.?~|]).{8,40}$/,
          'Decryption password must have at least one uppercase, one lowercase, one number, one character and be at least 8 characters long'
        )
        .nullable(),
      recoveryKey: Yup.string().required('Platform is required').nullable()
    }),
    enableReinitialize: true,
    onSubmit: (values, { setFieldTouched }) => {
      setIsSubmitting(true)
      for (const key in values) {
        setFieldTouched(key, true)
      }
      mutate({
        password: values.decryptionPassword,
        recoveryKey: values.recoveryKey
      })
    }
  })

  useEffect(() => {
    if (isSuccess && !isError) {
      setIsSubmitting(false)
      setShowForm(false)
      setShowRecoveryModal(true)
      toast(
        <Alert
          type="success"
          message="Tada! Decryption Password Successfully Set. You’re ready to roll!"
        />
      )
      formik.resetForm()
    } else if (isError) {
      setIsSubmitting(false)
    }
  }, [isSuccess, isError])

  const handleSuggestPassword = () => {
    const newPassword = generateStrongPassword(30)
    formik.setFieldValue('decryptionPassword', newPassword)
  }

  return (
    <div>
      <div className="rounded-t-lg bg-neutral py-4 pl-5 dark:bg-dark-neutral-border">
        <p className="text-sm font-semibold leading-4 text-gray-1100 dark:text-gray-dark-1100">
          Reset Decryption Password{' '}
          <span className="text-[10px] text-yellow">
            Strong Passwords Only—We Don’t Mess with Weak Ones!
          </span>
        </p>
      </div>
      {showForm ? (
        <form onSubmit={formik.handleSubmit}>
          <div className="flex flex-col space-y-3 p-5">
            <TextField
              name="recoveryKey"
              placeholder="Recovery Key"
              label="Recovery Key"
              size="lg"
              type="text"
              isRequired
              value={formik.values.recoveryKey}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.recoveryKey ? formik.errors.recoveryKey : ''
              }
              className="w-32"
            />
            <TextField
              name="decryptionPassword"
              placeholder="Decryption password"
              label="Set Decryption Password"
              size="lg"
              type="text"
              isRequired
              value={formik.values.decryptionPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.decryptionPassword
                  ? formik.errors.decryptionPassword
                  : ''
              }
              className="w-32"
            />
            <div className="flex items-center justify-between">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                className="my-3 rounded-md py-4 text-base hover:bg-transparent"
                label="Suggest a Strong Password"
                onClick={handleSuggestPassword}
                disabled={isSubmitting}
                loading={isSubmitting}
              ></Button>
              <Button
                type="submit"
                variant="primary"
                size="sm"
                className="w-32 rounded-md py-4 text-base text-white"
                label="Set password"
                disabled={isSubmitting}
                loading={isSubmitting}
              ></Button>
            </div>
          </div>
        </form>
      ) : (
        <div className="mx-32 my-10 flex flex-col justify-center">
          <Button
            type="button"
            variant="secondary"
            size="md"
            className="my-3 rounded-md py-4 text-base hover:bg-transparent"
            label="Reset Decryption Password"
            onClick={() => setShowForm(true)}
            disabled={isSubmitting}
            loading={isSubmitting}
          ></Button>
        </div>
      )}

      {showRecoveryModal && (
        <EhanchedRecoveryKeyModal
          title="Your Recovery Key 🔐: Don’t Lose It!"
          content="This is your recovery key to restore your decryption password. Make sure to copy it and store it in a safe place—preferably somewhere your cat or a coffee spill can’t reach! If you lose this key, we won’t be able to help you recover your password, so guard it like treasure."
          className="sm:w-1/5 md:w-2/5"
          onCancel={() => setShowRecoveryModal(false)}
          value={data}
        />
      )}
    </div>
  )
}
