import { collection, getDocs, orderBy, query, limit, getCountFromServer } from 'firebase/firestore';
import { db } from './fireStore';

export const getBlogPosts = async (page = 1, postsPerPage = 3) => {
  try {
    const postsRef = collection(db, 'blogs');
    const countSnapshot = await getCountFromServer(postsRef);
    const totalPosts = countSnapshot.data().count;
    
    const q = query(
      postsRef,
      orderBy('date', 'desc'),
      limit(page * postsPerPage)
    );
    
    const querySnapshot = await getDocs(q);
    const posts = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return {
      posts,
      totalPosts,
      hasMore: posts.length < totalPosts
    };
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return { 
      posts: [], 
      totalPosts: 0,
      hasMore: false 
    };
  }
};