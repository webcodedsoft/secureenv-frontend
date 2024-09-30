import { Icon, Icons } from 'components/Icon'
import { Alert } from 'components/Toast'
import { useMemo, useRef } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'
import { toast } from 'react-toastify'
import { readFileContent } from 'utils'

type IProps = {
  onRedo: () => void
  onUndo: () => void
  onFormat: () => void
  onUpload: (text: any) => void
  onSave: (text: any) => void
  onMask: (shouldMask: boolean) => void
  onLock: () => void
  text: any
  isEnvLocked: boolean
  isProjectLocked: boolean
  isSubmitting: boolean
  isMasked: boolean
}

export default function Toolbar({
  onRedo,
  onUndo,
  onFormat,
  onMask,
  onLock,
  onUpload,
  onSave,
  isEnvLocked,
  isProjectLocked,
  text,
  isSubmitting,
  isMasked
}: IProps) {
  const hiddenFileInputRef = useRef<HTMLInputElement>(null)

  const openFileLibrary = () => {
    hiddenFileInputRef.current?.click()
  }

  const selectFileFromLibrary = async (event: any) => {
    const target = event.currentTarget as HTMLInputElement
    const singleFile: File = (target.files as FileList)[0]
    const text = await validateFile(singleFile)
    onUpload(text)
  }

  const validateFile = async (file: File) => {
    if (!file) {
      toast.error(<Alert type="error" message="No file selected" />)
      return
    }
    // TODO: Create a validation that check for the file name if it match the project expected project platform
    // const fileType = file.name.substring(file.name.lastIndexOf('.') + 1);
    // if (fileType !== 'txt') {
    //   toast.error(<Alert type="error" message="Invalid MSD file" />);
    //   return;
    // }
    return await readFileContent(file)
  }

  const canUnlock = useMemo(() => {
    if (isProjectLocked) {
      return true
    }
    return isEnvLocked
  }, [isProjectLocked])

  const lockText = useMemo(() => {
    if (isProjectLocked) {
      return "Project Locked"
    }
    return isEnvLocked ? 'Unlock Env' : 'Lock Env'
  }, [isEnvLocked, isProjectLocked])

  return (
    <div>
      <div className="md:px-7 px-3 flex items-center flex-wrap w-full justify-between gap-4 pt-4 pb-2 md:w-fit">
        <button
          disabled={isSubmitting}
          type="button"
          className="border border-neutral p-2 gap-x-2 rounded-lg items-center flex dark:border-dark-neutral-border disabled:cursor-not-allowed"
          onClick={() => onMask(!isMasked)}
        >
          <Icon
            name={isMasked ? Icons.EyeClose : Icons.EyeOpen}
            className="fill-gray-400 dark:fill-gray-dark-400 group-hover:fill-color-brands"
          />{' '}
          <span className="text-gray-1100 dark:text-gray-dark-1100 text-sm">
            {isMasked ? 'Unmask' : 'Mask'}
          </span>
        </button>
        <CopyToClipboard
          text={text ?? ''}
          onCopy={() => {
            toast.success(
              <Alert message="Copied to clipboard" type="success" />
            )
          }}
        >
          <button
            disabled={isSubmitting}
            type="button"
            className="border border-neutral p-2 gap-x-2 rounded-lg items-center flex dark:border-dark-neutral-border disabled:cursor-not-allowed"
          >
            <Icon
              name={Icons.Copy}
              className="fill-gray-400 dark:fill-gray-dark-400 group-hover:fill-color-brands"
            />{' '}
            <span className="text-gray-1100 dark:text-gray-dark-1100 text-sm">
              Copy Env
            </span>
          </button>
        </CopyToClipboard>

        <button
          type="button"
          disabled={isProjectLocked || isEnvLocked || isSubmitting}
          className="border border-neutral disabled:cursor-not-allowed p-2 gap-x-2 rounded-lg items-center flex dark:border-dark-neutral-border"
          onClick={() => {
            openFileLibrary()
          }}
        >
          <Icon
            name={Icons.Upload}
            className="fill-gray-400 dark:fill-gray-dark-400 group-hover:fill-color-brands"
          />{' '}
          <span className="text-gray-1100 dark:text-gray-dark-1100 text-sm">
            Import Env
          </span>
        </button>
        {/* <button type='button' className="border border-neutral p-2 gap-x-2 rounded-lg items-center flex dark:border-dark-neutral-border">
          <Icon
            name={Icons.Download}
            className="fill-gray-400 dark:fill-gray-dark-400 group-hover:fill-color-brands"
          />{' '}
          <span className="text-gray-1100 dark:text-gray-dark-1100 text-sm">Download</span>
        </button> */}
        <button
          disabled={isProjectLocked || isSubmitting}
          type="button"
          className="border border-neutral p-2 gap-x-2 rounded-lg items-center flex dark:border-dark-neutral-border disabled:cursor-not-allowed"
          onClick={onLock}
        >
          <Icon
            name={isProjectLocked || isEnvLocked ? Icons.Unlock : Icons.Locked}
            className="fill-gray-400 dark:fill-gray-dark-400 group-hover:fill-color-brands"
          />{' '}
          <span className="text-gray-1100 dark:text-gray-dark-1100 text-sm">
            {lockText}
          </span>
        </button>
        <button
          disabled={isSubmitting}
          type="button"
          className="border border-neutral p-2 gap-x-2 rounded-lg items-center flex dark:border-dark-neutral-border disabled:cursor-not-allowed"
          onClick={onRedo}
        >
          <Icon
            name={Icons.Redo}
            className="fill-gray-400 dark:fill-gray-dark-400 group-hover:fill-color-brands"
          />{' '}
          <span className="text-gray-1100 dark:text-gray-dark-1100 text-sm">
            Redo
          </span>
        </button>
        <button
          disabled={isSubmitting}
          type="button"
          className="border border-neutral p-2 gap-x-2 rounded-lg items-center flex dark:border-dark-neutral-border disabled:cursor-not-allowed"
          onClick={onUndo}
        >
          <Icon
            name={Icons.Undo}
            className="fill-gray-400 dark:fill-gray-dark-400 group-hover:fill-color-brands"
          />{' '}
          <span className="text-gray-1100 dark:text-gray-dark-1100 text-sm">
            Undo
          </span>
        </button>
        {/* <button type='button' className="border border-neutral p-2 gap-x-2 rounded-lg items-center flex dark:border-dark-neutral-border" onClick={onFormat}>
          <Icon
            name={Icons.Format}
            className="fill-gray-400 dark:fill-gray-dark-400 group-hover:fill-color-brands"
          />{' '}
          <span className="text-gray-1100 dark:text-gray-dark-1100 text-sm">Format</span>
        </button> */}
        <button
          type="button"
          disabled={isEnvLocked || isProjectLocked || isSubmitting}
          className={`border border-neutral p-2 gap-x-2 rounded-lg items-center flex dark:border-dark-neutral-border disabled:cursor-not-allowed`}
          onClick={onSave}
        >
          <Icon
            name={Icons.Save}
            className="fill-gray-400 dark:fill-gray-dark-400 group-hover:fill-color-brands"
          />{' '}
          <span className="text-gray-1100 dark:text-gray-dark-1100 text-sm">
            {isEnvLocked || isProjectLocked ? 'Locked' : 'Save Changes'}
          </span>
        </button>
      </div>
      <input
        type="file"
        className="hidden"
        ref={hiddenFileInputRef}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          selectFileFromLibrary(event)
        }}
      />
      {isProjectLocked && <p className='text-red text-xs px-8 italic pb-2'>This project has been locked, which means you can no longer make any changes or edits. To modify it again, you’ll need to unlock the project first.</p>}
    </div>
  )
}
