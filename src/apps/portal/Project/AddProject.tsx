import useDarkMode from 'common/hooks/useDarkMode'
import TextField from 'components/Forms/TextField'
import { Icon, Icons } from 'components/Icon'
import { languages } from 'constants/languages'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import * as Yup from 'yup'
import Star from '../../../assets/icons/icon-star-yellow.svg'
import Button from 'components/Forms/Button'
import ConfirmModal from 'components/Modal/ConfirmModal'
import withCreatePortal from 'components/HOC/withCreatePortal'
import { useCreateProject } from 'common/queries-and-mutations/project'
import { toast } from 'react-toastify'
import { Alert } from 'components/Toast'

const EhanchedConfirm = withCreatePortal(ConfirmModal);

export default function AddProject() {
  const isDarkMode = useDarkMode()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)

  const { mutate, isSuccess, isError } = useCreateProject()

  const formik = useFormik({
    initialValues: {
      language: '',
      projectName: '',
      repositoryUrl: '',
      isRequireEncyptPassword: true
    },
    validationSchema: Yup.object({
      language: Yup.string().required('Platform is required').nullable(),
      projectName: Yup.string().required('Project name is required').nullable(),
      repositoryUrl: Yup.string().url('Project name is required').nullable()
    }),
    onSubmit: (values, { setFieldTouched }) => {
      for (const key in values) {
        setFieldTouched(key, true)
      }
      // TODO!: Need to check if this has been set by user
      if (formik.values.isRequireEncyptPassword) {
        setShowConfirmModal(true)
        return
      } else {
        handleSubmit()
      }
    }
  })

  const handleSubmit = () => {
    setIsSubmitting(true)
    mutate({ ...formik.values })
  }

  useEffect(() => {
    if (isSuccess && !isError) {
      setIsSubmitting(false)
      toast(<Alert type="success" message="Success! Your new project is live and ready to take over the world (or at least your to-do list)!" />)
      formik.resetForm()
      setShowConfirmModal(false)
    } else if (isError) {
      setIsSubmitting(false)
    }
  }, [isSuccess, isError])


  return (
    <div className="border bg-neutral-bg border-neutral dark:bg-dark-neutral-bg dark:border-dark-neutral-border rounded-2xl md:p-10 p-5 md:mx-40">
      <div className="flex justify-between gap-x-5 flex-col">
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-12">
            <p className="text-gray-1100 text-base leading-4 font-medium mb-[10px] dark:text-gray-dark-1100">
              Choose your platform
            </p>
            <div
              className={`grid md:grid-cols-5 grid-cols-3 md:gap-10 gap-2 md:pl-1 lg:pl-20 rounded-lg border ${formik.errors.language
                ? 'border-red'
                : ' border-neutral dark:border-dark-neutral-border'
                }`}
            >
              {languages.map((language) => (
                <div
                  className={`m-3 relative hover:bg-neutral dark:hover:bg-dark-neutral-border rounded-md md:w-32 w-20
                  ${language.value === formik.values.language
                      ? 'bg-neutral dark:bg-dark-neutral-border'
                      : ''}`}
                  role="button"
                  tabIndex={-1}
                  onKeyDown={() =>
                    formik.setFieldValue('language', language.value)
                  }
                  onClick={() =>
                    formik.setFieldValue('language', language.value)
                  }
                >
                  <div className="flex flex-col items-center justify-center gap-2 pt-2">
                    <Icon
                      name={language.icon}
                      fill={isDarkMode ? '#FFFFFF' : '#262631'}
                      width={60}
                      height={60}
                    />
                    <p className="text-xs font-semibold text-dark-gray-0 leading-4 mb-[10px] dark:text-gray-dark-1100">
                      {language.label}
                    </p>
                  </div>
                  {language.value === formik.values.language && (
                    <div className="absolute rounded-full border border-dark-neutral-border -top-1 -right-1">
                      <img src={Star} />
                    </div>
                  )}

                </div>
              ))}
            </div>
            {formik.errors.language && (
              <p className="mt-2 text-xs text-red text-left">
                {formik.errors.language}
              </p>
            )}
          </div>
          <div className="form-control mb-12">
            <TextField
              name="projectName"
              placeholder="Project name"
              label="Project name"
              size="lg"
              isRequired
              type="text"
              value={formik.values.projectName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.projectName ? formik.errors.projectName : ''
              }
            />
          </div>
          <div className="form-control mb-12">
            <TextField
              name="repositoryUrl"
              placeholder="Project repository"
              label="Project repository"
              size="lg"
              type="text"
              value={formik.values.repositoryUrl}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.repositoryUrl ? formik.errors.repositoryUrl : ''
              }
            />
          </div>
          <div className="mb-[25px]">
            <div className="w-full bg-neutral h-[1px] dark:bg-dark-neutral-border" />
          </div>
          <div className="flex justify-end gap-x-10">
            <div className="flex items-center gap-x-3">
              <input
                value={formik.values.isRequireEncyptPassword ? 'yes' : 'no'}
                defaultChecked={formik.values.isRequireEncyptPassword}
                className="checkbox checkbox-primary rounded border-2 w-[18px] h-[18px]"
                type="checkbox"
                onChange={() => formik.setFieldValue('isRequireEncyptPassword', !formik.values.isRequireEncyptPassword)}
              />
              <span className="text-gray-500 leading-4 dark:text-gray-dark-500 text-[14px] max-w-[183px]">
                Require decryption password to read and write
              </span>
            </div>
            <Button
              type="submit"
              variant="primary"
              size="md"
              className="mb-3 rounded-md py-4 text-base text-white w-fit"
              label="Create project"
              disabled={isSubmitting}
              loading={isSubmitting}
            ></Button>
          </div>
        </form>
      </div>
      {showConfirmModal && (
        <EhanchedConfirm
          title="Enable Decryption Password Requirement"
          content="<div class='pb-5 text-sm'>Are you sure you want to enable the “Require Decryption Password” option for reading and writing files? This will add an extra layer of security, ensuring that anyone accessing your files must provide a decryption password. Once enabled, all read and write operations will be password-protected.</div>
	        <p class='py-2 text-left text-sm'>• If you enable this, you’ll be prompted to enter the password each time you access encrypted files.</p>
	        <p class='py-2 text-left text-sm'>•	Be sure to keep your password safe! Without it, the encrypted files will be inaccessible.</p>
          <span class='text-sm pt-2'>Do you want to proceed?</span>"
          actionText="Yes"
          cancelText="No"
          onConfirm={handleSubmit}
          onCancel={() => setShowConfirmModal(false)}
          isSubmitting={isSubmitting}
          className="md:w-[40%] sm:w-[20%]"
        />
      )}
    </div>
  )
}
