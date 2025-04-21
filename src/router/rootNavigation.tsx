import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import HomeScreen from '../screens/home';
import LoginForm from '../screens/login';
import { ReaderManagement } from '../screens/reader';
import { DocumentManagement } from '../screens/document';
import styled, { createGlobalStyle } from 'styled-components';
import { SideBar } from '../components/SideBar';
import { AdminFooter } from '../screens/home/Item/Footer';
import { Menu } from 'lucide-react';
import LibraryManagementSystem from '../screens/system';
import RegisterForm from '../screens/register';
import { PageTransition } from './PageTransition';
import BooksManagement from '../screens/book';
interface StyleIsSideBarCollaps {
  collaps: boolean;
}

// Component bọc cho các route cần bảo vệ
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  
  if (!isAuthenticated) {
    // Nếu chưa đăng nhập, chuyển hướng đến trang login
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

export function RootStack() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('isAuthenticated') === 'true'
  );
  const name = localStorage.getItem('username');
  
  // Kiểm tra trạng thái đăng nhập khi component được mount và khi localStorage thay đổi
  useEffect(() => {
    const checkAuth = () => {
      const authStatus = localStorage.getItem('isAuthenticated') === 'true';
      setIsAuthenticated(authStatus);
    };
    
    // Kiểm tra ngay khi component được mount
    checkAuth();
    
    // Thêm event listener để lắng nghe thay đổi từ các tab/window khác
    window.addEventListener('storage', checkAuth);
    
    return () => {
      window.removeEventListener('storage', checkAuth);
    };
  }, []);
  
  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };
  
  const handleLogin = (success: boolean) => {
    if (success) {
      // Lưu trạng thái đăng nhập vào localStorage để duy trì giữa các lần truy cập
      localStorage.setItem('isAuthenticated', 'true');
      setIsAuthenticated(true); // Cập nhật state ngay lập tức
    }
  };
  
  const handleRegister = (success: boolean) => {
    if (success) {
      // Lưu trạng thái đăng nhập vào localStorage sau khi đăng ký thành công
      localStorage.setItem('isAuthenticated', 'true');
      setIsAuthenticated(true); // Cập nhật state ngay lập tức
    }
  };
  
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('username');
    localStorage.removeItem('access_token');
    setIsAuthenticated(false); // Cập nhật state ngay lập tức
  };
  
  return (
    <Router>
      <GlobalStyle />
      <AppContainer>
        {isAuthenticated && (
          <Header>
            <HeaderLeft collaps={isSidebarCollapsed}>
              <HeaderTitle>Library Manager</HeaderTitle>
              <MenuButton onClick={toggleSidebar}>
                <Menu size={20} />
              </MenuButton>
            </HeaderLeft>
            <AdminLabel>
              {name}
              <LogoutButton onClick={handleLogout}>Đăng xuất</LogoutButton>
            </AdminLabel>
          </Header>
        )}
        
        <MainContainer>
          {isAuthenticated && <SideBar collapsed={isSidebarCollapsed} />}
          <MainContent>
            <PageTransition>
              <Routes>
                {/* Route public */}
                <Route 
                  path="/login" 
                  element={
                    isAuthenticated ? 
                      <Navigate to="/" replace /> : 
                      <LoginForm onLogin={handleLogin} />
                  } 
                />
                <Route 
                  path="/register" 
                  element={
                    isAuthenticated ? 
                      <Navigate to="/" replace /> : 
                      <RegisterForm onRegister={handleRegister} />
                  } 
                />
                
                {/* Route được bảo vệ */}
                <Route 
                  path="/" 
                  element={
                    <ProtectedRoute>
                      <HomeScreen />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/reader" 
                  element={
                    <ProtectedRoute>
                      <ReaderManagement />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/book" 
                  element={
                    <ProtectedRoute>
                      <BooksManagement />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/document" 
                  element={
                    <ProtectedRoute>
                      <DocumentManagement />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/system" 
                  element={
                    <ProtectedRoute>
                      <LibraryManagementSystem />
                    </ProtectedRoute>
                  } 
                />
                
                {/* Chuyển hướng URL không tồn tại về trang chính */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </PageTransition>
          </MainContent>
        </MainContainer>
        {isAuthenticated && <AdminFooter />}
      </AppContainer>
    </Router>
  );
}

// Các styled components giữ nguyên như cũ
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
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const LogoutButton = styled.button`
  background-color: #1e40af;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.25rem 0.5rem;
  cursor: pointer;
  font-size: 0.75rem;
  
  &:hover {
    background-color: #1e3a8a;
  }
`;

const MainContainer = styled.div`
  display: flex;
  flex: 1;  
  overflow-y: auto;
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