import React, { useEffect, useRef } from 'react'
import Editor from "@monaco-editor/react";
import useDarkMode from 'common/hooks/useDarkMode';

export default function BasicEditor() {
  const isDark = useDarkMode()
  const code = "var message = 'Monaco Editor!' \nconsole.log(message);";

  const editorRef = useRef<any>(null);

  useEffect(() => {
    if (editorRef.current) {
      const monaco = editorRef.current;

      // Register a custom language for .env
      monaco.languages.register({ id: 'env' });

      // Define the tokens (syntax) for the .env file format
      monaco.languages.setMonarchTokensProvider('env', {
        tokenizer: {
          root: [
            [/#.*$/, 'comment'],   // Comments starting with #
            [/^\s*\w+\s*=.*$/, 'variable'], // Key-value pairs
          ],
        },
      });

      // Set the theme with comment and variable highlighting
      monaco.editor.defineTheme('envTheme', {
        base: 'vs-dark', // Base it on dark theme
        inherit: true,
        rules: [
          { token: 'comment', foreground: '888888' },  // Comment color
          { token: 'variable', foreground: '9CDCFE' }, // Key-value color
        ],
      });
    }
  }, [editorRef]);

  return (
    <div>
      <Editor
        height="500px"
        language="typescript"
        theme={isDark ? "vs-dark" : "light"}
        onMount={(editor, monaco) => {
          editorRef.current = monaco;
        }}
        defaultLanguage="env"
        // theme="envTheme"
        value={code}
        loading={true}
        // onChange={(e, w) => console.log(e, w)
        // }
        options={{
          inlineSuggest: true,
          fontSize: "16px",
          formatOnType: true,
          autoClosingBrackets: true,
          minimap: { scale: 10, width: 20 }
        }}

      />
    </div>
  )
}
