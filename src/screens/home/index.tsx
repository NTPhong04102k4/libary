import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { StatCard } from './Item/Statcard';
import { TableStatisticalImportBook } from './Item/TableStatisticalImportBook';
import { StatisticalReaderViolated } from './Item/StatisticalReaderViolated';
import { StatisticalReaderBorrows } from './Item/StatisticalReaderBorrows';


export default function LibraryDashboard() {



  return (
    <>
      <GlobalStyle />
      <AppContainer>


        <MainContainer>

          {/* Main Content */}
          <MainContent>
            {/* Breadcrumb */}
            <BreadcrumbContainer>
              <PageTitle>Dashboard</PageTitle>
              <Breadcrumb>
                <BreadcrumbLink>Home</BreadcrumbLink> / Dashboard
              </Breadcrumb>
            </BreadcrumbContainer>
            <StatCard />

            {/* Tables */}
            <TablesContainer>
              <TableStatisticalImportBook />
              <StatisticalReaderViolated />
            </TablesContainer>
            <StatisticalReaderBorrows />
          </MainContent>
        </MainContainer>
      </AppContainer>
    </>
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

const BreadcrumbContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const PageTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: bold;
`;

const Breadcrumb = styled.div`
  font-size: 0.875rem;
`;

const BreadcrumbLink = styled.span`
  color: #3b82f6;
`;

const TablesContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  margin-bottom: 1.5rem;
  
  @media (min-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

