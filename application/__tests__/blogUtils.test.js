import { getBlogPosts } from '../utils/blogUtils';

// Mock Firebase functions
jest.mock('@/utils/fireStore', () => ({
  collection: jest.fn(),
  getDocs: jest.fn(),
  getCountFromServer: jest.fn(),
  query: jest.fn(),
  orderBy: jest.fn(),
  limit: jest.fn(),
}));

import { collection, getDocs, getCountFromServer, query, orderBy, limit } from '@/utils/fireStore';

describe('Blog API', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  describe('getBlogPosts', () => {
    it('should fetch blog posts with pagination', async () => {
      // Mock Firestore response
      const mockPosts = [
        { id: '1', title: 'Test Post 1', date: new Date(), detail: 'Test detail 1' },
        { id: '2', title: 'Test Post 2', date: new Date(), detail: 'Test detail 2' },
      ];
      
      // Mock getCountFromServer response
      const mockCount = { data: () => ({ count: 5 }) };
      getCountFromServer.mockResolvedValue(mockCount);
      
      // Mock getDocs response
      const mockDocs = mockPosts.map(post => ({
        id: post.id,
        data: () => ({
          title: post.title,
          date: post.date,
          detail: post.detail
        })
      }));
      getDocs.mockResolvedValue({ docs: mockDocs });

      // Mock query builder functions
      query.mockImplementation(() => ({}));
      orderBy.mockImplementation(() => ({}));
      limit.mockImplementation(() => ({}));

      // Call the function
      const result = await getBlogPosts(1, 2);

      // Assertions
      expect(collection).toHaveBeenCalledWith(expect.anything(), 'blogs');
      expect(getCountFromServer).toHaveBeenCalled();
      expect(query).toHaveBeenCalled();
      expect(orderBy).toHaveBeenCalledWith('date', 'desc');
      expect(limit).toHaveBeenCalledWith(2);
      
      expect(result).toEqual({
        posts: expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
            title: expect.any(String),
            detail: expect.any(String)
          })
        ]),
        totalPosts: 5,
        hasMore: true
      });
    });

    it('should handle errors when fetching blog posts', async () => {
      // Mock error
      const errorMessage = 'Failed to fetch posts';
      getCountFromServer.mockRejectedValue(new Error(errorMessage));
      
      // Spy on console.error
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      // Call the function
      const result = await getBlogPosts(1);

      // Assertions
      expect(consoleSpy).toHaveBeenCalledWith('Error fetching blog posts:', expect.any(Error));
      expect(result).toEqual({
        posts: [],
        totalPosts: 0,
        hasMore: false
      });

      // Cleanup
      consoleSpy.mockRestore();
    });
  });
});
