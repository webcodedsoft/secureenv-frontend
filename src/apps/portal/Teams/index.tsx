import Button from 'components/Forms/Button';
import withCreatePortal from 'components/HOC/withCreatePortal';
import { useState } from 'react';
import AddTeamModal from './AddTeamModal';
import Filter from 'components/Filter';
import TextField from 'components/Forms/TextField';
import Dropdown from 'components/Dropdown';
import { Icon, Icons } from 'components/Icon';
import useDarkMode from 'common/hooks/useDarkMode';

const EhancedAddTeamModal = withCreatePortal(AddTeamModal);

export default function ManageTeam() {
  const [showInviteModal, setShowInviteModal] = useState(false);
  const isDarkMode = useDarkMode()

  return (
    <div>
      <div className='smd:mr-[70rem]'>
        <div className="flex items-end justify-between mb-[25px]">
          <div>
            <h2 className="capitalize text-gray-1100 font-bold text-[28px] leading-[35px] dark:text-gray-dark-1100 mb-[13px]">
              Manage Team
            </h2>
          </div>
          <div className="flex items-center gap-x-2">
            <Button
              type="button"
              variant="primary"
              size="md"
              className="mb-3 rounded-md py-4 text-base text-white w-fit"
              label="Invite Teams"
              onClick={() => setShowInviteModal(true)}
            ></Button>
          </div>
        </div>
        <div className="flex items-center justify-between gap-5 mb-[27px]">
          <div className="flex items-center gap-3">
            <Filter label={'Filters'} options={
              [
                { value: 'VIEWER', label: 'Viewer' },
                { value: 'CONTRIBUTOR', label: 'Contributor' }
              ]
            } onSelect={(val) => { }} />
          </div>
          <TextField
            name="searchQuery"
            placeholder="Search team"
            label=""
            size="md"
            className="w-44s"
            isRequired
            type="search"
            value=""
            onChange={() => { }}
          />
        </div>
        <div className="rounded-2xl border border-neutral bg-neutral-bg dark:border-dark-neutral-border dark:bg-dark-neutral-bg overflow-x-scroll scrollbar-hide p-[25px] mb-[25px]">
          <div className="flex items-center justify-between pb-4 border-neutral border-b mb-3 dark:border-dark-neutral-border">
            <p className="text-subtitle-semibold font-semibold text-gray-1100 dark:text-gray-dark-1100">
              Teams
            </p>
          </div>
          <table className="w-full min-w-[900px]">
            <tbody>
              <tr className="border-b text-normal text-gray-1100 border-neutral dark:border-dark-neutral-border dark:text-gray-dark-1100">
                <td className="py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full overflow-hidden">
                      <img
                        src="assets/images/seller-avatar-1.png"
                        alt="user avatar"
                      />
                    </div>
                    <p className="text-normal text-gray-1100 dark:text-gray-dark-1100">
                      Bessie Cooper
                    </p>
                  </div>
                </td>
                <td>
                  <span>tim.jennings@site.com</span>
                </td>
                <td>
                  <div className="flex items-center gap-x-2">
                    <p className="text-normal text-gray-1100 dark:text-gray-dark-1100">
                      Viewer
                    </p>
                  </div>
                </td>
                <td>
                  <span>28 Jan 2022</span>
                </td>
                <td>

                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="rounded-md text-base text-white bg-red w-32"
                    label="Leave"
                    onClick={() => setShowInviteModal(true)}
                    icon={<Icon name={Icons.Cancel} fill='#FFFFFF' />}
                  ></Button>
                </td>
              </tr>
              <tr className="border-b text-normal text-gray-1100 border-neutral dark:border-dark-neutral-border dark:text-gray-dark-1100">
                <td className="py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full overflow-hidden">
                      <img
                        src="assets/images/seller-avatar-1.png"
                        alt="user avatar"
                      />
                    </div>
                    <p className="text-normal text-gray-1100 dark:text-gray-dark-1100">
                      Bessie Cooper
                    </p>
                  </div>
                </td>
                <td>
                  <span>tim.jennings@site.com</span>
                </td>
                <td>
                  <div className="flex items-center gap-x-2">
                    <p className="text-normal text-gray-1100 dark:text-gray-dark-1100">
                      Viewer
                    </p>
                  </div>
                </td>
                <td>
                  <span>28 Jan 2022</span>
                </td>
                <td>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="rounded-md text-base text-red w-32"
                    label="Remove"
                    onClick={() => setShowInviteModal(true)}
                    icon={<Icon name={Icons.Cancel} fill={'#e23738'} />}
                  ></Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
      {showInviteModal && (
        <EhancedAddTeamModal onClose={() => setShowInviteModal(false)} />
      )}
    </div>
  )
}
