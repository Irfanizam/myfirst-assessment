import { addDoc, updateDoc, deleteDoc, collection, doc, onSnapshot } from '@firebase/firestore';
import { db } from '@/utils/fireStore';

// Mock Firebase modules
jest.mock('@firebase/firestore');

// Mock the Firestore instance methods
jest.mock('@/utils/fireStore', () => ({
  db: {},
  collection: jest.fn(),
  doc: jest.fn(),
  addDoc: jest.fn(),
  updateDoc: jest.fn(),
  deleteDoc: jest.fn(),
  onSnapshot: jest.fn(),
}));

describe('To-Do API', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  describe('addDoc', () => {
    it('should add a new todo item', async () => {
      // Mock implementation
      const mockTask = { name: 'Test Task' };
      addDoc.mockResolvedValue({ id: '123', ...mockTask });
      
      // Import the component that uses the API
      const { default: AddItem } = await import('@/components/todoComp/AddItem');
      const { render, fireEvent, screen } = require('@testing-library/react');
      
      // Render the component
      render(<AddItem />);
      
      // Simulate user input and form submission
      const input = screen.getByPlaceholderText('Add a new task...');
      const button = screen.getByText('Add Item');
      
      fireEvent.change(input, { target: { value: 'Test Task' } });
      fireEvent.click(button);
      
      // Verify the API was called correctly
      expect(collection).toHaveBeenCalledWith(db, 'items');
      expect(addDoc).toHaveBeenCalledWith(expect.anything(), { name: 'Test Task' });
    });
  });

  describe('updateDoc', () => {
    it('should update an existing todo item', async () => {
      // Mock implementation
      updateDoc.mockResolvedValue({});
      
      // Import the component that uses the API
      const { default: UpdateItem } = await import('@/components/todoComp/UpdateItem');
      const { render, fireEvent, screen } = require('@testing-library/react');
      
      // Render the component
      render(<UpdateItem id="123" currentName="Old Task" />);
      
      // Open the edit modal
      const editButton = screen.getByText('Edit');
      fireEvent.click(editButton);
      
      // Find and update the input
      const input = screen.getByDisplayValue('Old Task');
      const saveButton = screen.getByText('Save');
      
      fireEvent.change(input, { target: { value: 'Updated Task' } });
      fireEvent.click(saveButton);
      
      // Verify the API was called correctly
      expect(doc).toHaveBeenCalledWith(db, 'items', '123');
      expect(updateDoc).toHaveBeenCalledWith(expect.anything(), { name: 'Updated Task' });
    });
  });

  describe('deleteDoc', () => {
    it('should delete a todo item', async () => {
      // Mock implementation
      deleteDoc.mockResolvedValue({});
      
      // Import the component that uses the API
      const { default: DeleteItem } = await import('@/components/todoComp/DeleteItem');
      const { render, fireEvent, screen } = require('@testing-library/react');
      
      // Render the component
      render(<DeleteItem id="123" />);
      
      // Click the delete button
      const deleteButton = screen.getByText('Delete');
      fireEvent.click(deleteButton);
      
      // Verify the API was called correctly
      expect(doc).toHaveBeenCalledWith(db, 'items', '123');
      expect(deleteDoc).toHaveBeenCalled();
    });
  });

  describe('onSnapshot', () => {
    it('should listen for real-time updates', () => {
      // Import the component that uses the API
      const { default: ListItems } = require('@/components/todoComp/ListItem');
      const { render } = require('@testing-library/react');
      
      // Mock the onSnapshot callback
      const mockOnSnapshot = jest.fn((query, callback) => {
        // Simulate Firestore snapshot
        callback({
          docs: [
            {
              id: '1',
              data: () => ({ name: 'Test Task 1' })
            }
          ]
        });
        
        // Return the unsubscribe function
        return () => {};
      });
      
      // Mock the collection and onSnapshot functions
      collection.mockReturnValue('mock-collection');
      onSnapshot.mockImplementation(mockOnSnapshot);
      
      // Render the component
      render(<ListItems />);
      
      // Verify the listener was set up correctly
      expect(collection).toHaveBeenCalledWith(db, 'items');
      expect(onSnapshot).toHaveBeenCalledWith('mock-collection', expect.any(Function));
    });
  });
});
