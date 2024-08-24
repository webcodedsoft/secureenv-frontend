import Button from 'components/Forms/Button'
import TextField from 'components/Forms/TextField'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import { Alert } from 'components/Toast'
import { useForgotPassword } from 'common/queries-and-mutations/authentication'

export default function ForgotPassword() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { mutate, isSuccess, isError } = useForgotPassword()

  const formik = useFormik({
    initialValues: {
      emailAddress: '',
    },
    validationSchema: Yup.object({
      emailAddress: Yup.string().email('Invalid email address').required('Email is required').nullable(),
    }),
    onSubmit: (values, { setFieldTouched }) => {
      setIsSubmitting(true)
      for (const key in values) {
        setFieldTouched(key, true)
      }
      mutate({ emailAddress: values.emailAddress.trim() })
    },
  })

  useEffect(() => {
    if (isSuccess && !isError) {
      setIsSubmitting(false)
      toast(<Alert type="success" message="Your password reset instructions are in your email, assuming they didn’t take a wrong turn!" />)
      formik.resetForm()
    } else if (isError) {
      setIsSubmitting(false)
    }
  }, [isSuccess, isError])

  return (
    <div>
      <form className="rounded-2xl bg-white mx-auto p-10 text-center max-w-[440px] my-[84px] dark:bg-[#1F2128]" onSubmit={formik.handleSubmit}>
        <h3 className="font-bold text-2xl text-gray-1100 capitalize mb-[5px] dark:text-gray-dark-1100">Forgot Password</h3>
        <p className="text-sm text-gray-500 mb-[30px] dark:text-gray-dark-500">Enter your email address and we'll send you an email with instructions to reset your password.</p>
        <div>
          <div className="form-control mb-[20px]">
            <TextField
              name="emailAddress"
              placeholder="Email Address"
              label="Email Address"
              size="lg"
              isRequired
              type='email'
              value={formik.values.emailAddress}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.emailAddress ? formik.errors.emailAddress : ''}
            />
          </div>
        </div>
        <div className='flex items-center justify-center'>
          <Button
            type="submit"
            variant="primary"
            size="md"
            className="mb-3 rounded-sm py-4 text-base text-white w-full"
            label="Reset Password"
            disabled={isSubmitting}
            loading={isSubmitting}
          ></Button>
        </div>
        <Link
          className="text-right text-xs block text-[#8083A3] mb-[20px]"
          to="/"
        >
          Back to Login
        </Link>
      </form>
    </div>
  )
}
