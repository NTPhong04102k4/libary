// ========== DOCUMENT MANAGEMENT SCREEN ==========
import React,{ useState } from "react";
import { ActionButton, ActionButtons, Card, CardContent, IconButton, PageButton, PageContainer, PageHeader, PageInfo, PageNavigation, PageTitle, Pagination, SearchBar, SearchInput, Tab, Table, TableCell, TableHead, TableHeadCell, TableRow, Tabs } from "../../components";
import { ChevronLeft, ChevronRight, Download, Edit, Eye, Plus, Search, Trash, Upload } from "lucide-react";


export function DocumentManagement() {
    const [activeTab, setActiveTab] = useState('all');
    
    return (
      <PageContainer>
        <PageHeader>
          <PageTitle>Document Management</PageTitle>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <ActionButton color="#10b981">
              <Upload size={16} />
              Upload Document
            </ActionButton>
            <ActionButton>
              <Plus size={16} />
              Add Category
            </ActionButton>
          </div>
        </PageHeader>
        
        <Tabs>
          <Tab active={activeTab === 'all'} onClick={() => setActiveTab('all')}>All Documents</Tab>
          <Tab active={activeTab === 'reports'} onClick={() => setActiveTab('reports')}>Reports</Tab>
          <Tab active={activeTab === 'forms'} onClick={() => setActiveTab('forms')}>Forms</Tab>
          <Tab active={activeTab === 'policies'} onClick={() => setActiveTab('policies')}>Policies</Tab>
          <Tab active={activeTab === 'archives'} onClick={() => setActiveTab('archives')}>Archives</Tab>
        </Tabs>
        
        <SearchBar>
          <Search size={18} color="#9ca3af" />
          <SearchInput placeholder="Search documents by title, type, or category..." />
        </SearchBar>
        
        <Card>
          <CardContent>
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeadCell>ID</TableHeadCell>
                  <TableHeadCell>Title</TableHeadCell>
                  <TableHeadCell>Category</TableHeadCell>
                  <TableHeadCell>Type</TableHeadCell>
                  <TableHeadCell>Size</TableHeadCell>
                  <TableHeadCell>Created Date</TableHeadCell>
                  <TableHeadCell>Modified Date</TableHeadCell>
                  <TableHeadCell>Actions</TableHeadCell>
                </TableRow>
              </TableHead>
              <tbody>
                <TableRow>
                  <TableCell>DOC001</TableCell>
                  <TableCell>Library Policy Handbook</TableCell>
                  <TableCell>Policies</TableCell>
                  <TableCell>PDF</TableCell>
                  <TableCell>2.5 MB</TableCell>
                  <TableCell>2023-01-15</TableCell>
                  <TableCell>2023-03-20</TableCell>
                  <TableCell>
                    <ActionButtons>
                      <IconButton variant="view"><Eye size={14} /></IconButton>
                      <IconButton variant="edit"><Edit size={14} /></IconButton>
                      <IconButton variant="delete"><Trash size={14} /></IconButton>
                      <IconButton variant="view"><Download size={14} /></IconButton>
                    </ActionButtons>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>DOC002</TableCell>
                  <TableCell>Annual Report 2022</TableCell>
                  <TableCell>Reports</TableCell>
                  <TableCell>PDF</TableCell>
                  <TableCell>4.8 MB</TableCell>
                  <TableCell>2023-02-10</TableCell>
                  <TableCell>2023-02-10</TableCell>
                  <TableCell>
                    <ActionButtons>
                      <IconButton variant="view"><Eye size={14} /></IconButton>
                      <IconButton variant="edit"><Edit size={14} /></IconButton>
                      <IconButton variant="delete"><Trash size={14} /></IconButton>
                      <IconButton variant="view"><Download size={14} /></IconButton>
                    </ActionButtons>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>DOC003</TableCell>
                  <TableCell>Membership Application Form</TableCell>
                  <TableCell>Forms</TableCell>
                  <TableCell>DOCX</TableCell>
                  <TableCell>320 KB</TableCell>
                  <TableCell>2022-11-05</TableCell>
                  <TableCell>2023-04-12</TableCell>
                  <TableCell>
                    <ActionButtons>
                      <IconButton variant="view"><Eye size={14} /></IconButton>
                      <IconButton variant="edit"><Edit size={14} /></IconButton>
                      <IconButton variant="delete"><Trash size={14} /></IconButton>
                      <IconButton variant="view"><Download size={14} /></IconButton>
                    </ActionButtons>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>DOC004</TableCell>
                  <TableCell>Book Donation Guidelines</TableCell>
                  <TableCell>Policies</TableCell>
                  <TableCell>PDF</TableCell>
                  <TableCell>1.2 MB</TableCell>
                  <TableCell>2023-01-30</TableCell>
                  <TableCell>2023-01-30</TableCell>
                  <TableCell>
                    <ActionButtons>
                      <IconButton variant="view"><Eye size={14} /></IconButton>
                      <IconButton variant="edit"><Edit size={14} /></IconButton>
                      <IconButton variant="delete"><Trash size={14} /></IconButton>
                      <IconButton variant="view"><Download size={14} /></IconButton>
                    </ActionButtons>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>DOC005</TableCell>
                  <TableCell>Historical Archives Index</TableCell>
                  <TableCell>Archives</TableCell>
                  <TableCell>XLSX</TableCell>
                  <TableCell>850 KB</TableCell>
                  <TableCell>2022-09-18</TableCell>
                  <TableCell>2023-03-05</TableCell>
                  <TableCell>
                    <ActionButtons>
                      <IconButton variant="view"><Eye size={14} /></IconButton>
                      <IconButton variant="edit"><Edit size={14} /></IconButton>
                      <IconButton variant="delete"><Trash size={14} /></IconButton>
                      <IconButton variant="view"><Download size={14} /></IconButton>
                    </ActionButtons>
                  </TableCell>
                </TableRow>
              </tbody>
            </Table>
            
            <Pagination>
              <PageInfo>Showing 1 to 5 of 42 entries</PageInfo>
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