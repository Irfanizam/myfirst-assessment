import { getBlogPosts } from '../utils/blogUtils';
import { collection, getDocs, orderBy, limit, getCountFromServer } from 'firebase/firestore';
import { db } from '../utils/fireStore';

jest.mock('firebase/firestore');
jest.mock('@/utils/fireStore', () => ({
  db: {}
}));

describe('Blog Utils', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getBlogPosts', () => {
    it('should fetch and return blog posts with pagination', async () => {
      const mockPosts = [
        { id: '1', title: 'First Post', content: 'Content 1', date: new Date() },
        { id: '2', title: 'Second Post', content: 'Content 2', date: new Date() },
      ];

      getCountFromServer.mockResolvedValueOnce({
        data: () => ({ count: 5 })
      });

      const mockDocs = mockPosts.map(post => ({
        id: post.id,
        data: () => ({
          ...post,
          date: { toDate: () => post.date }
        })
      }));
      
      getDocs.mockResolvedValueOnce({
        docs: mockDocs,
        empty: false
      });

      const result = await getBlogPosts(1, 2);

      expect(getCountFromServer).toHaveBeenCalledWith(collection(db, 'blogs'));
      expect(getDocs).toHaveBeenCalled();
      
      const queryCalls = orderBy.mock.calls;
      expect(queryCalls[0]).toEqual(['date', 'desc']);
      expect(limit).toHaveBeenCalledWith(2); 
      
      expect(result).toMatchObject({
        posts: [
          {
            id: '1',
            title: 'First Post',
            content: 'Content 1',
          },
          {
            id: '2',
            title: 'Second Post',
            content: 'Content 2',
          }
        ],
        totalPosts: 5,
        hasMore: true
      });
      
      result.posts.forEach(post => {
        const isDate = post.date instanceof Date;
        const isFirestoreTimestamp = post.date && typeof post.date.toDate === 'function';
        expect(isDate || isFirestoreTimestamp).toBe(true);
      });
    });

    it('should handle empty results', async () => {
      getCountFromServer.mockResolvedValueOnce({
        data: () => ({ count: 0 })
      });
      
      getDocs.mockResolvedValueOnce({
        docs: [],
        empty: true
      });

      const result = await getBlogPosts(1);

      expect(result).toEqual({
        posts: [],
        totalPosts: 0,
        hasMore: false
      });
    });

    it('should handle errors', async () => {
      const errorMessage = 'Firestore error';
      getCountFromServer.mockRejectedValueOnce(new Error(errorMessage));

      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      const result = await getBlogPosts(1);

      expect(consoleSpy).toHaveBeenCalledWith('Error fetching blog posts:', expect.any(Error));
      expect(result).toEqual({
        posts: [],
        totalPosts: 0,
        hasMore: false
      });

      consoleSpy.mockRestore();
    });
  });
});
