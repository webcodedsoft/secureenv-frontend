import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import TextField from 'components/Forms/TextField';
import Button from 'components/Forms/Button';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Alert } from 'components/Toast';
import { useSetupTeamMember } from 'common/queries-and-mutations/team';

export default function SignUpInvite() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  const { mutate, isSuccess, isError } = useSetupTeamMember()

  const params = new URLSearchParams(window.location.search);
  const emailAddress = params.get('email');
  const token = params.get('token');

  const formik = useFormik({
    initialValues: {
      name: '',
      emailAddress: emailAddress ?? '',
      token: token ?? '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Your name is required').nullable(),
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
      mutate({
        emailAddress: values.emailAddress.trim(),
        token: values.token,
        password: values.password,
        name: values.name
      })
    },
  })

  useEffect(() => {
    if (!emailAddress && !token) {
      setTimeout(() => navigate('/auth/login'), 2000)
      toast(<Alert type="error" message="Look like something went wrong, you may need to try again fella!!!" />)
    }
  }, [])

  useEffect(() => {
    if (isSuccess && !isError) {
      setIsSubmitting(false)
      toast(<Alert type="success" message="Your profile’s been set up and it’s looking sharp. Now go make some waves!" />)
      formik.resetForm()
      navigate('/auth/login')
    } else if (isError) {
      setIsSubmitting(false)
    }
  }, [isSuccess, isError])

  return (
    <div>
      <form className="rounded-2xl bg-white mx-auto p-10 text-center max-w-[440px] my-[84px] dark:bg-[#1F2128]" onSubmit={formik.handleSubmit}>
        <h3 className="font-bold text-2xl text-gray-1100 mb-[5px] dark:text-gray-dark-1100">
          Let setup your profile
        </h3>
        <p className="text-sm text-gray-500 mb-[30px] dark:text-gray-500">
          Tell us what you will like us to call you
        </p>
        <div>
          <div className="form-control mb-[20px]">
            <TextField
              name="name"
              placeholder="Tell your name"
              label="Your name"
              size="lg"
              isRequired
              type='text'
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name ? formik.errors.name : ''}
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
        </div>
        <div className='flex items-center justify-center'>
          <Button
            type="submit"
            variant="primary"
            size="md"
            className="mb-3 rounded-sm py-4 text-base text-white w-full"
            label="Submit"
            disabled={isSubmitting}
            loading={isSubmitting}
          ></Button>
        </div>
      </form>
    </div>
  )
}
