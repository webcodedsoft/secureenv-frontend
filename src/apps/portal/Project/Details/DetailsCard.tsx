import Dropdown from 'components/Dropdown'
import { Icon, Icons } from 'components/Icon';
import { Alert } from 'components/Toast';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

type Props = {
  label: string;
  envId: number | string;
  commitCount: number
  workspaceId: number
  projectId: number
  projectSlug: string
}

export default function DetailsCard({ label, envId, commitCount, workspaceId, projectId, projectSlug }: Props) {
  return (
    <div>
      <Link to={`/workspace/${workspaceId}/project/${projectSlug}/${projectId}/env-editor/${envId}`}>
        <div className="rounded-2xl border border-neutral bg-neutral-bg dark:border-dark-neutral-border dark:bg-dark-neutral-bg px-6 pt-[15px] pb-[22px]">
          <div className="flex items-center justify-between mb-[15px]">
            <p className="text-subtitle-semibold font-semibold text-gray-1100 dark:text-gray-dark-1100">{label}</p>
            {/* <Dropdown options={[
            { label: 'Rename', onClick: () => { }, },
            { label: 'Lock', onClick: () => { }, },
            { label: 'Delete', onClick: () => { }, isDlete: true },
          ]} /> */}
          </div>
          <div className="w-full bg-neutral h-[1px] dark:bg-dark-neutral-border mb-6" />
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-start gap-3">
                <div>
                  <p className="text-normal text-gray-1100 dark:text-gray-dark-1100 mb-4">ID:</p>
                  <div className='flex items-center gap-x-2'>
                    <p className="text-desc text-gray-400 dark:text-gray-dark-400">#{envId}</p>
                    <CopyToClipboard
                      text={envId?.toString() || ''}
                      onCopy={() => {
                        toast.success(
                          <Alert message="Copied to clipboard" type="success" />,
                        );
                      }}
                    >
                      <button
                        type="button"
                        className="flex h-full w-full items-center justify-center"
                      >
                        <Icon name={Icons.Copy} height={20} width={20} className="fill-gray-400 dark:fill-gray-dark-400 group-hover:fill-color-brands" />
                      </button>
                    </CopyToClipboard>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-normal font-semibold text-gray-1100 mb-4 dark:text-gray-dark-1100">Commit Count</p>
                <p className="text-desc text-gray-400 dark:text-gray-dark-400">#{commitCount}</p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}
