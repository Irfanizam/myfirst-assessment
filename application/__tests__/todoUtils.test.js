import { getTodos, addTodo, updateTodo, deleteTodo } from '../utils/todoUtils';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getCountFromServer,
  where,
  query,
  orderBy,
  limit,
  startAfter
} from 'firebase/firestore';
import { db } from '../utils/fireStore';

jest.mock('firebase/firestore');
jest.mock('../utils/fireStore', () => ({ db: {} }));

describe('Todo API', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    collection.mockReturnValue('mocked-collection-ref');
    doc.mockReturnValue('mocked-doc-ref');
    query.mockImplementation(() => 'mocked-query');
    orderBy.mockImplementation(() => 'mocked-orderby');
    limit.mockImplementation(() => 'mocked-limit');
    startAfter.mockImplementation(() => 'mocked-startafter');
    where.mockImplementation(() => 'mocked-where');

    getCountFromServer.mockResolvedValue({
      data: () => ({ count: 1 })
    });
  });

  const testTodo = {
    id: 'test123',
    text: 'Test todo',
    completed: false,
    createdAt: new Date().toISOString()
  };

  it('should fetch todos', async () => {
    const mockTodos = [testTodo];

    getDocs.mockResolvedValueOnce({
      forEach: function (callback) {
        mockTodos.forEach(todo =>
          callback({
            id: todo.id,
            data: () => ({
              text: todo.text,
              completed: todo.completed,
              createdAt: todo.createdAt
            })
          })
        );
      },
      docs: mockTodos.map(todo => ({
        id: todo.id,
        data: () => ({
          text: todo.text,
          completed: todo.completed,
          createdAt: todo.createdAt
        })
      }))
    });

    const result = await getTodos(1);

    expect(result.todos).toHaveLength(1);
    expect(result.todos[0].text).toBe('Test todo');
    expect(getDocs).toHaveBeenCalledTimes(1);
  });

  it('should add a new todo', async () => {
    addDoc.mockResolvedValueOnce({ id: 'new-todo-id' });

    const newTodo = { text: 'New todo', completed: false };
    const result = await addTodo(newTodo);

    expect(result.id).toBe('new-todo-id');
    expect(addDoc).toHaveBeenCalledWith(
      'mocked-collection-ref',
      expect.objectContaining({
        text: 'New todo',
        completed: false,
        createdAt: expect.any(String),
        updatedAt: expect.any(String)
      })
    );
  });

  it('should update a todo', async () => {
    updateDoc.mockResolvedValueOnce();

    const updates = { completed: true };
    await updateTodo('todo123', updates);

    expect(updateDoc).toHaveBeenCalledWith(
      'mocked-doc-ref',
      expect.objectContaining({
        completed: true,
        updatedAt: expect.any(String)
      })
    );
  });

  it('should delete a todo', async () => {
    deleteDoc.mockResolvedValueOnce();

    await deleteTodo('todo123');
    expect(deleteDoc).toHaveBeenCalledWith('mocked-doc-ref');
    expect(deleteDoc).toHaveBeenCalledTimes(1);
  });

  it('should handle errors when fetching todos fails', async () => {
    getDocs.mockRejectedValueOnce(new Error('Failed to fetch todos'));

    await expect(getTodos(1)).rejects.toThrow('Failed to fetch todos');
  });
});
