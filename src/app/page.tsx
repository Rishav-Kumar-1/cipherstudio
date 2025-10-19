'use client'

import { Header } from '@/components/Header'
import { FileExplorer } from '@/components/FileExplorer'
import { CodeEditor } from '@/components/CodeEditor'
import { LivePreview } from '@/components/LivePreview'

export default function Home() {
  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Header />
      <div className="flex-1 flex overflow-hidden">
        <FileExplorer />
        <CodeEditor />
        <LivePreview />
      </div>
    </div>
  )
}