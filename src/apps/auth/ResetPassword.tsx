import { useResetPassword } from 'common/queries-and-mutations/authentication';
import Button from 'components/Forms/Button';
import TextField from 'components/Forms/TextField';
import { Alert } from 'components/Toast';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup'

export default function ResetPassword() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { mutate, isSuccess, isError } = useResetPassword()
  const location = useLocation();
  const navigate = useNavigate()

  // Extract the query parameters
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');
  const emailAddress = queryParams.get('email');

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .required('Password is required')
        .matches(
          // eslint-disable-next-line no-useless-escape
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*()_+{}\[\]:;<>,.?~|]).{8,40}$/,
          'Password must have at least one uppercase, one lowercase, one number, one character and be at least 8 characters long',
        )
        .nullable(),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Confirm password is required')
        .nullable(),
    }),
    onSubmit: (values, { setFieldTouched }) => {
      setIsSubmitting(true)
      for (const key in values) {
        setFieldTouched(key, true)
      }
      mutate({ emailAddress: emailAddress!, password: values.password, token: token! })
    },
  })

  useEffect(() => {
    if (!emailAddress && !token) {
      setIsSubmitting(false)
      toast(<Alert type="warning" message="Look like something went wrong, you may need to try again fella!!!" />)
    }
  }, [])


  useEffect(() => {
    if (isSuccess && !isError) {
      setIsSubmitting(false)
      toast(<Alert type="success" message="Boom! Password reset successful. You’re ready to roll!" />)
      formik.resetForm()
    } else if (isError) {
      setIsSubmitting(false)
      navigate('/')
    }
  }, [isSuccess, isError])

  return (
    <div>
      <form className="rounded-2xl bg-white mx-auto p-10 text-center max-w-[440px] my-[84px] dark:bg-[#1F2128]" onSubmit={formik.handleSubmit}>
        <h3 className="font-bold text-2xl text-gray-1100 capitalize mb-[5px] dark:text-gray-dark-1100">Reset Password</h3>
        <p className="text-sm text-gray-500 mb-[30px] dark:text-gray-dark-500">Hey folk!! Enter your new password.</p>
        <div>
          <div className="form-control mb-[20px]">
            <TextField
              name="password"
              placeholder="Password"
              label="Password"
              size="lg"
              type='password'
              isRequired
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password ? formik.errors.password : ''}
            />
          </div>
          <div className="form-control mb-[20px]">
            <TextField
              name="confirmPassword"
              placeholder="Confirm Password"
              label="Confirm Password"
              size="lg"
              type='password'
              isRequired
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.confirmPassword ? formik.errors.confirmPassword : ''}
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
