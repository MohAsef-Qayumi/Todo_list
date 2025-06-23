import React, { useState } from 'react'
import { Plus, Calendar, Flag } from 'lucide-react'

export function TodoForm({ onSubmit }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('medium')
  const [dueDate, setDueDate] = useState('')
  const [showDetails, setShowDetails] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim()) return
    
    onSubmit(title, description || undefined, priority, dueDate || undefined)
    setTitle('')
    setDescription('')
    setPriority('medium')
    setDueDate('')
    setShowDetails(false)
  }

  const priorityColors = {
    low: 'text-green-600 bg-green-50',
    medium: 'text-yellow-600 bg-yellow-50',
    high: 'text-red-600 bg-red-50'
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl">
      <div className="flex gap-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What needs to be done?"
          className="flex-1 bg-white/20 border-0 rounded-xl px-4 py-3 text-white placeholder-white/60 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-200"
        />
        <button
          type="button"
          onClick={() => setShowDetails(!showDetails)}
          className="px-4 py-3 bg-white/20 hover:bg-white/30 rounded-xl transition-all duration-200 text-white/80 hover:text-white"
        >
          <Flag size={20} />
        </button>
        <button
          type="submit"
          disabled={!title.trim()}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 rounded-xl text-white font-medium transition-all duration-200 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed shadow-lg"
        >
          <Plus size={20} />
        </button>
      </div>

      {showDetails && (
        <div className="mt-4 space-y-4 animate-in slide-in-from-top duration-200">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add a description..."
            rows={3}
            className="w-full bg-white/20 border-0 rounded-xl px-4 py-3 text-white placeholder-white/60 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-200 resize-none"
          />
          
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-white/80 text-sm font-medium mb-2">Priority</label>
              <div className="flex gap-2">
                {['low', 'medium', 'high'].map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPriority(p)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      priority === p
                        ? priorityColors[p]
                        : 'text-white/60 bg-white/10 hover:bg-white/20'
                    }`}
                  >
                    {p.charAt(0).toUpperCase() + p.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex-1">
              <label className="block text-white/80 text-sm font-medium mb-2">Due Date</label>
              <div className="relative">
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full bg-white/20 border-0 rounded-xl px-4 py-2 text-white focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-200"
                />
                <Calendar className="absolute right-3 top-2.5 w-4 h-4 text-white/60 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      )}
    </form>
  )
}