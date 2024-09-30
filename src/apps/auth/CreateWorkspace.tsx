import Button from 'components/Forms/Button'
import TextField from 'components/Forms/TextField'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { selectAccountDetails } from 'selectors/account-selector'
import { useAppSelector } from 'store/hooks'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import { Alert } from 'components/Toast'
import { useCreateWorkspace } from 'common/queries-and-mutations/workspace'

export default function CreateWorkspace() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  const { user } = useAppSelector(selectAccountDetails)
  const { mutate, isSuccess, isError } = useCreateWorkspace()

  const formik = useFormik({
    initialValues: {
      emailAddress: '',
      workspaceName: '',
    },
    validationSchema: Yup.object({
      workspaceName: Yup.string().required('Workspace is required').nullable(),
      emailAddress: Yup.string().email('Invalid email address').required('Email is required').nullable(),
    }),
    onSubmit: (values, { setFieldTouched }) => {
      setIsSubmitting(true)
      for (const key in values) {
        setFieldTouched(key, true)
      }
      mutate({ emailAddress: values.emailAddress.trim(), workspaceName: values.workspaceName.trim() })
    },
  })

  useEffect(() => {
    if (user?.workspace) {
      navigate(`/workspace/${user.workspace.workspaceId}`)
    }
  }, [])

  useEffect(() => {
    if (isSuccess && !isError) {
      setIsSubmitting(false)
      navigate(`/workspace/${user.workspace.workspaceId}`)
      toast(<Alert type="success" message="Ta-da! Your workspace has officially come to life—no assembly required!" />)
      formik.resetForm()
    } else if (isError) {
      setIsSubmitting(false)
    }
  }, [isSuccess, isError])

  return (
    <div>
      <form className="rounded-2xl bg-white mx-auto p-10 text-center max-w-[440px] my-[84px] dark:bg-[#1F2128]" onSubmit={formik.handleSubmit}>
        <h3 className="font-bold text-2xl text-gray-1100 mb-[5px] dark:text-gray-dark-1100">
          Let setup your workspace
        </h3>
        <p className="text-sm text-gray-500 mb-[30px] dark:text-gray-500">
          Because even coding deserves a fun zone!
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
              name="workspaceName"
              placeholder="Workspace name"
              label="Workspace name"
              size="lg"
              type='text'
              isRequired
              value={formik.values.workspaceName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.workspaceName ? formik.errors.workspaceName : ''}
            />
          </div>
        </div>
        <div className='flex items-center justify-center'>
          <Button
            type="submit"
            variant="primary"
            size="md"
            className="mb-3 rounded-sm py-4 text-base text-white w-full"
            label="Create workspace"
            disabled={isSubmitting}
            loading={isSubmitting}
          ></Button>
        </div>
      </form>
    </div>
  )
}
