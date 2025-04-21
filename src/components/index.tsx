import styled from "styled-components";

export const PageContainer = styled.div`
  padding: 1.5rem;
`;

export const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

export const PageTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
`;

export const ActionButton = styled.button`
  background-color: ${props => props.color || '#3b82f6'};
  color: white;
  border: none;
  border-radius: 0.25rem;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  
  &:hover {
    opacity: 0.9;
  }
`;

export const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.25rem;
  padding: 0.5rem;
  margin-bottom: 1rem;
`;

export const SearchInput = styled.input`
  border: none;
  flex-grow: 1;
  margin-left: 0.5rem;
  outline: none;
  font-size: 0.875rem;
`;

export const Card = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.5rem;
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #e5e7eb;
`;

export const CardTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
`;

export const CardContent = styled.div`
  padding: 1.5rem;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed; /* Quan trọng để width chia đều chính xác */
`;

// Header container
export const TableHead = styled.thead`
  border-bottom: 2px solid #e5e7eb;
`;

// Header Cell (có truyền props width)
interface CellProps {
  width?: string;
}

export const TableHeadCell = styled.th<CellProps>`
  text-align: left;
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: #4b5563;
  width: ${(props) => props.width || "auto"};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  align-items: center;
  justify-content: center;
`;

// Body Row
export const TableRow = styled.tr`
  border-bottom: 1px solid #e5e7eb;

  &:hover {
    background-color: #f9fafb;
  }
`;

// Body Cell (có truyền props width)
export const TableCell = styled.td<CellProps>`
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  width: ${(props) => props.width || "auto"};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  align-items: center;
  justify-content: center;

`;

type StatusType = 'active' | 'inactive' | 'overdue' | 'available' | 'borrowed' | 'reserved' | 'damaged';

interface BadgeProps {
  status: StatusType;
}

export const Badge = styled.span<BadgeProps>`
  background-color: ${props => {
    switch (props.status) {
      case 'active': return '#10b981';
      case 'inactive': return '#6b7280';
      case 'overdue': return '#ef4444';
      case 'available': return '#10b981';
      case 'borrowed': return '#3b82f6';
      case 'reserved': return '#f59e0b';
      case 'damaged': return '#ef4444';
      default: return '#6b7280';
    }
  }};
  color: white;
  border-radius: 9999px;
  padding: 0.25rem 0.75rem;
  font-size: 0.75rem;
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
`;

export const PageInfo = styled.div`
  font-size: 0.875rem;
  color: #4b5563;
`;

export const PageNavigation = styled.div`
  display: flex;
  gap: 0.25rem;
`;

interface PageButtonProps {
    active?: boolean;
    disabled?: boolean;
  }
  
  export const PageButton = styled.button<PageButtonProps>`
    background-color: ${(props) => (props.active ? '#3b82f6' : 'white')};
    color: ${(props) => (props.active ? 'white' : '#4b5563')};
    border: 1px solid #e5e7eb;
    border-radius: 0.25rem;
    width: 2rem;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
    opacity: ${(props) => (props.disabled ? '0.5' : '1')};
  
    &:hover:not(:disabled) {
      background-color: ${(props) =>
        props.active ? '#3b82f6' : '#f9fafb'};
    }
  `;

export const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`;

interface IconButtonProps {
    variant?: 'edit' | 'delete' | 'view';
  }
  
  export const IconButton = styled.button<IconButtonProps>`
    background-color: ${(props) => {
      switch (props.variant) {
        case 'edit':
          return '#f59e0b'; // yellow-500
        case 'delete':
          return '#ef4444'; // red-500
        case 'view':
          return '#3b82f6'; // blue-500
        default:
          return '#6b7280'; // gray-500
      }
    }};
    color: white;
    border: none;
    border-radius: 0.25rem;
    width: 2rem;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  
    &:hover {
      opacity: 0.9;
    }
  `;

export const Tabs = styled.div`
  display: flex;
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 1.5rem;
`;

interface TabProps {
    active?: boolean;
  }
  
  export const Tab = styled.button<TabProps>`
    background-color: ${props => props.active ? 'white' : 'transparent'};
    border: none;
    border-bottom: ${props => props.active ? '2px solid #3b82f6' : '2px solid transparent'};
    padding: 0.75rem 1.5rem;
    font-size: 0.875rem;
    font-weight: ${props => props.active ? '600' : '400'};
    color: ${props => props.active ? '#3b82f6' : '#4b5563'};
    cursor: pointer;
  
    &:hover {
      color: #3b82f6;
    }
  `;