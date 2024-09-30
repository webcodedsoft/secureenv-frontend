import CloseBtn from '../../../assets/icons/icon-close-modal.svg'
import { InfoModal } from 'components/Modal'
import Button from 'components/Forms/Button'
import TextField from 'components/Forms/TextField'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useEffect, useMemo, useState } from 'react'
import CustomSelect from 'components/Forms/CustomSelect'
import { Icon, Icons } from 'components/Icon'
import useDarkMode from 'common/hooks/useDarkMode'
import { useCreateTeam } from 'common/queries-and-mutations/team'
import { Alert } from 'components/Toast'
import { toast } from 'react-toastify'

type IProps = {
  onClose: () => void
}
export default function AddTeamModal({ onClose }: IProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isDarkMode = useDarkMode()
  const { mutate, isSuccess, isError } = useCreateTeam();

  const formik = useFormik({
    initialValues: {
      teamMembers: [
        {
          emailAddress: '',
          role: { value: '', label: '' }
        },
      ],
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      teamMembers: Yup.array().of(
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
      mutate(values)
    },
  })

  const addMoreFields = () => {
    formik.values.teamMembers.push({
      emailAddress: '',
      role: { label: '', value: '' }
    })
    formik.setFieldValue('teamMembers', [
      ...formik.values.teamMembers,
    ]);
  };

  const removeField = (index: number) => {
    formik.values.teamMembers.splice(index, 1);
    formik.setFieldValue('teamMembers', [...formik.values.teamMembers])
  }
  const isSecondFieldInvalid = useMemo(() => {
    if (formik.values.teamMembers.length > 1) {
      const secondField = formik.values.teamMembers[1];
      return !secondField.emailAddress || !secondField.role.value || !secondField.role.label;
    }
    return true;
  }, [formik.values.teamMembers]);

  useEffect(() => {
    if (isSuccess && !isError) {
      setIsSubmitting(false)
      toast(<Alert type="success" message="Success! A new team member has joined the ranks—ready to conquer the world (or at least the next project)!" />)
      formik.resetForm()
    } else if (isError) {
      setIsSubmitting(false)
    }
  }, [isSuccess, isError])

  return (
    <InfoModal width={`w-full max-w-[694px]`} className="h-fit mt-24 md:mt-0 rounded-lg pb-5 justify-centers flex w-full flex-col">
      <div className="relative scrollbar-hide w-full max-w-3xl md:p-8 p-4 rounded-lg">
        <div className="flex items-centers justify-centers flex-col">
          <h6 className="text-header-6 font-semibold text-gray-500 dark:text-gray-dark-500">
            Invite New Members
          </h6>
          <span className='text-sm font-normal text-gray-500 dark:text-gray-dark-1100'>Invite new members by email to join your workspace.</span>
          <form onSubmit={formik.handleSubmit}>
            <div className='my-10'>
              {formik.values.teamMembers.map((field, index) => (
                <div className="md:flex items-center gap-x-5" key={`form_${index}`}>
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
                      error={formik.touched.teamMembers ?
                        formik.errors.teamMembers?.[index] && formik.errors.teamMembers.length > 0 ? JSON.parse(JSON.stringify(formik.errors.teamMembers[index])).emailAddress : '' : ''}
                      name={`teamMembers[${index}].emailAddress`}
                      value={field.emailAddress}
                    />
                    <div className="form-control">
                      <CustomSelect
                        options={[
                          { label: 'Collaborator', value: 'COLLABORATOR' },
                          { label: 'Viewer', value: 'VIEWER' },
                          { label: 'Admin', value: 'ADMIN' },
                        ]}
                        selectedOption={field.role}
                        handleOptionChange={(option) => {
                          formik.setFieldValue(`teamMembers[${index}].role`, option)
                        }}
                        placeholder="Role"
                        label="Role"
                        disabled={isSubmitting}
                        isSearchable
                        isRequired
                        className="h-11 rounded text-left w-44 mb-2"
                        error={formik.touched.teamMembers ?
                          formik.errors.teamMembers?.[index] && formik.errors.teamMembers.length > 0 ? JSON.parse(JSON.stringify(formik.errors.teamMembers[index])).role.value : '' : ''}
                      />
                    </div>
                  </div>
                  <button type='button' className='mt-5 disabled:text-slate-500 text-red'
                    disabled={index === 0 && isSecondFieldInvalid}
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
