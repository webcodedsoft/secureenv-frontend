import Dropdown from 'components/Dropdown'
import ProjectCard from './ProjectCard'
import EmptyProject from './EmptyProject'
import Button from 'components/Forms/Button'
import { Icon, Icons } from 'components/Icon'
import AddProjectModal from './AddProjectModal'
import { InfoModal } from 'components/Modal'
import withCreatePortal from 'components/HOC/withCreatePortal'
import { Link } from 'react-router-dom'

const EnhancedAddProjectModal = withCreatePortal(AddProjectModal)
export default function Project() {
  return (
    <div>
      <div className='flex items-center justify-between md:pr-5'>
        <h2 className="capitalize text-gray-1100 font-bold text-[28px] leading-[35px] dark:text-gray-dark-1100 mb-[13px]">
          Howdy Steven!
        </h2>
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
      <section>
        <div className="flex flex-col justify-between gap-5 xl:flex-row md:pr-5">
          <div className="border bg-neutral-bg border-neutral dark:bg-dark-neutral-bg dark:border-dark-neutral-border rounded-2xl pt-6 flex-1 pb-[23px] shadow-lg">
            <div className="flex items-center justify-between border-b border-neutral dark:border-dark-neutral-border mb-[33px] pb-[19px] px-[25px]">
              <div className="text-base leading-5 text-gray-1100 font-semibold dark:text-gray-dark-1100">
                All Projects
              </div>
              <Dropdown
                options={[
                  { label: 'Sale Reports', onClick: () => { } },
                  { label: 'Export Reports', onClick: () => { } },
                  { label: 'Remove', onClick: () => { }, isDlete: true }
                ]}
              />
            </div>
            <div className="px-[25px]">
              <EmptyProject />
              {/* <div className="grid grid-cols-1 gap-6 mb-[31px] lg:grid-cols-2">
                <ProjectCard />
                <ProjectCard />
              </div>
              <div className="flex items-center gap-x-10">
                <div>
                  <button className="btn text-sm h-fit min-h-fit capitalize leading-4 border-0 bg-color-brands font-semibold py-[11px] px-[18px] hover:bg-color-brands">
                    1
                  </button>
                  <button className="btn text-sm h-fit min-h-fit capitalize leading-4 border-0 bg-transparent font-semibold text-gray-1100 py-[11px] px-[18px] hover:bg-color-brands dark:text-gray-dark-1100">
                    2
                  </button>
                  <button className="btn text-sm h-fit min-h-fit capitalize leading-4 border-0 bg-transparent font-semibold text-gray-1100 py-[11px] px-[18px] hover:bg-color-brands dark:text-gray-dark-1100">
                    3
                  </button>
                  <button className="btn text-sm h-fit min-h-fit capitalize leading-4 border-0 bg-transparent font-semibold text-gray-1100 py-[11px] px-[18px] hover:bg-color-brands dark:text-gray-dark-1100">
                    4
                  </button>
                  <button className="btn text-sm h-fit min-h-fit capitalize leading-4 border-0 bg-transparent font-semibold text-gray-1100 py-[11px] px-[18px] hover:bg-color-brands dark:text-gray-dark-1100">
                    5
                  </button>
                </div>
                <a
                  className="items-center justify-center border rounded-lg border-neutral hidden gap-x-[10px] px-[18px] py-[11px] dark:border-dark-neutral-border lg:flex"
                  href="#"
                >
                  {' '}
                  <span className="text-gray-400 text-xs font-semibold leading-[18px] dark:text-gray-dark-400">
                    Next
                  </span>
                  <img
                    src="assets/images/icons/icon-arrow-right-long.svg"
                    alt="arrow right icon"
                  />
                </a>
              </div> */}
            </div>
          </div>
        </div>
      </section>
      {/* <EnhancedAddProjectModal /> */}
    </div>
  )
}
