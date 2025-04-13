import { Book, FileText, Home, Settings, Users } from "lucide-react";
import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface SidebarProps {
  collapsed: boolean;
}

export function SideBar({ collapsed = false }: SidebarProps) {
  const [activeItem, setActiveItem] = useState("Home");
    const navigate=useNavigate()
  const navItems = [
    { label: "Home", icon: <Home size={18} /> ,path:'/'},
    { label: "Reader Management", icon: <Users size={18} />,path:'/reader' },
    { label: "Books Management", icon: <Book size={18} /> ,path:'/book'},
    { label: "Document Management", icon: <FileText size={18} />,path:'/document' },
    { label: "System Management", icon: <Settings size={18} /> ,path:'/system'},
  ];

  return (
    <SidebarContainer collapsed={collapsed}>
      <nav>
        <NavList>
          {navItems.map((item) => (
            <NavItem key={item.label}>
              <NavLink
                href="#"
                isActive={activeItem === item.label}
                onClick={() =>{ setActiveItem(item.label);navigate(item.path)}}
              >
                <IconWrapper style={{alignSelf:'center',paddingTop:5}}>{item.icon}</IconWrapper>
                <span>{item.label}</span>
              </NavLink>
            </NavItem>
          ))}
        </NavList>
      </nav>
    </SidebarContainer>
  );
}
const SidebarContainer = styled.aside<SidebarProps>`
  background-color: #18273d;
  color: white;
  width: 35vh;
  flex-shrink: 1;
  display: ${(props) => (props.collapsed ? "none" : "block")};
`;

const NavList = styled.ul`
  padding: 0.5rem;
`;

const NavItem = styled.li`
  margin-bottom: 0.25rem;
  /* background-color: red; */
`;

const NavLink = styled.a<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  padding: 0.75rem;
  border-radius: 0.25rem;
  cursor: pointer;
  opacity: ${(props) => (props.isActive ? 1 : 0.6)};
  background-color: ${(props) => (props.isActive ? "#36455e" : "transparent")};
  transition: all 0.2s ease-in-out;
    color: #fff;
    text-decoration: none;
  &:hover {
    opacity: 1;
    background-color: #374151;
  }
`;

const IconWrapper = styled.span`
  margin-right: 0.75rem;
`;
