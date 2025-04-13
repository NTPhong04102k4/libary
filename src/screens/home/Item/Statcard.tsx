import React from "react";
import styled from "styled-components";
import { Info } from "lucide-react";
import { useNavigate } from 'react-router-dom';

interface StatCardProps {
  bgColor?: string;
  value: string | number;
  title: string;
  path: string;
}
interface StyledCardProps {
    bgColor?: string;
  }
  
// Sample Data
const DATA_STATCARD: StatCardProps[] = [
  {
    bgColor: "#38bdf8",
    value: 3,
    title: "Reader",
    path: "#",
  },
  {
    bgColor: "#22c55e",
    value: 216,
    title: "Books",
    path: "#",
  },
  {
    bgColor: "#f59e0b",
    value: 2,
    title: "Total Book Liquidated",
    path: "#",
  },
  {
    bgColor: "#ef4444",
    value: 2,
    title: "Total Book Borrowing",
    path: "#",
  },
];

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const StatCardContainer = styled.div<StyledCardProps>`
  background-color: ${(props) => props.bgColor || "#3b82f6"};
  color: white;
  border-radius: 0.25rem;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StatContent = styled.div``;

const StatValue = styled.div`
  font-size: 2.25rem;
  font-weight: bold;
`;

const StatTitle = styled.div`
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;

const StatLink = styled.div`
  opacity: 0.7;
  text-align: right;
  align-items: flex-end;
  align-self: flex-end;
  justify-content: center;
  flex-direction: row;
  display: flex;
  height: 1rem;
  cursor: pointer;
`;

const MoreInfoLink = styled.a`
  color: white;
  display: flex;
  align-items: center;

  &:hover {
    color: #e5e7eb;
  }
`;

// Single Card Component
function SingleStatCard({ bgColor, value, title, path }: StatCardProps) {
    const navigate=useNavigate();
    function onHandlePress(){
        navigate(path)
    }
  return (
    <StatCardContainer bgColor={bgColor}>
      <StatContent>
        <StatValue>{value}</StatValue>
        <StatTitle>{title}</StatTitle>
      </StatContent>
      <StatLink onClick={onHandlePress}>
        <MoreInfoLink href={path}>
          More info 
        </MoreInfoLink>
        <Info size={16} style={{ marginLeft: "0.25rem",alignSelf:'center' }} />
      </StatLink>
    </StatCardContainer>
  );
}

// Wrapper Component
export function StatCard() {
  return (
    <StatsContainer>
      {DATA_STATCARD.map((item, index) => (
        <SingleStatCard key={index} {...item} />
      ))}
    </StatsContainer>
  );
}
