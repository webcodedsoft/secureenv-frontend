import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import TextField from 'components/Forms/TextField'
import Button from 'components/Forms/Button'
import { selectAccountDetails } from 'selectors/account-selector'
import { useAppSelector } from 'store/hooks'
import { AccountTypeEnum, RolesEnum } from 'types/user.type'
import { useNavigate } from 'react-router-dom'
import { useUpdateWorkspace } from 'common/queries-and-mutations/workspace'
import { toast } from 'react-toastify'
import { Alert } from 'components/Toast'
import DangerZone from './DangerZone'

export default function OrgSettings() {
  const { user } = useAppSelector(selectAccountDetails);
  const navigate = useNavigate()
  const { mutate, isSuccess, isError } = useUpdateWorkspace()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const formik = useFormik({
    initialValues: {
      workspaceName: user.workspace.workspaceName ?? '',
      workspaceSlug: user.workspace.slug ?? '',
      workspaceId: user.workspace.workspaceId ?? '',
      emailAddress: user.workspace.emailAddress ?? '',
    },
    validationSchema: Yup.object({
      workspaceName: Yup.string().required('Name is required').nullable(),
      emailAddress: Yup.string().email("Invalid email").nullable(),
    }),
    enableReinitialize: true,
    onSubmit: (values, { setFieldTouched }) => {
      setIsSubmitting(true)
      for (const key in values) {
        setFieldTouched(key, true)
      }
      mutate({
        workspaceName: values.workspaceName,
        emailAddress: values.emailAddress,
      })
    },
  })

  useEffect(() => {
    if (isSuccess && !isError) {
      setIsSubmitting(false)
      toast(<Alert type="success" message="Workspace successfully update" />)
      formik.resetForm()
    } else if (isError) {
      setIsSubmitting(false)
    }
  }, [isSuccess, isError])

  useEffect(() => {
    if (user.accountRole !== RolesEnum.ADMIN && user.accountType !== AccountTypeEnum.COMPANY) {
      navigate(`workspace/${user.workspace.workspaceId}/settings/`)
    }
  }, [user])


  return (
    <div>
      <div className='flex items-center justify-between'>
        <div>
          <h2 className="capitalize text-gray-1100 font-bold text-3xl leading-9 dark:text-gray-dark-1100 mb-3">
            Workspace Settings
          </h2>
          <div className="flex justify-between flex-col gap-y-2 sm:flex-row mb-[32px]">
            <div className="flex items-center text-xs gap-x-3">
              <span className="text-gray-500 dark:text-gray-dark-500">Settings</span>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col flex-1 gap-y-7">
          <div className="border bg-neutral-bg border-neutral dark:bg-dark-neutral-bg dark:border-dark-neutral-border rounded-2xl ">
            <div className="bg-neutral rounded-t-lg py-4 pl-5 mb-7 dark:bg-dark-neutral-border">
              <p className="text-gray-1100 leading-4 font-semibold dark:text-gray-dark-1100 text-sm">
                Workspace Settings
              </p>
            </div>
            <form onSubmit={formik.handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-x-4 mb-8 m-5">
                <div className="form-control my-3">
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
                <div className="form-control my-3">
                  <TextField
                    name="emailAddress"
                    placeholder="Workspace Email Address"
                    label="Workspace Email Address"
                    size="lg"
                    type='text'
                    value={formik.values.emailAddress}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.emailAddress ? formik.errors.emailAddress : ''}
                  />
                </div>
                <div className="form-control my-3">
                  <TextField
                    name="workspaceId"
                    placeholder="Workspace ID"
                    label="Workspace ID"
                    size="lg"
                    type='text'
                    disabled
                    value={formik.values.workspaceId}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.workspaceId ? formik.errors.workspaceId : ''}
                  />
                </div>
                <div className="form-control my-3">
                  <TextField
                    name="workspaceSlug"
                    placeholder="Workspace Slug"
                    label="Workspace Slug"
                    size="lg"
                    type='text'
                    disabled
                    value={formik.values.workspaceSlug}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.workspaceSlug ? formik.errors.workspaceSlug : ''}
                  />
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
                  label="Save changes"
                  disabled={isSubmitting}
                  loading={isSubmitting}
                ></Button>
              </div>
            </form>
          </div>
        </div>
        <DangerZone user={user} />
      </div>
    </div>
  )
}
