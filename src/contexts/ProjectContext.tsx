'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

export interface FileItem {
  id: string
  name: string
  type: 'file' | 'folder'
  content?: string
  parentId?: string
  children?: FileItem[]
}

export interface Project {
  id: string
  name: string
  files: FileItem[]
  createdAt: Date
  updatedAt: Date
}

interface ProjectContextType {
  currentProject: Project | null
  projects: Project[]
  createProject: (name: string) => void
  loadProject: (projectId: string) => void
  saveProject: () => void
  createFile: (name: string, type: 'file' | 'folder', parentId?: string) => void
  deleteFile: (fileId: string) => void
  updateFileContent: (fileId: string, content: string) => void
  renameFile: (fileId: string, newName: string) => void
  setCurrentFile: (file: FileItem | null) => void
  currentFile: FileItem | null
  getProjectFiles: () => { [key: string]: string }
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined)

export function ProjectProvider({ children }: { children: React.ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([])
  const [currentProject, setCurrentProject] = useState<Project | null>(null)
  const [currentFile, setCurrentFile] = useState<FileItem | null>(null)

  useEffect(() => {
    const savedProjects = localStorage.getItem('cipherstudio-projects')
    if (savedProjects) {
      try {
        const parsed = JSON.parse(savedProjects)
        setProjects(parsed.map((p: any) => ({
          ...p,
          createdAt: new Date(p.createdAt),
          updatedAt: new Date(p.updatedAt)
        })))
      } catch (error) {
        console.error('Error loading projects:', error)
      }
    }
  }, [])

  const createProject = (name: string) => {
    const newProject: Project = {
      id: uuidv4(),
      name,
      files: [
        {
          id: uuidv4(),
          name: 'src',
          type: 'folder',
          children: [
            {
              id: uuidv4(),
              name: 'App.js',
              type: 'file',
              content: `import React from 'react';

function App() {
  return (
    <div className="App">
      <h1>Hello, CipherStudio!</h1>
      <p>Start coding your React app here.</p>
      <button onClick={() => alert('Hello from CipherStudio!')}>
        Click me!
      </button>
    </div>
  );
}

export default App;`
            },
            {
              id: uuidv4(),
              name: 'index.js',
              type: 'file',
              content: `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);`
            }
          ]
        },
        {
          id: uuidv4(),
          name: 'public',
          type: 'folder',
          children: [
            {
              id: uuidv4(),
              name: 'index.html',
              type: 'file',
              content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>React App</title>
</head>
<body>
    <div id="root"></div>
</body>
</html>`
            }
          ]
        },
        {
          id: uuidv4(),
          name: 'package.json',
          type: 'file',
          content: `{
  "name": "my-react-app",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  }
}`
        }
      ],
      createdAt: new Date(),
      updatedAt: new Date()
    }

    setProjects(prev => [...prev, newProject])
    setCurrentProject(newProject)
    setCurrentFile(newProject.files[0].children?.[0] || null)
  }

  const loadProject = (projectId: string) => {
    const project = projects.find(p => p.id === projectId)
    if (project) {
      setCurrentProject(project)
      setCurrentFile(project.files[0].children?.[0] || null)
    }
  }

  const saveProject = () => {
    if (currentProject) {
      const updatedProject = {
        ...currentProject,
        updatedAt: new Date()
      }
      setProjects(prev => prev.map(p => p.id === currentProject.id ? updatedProject : p))
      setCurrentProject(updatedProject)
      localStorage.setItem('cipherstudio-projects', JSON.stringify(projects))
    }
  }

  const createFile = (name: string, type: 'file' | 'folder', parentId?: string) => {
    if (!currentProject) return

    const newFile: FileItem = {
      id: uuidv4(),
      name,
      type,
      content: type === 'file' ? '' : undefined,
      parentId,
      children: type === 'folder' ? [] : undefined
    }

    const updateFiles = (files: FileItem[]): FileItem[] => {
      if (!parentId) {
        return [...files, newFile]
      }
      return files.map(file => {
        if (file.id === parentId) {
          return {
            ...file,
            children: [...(file.children || []), newFile]
          }
        }
        if (file.children) {
          return {
            ...file,
            children: updateFiles(file.children)
          }
        }
        return file
      })
    }

    const updatedFiles = updateFiles(currentProject.files)
    const updatedProject = {
      ...currentProject,
      files: updatedFiles,
      updatedAt: new Date()
    }

    setCurrentProject(updatedProject)
    setProjects(prev => prev.map(p => p.id === currentProject.id ? updatedProject : p))
  }

  const deleteFile = (fileId: string) => {
    if (!currentProject) return

    const removeFile = (files: FileItem[]): FileItem[] => {
      return files.filter(file => {
        if (file.id === fileId) return false
        if (file.children) {
          file.children = removeFile(file.children)
        }
        return true
      })
    }

    const updatedFiles = removeFile(currentProject.files)
    const updatedProject = {
      ...currentProject,
      files: updatedFiles,
      updatedAt: new Date()
    }

    setCurrentProject(updatedProject)
    setProjects(prev => prev.map(p => p.id === currentProject.id ? updatedProject : p))
    
    if (currentFile?.id === fileId) {
      setCurrentFile(null)
    }
  }

  const updateFileContent = (fileId: string, content: string) => {
    if (!currentProject) return

    const updateFile = (files: FileItem[]): FileItem[] => {
      return files.map(file => {
        if (file.id === fileId) {
          return { ...file, content }
        }
        if (file.children) {
          return { ...file, children: updateFile(file.children) }
        }
        return file
      })
    }

    const updatedFiles = updateFile(currentProject.files)
    const updatedProject = {
      ...currentProject,
      files: updatedFiles,
      updatedAt: new Date()
    }

    setCurrentProject(updatedProject)
    setProjects(prev => prev.map(p => p.id === currentProject.id ? updatedProject : p))
    
    if (currentFile?.id === fileId) {
      setCurrentFile({ ...currentFile, content })
    }
  }

  const renameFile = (fileId: string, newName: string) => {
    if (!currentProject) return

    const renameFileInTree = (files: FileItem[]): FileItem[] => {
      return files.map(file => {
        if (file.id === fileId) {
          return { ...file, name: newName }
        }
        if (file.children) {
          return { ...file, children: renameFileInTree(file.children) }
        }
        return file
      })
    }

    const updatedFiles = renameFileInTree(currentProject.files)
    const updatedProject = {
      ...currentProject,
      files: updatedFiles,
      updatedAt: new Date()
    }

    setCurrentProject(updatedProject)
    setProjects(prev => prev.map(p => p.id === currentProject.id ? updatedProject : p))
  }

  const getProjectFiles = () => {
    if (!currentProject) return {}
    
    const files: { [key: string]: string } = {}
    
    const extractFiles = (fileList: FileItem[], path = '') => {
      fileList.forEach(file => {
        const currentPath = path ? `${path}/${file.name}` : file.name
        if (file.type === 'file' && file.content !== undefined) {
          files[currentPath] = file.content
        }
        if (file.children) {
          extractFiles(file.children, currentPath)
        }
      })
    }
    
    extractFiles(currentProject.files)
    return files
  }

  return (
    <ProjectContext.Provider value={{
      currentProject,
      projects,
      createProject,
      loadProject,
      saveProject,
      createFile,
      deleteFile,
      updateFileContent,
      renameFile,
      setCurrentFile,
      currentFile,
      getProjectFiles
    }}>
      {children}
    </ProjectContext.Provider>
  )
}

export function useProject() {
  const context = useContext(ProjectContext)
  if (context === undefined) {
    throw new Error('useProject must be used within a ProjectProvider')
  }
  return context
}
