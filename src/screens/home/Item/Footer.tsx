import React from 'react';
import styled from 'styled-components';
import { HelpCircle, Settings, Shield, FileText, User } from 'lucide-react';

const FooterContainer = styled.footer`
  background-color: #1e293b;
  color: #e2e8f0;
  padding: 1rem 0;
  font-size: 0.875rem;
  width: 100%;
`;

const FooterContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 1.5rem;
  /* background-color: #fff; */
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;
const FooterSection = styled.div`
  flex: 1;
  padding-left: 1.5rem;
  min-width: 180px;
  /* background-color: red; */
`;

const FooterTitle = styled.h4`
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: white;
  position: relative;
  padding-bottom: 0.25rem;
  
  &:after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 80%;
    height: 2px;
    background-color: #3b82f6;
  }
`;

const FooterList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 2 cột bằng nhau */
  grid-template-rows: repeat(2, auto); /* 2 hàng tự động điều chỉnh chiều cao */
  gap: 0.75rem 1rem; /* Khoảng cách giữa các hàng và cột */
`;

const FooterListItem = styled.li`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  svg {
    color: #3b82f6;
    flex-shrink: 0;
  }
`;
const FooterLink = styled.a`
  color: #e2e8f0;
  text-decoration: none;
  transition: color 0.2s;
  
  &:hover {
    color: #3b82f6;
  }
`;

const Copyright = styled.div`
  text-align: center;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 0.75rem;
  color: #94a3b8;
`;

const VersionInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: 0.5rem;
  font-size: 0.75rem;
  color: #94a3b8;
`;

const Badge = styled.span`
  background-color: #1e40af;
  padding: 0.125rem 0.375rem;
  border-radius: 0.25rem;
  font-size: 0.7rem;
`;

export const AdminFooter = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <FooterTitle>Admin Tools</FooterTitle>
          <FooterList>
            <FooterListItem>
              <Settings size={14} />
              <FooterLink href="/admin/settings">System Settings</FooterLink>
            </FooterListItem>
            <FooterListItem>
              <User size={14} />
              <FooterLink href="/admin/users">User Management</FooterLink>
            </FooterListItem>
            <FooterListItem>
              <Shield size={14} />
              <FooterLink href="/admin/roles">Roles & Permissions</FooterLink>
            </FooterListItem>
            <FooterListItem>
              {/* <Tool size={14} /> */}
              <FooterLink href="/admin/maintenance">System Maintenance</FooterLink>
            </FooterListItem>
          </FooterList>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Reports & Logs</FooterTitle>
          <FooterList>
            <FooterListItem>
              <FileText size={14} />
              <FooterLink href="/admin/logs/system">System Logs</FooterLink>
            </FooterListItem>
            <FooterListItem>
              <FileText size={14} />
              <FooterLink href="/admin/logs/activity">Activity Logs</FooterLink>
            </FooterListItem>
            <FooterListItem>
              <FileText size={14} />
              <FooterLink href="/admin/reports/audit">Audit Reports</FooterLink>
            </FooterListItem>
            <FooterListItem>
              <FileText size={14} />
              <FooterLink href="/admin/reports/performance">Performance Analytics</FooterLink>
            </FooterListItem>
          </FooterList>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Support Resources</FooterTitle>
          <FooterList>
            <FooterListItem>
              <HelpCircle size={14} />
              <FooterLink href="/admin/docs" target="_blank">Administrator Documentation</FooterLink>
            </FooterListItem>
            <FooterListItem>
              <HelpCircle size={14} />
              <FooterLink href="/admin/faq" target="_blank">Admin FAQ</FooterLink>
            </FooterListItem>
            <FooterListItem>
              <HelpCircle size={14} />
              <FooterLink href="/admin/support" target="_blank">Technical Support</FooterLink>
            </FooterListItem>
            <FooterListItem>
              <HelpCircle size={14} />
              <FooterLink href="/admin/training" target="_blank">Training Resources</FooterLink>
            </FooterListItem>
          </FooterList>
        </FooterSection>
      </FooterContent>
      
      <Copyright>
        &copy; {currentYear} Library Manager Admin Portal. All rights reserved.
      </Copyright>
      
      <VersionInfo>
        <span>Version 2.5.1</span>
        <Badge>Admin Portal</Badge>
      </VersionInfo>
    </FooterContainer>
  );
};