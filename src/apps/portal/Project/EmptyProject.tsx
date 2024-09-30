import Button from 'components/Forms/Button'
import { Icon, Icons } from 'components/Icon'
import EmptyState from '../../../assets/icons/undraw_blank_canvas.svg'
import EmptyStateDark from '../../../assets/icons/undraw_blank_canvas_dark.svg'
import Square from '../../../assets/icons/square.svg'
import SquareDark from '../../../assets/icons/square-dark.svg'
import { Link } from 'react-router-dom'
import { UserInfoDto } from 'services/dtos/user.dto'

type IProps = {
  user: UserInfoDto
}

export default function EmptyProject({ user }: IProps) {
  return (
    <div className="flex justify-between gap-6 flex-col xl:flex-row">
      <div className="flex-1 py-20">
        <div className="flex items-center justify-center mb-7">
          <div className="relative">
            <img
              className="dark:hidden"
              src={EmptyState}
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
        <h2 className="font-bold text-gray-1100 text-center text-[24px] leading-[30px] dark:text-gray-dark-1100 tracking-[0.113382px] mb-[13px]">
          No projects found—guess
        </h2>
        <p className="leading-4 text-gray-500 font-medium mb-10 text-center text-[16px] dark:text-gray-dark-500 tracking-[-0.009em]">
          Let’s get the ball rolling—start a fresh project! it’s time to start building your empire!
        </p>
        <div className='flex items-center justify-center'>
          <Link to={`/workspace/${user.workspace.workspaceId}/add-project`}>
            <Button
              type="button"
              variant="primary"
              size="md"
              className="mb-3 rounded-md py-4 text-base text-white w-fit"
              label="Create a new project"
              icon={<Icon name={Icons.AddProject} stroke='#FFFFFF' />}
            ></Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
