import React, { useState } from 'react';
import { ActionButton, ActionButtons, Badge, Card, CardContent, IconButton, PageButton, PageContainer, PageHeader, PageInfo, PageNavigation, PageTitle, Pagination, SearchBar, SearchInput, Tab, Table, TableCell, TableHead, TableHeadCell, TableRow, Tabs } from "../../components";
import { ChevronLeft, ChevronRight, Edit, Eye, Plus, Search, Trash } from 'lucide-react';

// Shared components


// ========== READER MANAGEMENT SCREEN ==========
export function ReaderManagement() {
  const [activeTab, setActiveTab] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  
  return (
    <PageContainer>
      <PageHeader>
        <PageTitle>Reader Management</PageTitle>
        <ActionButton>
          <Plus size={16} />
          Add New Reader
        </ActionButton>
      </PageHeader>
      
      <Tabs>
        <Tab active={activeTab === 'all'} onClick={() => setActiveTab('all')}>All Readers</Tab>
        <Tab active={activeTab === 'active'} onClick={() => setActiveTab('active')}>Active</Tab>
        <Tab active={activeTab === 'inactive'} onClick={() => setActiveTab('inactive')}>Inactive</Tab>
        <Tab active={activeTab === 'overdue'} onClick={() => setActiveTab('overdue')}>With Overdue Books</Tab>
      </Tabs>
      
      <SearchBar>
        <Search size={18} color="#9ca3af" />
        <SearchInput placeholder="Search readers by name, email, or ID..." />
      </SearchBar>
      
      <Card>
        <CardContent>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeadCell>ID</TableHeadCell>
                <TableHeadCell>Name</TableHeadCell>
                <TableHeadCell>Email</TableHeadCell>
                <TableHeadCell>Phone</TableHeadCell>
                <TableHeadCell>Registration Date</TableHeadCell>
                <TableHeadCell>Status</TableHeadCell>
                <TableHeadCell>Current Borrowing</TableHeadCell>
                <TableHeadCell>Actions</TableHeadCell>
              </TableRow>
            </TableHead>
            <tbody>
              <TableRow>
                <TableCell>1001</TableCell>
                <TableCell>John Doe</TableCell>
                <TableCell>john.doe@example.com</TableCell>
                <TableCell>(555) 123-4567</TableCell>
                <TableCell>2023-02-15</TableCell>
                <TableCell><Badge status="active">Active</Badge></TableCell>
                <TableCell>3</TableCell>
                <TableCell>
                  <ActionButtons>
                    <IconButton variant="view"><Eye size={14} /></IconButton>
                    <IconButton variant="edit"><Edit size={14} /></IconButton>
                    <IconButton variant="delete"><Trash size={14} /></IconButton>
                  </ActionButtons>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>1002</TableCell>
                <TableCell>Jane Smith</TableCell>
                <TableCell>jane.smith@example.com</TableCell>
                <TableCell>(555) 987-6543</TableCell>
                <TableCell>2023-03-10</TableCell>
                <TableCell><Badge status="active">Active</Badge></TableCell>
                <TableCell>1</TableCell>
                <TableCell>
                  <ActionButtons>
                    <IconButton variant="view"><Eye size={14} /></IconButton>
                    <IconButton variant="edit"><Edit size={14} /></IconButton>
                    <IconButton variant="delete"><Trash size={14} /></IconButton>
                  </ActionButtons>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>1003</TableCell>
                <TableCell>Tom Wilson</TableCell>
                <TableCell>tom.wilson@example.com</TableCell>
                <TableCell>(555) 456-7890</TableCell>
                <TableCell>2023-01-20</TableCell>
                <TableCell><Badge status="overdue">Overdue</Badge></TableCell>
                <TableCell>2</TableCell>
                <TableCell>
                  <ActionButtons>
                    <IconButton variant="view"><Eye size={14} /></IconButton>
                    <IconButton variant="edit"><Edit size={14} /></IconButton>
                    <IconButton variant="delete"><Trash size={14} /></IconButton>
                  </ActionButtons>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>1004</TableCell>
                <TableCell>Sarah Johnson</TableCell>
                <TableCell>sarah.j@example.com</TableCell>
                <TableCell>(555) 234-5678</TableCell>
                <TableCell>2023-04-05</TableCell>
                <TableCell><Badge status="inactive">Inactive</Badge></TableCell>
                <TableCell>0</TableCell>
                <TableCell>
                  <ActionButtons>
                    <IconButton variant="view"><Eye size={14} /></IconButton>
                    <IconButton variant="edit"><Edit size={14} /></IconButton>
                    <IconButton variant="delete"><Trash size={14} /></IconButton>
                  </ActionButtons>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>1005</TableCell>
                <TableCell>Michael Brown</TableCell>
                <TableCell>m.brown@example.com</TableCell>
                <TableCell>(555) 345-6789</TableCell>
                <TableCell>2023-02-28</TableCell>
                <TableCell><Badge status="active">Active</Badge></TableCell>
                <TableCell>4</TableCell>
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
            <PageInfo>Showing 1 to 5 of 24 entries</PageInfo>
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



