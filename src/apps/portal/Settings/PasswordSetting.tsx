import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Icon, Icons } from 'components/Icon';
import TextField from 'components/Forms/TextField';
import Button from 'components/Forms/Button';
import { UserInfoDto } from 'services/dtos/user.dto';
import { useChangePassword } from 'common/queries-and-mutations/user';
import { useAppDispatch } from 'store/hooks';
import { toast } from 'react-toastify';
import { Alert } from 'components/Toast';
import { logout } from 'thunks/account-thunk';
import { useNavigate } from 'react-router-dom';

type IProps = {
  user: UserInfoDto
}

export default function PasswordSetting({ user }: IProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { mutate, isSuccess, isError } = useChangePassword()
  const dispatch = useAppDispatch();
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      currentPassword: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      currentPassword: Yup.string()
        .required('Current password is required')
        .nullable(),
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
      mutate({ oldPassword: values.currentPassword, newPassword: values.confirmPassword })
    },
  })

  useEffect(() => {
    if (isSuccess && !isError) {
      setIsSubmitting(false)
      toast(<Alert type="success" message="Account Password Successfully Reset" />)
      formik.resetForm()
      dispatch(logout());
      navigate("/auth/login");

    } else if (isError) {
      setIsSubmitting(false)
    }
  }, [isSuccess, isError])

  return (
    <div className="border bg-neutral-bg border-neutral dark:bg-dark-neutral-bg dark:border-dark-neutral-border rounded-2xl ">
      <div className="bg-neutral rounded-t-lg py-4 pl-5 mb-7 dark:bg-dark-neutral-border">
        <p className="text-gray-1100 leading-4 font-semibold dark:text-gray-dark-1100 text-sm">
          Password
        </p>
        <div className='flex items-center gap-x-2 mt-1'>
          <Icon name={Icons.Info} fill='#e23738' />
          <span className='text-left text-red text-xs'>Changing your password will invalidate your logged in sessions.</span>
        </div>
      </div>
      <div className="flex flex-col gap-x-4 mb-8 m-5 space-y-5">
        <div>
          <div className="form-control mb-[20px]">
            <TextField
              name="currentPassword"
              placeholder="Current Password"
              label="Current Password"
              size="lg"
              type='password'
              isRequired
              value={formik.values.currentPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.currentPassword ? formik.errors.currentPassword : ''}
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
      </div>
      <div className="px-5">
        <div className="w-full bg-neutral h-[1px] dark:bg-dark-neutral-border" />
      </div>
      <div className="flex justify-end p-4 ">
        <Button
          type="submit"
          variant="primary"
          size="md"
          className="mb-3 rounded-md py-4 text-base text-white w-50"
          label="Change password"
          disabled={isSubmitting}
          loading={isSubmitting}
        ></Button>
      </div>
    </div>
  )
}
