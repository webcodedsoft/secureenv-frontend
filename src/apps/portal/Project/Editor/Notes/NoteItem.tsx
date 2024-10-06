import AvatarInitial from 'components/Avatar/Initial'
import { Icon, Icons } from 'components/Icon'
import { format } from 'date-fns'
import { useState } from 'react'
import { NoteDaum } from 'services/dtos/environment.dto'

type Props = {
  note: NoteDaum
  handleNoteClick: (note: NoteDaum, highlighted: boolean) => void
}

export default function NoteItem({ note, handleNoteClick }: Props) {
  const [highlight, setHighlight] = useState(false)

  return (
    <div className="py-1">
      <div className="my-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative ">
              <AvatarInitial
                name={note.user.name}
                avatarColor={note.user.avatarColor}
              />
            </div>
            <div className="flex-1">
              <p className="mb-2 text-normal font-semibold text-gray-1100 dark:text-gray-dark-1100">
                {note.user.name}
              </p>
              <p className="text-desc text-gray-400 dark:text-gray-dark-400">
                on {format(new Date(note.createdAt), "yyyy/MM/dd 'at' hh:mm a")}
              </p>
            </div>
          </div>
          {note.text && (
            <button
              onClick={() => {
                setHighlight((prevState) => !prevState)
                handleNoteClick(note, highlight)
              }}
              className="flex items-center gap-[14px]"
            >
              <Icon
                name={Icons.Reference}
                className="cursor-pointer fill-gray-1100 dark:fill-gray-dark-1100"
              />
            </button>
          )}
        </div>
      </div>
      <p className="mb-2 w-full px-8 text-sm leading-5 text-gray-1100 dark:text-gray-dark-1100">
        {note.note}
      </p>
      {note.text && (
        <p className="px-8 text-xs italic leading-5 text-gray-1100 dark:text-gray-dark-1100">
          Selected Text: "{note.text}"
        </p>
      )}
    </div>
  )
}
