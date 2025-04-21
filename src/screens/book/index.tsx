// BooksManagement.tsx
import React, { useState, useEffect, ReactNode } from "react";
import { BookInput, BookOutput, PaginatedResponse } from "./book_type";
import { BookApiService } from "./bookApiServices";
import {
  ActionButton,
  ActionButtons,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  IconButton,
  PageButton,
  PageContainer,
  PageHeader,
  PageInfo,
  PageNavigation,
  PageTitle,
  Pagination,
  SearchBar,
  SearchInput,
  Table,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow
} from "../../components";
import { ChevronLeft, ChevronRight, Edit, Eye, Plus, Search, Trash } from "lucide-react";
import { styled } from "styled-components";
import moment from 'moment';

const AppConst = {
  COMMON_STATUS: {
    ACTIVE: 1,
    INACTIVE: 2,
    REMOVE: 3,
  },
};

type StatusType = 'active' | 'inactive' | 'pending';

interface BadgeProps {
  status: StatusType;
}

// Get status text based on status code
const getStatusText = (status: number): StatusType => {
  switch (status) {
    case 1:
      return 'active';
    case 2:
      return 'inactive';
    case 3:
      return 'pending';
    default:
      return 'inactive';
  }
};

interface ButtonProps {
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'default';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  disabled?: boolean;
  children?: ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  [key: string]: any;
}

const BooksManagement: React.FC = () => {
  // State for books data and pagination
  const [allBooks, setAllBooks] = useState<BookOutput[]>([]);
  const [displayedBooks, setDisplayedBooks] = useState<BookOutput[]>([]);
  const [totalBooks, setTotalBooks] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showDetailModal, setShowDetailModal] = useState<boolean>(false);
  const [selectedBookDetail, setSelectedBookDetail] = useState<BookOutput | null>(null);
  
  const ITEMS_PER_PAGE = 5;
  const MAX_VISIBLE_PAGES = 5;

  // State for book form
  const [formMode, setFormMode] = useState<"create" | "edit" | "none">("none");
  const [selectedBook, setSelectedBook] = useState<BookOutput | null>(null);
  const [formData, setFormData] = useState<BookInput>({
    id: "",
    author: "",
    cover_image: "",
    description: "",
    title: "",
    url: "",
    categories: "",
    status: AppConst.COMMON_STATUS.ACTIVE,
  });

  // Load books on component mount
  useEffect(() => {
    fetchBooks();
  }, []);

  // Update displayed books when search term, current page, or all books change
  useEffect(() => {
    applyFiltersAndPagination();
  }, [searchTerm, currentPage, allBooks]);

  // Fetch all books from API
  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response: PaginatedResponse<BookOutput> = await BookApiService.getAll();
      setAllBooks(response.data);
      setTotalBooks(response.total);
    } catch (error) {
      console.error("Failed to fetch books:", error);
    } finally {
      setLoading(false);
    }
  };

  // Apply filters and pagination to books
  const applyFiltersAndPagination = () => {
    // Filter books based on search term
    let filteredBooks = allBooks;
    if (searchTerm.trim() !== "") {
      filteredBooks = allBooks.filter(book => 
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        book.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Update total count and pages
    setTotalBooks(filteredBooks.length);
    setTotalPages(Math.ceil(filteredBooks.length / ITEMS_PER_PAGE));
    
    // Apply pagination
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    setDisplayedBooks(filteredBooks.slice(startIndex, endIndex));
    
    // If current page is now invalid, reset to page 1
    if (currentPage > Math.ceil(filteredBooks.length / ITEMS_PER_PAGE)) {
      setCurrentPage(1);
    }
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Handle search submit
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to first page when search is submitted
    applyFiltersAndPagination();
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  function generateTimestampId() {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 10000);
    return `ID-${timestamp}-${random}`;
  }

  // Handle opening the create form
  const handleCreate = () => {
    const initID = generateTimestampId();
    setFormMode("create");
    setSelectedBook(null);
    setFormData({
      id: initID,
      title: "",
      author: "",
      description: "",
      cover_image: "",
      url: "",
      categories: "",
      status: AppConst.COMMON_STATUS.ACTIVE,
    });
  };

  // Handle opening the edit form
  const handleEdit = (book: BookOutput) => {
    setFormMode("edit");
    setSelectedBook(book);
    setFormData({
      id: book.id,
      title: book.title,
      author: book.author,
      description: book.description,
      cover_image: book.cover_image,
      url: book.url,
      categories: book.categories,
      status: book.status,
    });
  };

  // Handle book details view
  const handleViewDetails = (book: BookOutput) => {
    setSelectedBookDetail(book);
    setShowDetailModal(true);
  };

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (formMode === "create") {
        await BookApiService.create(formData);
      } else if (formMode === "edit" && selectedBook) {
        await BookApiService.update(selectedBook._id, formData);
      }
      setFormMode("none");
      fetchBooks();
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle book deletion
  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      try {
        setLoading(true);
        await BookApiService.delete(id);
        fetchBooks();
      } catch (error) {
        console.error("Delete error:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  // Render pagination controls
  const renderPagination = () => {
    if (totalPages <= 1) return null;

    // Logic to show pagination with ellipsis for many pages
    let startPage = Math.max(1, currentPage - Math.floor(MAX_VISIBLE_PAGES / 2));
    let endPage = Math.min(totalPages, startPage + MAX_VISIBLE_PAGES - 1);

    // Adjust if we're near the end
    if (endPage - startPage + 1 < MAX_VISIBLE_PAGES) {
      startPage = Math.max(1, endPage - MAX_VISIBLE_PAGES + 1);
    }

    const pages = [];

    // Add first page and ellipsis if needed
    if (startPage > 1) {
      pages.push(
        <PageButton key={1} onClick={() => handlePageChange(1)}>
          1
        </PageButton>
      );
      if (startPage > 2) {
        pages.push(<span key="ellipsis1">...</span>);
      }
    }

    // Add page numbers
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <PageButton
          key={i}
          active={i === currentPage}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </PageButton>
      );
    }

    // Add last page and ellipsis if needed
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(<span key="ellipsis2">...</span>);
      }
      pages.push(
        <PageButton key={totalPages} onClick={() => handlePageChange(totalPages)}>
          {totalPages}
        </PageButton>
      );
    }

    return (
      <PageNavigation>
        <PageButton
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft size={16} />
        </PageButton>
        {pages}
        <PageButton
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <ChevronRight size={16} />
        </PageButton>
      </PageNavigation>
    );
  };

  // Calculate page range
  const getPageRange = (): string => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE + 1;
    const end = Math.min(start + ITEMS_PER_PAGE - 1, totalBooks);
    return `${start} to ${end} of ${totalBooks} entries`;
  };

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle>Books Management</PageTitle>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <ActionButton onClick={handleCreate}>
            <Plus size={16} />
            Add Book
          </ActionButton>
        </div>
      </PageHeader>

      <form onSubmit={handleSearchSubmit}>
        <SearchBar>
          <button type="submit" style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
            <Search size={18} color="#9ca3af" />
          </button>
          <SearchInput
            placeholder="Search books by title or author..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </SearchBar>
      </form>

      <Card>
        <CardHeader>
          <CardTitle>Books List</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableHeadCell width="8%">Cover</TableHeadCell>
                    <TableHeadCell width="10%">Title</TableHeadCell>
                    <TableHeadCell width="12%">Author</TableHeadCell>
                    <TableHeadCell width="15%">Category</TableHeadCell>
                    <TableHeadCell width="5%">Status</TableHeadCell>
                    <TableHeadCell width="10%">Created Date</TableHeadCell>
                    <TableHeadCell width="10%">Actions</TableHeadCell>
                  </TableRow>
                </TableHead>
                <tbody>
                  {displayedBooks.length > 0 ? (
                    displayedBooks.map((book) => (
                      <TableRow key={book._id}>
                        <TableCell width="10%">
                          {book.cover_image ? (
                            <img
                              src={book.cover_image}
                              alt={book.title}
                              style={{ width: '40px', height: '60px', objectFit: 'cover' }}
                            />
                          ) : (
                            <div
                              style={{
                                width: '40px',
                                height: '60px',
                                backgroundColor: '#e5e7eb',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                            >
                              N/A
                            </div>
                          )}
                        </TableCell>
                        <TableCell width="10%">{book.title}</TableCell>
                        <TableCell width="15%">{book.author}</TableCell>
                        <TableCell width="20%">{book.categories}</TableCell>
                        <TableCell  width="15%">
                          <Badge status={getStatusText(book.status)}>
                            {getStatusText(book.status)}
                          </Badge>
                        </TableCell>
                        <TableCell width="10%">{moment(book.createdAt).format('YYYY-MM-DD')}</TableCell>
                        <TableCell width="10%">
                          <ActionButtons>
                            <IconButton variant="view" onClick={() => handleViewDetails(book)}>
                              <Eye size={14} />
                            </IconButton>
                            <IconButton variant="edit" onClick={() => handleEdit(book)}>
                              <Edit size={14} />
                            </IconButton>
                            <IconButton variant="delete" onClick={() => handleDelete(book._id)}>
                              <Trash size={14} />
                            </IconButton>
                          </ActionButtons>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} style={{ textAlign: 'center' }}>
                        No books found. Try adjusting your search or add new books.
                      </TableCell>
                    </TableRow>
                  )}
                </tbody>
              </Table>

              {totalBooks > 0 && (
                <Pagination>
                  <PageInfo>Showing {getPageRange()}</PageInfo>
                  {renderPagination()}
                </Pagination>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Book Form Modal */}
      {formMode !== "none" && (
        <ModalBackdrop>
          <Modal>
            <ModalHeader>
              <ModalTitle>{formMode === "create" ? "Add New Book" : "Edit Book"}</ModalTitle>
              <CloseButton onClick={() => setFormMode("none")}>×</CloseButton>
            </ModalHeader>
            <ModalBody>
              <form onSubmit={handleFormSubmit}>
                <FormGroup>
                  <FormLabel htmlFor="title">Title</FormLabel>
                  <FormInput
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel htmlFor="author">Author</FormLabel>
                  <FormInput
                    type="text"
                    id="author"
                    name="author"
                    value={formData.author}
                    onChange={handleInputChange}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel htmlFor="categories">Categories</FormLabel>
                  <FormInput
                    type="text"
                    id="categories"
                    name="categories"
                    value={formData.categories}
                    onChange={handleInputChange}
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel htmlFor="description">Description</FormLabel>
                  <FormTextarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel htmlFor="cover_image">Cover Image URL</FormLabel>
                  <FormInput
                    type="text"
                    id="cover_image"
                    name="cover_image"
                    value={formData.cover_image}
                    onChange={handleInputChange}
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel htmlFor="url">Book URL</FormLabel>
                  <FormInput
                    type="text"
                    id="url"
                    name="url"
                    value={formData.url}
                    onChange={handleInputChange}
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel htmlFor="status">Status</FormLabel>
                  <FormSelect
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                  >
                    <option value={AppConst.COMMON_STATUS.ACTIVE}>Active</option>
                    <option value={AppConst.COMMON_STATUS.INACTIVE}>Inactive</option>
                    <option value={AppConst.COMMON_STATUS.REMOVE}>Removed</option>
                  </FormSelect>
                </FormGroup>
                <FormActions>
                  <Button type="button" onClick={() => setFormMode("none")}>
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary" disabled={loading}>
                    {loading ? "Saving..." : "Save"}
                  </Button>
                </FormActions>
              </form>
            </ModalBody>
          </Modal>
        </ModalBackdrop>
      )}

      {/* Book Detail Modal */}
      {showDetailModal && selectedBookDetail && (
        <ModalBackdrop>
          <Modal>
            <ModalHeader>
              <ModalTitle>Book Details</ModalTitle>
              <CloseButton onClick={() => setShowDetailModal(false)}>×</CloseButton>
            </ModalHeader>
            <ModalBody>
              <BookDetailContainer>
                <BookCoverContainer>
                  {selectedBookDetail.cover_image ? (
                    <BookCover src={selectedBookDetail.cover_image} alt={selectedBookDetail.title} />
                  ) : (
                    <NoCover>No Cover Available</NoCover>
                  )}
                </BookCoverContainer>
                
                <BookInfo>
                  <BookTitle>{selectedBookDetail.title}</BookTitle>
                  <BookAuthor>by {selectedBookDetail.author}</BookAuthor>
                  
                  <BookMetaItem>
                    <MetaLabel>Categories:</MetaLabel> 
                    <MetaValue>{selectedBookDetail.categories || 'Not specified'}</MetaValue>
                  </BookMetaItem>
                  
                  <BookMetaItem>
                    <MetaLabel>Status:</MetaLabel> 
                    <Badge status={getStatusText(selectedBookDetail.status)}>
                      {getStatusText(selectedBookDetail.status)}
                    </Badge>
                  </BookMetaItem>
                  
                  <BookMetaItem>
                    <MetaLabel>Created:</MetaLabel> 
                    <MetaValue>{moment(selectedBookDetail.createdAt).format('MMMM D, YYYY')}</MetaValue>
                  </BookMetaItem>
                  
                  {selectedBookDetail.updatedAt && (
                    <BookMetaItem>
                      <MetaLabel>Last Updated:</MetaLabel> 
                      <MetaValue>{moment(selectedBookDetail.updatedAt).format('MMMM D, YYYY')}</MetaValue>
                    </BookMetaItem>
                  )}
                  
                  <BookDescription>
                    <MetaLabel>Description:</MetaLabel>
                    <DescriptionText>
                      {selectedBookDetail.description || 'No description available.'}
                    </DescriptionText>
                  </BookDescription>
                  
                  {selectedBookDetail.url && (
                    <BookActions>
                      {/* <Button 
                        variant="primary" 
                        onClick={() => window.open(selectedBookDetail.url, '_blank')}
                      >
                        View Book
                      </Button> */}
                      <Button onClick={() => {
                        setShowDetailModal(false);
                        handleEdit(selectedBookDetail);
                      }}>
                        Edit Details
                      </Button>
                    </BookActions>
                  )}
                </BookInfo>
              </BookDetailContainer>
            </ModalBody>
          </Modal>
        </ModalBackdrop>
      )}
    </PageContainer>
  );
};

export default BooksManagement;

// Styled components for the book detail modal
const BookDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  
  @media (min-width: 640px) {
    flex-direction: row;
    gap: 1.5rem;
  }
`;

const BookCoverContainer = styled.div`
  margin-bottom: 1rem;
  
  @media (min-width: 640px) {
    flex: 0 0 200px;
    margin-bottom: 0;
  }
`;

const BookCover = styled.img`
  width: 100%;
  max-width: 200px;
  height: auto;
  border-radius: 0.25rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  object-fit: cover;
  
  @media (min-width: 640px) {
    max-width: none;
  }
`;

const NoCover = styled.div`
  width: 100%;
  max-width: 200px;
  height: 300px;
  background-color: #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #6b7280;
  font-size: 0.875rem;
  border-radius: 0.25rem;
  
  @media (min-width: 640px) {
    max-width: none;
  }
`;

const BookInfo = styled.div`
  flex: 1;
`;

const BookTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
  color: #111827;
`;

const BookAuthor = styled.p`
  font-size: 1.125rem;
  color: #4b5563;
  margin-bottom: 1rem;
`;

const BookMetaItem = styled.div`
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const MetaLabel = styled.span`
  font-weight: 500;
  color: #4b5563;
`;

const MetaValue = styled.span`
  color: #111827;
`;

const BookDescription = styled.div`
  margin-top: 1rem;
`;

const DescriptionText = styled.p`
  margin-top: 0.5rem;
  color: #4b5563;
  line-height: 1.5;
`;

const BookActions = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1.5rem;
`;

// Existing styled components
const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const Modal = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #e5e7eb;
`;

const ModalTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #6b7280;
  
  &:hover {
    color: #111827;
  }
`;

const ModalBody = styled.div`
  padding: 1.5rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #4b5563;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
  }
`;

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
  }
`;

const FormSelect = styled.select`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  background-color: white;
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
  }
`;

const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 1.5rem;
`;

const Button = styled.button<ButtonProps>`
  /* Base styles applied to all buttons */
  border-radius: 0.25rem;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
  
  /* Variant styles based on props */
  background-color: ${props => {
    if (props.variant === 'primary') return '#3b82f6';
    if (props.variant === 'success') return '#10b981';
    if (props.variant === 'warning') return '#f59e0b';
    if (props.variant === 'danger') return '#ef4444';
    return 'white';
  }};
  
  color: ${props => {
    if (['primary', 'success', 'warning', 'danger'].includes(props.variant || '')) return 'white';
    return '#4b5563';
  }};
  
  border: 1px solid ${props => {
    if (props.variant === 'primary') return '#3b82f6';
    if (props.variant === 'success') return '#10b981';
    if (props.variant === 'warning') return '#f59e0b';
    if (props.variant === 'danger') return '#ef4444';
    return '#e5e7eb';
  }};
  
  /* Size variants */
  ${props => props.size === 'small' && `
    padding: 0.25rem 0.5rem;
    font-size: 0.75rem;
  `}
  
  ${props => props.size === 'medium' && `
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
  `}
  
  ${props => props.size === 'large' && `
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
  `}
  
  /* Full width option */
  ${props => props.fullWidth && `
    display: block;
    width: 100%;
  `}
  
  /* Hover styles */
  &:hover {
    background-color: ${props => {
    if (props.variant === 'primary') return '#2563eb';
    if (props.variant === 'success') return '#059669';
    if (props.variant === 'warning') return '#d97706';
    if (props.variant === 'danger') return '#dc2626';
    return '#f9fafb';
  }};
  }
  
  /* Disabled state */
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Badge = styled.span<BadgeProps>`
  background-color: ${props => {
    switch (props.status) {
      case 'active': return '#10b981';
      case 'inactive': return '#6b7280';
      case 'pending': return '#ef4444';
      default: return '#6b7280';
    }
  }};
  color: white;
  border-radius: 9999px;
  padding: 0.25rem 0.75rem;
  font-size: 0.75rem;
`;