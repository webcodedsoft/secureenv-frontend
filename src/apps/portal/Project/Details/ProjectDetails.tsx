import withCreatePortal from 'components/HOC/withCreatePortal';
import Calender from '../../../../assets/icons/icon-calendar-1.svg';
import DetailsCard from './DetailsCard';
import Button from 'components/Forms/Button';
import AddEnvModal from './AddEnvModal';
import { useState } from 'react';
import { Icon, Icons } from 'components/Icon';
import Avatar from 'components/Avatar';
import ContributorCard from './ContributorCard';
import InviteContributorModal from './InviteContributorModal';
import Dropdown from 'components/Dropdown';

const EnhancedAddEnvModal = withCreatePortal(AddEnvModal);
const EnhancedInviteContributorModal = withCreatePortal(InviteContributorModal);

export default function ProjectDetails() {
  const [showAddEnv, setShowAddEnv] = useState(false);
  const [showInvite, setShowInvite] = useState(false);

  return (
    <div>
      <div className="flex items-end justify-between mb-[46px]">
        <div>
          <h2 className="capitalize text-gray-1100 font-bold text-2xl leading-[35px] dark:text-gray-dark-1100 mb-[10px]">Frontend</h2>
        </div>
        <div className='flex gap-x-5'>
          <div className='flex flex-col items-end justify-end'>
            <Button
              type="button"
              variant="primary"
              size="md"
              className="mb-3 rounded-md py-4 text-base text-white w-fit"
              label="Add Env"
              onClick={() => setShowAddEnv(true)}
            ></Button>
            <div className="flex items-center gap-x-2"> <img src={Calender} alt="calendar icon" />
              <time className="text-xs text-gray-500">Feb 15, 2022 - Feb 21, 2022</time>
            </div>
          </div>
          <div className="h-10 w-10 rounded-lg flex items-center justify-center bg-color-brands">
            <div className=''>
              <Dropdown options={[
                { label: 'Rename', onClick: () => { }, },
                { label: 'Lock', onClick: () => { }, },
                { label: 'Delete', onClick: () => { }, isDlete: true },
              ]}
                className='mr-8'
                modalPosition="mr-6"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3 mb-[33px]">
        <DetailsCard label="Development" envId={`GSV567489241UI`} commitCount={200} />
        <DetailsCard label="Staging" envId={`GSV567489241UI`} commitCount={200} />
        <DetailsCard label="Production" envId={`GSV567489241UI`} commitCount={200} />
      </div>
      <div className="rounded-2xl border border-neutral bg-neutral-bg dark:border-dark-neutral-border dark:bg-dark-neutral-bg pt-[18px] px-[27px] pb-[29px]">
        <div className="flex items-center justify-between mb-[17px]">
          <p className="text-subtitle-semibold font-semibold text-gray-1100 dark:text-gray-dark-1100">Contributors</p>
          <Button
            type="button"
            variant="primary"
            size="md"
            className="mb-3 rounded-md py-4 text-base text-white w-fit"
            label="Invite Contributor"
            onClick={() => setShowInvite(true)}
          ></Button>
        </div>
        <div className="w-full bg-neutral h-[1px] dark:bg-dark-neutral-border mb-7" />
        <div className="flex gap-3 flex-col mb-[30px]">
          <ContributorCard />
        </div>
        {/* Pagination here */}
      </div>
      {showAddEnv && (
        <EnhancedAddEnvModal onClose={() => setShowAddEnv(false)} />
      )}
      {showInvite && (
        <EnhancedInviteContributorModal onClose={() => setShowInvite(false)} />
      )}

    </div>

  )
}
