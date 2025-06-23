import React, { useState, useMemo } from 'react'
import { Toaster } from 'react-hot-toast'
import { CheckSquare, Sparkles } from 'lucide-react'
import { useTodos } from './hooks/useTodos'
import { TodoForm } from './components/TodoForm'
import { TodoItem } from './components/TodoItem'
import { TodoStats } from './components/TodoStats'
import { TodoFilters } from './components/TodoFilters'

function App() {
  const { todos, loading, addTodo, updateTodo, deleteTodo, toggleTodo } = useTodos()
  const [filter, setFilter] = useState('all')

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'active':
        return todos.filter(todo => !todo.completed)
      case 'completed':
        return todos.filter(todo => todo.completed)
      case 'overdue':
        return todos.filter(todo => 
          todo.due_date && 
          new Date(todo.due_date) < new Date() && 
          !todo.completed
        )
      default:
        return todos
    }
  }, [todos, filter])

  const counts = useMemo(() => ({
    all: todos.length,
    active: todos.filter(todo => !todo.completed).length,
    completed: todos.filter(todo => todo.completed).length,
    overdue: todos.filter(todo => 
      todo.due_date && 
      new Date(todo.due_date) < new Date() && 
      !todo.completed
    ).length,
  }), [todos])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white/80">Loading your todos...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl border border-white/20">
              <CheckSquare className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              TaskFlow
            </h1>
            <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
          </div>
          <p className="text-white/70 text-lg">
            Organize your life with style and elegance
          </p>
        </div>

        {/* Stats */}
        <TodoStats todos={todos} />

        {/* Todo Form */}
        <div className="mb-8">
          <TodoForm onSubmit={addTodo} />
        </div>

        {/* Filters */}
        <TodoFilters 
          currentFilter={filter}
          onFilterChange={setFilter}
          counts={counts}
        />

        {/* Todo List */}
        <div className="space-y-4">
          {filteredTodos.length === 0 ? (
            <div className="text-center py-12">
              <div className="p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 inline-block mb-4">
                <CheckSquare className="w-12 h-12 text-white/60" />
              </div>
              <p className="text-white/60 text-lg">
                {filter === 'all' 
                  ? "No todos yet. Create your first task above!" 
                  : `No ${filter} todos found.`
                }
              </p>
            </div>
          ) : (
            filteredTodos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                onUpdate={updateTodo}
              />
            ))
          )}
        </div>
        
      </div>

      <Toaster 
        position="top-right"
        toastOptions={{
          style: {
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            color: 'white',
            border: '1px solid rgba(255, 255, 255, 0.2)',
          },
        }}
      />
    </div>
  )
}

export default App