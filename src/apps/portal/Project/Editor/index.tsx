import { Editor, Monaco, MonacoDiffEditor } from '@monaco-editor/react'
import useDarkMode from 'common/hooks/useDarkMode'
import { languages } from 'constants/languages'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import Toolbar from './Toolbar'
import { compareValue, maskData } from 'utils'
import { toast } from 'react-toastify'
import { Action, Alert } from 'components/Toast'
import EditorDataProtection from './EditorDataProtection'
import { useSaveEnv, useToggleEnvLock } from 'common/queries-and-mutations/environment'
import NoteList from './NoteList'
import { NoteDaum } from 'services/dtos/environment.dto'

type IProps = {
  selectedLanguage: string
  isEnvLocked: boolean
  isProjectLocked: boolean
  isRequireEncyptPassword?: boolean
  environmentId: number
  projectId: number
  currentEnvVersion: number
  envId: number
  proId: number
  variable: any
}

export default function DefaultEditor({
  selectedLanguage,
  isEnvLocked,
  isProjectLocked,
  isRequireEncyptPassword = false,
  environmentId,
  projectId,
  currentEnvVersion,
  envId,
  proId,
  variable,
}: IProps) {
  const editorRef = useRef<any>(null)
  const monacoRef = useRef<any>(null)
  const isDark = useDarkMode()
  const [language, setLanguage] = useState<string>('')
  const [value, setValue] = useState<string>(variable || '')
  const [tempValue, setTempValue] = useState<string>('')
  const [isAccessGrant, setIsAccessGrant] = useState<boolean>(isRequireEncyptPassword)
  const [isMasked, setIsMasked] = useState<boolean>(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedText, setSelectedText] = useState<{ text: any, range: any } | null>(null);
  const [decorationIds, setDecorationIds] = useState([]);

  const { mutate: toggleEnvLock, isSuccess: isLockSuccess, isError: isLockError, data: envRes } = useToggleEnvLock()
  const { mutate: saveEnv, isSuccess: isSaveSuccess, isError: isSaveError } = useSaveEnv()


  const getFileType = useCallback(() => {
    const fileExtension = languages.find(l => l.value === selectedLanguage)?.envType
    switch (fileExtension) {
      case '.env': return 'env'
      case 'appsettings.json': return 'json'
      case 'application.properties': return 'properties'
      case 'application.conf': return 'conf'
      default: return 'env'
    }
  }, [selectedLanguage])

  const handleFormat = () => editorRef.current?.getAction('editor.action.formatDocument')?.run()
  const handleUndo = () => editorRef.current?.trigger('keyboard', 'undo', null)
  const handleRedo = () => editorRef.current?.trigger('keyboard', 'redo', null)
  const handleReplace = (text: any) => setValue(text)
  const handleMask = (shouldMask: boolean) => setIsMasked(shouldMask)

  const handleMerge = (newData: any) => {
    // Update the editor's value with the merged result
    setValue(value + "\n" + newData);
  }

  const handleUpload = (text: any) => {
    if (value !== '' && !compareValue(value, text)) {
      setTempValue(text)
      toast.info(
        <Action
          type="info"
          message="We noticed you already have unsaved data in your editor. How would you like to handle the import?"
          header="Uh-oh! Your Editor’s Got Some Unstaged Changes!"
          handleMerge={() => handleMerge(text)}
          handleReplace={() => handleReplace(text)}
        />,
        {
          autoClose: false,
          closeOnClick: false,
          position: 'top-center',
        },
      );
      return
    }
    setValue(text)
  }

  const handleSave = () => {
    const currentVal = editorRef.current.getValue()
    const payload = {
      currentEnvVersion, env: currentVal, environmentId, projectId
    }
    saveEnv(payload)
  }

  const handleLock = () => {
    toggleEnvLock({ environmentId, projectId, isEnvLocked: !isEnvLocked })
  }

  const registerLanguagesAndThemes = useCallback((monaco: Monaco) => {
    // Register custom languages for environment formats
    monaco.languages.register({ id: 'env' })
    monaco.languages.register({ id: 'json' })
    monaco.languages.register({ id: 'properties' })
    monaco.languages.register({ id: 'conf' })

    // Set syntax tokens for each language
    const languageTokens = {
      env: {
        tokenizer: {
          root: [
            [/#.*$/, 'comment'], // Comments
            [/^\s*\w+\s*=.*$/, 'variable'] // Key-value pairs
          ]
        }
      },
      properties: {
        tokenizer: {
          root: [
            [/^#.*$/, 'comment'], // Comments
            [/^\s*[\w\.]+\s*=.*$/, 'variable'] // Key-value pairs
          ]
        }
      },
      conf: {
        tokenizer: {
          root: [
            [/^#.*$/, 'comment'], // Comments
            [/^\s*\w+\s*=.*$/, 'variable'] // Key-value pairs
          ]
        }
      }
    }

    Object.keys(languageTokens).forEach(lang =>
      monaco.languages.setMonarchTokensProvider(lang, languageTokens[lang as keyof typeof languageTokens])
    )

    // Define custom themes
    const baseTheme = isDark ? 'vs-dark' : 'vs' // Use 'vs' for light theme

    const commonThemeRules = { comment: '888888', variable: 'FFEB3B' }

    const themes = {
      envTheme: [{ token: 'variable', foreground: '9CDCFE' }],
      jsonTheme: [{ token: 'variable', foreground: 'FFEB3B' }],
      propertiesTheme: [{ token: 'variable', foreground: 'FFEB3B' }],
      confTheme: [{ token: 'variable', foreground: 'C5E1A5' }]
    }

    // Suggestions
    // monaco.languages.registerCompletionItemProvider('env', {
    //   provideCompletionItems: (model: any, position: any) => {
    //     // Define custom suggestions
    //     const suggestions = [
    //       {
    //         label: 'PORT',
    //         kind: monaco.languages.CompletionItemKind.Variable,
    //         insertText: 'PORT=',
    //         detail: 'Define the port number for the application',
    //         documentation: 'The port number that your application will run on.'
    //       },
    //       {
    //         label: 'DATABASE_URL',
    //         kind: monaco.languages.CompletionItemKind.Variable,
    //         insertText: 'DATABASE_URL=',
    //         detail: 'Database connection URL',
    //         documentation: 'URL used to connect to the database.'
    //       },
    //       {
    //         label: 'NODE_ENV',
    //         kind: monaco.languages.CompletionItemKind.Enum,
    //         insertText: 'NODE_ENV=production',
    //         detail: 'Define the environment',
    //         documentation: 'Can be set to development, production, or test.'
    //       },
    //       {
    //         label: 'SIKIRU',
    //         kind: monaco.languages.CompletionItemKind.Enum,
    //         insertText: 'SIKIRU=production',
    //         detail: 'Define my name',
    //         documentation: 'Can be set to development, production, or test.'
    //       }
    //     ]

    //     return {
    //       suggestions: suggestions.map(s => ({
    //         ...s,
    //         range: new monaco.Range(
    //           position.lineNumber,
    //           model.getWordUntilPosition(position).startColumn,
    //           position.lineNumber,
    //           model.getWordUntilPosition(position).endColumn
    //         )
    //       }))
    //     }
    //   }
    // })

    Object.keys(themes).forEach(theme => {
      monaco.editor.defineTheme(theme, {
        base: baseTheme, // 'vs-dark' for dark mode, 'vs' for light mode
        inherit: true,
        rules: [{ token: 'comment', foreground: commonThemeRules.comment }, ...themes[theme as keyof typeof themes]]
      })
    })
  }, [isDark])

  const beforeMount = useCallback((monaco: Monaco) => {
    registerLanguagesAndThemes(monaco)
    const selectedLang = getFileType()
    setLanguage(selectedLang)
  }, [registerLanguagesAndThemes, getFileType])

  const onMount = (editor: MonacoDiffEditor, monaco: Monaco) => {
    monacoRef.current = monaco
    editorRef.current = editor

    // Add listener to capture selected text
    editor.onDidChangeCursorSelection(() => {
      const selection = editor.getSelection();
      const selectedText = editor.getModel().getValueInRange(selection);
      setSelectedText({ text: selectedText, range: selection });
    });

    if (!isAccessGrant) {
      editor.focus()
    }
  }

  const removeHighlight = () => {
    if (monacoRef.current) {
      const editor = editorRef.current;
      // Pass the current decoration IDs to remove the highlights
      editor.deltaDecorations(decorationIds, []);
      // Clear the stored decoration IDs
      setDecorationIds([]);
    }
  };

  const addHighlight = (note: NoteDaum) => {
    if (monacoRef.current) {
      const editor = editorRef.current
      const formatedRange = JSON.parse(note.range)
      const range = new monacoRef.current.Range(
        formatedRange.startLineNumber,
        formatedRange.startColumn,
        formatedRange.endLineNumber,
        formatedRange.endColumn
      );
      // Scroll to the note's range
      editor.revealRangeInCenter(range); // Reveals the range in the center of the editor
      // Highlight the text using deltaDecorations
      const newDecorationIds = editor.deltaDecorations([], [
        {
          range: range,
          options: {
            inlineClassName: 'highlighted-text',
          },
        },
      ]);
      setDecorationIds(newDecorationIds); // Store the decoration IDs

    }
  }
  const handleNoteClick = (note: NoteDaum, highlighted: boolean) => {
    if (highlighted) {
      removeHighlight()
      return
    }
    addHighlight(note)
  };


  useEffect(() => {
    if (isLockSuccess && !isLockError) {
      setIsSubmitting(false)
      toast(<Alert type="success" message={`Success! ${envRes.message}`} />)
    } else if (isLockError) {
      setIsSubmitting(false)
    }
  }, [isLockSuccess, isLockError])

  useEffect(() => {
    if (isSaveSuccess && !isSaveError) {
      setIsSubmitting(false)
      toast(<Alert type="success" message={`Success! Changes Successfully Saved`} />)
    } else if (isSaveError) {
      setIsSubmitting(false)
    }
  }, [isSaveSuccess, isSaveError])

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">

      <div className="col-span-2 border bg-neutral-bg border-neutral dark:bg-dark-neutral-bg dark:border-dark-neutral-border rounded-2xl pb-5 h-fit md:flex-1 xl:flex-none relative">
        <Toolbar
          onRedo={handleRedo}
          onUndo={handleUndo}
          onFormat={handleFormat}
          onUpload={handleUpload}
          onSave={handleSave}
          onMask={handleMask}
          onLock={handleLock}
          isMasked={isMasked}
          text={maskData(value, isAccessGrant || isMasked)}
          isEnvLocked={isEnvLocked}
          isProjectLocked={isProjectLocked}
          isSubmitting={isSubmitting}
        />
        <div className='border-b border-neutral dark:border-dark-neutral-border' />
        <Editor
          className="w-[900px] h-[700px]"
          language={language}
          value={maskData(value, isAccessGrant || isMasked)}
          onChange={newValue => {
            /* TODO!: Write a function that validate the data structure.: We only want user to provide appropriate data structure specific to their project */
            setValue(newValue || '')
          }}
          theme={isDark ? 'vs-dark' : 'light'}
          onMount={onMount}
          beforeMount={beforeMount}
          options={{
            inlineSuggest: true,
            fontSize: '16px',
            formatOnType: true,
            autoClosingBrackets: true,
            minimap: { enabled: true },
            lightbulb: { enabled: true },
            quickSuggestions: true,
            wordWrap: 'on',
            scrollBeyondLastLine: false,
            readOnly: isAccessGrant
          }}
        />
      </div>

      {/* Note */}
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

      {isAccessGrant && (
        <EditorDataProtection
          onSuccess={(data) => {
            setValue(data?.variables || '')
            setIsAccessGrant(false)
          }}
          environmentId={environmentId}
          projectId={projectId}
        />
      )}
    </div>

  )
}
