import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import TextField from 'components/Forms/TextField'
import Button from 'components/Forms/Button'

export default function ProfileSettings() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const formik = useFormik({
    initialValues: {
      name: '',
      userId: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required').nullable(),
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
          Account Details
        </p>
      </div>
      <div className="flex flex-col gap-x-4 mb-8 m-5 space-y-5">
        <div>
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
            <TextField
              name="userId"
              placeholder="User ID"
              label="User ID"
              size="lg"
              type='text'
              disabled
              value={formik.values.userId}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.userId ? formik.errors.userId : ''}
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
