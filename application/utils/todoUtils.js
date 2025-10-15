import { 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  orderBy, 
  limit, 
  startAfter, 
  getCountFromServer, 
  getDoc,
  where
} from 'firebase/firestore';
import { db } from './fireStore';

const TODOS_PER_PAGE = 3;

export const getTodos = async (page = 1, lastVisible = null) => {
  try {
    const todosRef = collection(db, 'todos');
    let q = query(
      todosRef,
      orderBy('createdAt', 'desc'),
      limit(TODOS_PER_PAGE)
    );

    if (page > 1 && lastVisible) {
      const lastDocSnapshot = await getDocs(
        query(
          todosRef,
          where('__name__', '==', lastVisible),
          limit(1)
        )
      );
      
      if (!lastDocSnapshot.empty) {
        const lastDoc = lastDocSnapshot.docs[0];
        q = query(
          todosRef,
          orderBy('createdAt', 'desc'),
          startAfter(lastDoc),
          limit(TODOS_PER_PAGE)
        );
      } else {
        q = query(
          todosRef,
          orderBy('createdAt', 'desc'),
          limit(TODOS_PER_PAGE)
        );
      }
    }

    const [snapshot, totalCountSnapshot] = await Promise.all([
      getDocs(q),
      getCountFromServer(todosRef)
    ]);

    const todos = [];
    let lastVisibleDoc = null;
    
    snapshot.forEach((doc) => {
      todos.push({
        id: doc.id,
        ...doc.data()
      });
    });

    if (snapshot.docs.length > 0) {
      const lastDoc = snapshot.docs[snapshot.docs.length - 1];
      lastVisibleDoc = lastDoc.id;
    }

    const totalCount = totalCountSnapshot.data().count;
    const totalPages = Math.ceil(totalCount / TODOS_PER_PAGE);

    return {
      todos,
      totalCount,
      totalPages,
      currentPage: page,
      hasNextPage: page < totalPages,
      lastVisible: lastVisibleDoc
    };
  } catch (error) {
    console.error('Error in getTodos:', error);
    throw error;
  }
};

export const addTodo = async (todoData) => {
  try {
    const docRef = await addDoc(collection(db, 'todos'), {
      ...todoData,
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    return { id: docRef.id, ...todoData };
  } catch (error) {
    console.error('Error adding todo:', error);
    throw error;
  }
};

export const updateTodo = async (id, updates) => {
  try {
    const todoRef = doc(db, 'todos', id);
    await updateDoc(todoRef, {
      ...updates,
      updatedAt: new Date().toISOString()
    });
    return { id, ...updates };
  } catch (error) {
    console.error('Error updating todo:', error);
    throw error;
  }
};

export const deleteTodo = async (id) => {
  try {
    await deleteDoc(doc(db, 'todos', id));
    return { id };
  } catch (error) {
    console.error('Error deleting todo:', error);
    throw error;
  }
};