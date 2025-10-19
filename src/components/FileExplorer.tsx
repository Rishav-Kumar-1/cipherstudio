'use client'

import { useState } from 'react'
import { useProject } from '@/contexts/ProjectContext'
import { FileItem } from '@/contexts/ProjectContext'
import { 
  File, 
  Folder, 
  FolderOpen, 
  Plus, 
  Trash2, 
  Edit2, 
  Check, 
  X,
  ChevronRight,
  ChevronDown
} from 'lucide-react'

interface FileTreeItemProps {
  file: FileItem
  level: number
}

export function FileExplorer() {
  const { currentProject, createFile, deleteFile, renameFile, setCurrentFile } = useProject()
  const [editingFile, setEditingFile] = useState<string | null>(null)
  const [editName, setEditName] = useState('')
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['src']))

  const handleCreateFile = (type: 'file' | 'folder', parentId?: string) => {
    const name = prompt(`Enter ${type} name:`)
    if (name && name.trim()) {
      createFile(name.trim(), type, parentId)
    }
  }

  const handleRename = (fileId: string, currentName: string) => {
    setEditingFile(fileId)
    setEditName(currentName)
  }

  const handleSaveRename = (fileId: string) => {
    if (editName.trim()) {
      renameFile(fileId, editName.trim())
    }
    setEditingFile(null)
    setEditName('')
  }

  const handleCancelRename = () => {
    setEditingFile(null)
    setEditName('')
  }

  const toggleFolder = (fileId: string) => {
    setExpandedFolders(prev => {
      const newSet = new Set(prev)
      if (newSet.has(fileId)) {
        newSet.delete(fileId)
      } else {
        newSet.add(fileId)
      }
      return newSet
    })
  }

  const FileTreeItem = ({ file, level }: FileTreeItemProps) => {
    const isExpanded = expandedFolders.has(file.id)
    const isFolder = file.type === 'folder'

    return (
      <div>
        <div
          className={`flex items-center py-1 px-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer group ${
            level > 0 ? `ml-${level * 4}` : ''
          }`}
          style={{ paddingLeft: `${level * 16 + 8}px` }}
        >
          <div className="flex items-center flex-1">
            {isFolder && (
              <button
                onClick={() => toggleFolder(file.id)}
                className="mr-1 p-0.5 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
              >
                {isExpanded ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
              </button>
            )}
            {!isFolder && <div className="w-4" />}
            
            <button
              onClick={() => {
                if (isFolder) {
                  toggleFolder(file.id)
                } else {
                  setCurrentFile(file)
                }
              }}
              className="flex items-center flex-1 text-left"
            >
              {isFolder ? (
                isExpanded ? <FolderOpen size={16} className="text-blue-500" /> : <Folder size={16} className="text-blue-500" />
              ) : (
                <File size={16} className="text-gray-500" />
              )}
              <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                {editingFile === file.id ? (
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') handleSaveRename(file.id)
                      if (e.key === 'Escape') handleCancelRename()
                    }}
                    className="bg-transparent border-b border-blue-500 outline-none text-sm w-full"
                    autoFocus
                  />
                ) : (
                  file.name
                )}
              </span>
            </button>
          </div>

          <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
            {editingFile === file.id ? (
              <>
                <button
                  onClick={() => handleSaveRename(file.id)}
                  className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
                  title="Save"
                >
                  <Check size={12} />
                </button>
                <button
                  onClick={handleCancelRename}
                  className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
                  title="Cancel"
                >
                  <X size={12} />
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => handleCreateFile('file', isFolder ? file.id : file.parentId)}
                  className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
                  title="Add file"
                >
                  <Plus size={12} />
                </button>
                {isFolder && (
                  <button
                    onClick={() => handleCreateFile('folder', file.id)}
                    className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
                    title="Add folder"
                  >
                    <Folder size={12} />
                  </button>
                )}
                <button
                  onClick={() => handleRename(file.id, file.name)}
                  className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
                  title="Rename"
                >
                  <Edit2 size={12} />
                </button>
                <button
                  onClick={() => {
                    if (confirm(`Are you sure you want to delete "${file.name}"?`)) {
                      deleteFile(file.id)
                    }
                  }}
                  className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded text-red-600"
                  title="Delete"
                >
                  <Trash2 size={12} />
                </button>
              </>
            )}
          </div>
        </div>

        {isFolder && isExpanded && file.children && (
          <div>
            {file.children.map((child) => (
              <FileTreeItem key={child.id} file={child} level={level + 1} />
            ))}
          </div>
        )}
      </div>
    )
  }

  if (!currentProject) {
    return (
      <div className="w-64 bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4">
        <div className="text-center">
          <Folder size={48} className="mx-auto text-gray-400 dark:text-gray-500 mb-2" />
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            No project loaded
          </p>
          <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">
            Create a new project to get started
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-64 bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
      <div className="p-3 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          Explorer
        </h3>
      </div>
      <div className="flex-1 overflow-y-auto">
        {currentProject.files.map((file) => (
          <FileTreeItem key={file.id} file={file} level={0} />
        ))}
      </div>
    </div>
  )
}
