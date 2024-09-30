import Button from 'components/Forms/Button'
import TextField from 'components/Forms/TextField'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { selectAccountDetails, selectIsAuthenticated } from 'selectors/account-selector'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { login, logout } from 'thunks/account-thunk'
import { toast } from 'react-toastify'
import { Alert } from 'components/Toast'
import { resetAccountState } from 'reducers/account.reducer'

export default function Login() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const { user, error: loginError } = useAppSelector(selectAccountDetails)

  const formik = useFormik({
    initialValues: {
      emailAddress: '',
      password: '',
    },
    validationSchema: Yup.object({
      password: Yup.string().required('Password is required').nullable(),
      emailAddress: Yup.string().email('Invalid email address').required('Email is required').nullable(),
    }),
    onSubmit: (values, { setFieldTouched }) => {
      setIsSubmitting(true)
      for (const key in values) {
        setFieldTouched(key, true)
      }
      dispatch(login({ emailAddress: values.emailAddress.trim(), password: values.password.trim() }))
    },
  })

  useEffect(() => {
    if (formik.values.emailAddress && loginError) {
      formik.setSubmitting(false)
      setIsSubmitting(false)
      toast(<Alert type="error" message={loginError} />)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, loginError, navigate])

  useEffect(() => {
    if (isAuthenticated) {
      if (user) {
        if (user?.workspace) {
          navigate(`/workspace/${user.workspace.workspaceId}/project`)
        } else {
          navigate(`/auth/workspace-setup`)
        }
        setIsSubmitting(false)
      }
    }
  }, [user, isAuthenticated, dispatch, navigate])

  return (
    <div>
      <form className="rounded-2xl bg-white mx-auto p-10 text-center max-w-[440px] my-[84px] dark:bg-[#1F2128]" onSubmit={formik.handleSubmit}>
        <h3 className="font-bold text-2xl text-gray-1100 capitalize mb-[5px] dark:text-gray-dark-1100">
          welcome back!
        </h3>
        <p className="text-sm text-gray-500 mb-[30px] dark:text-gray-500">
          Let’s build something great
        </p>
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
        </div>
        <div className='flex items-center justify-center'>
          <Button
            type="submit"
            variant="primary"
            size="md"
            className="mb-3 rounded-sm py-4 text-base text-white w-full"
            label="Login"
            disabled={isSubmitting}
            loading={isSubmitting}
          ></Button>
        </div>
        <Link
          className="text-right text-xs block text-[#8083A3] mb-[20px]"
          to="/auth/forgot-password"
        >
          Forgot password?
        </Link>

        <p className="text-sm text-gray-1100 dark:text-gray-dark-1100">
          Don’t have an account?
          <Link className="text-color-brands font-semibold" to="/auth/sign-up">
            &nbsp;Sign up
          </Link>
        </p>
      </form>
    </div>
  )
}
