import CloseBtn from '../../../assets/icons/icon-close-modal.svg'
import { InfoModal } from 'components/Modal'
import Button from 'components/Forms/Button'
import TextField from 'components/Forms/TextField'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useState } from 'react'
import CustomSelect from 'components/Forms/CustomSelect'
import { Icon, Icons } from 'components/Icon'
import useDarkMode from 'common/hooks/useDarkMode'

type IProps = {
  onClose: () => void
}
export default function AddTeamModal({ onClose }: IProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isDarkMode = useDarkMode()

  const formik = useFormik({
    initialValues: {
      formFields: [
        {
          emailAddress: '',
          role: { value: '', label: '' }
        },
      ],
    },
    validationSchema: Yup.object({
      formFields: Yup.array().of(
        Yup.object().shape({
          emailAddress: Yup.string().email('Invalid email address').required('Email is required').nullable(),
          role: Yup.object().shape({
            value: Yup.string().required('Role is required'),
            label: Yup.string().required('Role is required'),
          }).nullable(),
        })
      ),
    }),
    onSubmit: (values, { setFieldTouched }) => {
      setIsSubmitting(true)
      for (const key in values) {
        setFieldTouched(key, true)
      }
      try {
      } catch (error) {
        console.log('Error', error)
      }
    },
  })

  const addMoreFields = () => {
    formik.values.formFields.push({
      emailAddress: '',
      role: { label: '', value: '' }
    })
    formik.setFieldValue('formFields', [
      ...formik.values.formFields,
    ]);
  };

  const removeField = (index: number) => {
    formik.values.formFields.splice(index, 1);
    formik.setFieldValue('formFields', [...formik.values.formFields])
  }

  return (
    <InfoModal width={`w-full max-w-[694px]`} className="h-fit mt-24 md:mt-0 rounded-lg pb-5 justify-centers flex w-full flex-col">
      <div className="relative scrollbar-hide w-full max-w-3xl md:p-8 p-4 rounded-lg">
        <div className="flex items-centers justify-centers flex-col">
          <h6 className="text-header-6 font-semibold text-gray-500 dark:text-gray-dark-500">
            Invite New Members
          </h6>
          <span className='text-sm font-normal text-gray-500 dark:text-gray-dark-1100'>Invite new members by email to join your organization.</span>

          <form onSubmit={formik.handleSubmit}>
            <div className='my-10'>
              {formik.values.formFields.map((field, index) => (
                <div className="md:flex items-center gap-x-5">
                  <div className="w-full md:flex items-center gap-x-5 space-y-2">
                    <TextField
                      placeholder="Email address"
                      label="Enter email address"
                      size="lg"
                      className="w-44s"
                      isRequired
                      type="text"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.formFields ?
                        formik.errors.formFields?.[index] && formik.errors.formFields.length > 0 ? JSON.parse(JSON.stringify(formik.errors.formFields[index])).emailAddress : '' : ''}
                      name={`formFields[${index}].emailAddress`}
                      value={field.emailAddress}
                    />
                    <div className="form-control">
                      <CustomSelect
                        options={[
                          { label: 'Collaborator', value: 'COLLABORATOR' },
                          { label: 'Viewer', value: 'VIEWER' },
                        ]}
                        selectedOption={field.role}
                        handleOptionChange={(option) => {
                          formik.setFieldValue(`formFields[${index}].role`, option)
                        }}
                        placeholder="Role"
                        label="Role"
                        disabled={isSubmitting}
                        isSearchable
                        isRequired
                        className="h-11 rounded text-left w-44 mb-2"
                        error={formik.touched.formFields ?
                          formik.errors.formFields?.[index] && formik.errors.formFields.length > 0 ? JSON.parse(JSON.stringify(formik.errors.formFields[index])).role.value : '' : ''}
                      />
                    </div>
                  </div>
                  <button type='button' className='mt-5 disabled:text-slate-500 text-red' disabled={index === 0}
                    onClick={() => removeField(index)}
                  >
                    <span className=' text-xs leading-4'>Delete</span>
                  </button>
                </div>
              ))}
            </div>

            <div className='flex items-center justify-between'>
              <button type='button' className='flex items-center gap-2'
                onClick={() => addMoreFields()}
              >
                <Icon name={Icons.AddProject} fill={isDarkMode ? '#FFFFFF' : '#262631'}
                  stroke={isDarkMode ? '#262631' : '#FFFFFF'} />
                <span className='text-base text-gray-500 dark:text-gray-dark-500'>Add another</span>
              </button>

              <div className='flex justify-end items-center gap-x-3'>
                <Button
                  type="button"
                  variant="outline"
                  size="md"
                  className="rounded-md py-4 text-base dark:text-white w-fit"
                  label="Cancel"
                  onClick={onClose}
                ></Button>

                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  className="rounded-md py-4 text-base text-white w-fit"
                  label="Send invite"
                  disabled={isSubmitting}
                  loading={isSubmitting}
                ></Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </InfoModal>
  )
}
