import TextField from 'components/Forms/TextField'
import { useEffect, useState } from 'react'
import { generateStrongPassword } from 'utils'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Button from 'components/Forms/Button'
import { useCreateDecryptionPassword } from 'common/queries-and-mutations/settings'
import { toast } from 'react-toastify'
import { Alert } from 'components/Toast'
import withCreatePortal from 'components/HOC/withCreatePortal'
import RecoveryKeyModal from 'components/Modal/RecoveryKeyModal'
import { UserInfoDto } from 'services/dtos/user.dto'
import ChangeDecryptionPassword from './ChangeDecryptionPassword'

type Props = {
  user: UserInfoDto
}
const EhanchedRecoveryKeyModal = withCreatePortal(RecoveryKeyModal)
export default function DecryptionSetting({ user }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showRecoveryModal, setShowRecoveryModal] = useState(false)
  const { mutate, isSuccess, isError, data } = useCreateDecryptionPassword()

  const formik = useFormik({
    initialValues: {
      decryptionPassword: '',
    },
    validationSchema: Yup.object({
      decryptionPassword: Yup.string().matches(
        // eslint-disable-next-line no-useless-escape
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*()_+{}\[\]:;<>,.?~|]).{8,40}$/,
        'Decryption password must have at least one uppercase, one lowercase, one number, one character and be at least 8 characters long',
      )
        .nullable(),
    }),
    enableReinitialize: true,
    onSubmit: (values, { setFieldTouched }) => {
      setIsSubmitting(true)
      for (const key in values) {
        setFieldTouched(key, true)
      }
      mutate({
        password: values.decryptionPassword,
      })
    },
  })

  useEffect(() => {
    if (isSuccess && !isError) {
      setIsSubmitting(false)
      setShowRecoveryModal(true)
      toast(<Alert type="success" message="Tada! Decryption Password Successfully Set. You’re ready to roll!" />)
      formik.resetForm()
    } else if (isError) {
      setIsSubmitting(false)
    }
  }, [isSuccess, isError])

  const handleSuggestPassword = () => {
    const newPassword = generateStrongPassword(30);
    formik.setFieldValue('decryptionPassword', newPassword);
  };

  return (
    <div>
      <div className="border bg-neutral-bg border-neutral dark:bg-dark-neutral-bg dark:border-dark-neutral-border rounded-2xl">
        {!user.isDecryptionPassword ? (
          <>
            <div className="bg-neutral rounded-t-lg py-4 pl-5 dark:bg-dark-neutral-border">
              <p className="text-gray-1100 leading-4 font-semibold dark:text-gray-dark-1100 text-sm">
                Decryption Password <span className='text-[10px] text-yellow'>Strong Passwords Only—We Don’t Mess with Weak Ones!</span>
              </p>
            </div>
            <form onSubmit={formik.handleSubmit}>
              <div className="flex flex-col p-5">
                <TextField
                  name="decryptionPassword"
                  placeholder="Decryption password"
                  label="Set Decryption Password"
                  size="lg"
                  type='text'
                  isRequired
                  value={formik.values.decryptionPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.decryptionPassword ? formik.errors.decryptionPassword : ''}
                  className="w-32"
                />
                <div className="flex items-center justify-between">
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    className="rounded-md py-4 my-3 text-base hover:bg-transparent"
                    label="Suggest a Strong Password"
                    onClick={handleSuggestPassword}
                    disabled={isSubmitting}
                    loading={isSubmitting}
                  ></Button>
                  <Button
                    type="submit"
                    variant="primary"
                    size="sm"
                    className="rounded-md py-4 w-32 text-base text-white"
                    label="Set password"
                    disabled={isSubmitting}
                    loading={isSubmitting}
                  ></Button>
                </div>
              </div>
            </form>
          </>
        ) : (
          <ChangeDecryptionPassword />
        )}
      </div>

      {showRecoveryModal && (
        <EhanchedRecoveryKeyModal
          title="Your Recovery Key 🔐: Don’t Lose It!"
          content="This is your recovery key to restore your decryption password. Make sure to copy it and store it in a safe place—preferably somewhere your cat or a coffee spill can’t reach! If you lose this key, we won’t be able to help you recover your password, so guard it like treasure."
          className="md:w-[40%] sm:w-[20%]"
          onCancel={() => setShowRecoveryModal(false)}
          value={data}
        />
      )}
    </div>
  )
}
