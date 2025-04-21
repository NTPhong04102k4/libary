// bookApiService.ts
import axios from "axios";
import { BookInput, BookOutput, PaginatedResponse } from "./book_type";

const API_URL = "http://localhost:8000/books"; // Updated base URL according to your backend

// Get authentication token from localStorage
const getAuthToken = () => {
  return localStorage.getItem("access_token");
};

// Create axios instance with authorization header
const createAuthHeaders = () => {
  const token = getAuthToken();
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const BookApiService = {
  // Get all books with optional pagination and search
  getAll: async (
    page = 1,
    limit = 5,
    search = ""
  ): Promise<PaginatedResponse<BookOutput>> => {
    try {
      const authHeaders = createAuthHeaders();
      const response = await axios.get(`${API_URL}/get-all`, {
        ...authHeaders,
        params: { page, limit, search },
      });

      // Map the response to match the expected PaginatedResponse format
      const data = response.data;

      // If the backend doesn't provide pagination info, create it here
      if (!data.total && Array.isArray(data)) {
        const books = data;
        const total = books.length;
        const totalPages = Math.ceil(total / limit);

        // Filter by search term if provided
        const filteredBooks = search
          ? books.filter(
              (book) =>
                book.title?.toLowerCase().includes(search.toLowerCase()) ||
                book.author?.toLowerCase().includes(search.toLowerCase()) ||
                book.description?.toLowerCase().includes(search.toLowerCase())
            )
          : books;

        // Apply pagination
        const paginatedBooks = filteredBooks.slice(
          (page - 1) * limit,
          page * limit
        );

        return {
          data: paginatedBooks,
          total: filteredBooks.length,
          page,
          limit,
          totalPages: Math.ceil(filteredBooks.length / limit),
        };
      }

      return response.data;
    } catch (error) {
      console.error("Error fetching books:", error);
      throw error;
    }
  },

  // Get book by ID
  getById: async (id: string): Promise<BookOutput> => {
    try {
      const authHeaders = createAuthHeaders();
      const response = await axios.get(`${API_URL}/get-one/${id}`, authHeaders);
      return response.data;
    } catch (error) {
      console.error(`Error fetching book with ID ${id}:`, error);
      throw error;
    }
  },

  // Create a new book
  create: async (book: BookInput): Promise<BookOutput> => {
    try {
      const authHeaders = createAuthHeaders();
      const response = await axios.post(`${API_URL}/create`, book, authHeaders);
      return response.data;
    } catch (error) {
      console.error("Error creating book:", error);
      throw error;
    }
  },

  // Update a book
  update: async (id: string, book: Partial<BookInput>): Promise<BookOutput> => {
    try {
      const authHeaders = createAuthHeaders();
      const response = await axios.put(
        `${API_URL}/update/${id}`,
        book,
        authHeaders
      );
      return response.data;
    } catch (error) {
      console.error(`Error updating book with ID ${id}:`, error);
      throw error;
    }
  },

  // Delete a book
  delete: async (id: string): Promise<string> => {
    try {
      const res = await axios.delete(
        `${API_URL}/delete/${id}`,
        createAuthHeaders()
      );
      return res.data?.message || "Deleted successfully";
    } catch (error) {
      console.error(`Error deleting book with ID ${id}:`, error);
      throw error;
    }
  },
};
