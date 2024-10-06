import AvatarInitial from 'components/Avatar/Initial'
import withCreatePortal from 'components/HOC/withCreatePortal'
import { Icon, Icons } from 'components/Icon'
import { format } from 'date-fns'
import React, { useMemo, useState } from 'react'
import { UserInfoDto } from 'services/dtos/user.dto'
import SeeMoreModal from './SeeMoreModal'

type Props = {
  added: any
  edited: any
  removed: any
  user: UserInfoDto
  createdAt: string
}

const EhanchedSeeMoreModal = withCreatePortal(SeeMoreModal)
export default function AuditLogItem({
  added,
  edited,
  removed,
  user,
  createdAt
}: Props) {
  const [item, setItem] = useState<{ title?: string; text: any[] }>()

  const actionText = useMemo(() => {
    if (added.length) {
      return 'Add new environment variables'
    }
    if (edited.length) {
      return 'Modified environment variables'
    }
    if (removed.length) {
      return 'Remove environment variables'
    }
  }, [added.length, edited.length, removed.length])

  const addedList = useMemo(() => {
    return (
      (added ?? []).length > 0 && (
        <p className="w-full rounded-lg py-2 text-xs leading-4 text-gray-500 dark:text-gray-dark-500">
          {(added ?? []).slice(0, 3).map((item, idx) => (
            <div
              className="flex items-center justify-between border-b border-dashed border-neutral py-2 dark:border-dark-neutral-border"
              key={idx}
            >
              <div className="flex items-center gap-2">
                <div className="flex flex-col gap-y-1">
                  <h3 className="text-xs leading-3 text-gray-1100 dark:text-gray-dark-1100">
                    {item.key}:
                  </h3>
                  <span className="text-xs leading-3 text-gray-400 dark:text-gray-dark-400">
                    {item.value}
                  </span>
                </div>
              </div>
            </div>
          ))}
          {(added ?? []).length > 3 && (
            <button
              type="button"
              onClick={() => setItem({ title: actionText, text: added })}
              className="py-2 text-xs font-bold leading-4 text-color-brands"
            >
              See more
            </button>
          )}
        </p>
      )
    )
  }, [actionText, added])

  const removedList = useMemo(() => {
    return (
      (removed ?? []).length > 0 && (
        <p className="w-full rounded-lg py-2 text-xs leading-4 text-gray-500 dark:text-gray-dark-500">
          {(removed ?? []).slice(0, 3).map((item, idx) => (
            <div
              className="flex items-center justify-between border-b border-dashed border-neutral py-2 dark:border-dark-neutral-border"
              key={idx}
            >
              <div className="flex items-center gap-2">
                <div className="flex flex-col gap-y-1">
                  <h3 className="text-xs leading-3 text-gray-1100 dark:text-gray-dark-1100">
                    {item.key}:
                  </h3>
                  <span className="text-xs leading-3 text-gray-400 dark:text-gray-dark-400">
                    {item.value}
                  </span>
                </div>
              </div>
            </div>
          ))}
          {(removed ?? []).length > 3 && (
            <button
              type="button"
              onClick={() => setItem({ title: actionText, text: removed })}
              className="py-2 text-xs font-bold leading-4 text-color-brands"
            >
              See more
            </button>
          )}
        </p>
      )
    )
  }, [actionText, removed])

  const editedList = useMemo(() => {
    return (
      (edited ?? []).length > 0 && (
        <p className="w-full rounded-lg py-2 text-xs leading-[18px] text-gray-500 dark:text-gray-dark-500">
          {(edited ?? []).slice(0, 3).map((item, idx) => (
            <div
              className="flex items-center justify-between border-b border-dashed border-neutral py-2 dark:border-dark-neutral-border"
              key={idx}
            >
              <div className="flex items-center gap-2">
                <div className="flex flex-col gap-y-1">
                  <h3 className="text-xs leading-3 text-gray-1100 dark:text-gray-dark-1100">
                    {item.key}:
                  </h3>
                  <span className="text-sm font-semibold leading-4 text-color-brands">
                    Old Value:
                  </span>
                  <span className="text-xs leading-3 text-gray-400 dark:text-gray-dark-400">
                    {item.oldValue}
                  </span>
                  <span className="text-sm font-semibold leading-4 text-color-brands">
                    New Value:
                  </span>
                  <span className="text-xs leading-3 text-gray-400 dark:text-gray-dark-400">
                    {item.newValue}
                  </span>
                </div>
              </div>
            </div>
          ))}
          {(edited ?? []).length > 3 && (
            <button
              type="button"
              onClick={() => setItem({ title: actionText, text: edited })}
              className="py-2 text-xs font-bold leading-4 text-color-brands"
            >
              See more
            </button>
          )}
        </p>
      )
    )
  }, [actionText, edited])

  return (
    <div>
      <div className="border-b border-neutral pb-4 pt-5 dark:border-dark-neutral-border">
        <div className="mb-1 flex items-center gap-x-3">
          <AvatarInitial name={user.name} avatarColor={user.avatarColor} />
          <div className="flex flex-col space-y-2">
            <h3 className="text-xs font-bold text-gray-500 dark:text-gray-dark-500">
              {user.name}
            </h3>
            <h2 className="text-base font-semibold leading-4 text-gray-1100 dark:text-gray-dark-1100">
              {actionText}
            </h2>
          </div>
        </div>
        <div className="flex flex-col">
          {addedList}
          {editedList}
          {removedList}
          <div className="flex items-center gap-1">
            <Icon name={Icons.Calendar} />
            <span className="text-xs leading-4 text-gray-400 dark:text-gray-dark-400">
              Update {format(new Date(createdAt), 'd MMMM yyyy h:mm')}
            </span>
          </div>
        </div>
      </div>
      {item && (
        <EhanchedSeeMoreModal item={item} onClose={() => setItem(undefined)} />
      )}
    </div>
  )
}
