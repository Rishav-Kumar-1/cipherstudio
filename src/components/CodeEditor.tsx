'use client'

import { useState, useEffect } from 'react'
import { Editor } from '@monaco-editor/react'
import { useProject } from '@/contexts/ProjectContext'
import { useTheme } from '@/contexts/ThemeContext'
import { File, Code } from 'lucide-react'

export function CodeEditor() {
  const { currentFile, updateFileContent } = useProject()
  const { theme } = useTheme()
  const [editorContent, setEditorContent] = useState('')

  useEffect(() => {
    if (currentFile) {
      setEditorContent(currentFile.content || '')
    } else {
      setEditorContent('')
    }
  }, [currentFile])

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined && currentFile) {
      setEditorContent(value)
      updateFileContent(currentFile.id, value)
    }
  }

  const getLanguageFromFileName = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase()
    switch (extension) {
      case 'js':
      case 'jsx':
        return 'javascript'
      case 'ts':
      case 'tsx':
        return 'typescript'
      case 'json':
        return 'json'
      case 'css':
        return 'css'
      case 'html':
        return 'html'
      case 'md':
        return 'markdown'
      case 'py':
        return 'python'
      case 'java':
        return 'java'
      case 'cpp':
      case 'c':
        return 'cpp'
      default:
        return 'javascript'
    }
  }

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase()
    switch (extension) {
      case 'js':
      case 'jsx':
      case 'ts':
      case 'tsx':
        return <Code size={16} className="text-yellow-500" />
      case 'html':
        return <File size={16} className="text-orange-500" />
      case 'css':
        return <File size={16} className="text-blue-500" />
      case 'json':
        return <File size={16} className="text-green-500" />
      default:
        return <File size={16} className="text-gray-500" />
    }
  }

  if (!currentFile) {
    return (
      <div className="w-1/2 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-400 dark:text-gray-500 mb-4">
            <Code size={64} className="mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No file selected
          </h3>
          <p className="text-gray-500 dark:text-gray-400 max-w-sm">
            Select a file from the explorer to start editing, or create a new file to begin coding.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-1/2 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
      <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {getFileIcon(currentFile.name)}
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {currentFile.name}
            </h3>
            <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded">
              {getLanguageFromFileName(currentFile.name).toUpperCase()}
            </span>
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {editorContent.split('\n').length} lines
          </div>
        </div>
      </div>
      <div className="flex-1">
        <Editor
          height="100%"
          language={getLanguageFromFileName(currentFile.name)}
          value={editorContent}
          onChange={handleEditorChange}
          theme={theme === 'dark' ? 'vs-dark' : 'light'}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            roundedSelection: false,
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            insertSpaces: true,
            wordWrap: 'on',
            folding: true,
            lineDecorationsWidth: 10,
            lineNumbersMinChars: 3,
            renderLineHighlight: 'line',
            selectOnLineNumbers: true,
            cursorBlinking: 'blink',
            cursorStyle: 'line',
            fontLigatures: true,
            bracketPairColorization: { enabled: true },
            guides: {
              bracketPairs: true,
              indentation: true
            },
            suggest: {
              showKeywords: true,
              showSnippets: true
            },
            quickSuggestions: {
              other: true,
              comments: false,
              strings: false
            }
          }}
        />
      </div>
    </div>
  )
}
