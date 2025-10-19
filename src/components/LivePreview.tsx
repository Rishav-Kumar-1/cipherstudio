'use client'

import { Sandpack } from '@codesandbox/sandpack-react'
import { SandpackThemeProvider } from '@codesandbox/sandpack-react'
import { useProject } from '@/contexts/ProjectContext'
import { useTheme } from '@/contexts/ThemeContext'
import { Play, RefreshCw, ExternalLink } from 'lucide-react'
import { useState, useEffect } from 'react'

export function LivePreview() {
  const { currentProject, getProjectFiles } = useProject()
  const { theme } = useTheme()
  const [files, setFiles] = useState<{ [key: string]: string }>({})
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (currentProject) {
      const projectFiles = getProjectFiles()
      setFiles(projectFiles)
    }
  }, [currentProject, getProjectFiles])


  const getPackageJson = () => {
    if (files['package.json']) {
      try {
        return JSON.parse(files['package.json'])
      } catch {
        // Fallback if JSON is invalid
      }
    }
    
    return {
      name: "cipherstudio-app",
      version: "0.1.0",
      private: true,
      dependencies: {
        "react": "^18.0.0",
        "react-dom": "^18.0.0"
      }
    }
  }

  const getIndexHtml = () => {
    if (files['public/index.html']) {
      return files['public/index.html']
    }
    
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>React App</title>
    <style>
        body {
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
                'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
                sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }
        code {
            font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
                monospace;
        }
    </style>
</head>
<body>
    <div id="root"></div>
</body>
</html>`
  }

  const handleRefresh = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  if (!currentProject) {
    return (
      <div className="flex-1 bg-white dark:bg-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-400 dark:text-gray-500 mb-4">
            <Play size={64} className="mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No project loaded
          </h3>
          <p className="text-gray-500 dark:text-gray-400 max-w-sm">
            Create or load a project to see the live preview of your React application.
          </p>
        </div>
      </div>
    )
  }

  const packageJson = getPackageJson()
  const indexHtml = getIndexHtml()

  // Prepare files for Sandpack
  const sandpackFiles = {
    ...files,
    'package.json': JSON.stringify(packageJson, null, 2),
    'public/index.html': indexHtml
  }

  return (
    <div className="flex-1 bg-white dark:bg-gray-800 flex flex-col">
      <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Play size={16} className="text-green-500" />
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Live Preview
            </h3>
            <span className="text-xs text-gray-500 dark:text-gray-400 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded">
              Running
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleRefresh}
              className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors"
              title="Refresh preview"
            >
              <RefreshCw size={14} className={isLoading ? 'animate-spin' : ''} />
            </button>
            <button
              className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors"
              title="Open in new tab"
            >
              <ExternalLink size={14} />
            </button>
          </div>
        </div>
      </div>
      
      <div className="flex-1 relative">
        <SandpackThemeProvider theme={theme === 'dark' ? 'dark' : 'light'}>
          <Sandpack
            template="react"
            files={sandpackFiles}
            options={{
              showTabs: false,
              showLineNumbers: false,
              showNavigator: false,
              showRefreshButton: false,
              showConsole: false,
              showConsoleButton: false,
              showErrorScreen: true,
              wrapContent: true,
              editorHeight: '100%',
              editorWidthPercentage: 0,
              autorun: true,
              autoReload: true,
              recompileMode: 'delayed',
              recompileDelay: 300
            }}
            customSetup={{
              dependencies: packageJson.dependencies || {
                'react': '^18.0.0',
                'react-dom': '^18.0.0'
              }
            }}
          />
        </SandpackThemeProvider>
      </div>
    </div>
  )
}
