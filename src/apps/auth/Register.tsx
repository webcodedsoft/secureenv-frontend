import Button from 'components/Forms/Button'
import TextField from 'components/Forms/TextField'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { selectAccountDetails, selectIsAuthenticated } from 'selectors/account-selector'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { fetchUserInformation, login, logout } from 'thunks/account-thunk'
import { toast } from 'react-toastify'
import { Alert } from 'components/Toast'
import CustomSelect from 'components/Forms/CustomSelect'
import { services } from 'services'
import { useSignUp } from 'common/queries-and-mutations/authentication'

export default function Register() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const { mutate, isSuccess, isError } = useSignUp()

  const formik = useFormik({
    initialValues: {
      emailAddress: '',
      password: '',
      confirmPassword: '',
      name: '',
      accountType: { label: '', value: '' }
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
      emailAddress: Yup.string()
        .email("Invalid email")
        .required("Email is required")
        .test("is-allowed", "Email already in use", async function (value) {
          if (value) {
            const isInUse = await services.authService.checkIfEmailInUse(
              value
            );
            console.log('🚀 ~ isInUse:', isInUse)
            return !isInUse;
          }
          return true;
        }),
      name: Yup.string().required('Name is required').nullable(),
      accountType: Yup.object().required('Register as is required').nullable(),
    }),
    onSubmit: (values, { setFieldTouched }) => {
      setIsSubmitting(true)
      for (const key in values) {
        setFieldTouched(key, true)
      }
      mutate({
        emailAddress: values.emailAddress,
        password: values.password,
        name: values.name,
        accountType: values.accountType.value
      })
    },
  })

  useEffect(() => {
    if (isSuccess && !isError) {
      setIsSubmitting(false)
      toast(<Alert type="success" message="We sent a setup link to your email. It’s probably telling jokes to the other emails, so go join the fun!" />)
      formik.resetForm()
    } else if (isError) {
      setIsSubmitting(false)
    }
  }, [isSuccess, isError])

  return (
    <div>
      <form className="rounded-2xl bg-white mx-auto p-10 text-center max-w-[440px] my-[84px] dark:bg-[#1F2128]" onSubmit={formik.handleSubmit}>
        <h3 className="font-bold text-2xl text-gray-1100 capitalize mb-[5px] dark:text-gray-dark-1100">Create an account</h3>
        <p className="text-sm text-gray-500 mb-[30px] dark:text-gray-dark-500">You are welcome!</p>
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
          <div className="form-control mb-[20px]">
            <TextField
              name="name"
              placeholder="Name"
              label="Name"
              size="lg"
              type='text'
              isRequired
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name ? formik.errors.name : ''}
            />
          </div>
          <div className="form-control mb-[20px]">
            <CustomSelect
              options={[
                { label: 'Individual', value: 'INDIVIDUAL' },
                { label: 'Company', value: 'COMPANY' },
              ]}
              selectedOption={formik.values.accountType}
              handleOptionChange={(option) => {
                formik.setFieldValue(`accountType`, option)
              }}
              placeholder="Register as: "
              label="Register as: "
              disabled={isSubmitting}
              isSearchable
              className="mb-4 h-11 rounded text-left"
              error={formik.touched.accountType?.label ? formik.errors.accountType?.label : ''}
            />
          </div>
        </div>
        <div className='flex items-center justify-center'>
          <Button
            type="submit"
            variant="primary"
            size="md"
            className="mb-3 rounded-sm py-4 text-base text-white w-full"
            label="Sign Up"
            disabled={isSubmitting}
            loading={isSubmitting}
          ></Button>
        </div>


        <p className="text-sm text-gray-1100 dark:text-gray-dark-1100">
          Already have an account?
          <Link className="text-color-brands" to="/">
            &nbsp;Sign In
          </Link>
        </p>
      </form>
    </div>
  )
}
