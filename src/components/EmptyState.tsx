import Button from 'components/Forms/Button'
import { Icon, Icons } from 'components/Icon'
import Blank from '../assets/icons/undraw_blank_canvas.svg'
import EmptyStateDark from '../assets/icons/undraw_blank_canvas_dark.svg'
import Square from '../assets/icons/square.svg'
import SquareDark from '../assets/icons/square-dark.svg'

type IProps = {
  onClick?: () => void
  title: string
  content: string
  btnTitle?: string
  doneUserImage?: boolean
}

export default function EmptyState({ onClick, title, content, btnTitle, doneUserImage = false }: IProps) {
  return (
    <div className="flex justify-between gap-6 flex-col xl:flex-row">
      <div className="flex-1 md:py-20 py-10">
        {!doneUserImage && (
          <div className="flex items-center justify-center mb-7 ">
            <div className="relative">
              <img
                className="dark:hidden"
                src={Blank}
                alt="undraw blank canvas"
              />
              <img
                className="hidden dark:block"
                src={EmptyStateDark}
                alt="undraw blank canvas"
              />
              <img
                className="absolute bottom-0 right-0 translate-y-2 hidden translate-x-[96%] md:block dark:hidden"
                src={Square}
                alt="square"
              />
              <img
                className="absolute bottom-0 right-0 translate-y-2 hidden translate-x-[96%] dark:md:block"
                src={SquareDark}
                alt="square"
              />
            </div>
          </div>
        )}
        <h2 className="font-bold text-gray-1100 text-center text-[24px] leading-[30px] dark:text-gray-dark-1100 tracking-[0.113382px] mb-[13px]">
          {title}
        </h2>
        <p className="leading-4 text-gray-500 font-medium mb-10 text-center text-[16px] dark:text-gray-dark-500 tracking-[-0.009em]">
          {content}
        </p>
        {btnTitle && (
          <div className='flex items-center justify-center'>
            <Button
              type="button"
              variant="primary"
              size="md"
              className="mb-3 rounded-md py-4 text-base text-white w-fit"
              label={btnTitle}
              icon={<Icon name={Icons.AddProject} stroke='#FFFFFF' />}
              onClick={onClick}
            ></Button>
          </div>
        )}
      </div>
    </div>
  )
}
