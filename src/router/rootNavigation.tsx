import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeScreen from '../screens/home';
import LoginForm from '../screens/login';
import { ReaderManagement } from '../screens/reader';
import { BookManagement } from '../screens/book';
import { DocumentManagement } from '../screens/document';
import styled, { createGlobalStyle } from 'styled-components';
import { SideBar } from '../components/SideBar';
import { AdminFooter } from '../screens/home/Item/Footer';
import { Menu } from 'lucide-react';
import LibraryManagementSystem from '../screens/system';
interface StyleIsSideBarCollaps {
  collaps: boolean;
}
export function RootStack() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <Router>
      <GlobalStyle />
      <AppContainer>
        {/* Header */}
        <Header>
          <HeaderLeft collaps={isSidebarCollapsed}>
            <HeaderTitle>Library Manager</HeaderTitle>
            <MenuButton onClick={toggleSidebar}>
              <Menu size={20} />
            </MenuButton>
          </HeaderLeft>
          <AdminLabel>Admin</AdminLabel>
        </Header>

        <MainContainer>
          <SideBar collapsed={isSidebarCollapsed} />
          <MainContent>
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/reader" element={<ReaderManagement />} />
              <Route path="/book" element={<BookManagement />} />
              <Route path="/document" element={<DocumentManagement />} />
              <Route path="/system" element={<LibraryManagementSystem />} />
            </Routes>
          </MainContent>
        </MainContainer>
        <AdminFooter />
      </AppContainer>
    </Router>
  );
}
const GlobalStyle = createGlobalStyle`
  * {
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE và Edge */
    &::-webkit-scrollbar {
      width: 0;
      display: none; /* Chrome, Safari, và Opera */
    }
  }
`;

// Styled Components
const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f3f4f6;
  flex: 1;
  overflow-y: auto;
`;

const Header = styled.header`
  background-color: #3b82f6;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const HeaderTitle = styled.h1`
  font-size: 1.25rem;
  font-weight: bold;
  margin-left: 1rem;
`;

const HeaderLeft = styled.div<StyleIsSideBarCollaps>`
  display: flex;
  align-items: center;
  width: 35vh;
  background-color: ${(props) =>
    !props.collaps ? "#245bc7" : "#3b82f6"};
`;


const AdminLabel = styled.div`
  font-size: 0.875rem;
  margin-right: 1rem;
`;

const MainContainer = styled.div`
  display: flex;
  flex: 1;  
  overflow-y: auto;
  /* background-color:  */
  
`;

const MainContent = styled.main`
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
  padding-bottom: 2rem;
`;
const MenuButton = styled.button`
  margin-left: 1rem;
  padding: 0.25rem;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
`;
