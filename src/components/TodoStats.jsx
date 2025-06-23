import React from 'react'
import { CheckCircle, Circle, Clock } from 'lucide-react'

export function TodoStats({ todos }) {
  const totalTodos = todos.length
  const completedTodos = todos.filter(todo => todo.completed).length
  const activeTodos = totalTodos - completedTodos
  const overdueTodos = todos.filter(todo => 
    todo.due_date && 
    new Date(todo.due_date) < new Date() && 
    !todo.completed
  ).length

  const completionPercentage = totalTodos > 0 ? (completedTodos / totalTodos) * 100 : 0

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500/20 rounded-lg">
            <Circle className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <p className="text-white/60 text-sm">Total Tasks</p>
            <p className="text-white text-xl font-bold">{totalTodos}</p>
          </div>
        </div>
      </div>

      <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-500/20 rounded-lg">
            <CheckCircle className="w-5 h-5 text-green-400" />
          </div>
          <div>
            <p className="text-white/60 text-sm">Completed</p>
            <p className="text-white text-xl font-bold">{completedTodos}</p>
          </div>
        </div>
      </div>

      <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-yellow-500/20 rounded-lg">
            <Clock className="w-5 h-5 text-yellow-400" />
          </div>
          <div>
            <p className="text-white/60 text-sm">Active</p>
            <p className="text-white text-xl font-bold">{activeTodos}</p>
          </div>
        </div>
      </div>

      <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-red-500/20 rounded-lg">
            <Clock className="w-5 h-5 text-red-400" />
          </div>
          <div>
            <p className="text-white/60 text-sm">Overdue</p>
            <p className="text-white text-xl font-bold">{overdueTodos}</p>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="md:col-span-4 bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
        <div className="flex items-center justify-between mb-2">
          <span className="text-white/80 font-medium">Progress</span>
          <span className="text-white font-bold">{Math.round(completionPercentage)}%</span>
        </div>
        <div className="w-full bg-white/20 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
      </div>
    </div>
  )
}