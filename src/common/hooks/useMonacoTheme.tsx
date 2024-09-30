import { Monaco } from '@monaco-editor/react'
import { useCallback } from 'react'

export const useLanguagesAndThemes = useCallback((monaco: Monaco, isDark: boolean) => {
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

  Object.keys(themes).forEach(theme => {
    monaco.editor.defineTheme(theme, {
      base: baseTheme, // 'vs-dark' for dark mode, 'vs' for light mode
      inherit: true,
      rules: [{ token: 'comment', foreground: commonThemeRules.comment }, ...themes[theme as keyof typeof themes]]
    })
  })
}, [])
