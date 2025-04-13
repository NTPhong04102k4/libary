import React ,{ useState } from "react";
import { ActionButton, ActionButtons, Badge, Card, CardContent, IconButton, PageButton, PageContainer, PageHeader, PageInfo, PageNavigation, PageTitle, Pagination, SearchBar, SearchInput, Tab, Table, TableCell, TableHead, TableHeadCell, TableRow, Tabs } from "../../components";
import {  ChevronLeft, ChevronRight, Edit, Eye, Plus, Search, Trash } from "lucide-react";

// ========== BOOK MANAGEMENT SCREEN ==========
export function BookManagement() {
    const [activeTab, setActiveTab] = useState('all');
    
    return (
      <PageContainer>
        <PageHeader>
          <PageTitle>Book Management</PageTitle>
          <ActionButton>
            <Plus size={16} />
            Add New Book
          </ActionButton>
        </PageHeader>
        
        <Tabs>
          <Tab active={activeTab === 'all'} onClick={() => setActiveTab('all')}>All Books</Tab>
          <Tab active={activeTab === 'available'} onClick={() => setActiveTab('available')}>Available</Tab>
          <Tab active={activeTab === 'borrowed'} onClick={() => setActiveTab('borrowed')}>Borrowed</Tab>
          <Tab active={activeTab === 'reserved'} onClick={() => setActiveTab('reserved')}>Reserved</Tab>
          <Tab active={activeTab === 'damaged'} onClick={() => setActiveTab('damaged')}>Damaged</Tab>
        </Tabs>
        
        <SearchBar>
          <Search size={18} color="#9ca3af" />
          <SearchInput placeholder="Search books by title, author, ISBN, or category..." />
        </SearchBar>
        
        <Card>
          <CardContent>
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeadCell>ID</TableHeadCell>
                  <TableHeadCell>Title</TableHeadCell>
                  <TableHeadCell>Author</TableHeadCell>
                  <TableHeadCell>ISBN</TableHeadCell>
                  <TableHeadCell>Publication Year</TableHeadCell>
                  <TableHeadCell>Category</TableHeadCell>
                  <TableHeadCell>Copies Available</TableHeadCell>
                  <TableHeadCell>Status</TableHeadCell>
                  <TableHeadCell>Actions</TableHeadCell>
                </TableRow>
              </TableHead>
              <tbody>
                <TableRow>
                  <TableCell>BK001</TableCell>
                  <TableCell>The Great Gatsby</TableCell>
                  <TableCell>F. Scott Fitzgerald</TableCell>
                  <TableCell>9780743273565</TableCell>
                  <TableCell>1925</TableCell>
                  <TableCell>Fiction</TableCell>
                  <TableCell>3/5</TableCell>
                  <TableCell><Badge status="available">Available</Badge></TableCell>
                  <TableCell>
                    <ActionButtons>
                      <IconButton variant="view"><Eye size={14} /></IconButton>
                      <IconButton variant="edit"><Edit size={14} /></IconButton>
                      <IconButton variant="delete"><Trash size={14} /></IconButton>
                    </ActionButtons>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>BK002</TableCell>
                  <TableCell>To Kill a Mockingbird</TableCell>
                  <TableCell>Harper Lee</TableCell>
                  <TableCell>9780061120084</TableCell>
                  <TableCell>1960</TableCell>
                  <TableCell>Fiction</TableCell>
                  <TableCell>0/3</TableCell>
                  <TableCell><Badge status="borrowed">Borrowed</Badge></TableCell>
                  <TableCell>
                    <ActionButtons>
                      <IconButton variant="view"><Eye size={14} /></IconButton>
                      <IconButton variant="edit"><Edit size={14} /></IconButton>
                      <IconButton variant="delete"><Trash size={14} /></IconButton>
                    </ActionButtons>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>BK003</TableCell>
                  <TableCell>1984</TableCell>
                  <TableCell>George Orwell</TableCell>
                  <TableCell>9780451524935</TableCell>
                  <TableCell>1949</TableCell>
                  <TableCell>Science Fiction</TableCell>
                  <TableCell>2/4</TableCell>
                  <TableCell><Badge status="available">Available</Badge></TableCell>
                  <TableCell>
                    <ActionButtons>
                      <IconButton variant="view"><Eye size={14} /></IconButton>
                      <IconButton variant="edit"><Edit size={14} /></IconButton>
                      <IconButton variant="delete"><Trash size={14} /></IconButton>
                    </ActionButtons>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>BK004</TableCell>
                  <TableCell>Pride and Prejudice</TableCell>
                  <TableCell>Jane Austen</TableCell>
                  <TableCell>9780141439518</TableCell>
                  <TableCell>1813</TableCell>
                  <TableCell>Fiction</TableCell>
                  <TableCell>1/2</TableCell>
                  <TableCell><Badge status="reserved">Reserved</Badge></TableCell>
                  <TableCell>
                    <ActionButtons>
                      <IconButton variant="view"><Eye size={14} /></IconButton>
                      <IconButton variant="edit"><Edit size={14} /></IconButton>
                      <IconButton variant="delete"><Trash size={14} /></IconButton>
                    </ActionButtons>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>BK005</TableCell>
                  <TableCell>The Hobbit</TableCell>
                  <TableCell>J.R.R. Tolkien</TableCell>
                  <TableCell>9780547928227</TableCell>
                  <TableCell>1937</TableCell>
                  <TableCell>Fantasy</TableCell>
                  <TableCell>0/3</TableCell>
                  <TableCell><Badge status="damaged">Damaged</Badge></TableCell>
                  <TableCell>
                    <ActionButtons>
                      <IconButton variant="view"><Eye size={14} /></IconButton>
                      <IconButton variant="edit"><Edit size={14} /></IconButton>
                      <IconButton variant="delete"><Trash size={14} /></IconButton>
                    </ActionButtons>
                  </TableCell>
                </TableRow>
              </tbody>
            </Table>
            
            <Pagination>
              <PageInfo>Showing 1 to 5 of 216 entries</PageInfo>
              <PageNavigation>
                <PageButton disabled><ChevronLeft size={16} /></PageButton>
                <PageButton active>1</PageButton>
                <PageButton>2</PageButton>
                <PageButton>3</PageButton>
                <PageButton>4</PageButton>
                <PageButton>5</PageButton>
                <PageButton><ChevronRight size={16} /></PageButton>
              </PageNavigation>
            </Pagination>
          </CardContent>
        </Card>
      </PageContainer>
    );
  }