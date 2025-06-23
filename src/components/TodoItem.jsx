import React, { useState } from 'react'
import { Check, X, Edit2, Calendar, Flag, Trash2 } from 'lucide-react'

export function TodoItem({ todo, onToggle, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(todo.title)
  const [editDescription, setEditDescription] = useState(todo.description || '')

  const handleSave = () => {
    if (editTitle.trim()) {
      onUpdate(todo.id, {
        title: editTitle,
        description: editDescription || undefined
      })
      setIsEditing(false)
    }
  }

  const handleCancel = () => {
    setEditTitle(todo.title)
    setEditDescription(todo.description || '')
    setIsEditing(false)
  }

  const priorityColors = {
    low: 'border-l-green-400 bg-green-50/50',
    medium: 'border-l-yellow-400 bg-yellow-50/50',
    high: 'border-l-red-400 bg-red-50/50'
  }

  const priorityIcons = {
    low: 'text-green-600',
    medium: 'text-yellow-600',
    high: 'text-red-600'
  }

  const isOverdue = todo.due_date && new Date(todo.due_date) < new Date() && !todo.completed

  return (
    <div className={`bg-white/20 backdrop-blur-md rounded-xl p-4 border-l-4 ${priorityColors[todo.priority]} border border-white/20 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02] group`}>
      <div className="flex items-start gap-3">
        <button
          onClick={() => onToggle(todo.id)}
          className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
            todo.completed
              ? 'bg-green-500 border-green-500 text-white'
              : 'border-white/40 hover:border-white/60 hover:bg-white/10'
          }`}
        >
          {todo.completed && <Check size={12} />}
        </button>

        <div className="flex-1 min-w-0">
          {isEditing ? (
            <div className="space-y-3">
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="w-full bg-white/20 border-0 rounded-lg px-3 py-2 text-white placeholder-white/60 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                autoFocus
              />
              <textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                placeholder="Add a description..."
                rows={2}
                className="w-full bg-white/20 border-0 rounded-lg px-3 py-2 text-white placeholder-white/60 focus:ring-2 focus:ring-blue-400 focus:outline-none resize-none"
              />
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className="px-3 py-1 bg-green-500 hover:bg-green-600 rounded-lg text-white text-sm transition-colors duration-200"
                >
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="px-3 py-1 bg-gray-500 hover:bg-gray-600 rounded-lg text-white text-sm transition-colors duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div>
              <h3 className={`font-medium transition-all duration-200 ${
                todo.completed ? 'line-through text-white/60' : 'text-white'
              }`}>
                {todo.title}
              </h3>
              {todo.description && (
                <p className={`text-sm mt-1 transition-all duration-200 ${
                  todo.completed ? 'line-through text-white/40' : 'text-white/70'
                }`}>
                  {todo.description}
                </p>
              )}
              <div className="flex items-center gap-4 mt-3 text-xs text-white/60">
                <div className="flex items-center gap-1">
                  <Flag size={12} className={priorityIcons[todo.priority]} />
                  <span className="capitalize">{todo.priority}</span>
                </div>
                {todo.due_date && (
                  <div className={`flex items-center gap-1 ${isOverdue ? 'text-red-400' : ''}`}>
                    <Calendar size={12} />
                    <span>{new Date(todo.due_date).toLocaleDateString()}</span>
                    {isOverdue && <span className="text-red-400 font-medium">(Overdue)</span>}
                  </div>
                )}
                <span className="text-white/40">
                  {new Date(todo.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {!isEditing && (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
              >
                <Edit2 size={14} />
              </button>
              <button
                onClick={() => onDelete(todo.id)}
                className="p-2 text-white/60 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-200"
              >
                <Trash2 size={14} />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}