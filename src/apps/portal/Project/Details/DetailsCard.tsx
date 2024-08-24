import Dropdown from 'components/Dropdown'

type Props = {
  label: string;
  envId: number | string;
  commitCount: number
}

export default function DetailsCard({ label, envId, commitCount }: Props) {
  return (
    <div>
      <div className="rounded-2xl border border-neutral bg-neutral-bg dark:border-dark-neutral-border dark:bg-dark-neutral-bg px-6 pt-[15px] pb-[22px]">
        <div className="flex items-center justify-between mb-[15px]">
          <p className="text-subtitle-semibold font-semibold text-gray-1100 dark:text-gray-dark-1100">{label}</p>
          <Dropdown options={[
            { label: 'Rename', onClick: () => { }, },
            { label: 'Lock', onClick: () => { }, },
            { label: 'Delete', onClick: () => { }, isDlete: true },
          ]} />
        </div>
        <div className="w-full bg-neutral h-[1px] dark:bg-dark-neutral-border mb-6" />
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-start gap-3">
              <div>
                <p className="text-normal text-gray-1100 dark:text-gray-dark-1100 mb-4">ID:</p>
                <p className="text-desc text-gray-400 dark:text-gray-dark-400">#{envId}</p>
              </div>
            </div>
            <div>
              <p className="text-normal font-semibold text-gray-1100 mb-4 dark:text-gray-dark-1100">Commit Count</p>
              <p className="text-desc text-gray-400 dark:text-gray-dark-400">#{commitCount}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
