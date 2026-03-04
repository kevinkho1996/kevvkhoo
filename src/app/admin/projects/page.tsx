'use client'

import React, { useContext, useState, useEffect } from 'react'
import { Plus, List, Grid, PenLine, Trash2, X } from 'lucide-react'
import { AdminHeader } from '../components/AdminHeader'
import { AdminContext } from '../AdminLayoutWrapper'
import { db } from '@/lib/firebase'
import {
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore'

interface Project {
  id: string
  title: string
  subtitle: string
  date: string
  bgColor: string
  textColor: string
  url?: string
  createdAt?: string
}

export default function ProjectRegistryPage() {
  const { toggleSidebar } = useContext(AdminContext)
  const [projects, setProjects] = useState<Project[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [newProject, setNewProject] = useState({
    title: '',
    subtitle: '',
    url: '',
  })

  useEffect(() => {
    const q = collection(db, 'portfolio_projects')
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const projData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Project[]

      // Sort ascending by title (A-Z)
      projData.sort((a, b) => a.title.localeCompare(b.title))

      setProjects(projData)
    })
    return () => unsubscribe()
  }, [])

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingProject) {
        await updateDoc(doc(db, 'portfolio_projects', editingProject.id), {
          ...newProject,
        })
      } else {
        await addDoc(collection(db, 'portfolio_projects'), {
          ...newProject,
          date: new Date().toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          }),
          createdAt: new Date().toISOString(),
        })
      }
      handleCloseModal()
    } catch (error) {
      console.error('Error saving project: ', error)
      alert('Failed to save project. Make sure you have permission.')
    }
  }

  const handleEditClick = (item: Project) => {
    setEditingProject(item)
    setNewProject({
      title: item.title,
      subtitle: item.subtitle,
      url: item.url || '',
    })
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingProject(null)
    setNewProject({
      title: '',
      subtitle: '',
      url: '',
    })
  }

  const handleDeleteProject = (id: string) => {
    setProjectToDelete(id)
  }

  const confirmDeleteProject = async () => {
    if (!projectToDelete) return
    try {
      await deleteDoc(doc(db, 'portfolio_projects', projectToDelete))
      setProjectToDelete(null)
    } catch (error) {
      console.error('Error deleting project: ', error)
      alert('Failed to delete project. Make sure you have permission.')
    }
  }

  return (
    <>
      <AdminHeader title="Project Registry" onToggleSidebar={toggleSidebar} />

      <div className="flex items-center justify-end mb-6 gap-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors flex items-center gap-2 shadow-sm shadow-indigo-500/20"
        >
          <Plus className="w-4 h-4" /> Add Project
        </button>
        <div className="flex items-center text-slate-400 drop-shadow-sm border-l border-slate-200 dark:border-white/10 pl-4">
          <button
            onClick={() => setViewMode('list')}
            className={`p-1 rounded transition-colors ${viewMode === 'list' ? 'bg-indigo-50 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400' : 'hover:text-slate-800 dark:hover:text-white'}`}
          >
            <List className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`p-1 rounded transition-colors ${viewMode === 'grid' ? 'bg-indigo-50 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400' : 'hover:text-slate-800 dark:hover:text-white'}`}
          >
            <Grid className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div
        className={
          viewMode === 'grid'
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
            : 'flex flex-col gap-4'
        }
      >
        {projects.length === 0 ? (
          <div className="col-span-full py-12 text-center text-slate-400">
            No projects found. Add one to get started!
          </div>
        ) : (
          projects.map((item) => (
            <div
              key={item.id}
              className={`bg-[#f4f7fe] dark:bg-white/5 ${viewMode === 'grid' ? 'rounded-3xl p-6 flex-col' : 'rounded-2xl p-4 flex-row items-center'} flex shadow-sm border border-slate-200 dark:border-white/10 relative group transition-all hover:-translate-y-1`}
            >
              <div
                className={`absolute ${viewMode === 'grid' ? 'top-4 right-4' : 'top-1/2 -translate-y-1/2 right-4'} opacity-0 group-hover:opacity-100 transition-opacity flex gap-2`}
              >
                <button
                  onClick={() => handleEditClick(item)}
                  className="p-2 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-full text-slate-700 dark:text-slate-300 transition-colors shadow-sm"
                >
                  <PenLine className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteProject(item.id)}
                  className="p-2 bg-white dark:bg-slate-800 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-full text-red-500 transition-colors shadow-sm"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {viewMode === 'grid' ? (
                <>
                  <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-4 bg-white dark:bg-slate-800/50 w-fit px-3 py-1 rounded-full">
                    {item.date}
                  </div>
                  <div className="flex flex-col items-start justify-center flex-1 py-8">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 text-left">
                      {item.title}
                    </h3>
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400 text-left">
                      {item.subtitle}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex flex-col items-start justify-center flex-1 pr-24">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                        {item.title}
                      </h3>
                      <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 px-2 py-1 bg-white/50 dark:bg-slate-800/50 rounded-full">
                        {item.date}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                      {item.subtitle}
                    </p>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#181d2f] rounded-[2rem] p-8 w-full max-w-md shadow-xl border border-slate-200 dark:border-white/5 relative">
            <button
              onClick={handleCloseModal}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 dark:hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">
              {editingProject ? 'Edit Project' : 'Create Project'}
            </h2>

            <form onSubmit={handleAddProject} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Title
                </label>
                <input
                  required
                  value={newProject.title}
                  onChange={(e) =>
                    setNewProject({ ...newProject, title: e.target.value })
                  }
                  type="text"
                  className="w-full bg-[#f4f7fe] dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="E.g. Profile Portfolio"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Subtitle / Category
                </label>
                <input
                  required
                  value={newProject.subtitle}
                  onChange={(e) =>
                    setNewProject({ ...newProject, subtitle: e.target.value })
                  }
                  type="text"
                  className="w-full bg-[#f4f7fe] dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="E.g. Frontend"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Project URL (Optional)
                </label>
                <input
                  value={newProject.url}
                  onChange={(e) =>
                    setNewProject({ ...newProject, url: e.target.value })
                  }
                  type="url"
                  className="w-full bg-[#f4f7fe] dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="https://..."
                />
              </div>

              <button
                type="submit"
                className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white w-full py-3 rounded-xl font-medium transition-colors shadow-md shadow-indigo-500/20"
              >
                {editingProject ? 'Save Changes' : 'Save Project'}
              </button>
            </form>
          </div>
        </div>
      )}

      {projectToDelete && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#181d2f] rounded-[2rem] p-8 w-full max-w-sm shadow-xl border border-slate-200 dark:border-white/5 relative text-center">
            <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-500/20 text-red-500 flex items-center justify-center mx-auto mb-6">
              <Trash2 className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
              Delete Project
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mb-8">
              Are you sure you want to delete this project? This action cannot
              be undone.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setProjectToDelete(null)}
                className="flex-1 bg-[#f4f7fe] hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 py-3 rounded-xl font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteProject}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-medium transition-colors shadow-md shadow-red-500/20"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
