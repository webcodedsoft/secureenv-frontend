import Button from 'components/Forms/Button';
import { Icon, Icons } from 'components/Icon';
import { Link } from 'react-router-dom';
import EmptyProject from '../Project/EmptyProject';

export default function TeamDetails() {
  return (
    <div>
      <div className='flex items-center justify-between'>
        <div>
          <h2 className="capitalize text-gray-1100 font-bold text-3xl leading-9 dark:text-gray-dark-1100 mb-3">
            Sikiru Adesola
          </h2>
          <div className="flex justify-between flex-col gap-y-2 sm:flex-row mb-[32px]">
            <div className="flex items-center text-xs gap-x-3">
              <span className="text-gray-500 dark:text-gray-dark-500">Team Settings</span>
            </div>
          </div>
        </div>
        <Link to="/teams" className='flex items-center gap-x-2'>
          <Icon name={Icons.LongBackArrow} />
          <span className="text-xs text-gray-500 hover:text-gray-dark-500">Back to Teams List</span>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border bg-neutral-bg border-neutral dark:bg-dark-neutral-bg dark:border-dark-neutral-border rounded-2xl py-4">
          <div className="flex items-center justify-between px-6 mb-3">
            <div className="flex flex-col gap-y-3">
              <h3 className="text-gray-1100 font-semibold dark:text-gray-dark-1100 text-xl leading-4">
                Projects
              </h3>
            </div>
            <div className="flex items-center flex-wrap justify-center">
              <Link to="/add-project">
                <Button
                  type="button"
                  variant="primary"
                  size="md"
                  className="mb-3 rounded-md py-4 text-base text-white w-fit"
                  label="Add a new project"
                  icon={<Icon name={Icons.AddProject} stroke='#FFFFFF' />}
                ></Button>
              </Link>
            </div>
          </div>
          <div className="w-full bg-neutral h-[1px] dark:bg-dark-neutral-border" />
          <EmptyProject />
        </div>
        <div className="flex flex-col flex-1 gap-y-7">
          <div className="border border-neutral rounded-lg bg-neutral-bg dark:border-dark-neutral-border pb-[31px] dark:bg-dark-neutral-bg">
            <div className="bg-neutral rounded-t-lg py-4 pl-5 mb-7 dark:bg-dark-neutral-border">
              <p className="text-gray-1100 leading-4 font-semibold dark:text-gray-dark-1100 text-sm">
                Basic Details
              </p>
            </div>
            <div className="grid grid-cols-3 md:grid-cols-4 gap-6 pl-5 gap-y-4 py-2">
              <div className="flex items-center gap-x-2">
                <span className="text-gray-500 text-xs dark:text-gray-dark-500">
                  Name:
                </span>
                <span className="text-gray-1100 text-xs dark:text-gray-dark-1100">
                  Sikiru Adesola
                </span>
              </div>
              <div className="flex items-center gap-x-2">
                <span className="text-gray-500 text-xs dark:text-gray-dark-500">
                  Email:
                </span>
                <span className="text-gray-1100 text-xs dark:text-gray-dark-1100">
                  sikiru@mailinator.com
                </span>
              </div>
              <div className="flex items-center gap-x-2">
                <span className="text-gray-500 text-xs dark:text-gray-dark-500">
                  Status:
                </span>
                <span className="text-gray-1100 text-xs dark:text-gray-dark-1100">
                  <div className="flex items-center gap-x-2">
                    <div className="w-2 h-2 rounded-full bg-green"></div>
                    <p className="text-normal text-gray-1100 dark:text-gray-dark-1100">Active</p>
                  </div>
                </span>
              </div>
              <div className="flex items-center gap-x-2">
                <span className="text-gray-500 text-xs dark:text-gray-dark-500">
                  Added:
                </span>
                <span className="text-gray-1100 text-xs dark:text-gray-dark-1100">
                  Jan 12, 2022
                </span>
              </div>
            </div>
          </div>
          <div className="border bg-neutral-bg border-neutral dark:bg-dark-neutral-bg dark:border-dark-neutral-border rounded-2xl ">
            <div className="bg-neutral rounded-t-lg py-4 pl-5 mb-7 dark:bg-dark-neutral-border">
              <p className="text-gray-1100 leading-4 font-semibold dark:text-gray-dark-1100 text-sm">
                Roles
              </p>
            </div>
            <div className="flex flex-col gap-x-4 mb-8 ml-4 space-y-5">
              <label className="radio-label inline-flex items-center leading-4 text-gray-400 gap-x-2 text-sm dark:text-gray-dark-400 pr-5">
                <input className="custom-radio" type="radio" name="radio-2" defaultChecked />
                <div className='flex flex-col gap-y-2'>
                  Contributor
                  <span className='text-xs'>Contributors have a more involved role within the organization, allowing them to actively participate in the development and management of projects they are associated with. However, their permissions are still controlled to prevent unauthorized actions.</span>
                </div>
              </label>
              <div className="px-5">
                <div className="w-full bg-neutral h-[1px] dark:bg-dark-neutral-border" />
              </div>
              <label className="radio-label inline-flex items-center leading-4 text-gray-400 gap-x-2 text-sm dark:text-gray-dark-400">
                <input className="custom-radio" type="radio" name="radio-2" />
                <div className='flex flex-col gap-y-2'>
                  Viewer
                  <span className='text-xs'>Viewers have a limited access role within the organization. They are restricted to a <span className='text-red'>“read-only”</span> mode, meaning they can only view projects to which they have been explicitly invited.</span>
                </div>
              </label>
              <div className="px-5">
                <div className="w-full bg-neutral h-[1px] dark:bg-dark-neutral-border" />
              </div>
              <label className="radio-label inline-flex items-center leading-4 text-gray-400 gap-x-2 text-sm dark:text-gray-dark-400">
                <input className="custom-radio" type="radio" name="radio-2" />
                <div className='flex flex-col gap-y-2'>
                  Admin
                  <span className='text-xs'>Admins hold the highest level of access within the organization. They have comprehensive control over both projects and organizational settings, giving them the authority to manage all aspects of the organization.</span>
                </div>
              </label>
            </div>
            <div className="px-5">
              <div className="w-full bg-neutral h-[1px] dark:bg-dark-neutral-border" />
            </div>
            <div className="flex justify-end p-4">
              <Button
                type="button"
                variant="primary"
                size="md"
                className="rounded-md text-base"
                label="Save Changes"
              ></Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
