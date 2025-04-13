import React from "react";
import styled from "styled-components";
export function StatisticalReaderViolated(){
    return(
        <TableCard>
        <TableTitle>Readers violated</TableTitle>
        <TableScrollContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeadCell>#</TableHeadCell>
                <TableHeadCell>Name Reader</TableHeadCell>
                <TableHeadCell>Name Book</TableHeadCell>
                <TableHeadCell>Expiry Date</TableHeadCell>
                <TableHeadCell>Status</TableHeadCell>
                <TableHeadCell>Forfeit</TableHeadCell>
              </TableRow>
            </TableHead>
            <tbody>
              <TableRow>
                <TableCell>35</TableCell>
                <TableCell>Piter</TableCell>
                <TableCell>test</TableCell>
                <TableCell>2020-07-29</TableCell>
                <TableCell>Damaged</TableCell>
                <TableCell>15$</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>32</TableCell>
                <TableCell>Tom</TableCell>
                <TableCell>sdadasdad</TableCell>
                <TableCell>2020-05-31</TableCell>
                <TableCell>Lost</TableCell>
                <TableCell>10$</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>31</TableCell>
                <TableCell>Tom</TableCell>
                <TableCell>sdadasdad</TableCell>
                <TableCell>2020-05-19</TableCell>
                <TableCell></TableCell>
                <TableCell>0$</TableCell>
              </TableRow>
            </tbody>
          </Table>
        </TableScrollContainer>
      </TableCard>
    );
}


const TableCard = styled.div`
  background-color: white;
  border-radius: 0.25rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  
`;

const TableTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const TableScrollContainer = styled.div`
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  font-size: 0.875rem;
`;

const TableHead = styled.thead`
  text-align: left;
`;

const TableHeadCell = styled.th`
  padding-bottom: 0.5rem;
`;

const TableRow = styled.tr``;

const TableCell = styled.td`
  padding: 0.5em 0;
`;
