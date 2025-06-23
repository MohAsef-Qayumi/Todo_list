import { useState, useEffect } from "react";
import { supabase, isSupabaseConfigured } from "../lib/supabase";
import toast from "react-hot-toast";

// Generate a simple ID for local storage
const generateId = () => Math.ceil(Math.random() * 100);

export function useTodos() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const useSupabase = isSupabaseConfigured();
  
  // Local storage functions
  const getLocalTodos = () => {
    try {
      const stored = localStorage.getItem("todos");
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error("Error reading from localStorage:", error);
      return [];
    }
  };

  const saveLocalTodos = (todosToSave) => {
    try {
      localStorage.setItem("todos", JSON.stringify(todosToSave));
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  };

  const fetchTodos = async () => {
    try {
      if (useSupabase) {
        const { data, error } = await supabase
          .from("todos")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        setTodos(data || []);
      } else {
        // Use localStorage
        const localTodos = getLocalTodos();
        setTodos(localTodos);
      }
    } catch (error) {
      console.error("Error fetching todos:", error);
      toast.error("Failed to load todos");
      // Fallback to localStorage if Supabase fails
      const localTodos = getLocalTodos();
      setTodos(localTodos);
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async (title, description, priority = "medium", due_date) => {
    try {
      const newTodo = {
        id: generateId(), 
        title,
        description,
        priority,
        due_date,
        completed: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      if (useSupabase) {
        const { data, error } = await supabase
          .from("todos")
          .insert([newTodo])
          .select()
          .single();

        if (error) throw error;
        setTodos((prev) => [data, ...prev]);
      } else {
        // Use localStorage
        const updatedTodos = [newTodo, ...todos];
        setTodos(updatedTodos);
        saveLocalTodos(updatedTodos);
      }

      toast.success("Todo added successfully!");
    } catch (error) {
      console.error("Error adding todo:", error);
      toast.error("Failed to add todo");
    }
  };

  const updateTodo = async (id, updates) => {
    try {
      const updatedData = { ...updates, updated_at: new Date().toISOString() };

      if (useSupabase) {
        const { data, error } = await supabase
          .from("todos")
          .update(updatedData)
          .eq("id", id)
          .select()
          .single();

        if (error) throw error;
        setTodos((prev) => prev.map((todo) => (todo.id === id ? data : todo)));
      } else {
        // Use localStorage
        const updatedTodos = todos.map((todo) =>
          todo.id === id ? { ...todo, ...updatedData } : todo
        );
        setTodos(updatedTodos);
        saveLocalTodos(updatedTodos);
      }

      toast.success("Todo updated successfully!");
    } catch (error) {
      console.error("Error updating todo:", error);
      toast.error("Failed to update todo");
    }
  };

  const deleteTodo = async (id) => {
    try {
      if (useSupabase) {
        const { error } = await supabase.from("todos").delete().eq("id", id);

        if (error) throw error;
      }

      // Update local state regardless of storage method
      const updatedTodos = todos.filter((todo) => todo.id !== id);
      setTodos(updatedTodos);

      if (!useSupabase) {
        saveLocalTodos(updatedTodos);
      }

      toast.success("Todo deleted successfully!");
    } catch (error) {
      console.error("Error deleting todo:", error);
      toast.error("Failed to delete todo");
    }
  };

  const toggleTodo = async (id) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;

    await updateTodo(id, { completed: !todo.completed });
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return {
    todos,
    loading,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    refetch: fetchTodos,
  };
}
