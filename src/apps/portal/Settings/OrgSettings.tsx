import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import TextField from 'components/Forms/TextField'
import Button from 'components/Forms/Button'

export default function OrgSettings() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const formik = useFormik({
    initialValues: {
      companyName: '',
      companySlug: '',
      companyId: '',
    },
    validationSchema: Yup.object({
      companyName: Yup.string().required('Name is required').nullable(),
    }),
    onSubmit: (values, { setFieldTouched }) => {
      setIsSubmitting(true)
      for (const key in values) {
        setFieldTouched(key, true)
      }
      // mutate({
      //   name: values.name,
      // })
    },
  })

  return (
    <div className="border bg-neutral-bg border-neutral dark:bg-dark-neutral-bg dark:border-dark-neutral-border rounded-2xl ">
      <div className="bg-neutral rounded-t-lg py-4 pl-5 mb-7 dark:bg-dark-neutral-border">
        <p className="text-gray-1100 leading-4 font-semibold dark:text-gray-dark-1100 text-sm">
          Organization Settings
        </p>
      </div>
      <div className="flex flex-col gap-x-4 mb-8 m-5 space-y-5">
        <div>
          <div className="form-control mb-[20px]">
            <TextField
              name="companyName"
              placeholder="Company name"
              label="Company name"
              size="lg"
              type='text'
              isRequired
              value={formik.values.companyName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.companyName ? formik.errors.companyName : ''}
            />
          </div>
          <div className="form-control mb-[20px]">
            <TextField
              name="companySlug"
              placeholder="Company Slug"
              label="Company Slug"
              size="lg"
              type='text'
              disabled
              value={formik.values.companySlug}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.companySlug ? formik.errors.companySlug : ''}
            />
          </div>
          <div className="form-control mb-[20px]">
            <TextField
              name="companyId"
              placeholder="Company ID"
              label="Company ID"
              size="lg"
              type='text'
              disabled
              value={formik.values.companyId}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.companyId ? formik.errors.companyId : ''}
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
          label="Save changes"
          disabled={isSubmitting}
          loading={isSubmitting}
        ></Button>
      </div>
    </div>
  )
}
