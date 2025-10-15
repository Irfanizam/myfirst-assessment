'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { addTodo, updateTodo, deleteTodo } from '@/utils/todoUtils';

export default function TodoList({ 
  initialTodos = [], 
  totalCount = 0, 
  totalPages = 1, 
  currentPage = 1, 
  hasNextPage = false,
  lastVisible = null
}) {
  const [todos, setTodos] = useState(initialTodos);
  const [newTodo, setNewTodo] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    setTodos(initialTodos);
  }, [initialTodos]);

  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    
    setIsLoading(true);
    try {
      const addedTodo = await addTodo({
        text: newTodo.trim(),
        completed: false
      });
      
      setNewTodo('');
      
      router.refresh();
    } catch (error) {
      console.error('Error adding todo:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleComplete = async (id, completed) => {
    try {
      await updateTodo(id, { completed: !completed });
      
      setTodos(todos.map(todo => 
        todo.id === id ? { ...todo, completed: !completed } : todo
      ));
      
      router.refresh();
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const handleStartEdit = (todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };

  const handleUpdateTodo = async (id) => {
    if (!editText.trim()) return;
    
    setIsLoading(true);
    try {
      await updateTodo(id, { text: editText.trim() });
      
      setTodos(todos.map(todo => 
        todo.id === id ? { ...todo, text: editText.trim() } : todo
      ));
      
      setEditingId(null);
    } catch (error) {
      console.error('Error updating todo:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this todo?')) return;
    
    try {
      await deleteTodo(id);
      
      setTodos(todos.filter(todo => todo.id !== id));
      
      router.refresh();
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', newPage);
    
    if (newPage > currentPage && lastVisible) {
      params.set('lastVisible', lastVisible);
    } else if (newPage < currentPage) {
      params.delete('lastVisible');
    }
    
    router.push(`/todo?${params.toString()}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <form onSubmit={handleAddTodo} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new todo..."
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            disabled={isLoading || !newTodo.trim()}
          >
            {isLoading ? 'Adding...' : 'Add'}
          </button>
        </div>
      </form>

      <div className="space-y-3 mb-6">
        {todos.length === 0 ? (
          <p className="text-gray-500 text-center py-4">
            {currentPage > 1 ? 'No more todos on this page.' : 'No todos found. Add one above!'}
          </p>
        ) : (
          <ul className="divide-y">
            {todos.map((todo) => (
              <li key={todo.id} className="py-3 flex items-center justify-between">
                <div className="flex items-center space-x-3 flex-1">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => handleToggleComplete(todo.id, todo.completed)}
                    className="h-5 w-5 text-blue-600 rounded"
                  />
                  {editingId === todo.id ? (
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      onBlur={() => handleUpdateTodo(todo.id)}
                      onKeyPress={(e) => e.key === 'Enter' && handleUpdateTodo(todo.id)}
                      autoFocus
                      className="flex-1 px-2 py-1 border rounded"
                    />
                  ) : (
                    <span 
                      className={`flex-1 ${todo.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}
                      onDoubleClick={() => handleStartEdit(todo)}
                    >
                      {todo.text}
                    </span>
                  )}
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleStartEdit(todo)}
                    className="text-blue-500 hover:text-blue-700"
                    disabled={isLoading}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(todo.id)}
                    className="text-red-500 hover:text-red-700"
                    disabled={isLoading}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-4 border-t pt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1 || isLoading}
            className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
          >
            Previous
          </button>
          
          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={!hasNextPage || isLoading}
            className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
