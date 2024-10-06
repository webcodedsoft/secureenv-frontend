import { Icon, Icons } from 'components/Icon'
import React, { Dispatch, SetStateAction, useState } from 'react'
import NoteList from './Notes'
import { NoteDaum } from 'services/dtos/environment.dto'
import AuditLogList from './AuditLog'

type Props = {
  projectId: number
  environmentId: number
  handleNoteClick: (note: NoteDaum, highlighted: boolean) => void
  proId: number
  isEnvLocked: boolean
  isProjectLocked: boolean
  envId: number
  setSelectedText: Dispatch<
    SetStateAction<{
      text: any
      range: any
    } | null>
  >
  selectedText: any
  isAccessGrant: boolean
}

export default function EditorSidebar({
  projectId,
  environmentId,
  handleNoteClick,
  envId,
  proId,
  setSelectedText,
  selectedText,
  isEnvLocked,
  isProjectLocked,
  isAccessGrant
}: Props) {
  const [tab, setTab] = useState('Notes')

  return (
    <div>
      <div className="max-h-[690px] flex-1 rounded-2xl border border-neutral bg-neutral-bg pt-4 dark:border-dark-neutral-border dark:bg-dark-neutral-bg">
        {/* Tabs */}
        <ul className="-mb-px flex flex-wrap border-b border-gray-200 text-center text-sm font-medium text-gray-500 dark:border-gray-700 dark:text-gray-400">
          <li className="me-2">
            <button
              type="button"
              onClick={() => setTab('Notes')}
              className={`group inline-flex items-center justify-center rounded-t-lg border-b-2 p-4 ${
                tab === 'Notes'
                  ? 'text-blue-600 border-blue-600 active dark:text-blue-500 dark:border-blue-500 border-b-2'
                  : 'border-transparent hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300'
              }  `}
            >
              <Icon
                name={Icons.Note}
                className="me-2 size-4 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300"
              />
              Notes
            </button>
          </li>
          <li className="me-2">
            <button
              type="button"
              onClick={() => setTab('Audit')}
              className={`group inline-flex items-center justify-center rounded-t-lg border-b-2 p-4 ${
                tab === 'Audit'
                  ? 'text-blue-600 border-blue-600 active dark:text-blue-500 dark:border-blue-500 border-b-2'
                  : 'border-transparent hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300'
              }  `}
            >
              <Icon
                name={Icons.Audit}
                className="me-2 size-4 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300"
              />
              Audit Log
            </button>
          </li>
        </ul>
        {tab === 'Audit' ? (
          <AuditLogList
            envId={envId}
            proId={proId}
            isAccessGrant={!isAccessGrant}
          />
        ) : (
          <NoteList
            envId={envId}
            environmentId={environmentId}
            proId={proId}
            projectId={projectId}
            handleNoteClick={handleNoteClick}
            setSelectedText={setSelectedText}
            selectedText={selectedText}
            isEnvLocked={isEnvLocked}
            isProjectLocked={isProjectLocked}
          />
        )}
      </div>
    </div>
  )
}
