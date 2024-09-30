import Button from 'components/Forms/Button'
import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useForgotPassword, useVerifyUser } from 'common/queries-and-mutations/authentication'
import EmailIcon from '../../assets/icons/icon-done-mail.png'
import { Loader } from 'components/Loader'
import { toast } from 'react-toastify'
import { Alert } from 'components/Toast'
import { Icon, Icons } from 'components/Icon'

export default function VerifySuccess() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { mutate, isSuccess, isError } = useVerifyUser()
  const location = useLocation();
  const navigate = useNavigate()

  // Extract the query parameters
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');
  const emailAddress = queryParams.get('email');

  useEffect(() => {
    if (!isSubmitting && emailAddress && token) {
      setIsSubmitting(true)
      mutate({ emailAddress: emailAddress, token: token })
    } else if (!emailAddress && !token) {
      setIsSubmitting(false)
      toast(<Alert type="error" message="Look like something went wrong, you may need to try again fella!!!" />)
    }
  }, [])

  useEffect(() => {
    if (isSuccess && !isError) {
      setIsSubmitting(false)
      toast(<Alert type="success" message="Your password reset instructions are in your email, assuming they didn’t take a wrong turn!" />)
    } else if (isError) {
      setIsSubmitting(false)
      setTimeout(() => navigate('/auth/login'), 2000)
    }
  }, [isSuccess, isError])

  return (
    <div>
      {isSubmitting ? (
        <div className='flex items-center justify-center'>
          <Loader height={100} width={100} />
        </div>
      ) : (
        <div className="rounded-2xl bg-white mx-auto p-10 text-center max-w-[440px] my-[84px] dark:bg-[#1F2128]">
          {isSuccess ? (
            <div>
              <h3 className="font-bold text-2xl text-gray-1100 capitalize mb-[5px] dark:text-gray-dark-1100">Almost done!</h3>
              <p className="text-sm text-gray-500 mb-[30px] dark:text-gray-dark-500">Welcome</p>
              <div className="text-center mx-auto">
                <div className="mb-4 text-center mx-auto">
                  <img className="inline-block" src={EmailIcon} alt="landing success" />
                </div>
                <p className="text-md text-gray-1100 mb-[30px] dark:text-gray-dark-1100">All set! Your next mission: logging in and making things happen!</p>
              </div>

              <Link
                className="text-right text-xs block text-[#8083A3] mb-[20px]"
                to="/"
              >
                Back to Login
              </Link>
            </div>
          ) : <div className='flex flex-col items-center justify-center'>
            <Icon name={Icons.Error} width={40} height={80} />
            <p className="text-md text-gray-1100 mb-[30px] dark:text-gray-dark-1100">
              Oops!!!
            </p>
          </div>}

        </div >
      )}

    </div>
  )
}
