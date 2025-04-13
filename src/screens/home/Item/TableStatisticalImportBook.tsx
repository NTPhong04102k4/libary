import React, { useEffect, useState } from "react";
import styled from "styled-components";

interface BookData {
  id: number;
  name: string;
  amount: number;
  issueNumber: number;
  createdAt: string;
}

export function TableStatisticalImportBook() {
  const [books, setBooks] = useState<BookData[]>([]);

//   useEffect(() => {
//     // Giả sử API trả về dữ liệu là một mảng
//     async function fetchData() {
//       try {
//         const response = await fetch('https://api.example.com/books');
//         const data: BookData[] = await response.json();
//         // Lấy 5 bộ dữ liệu đầu tiên
//         setBooks(data.slice(0, 5));
//       } catch (error) {
//         console.error("Failed to fetch book data", error);
//       }
//     }

//     fetchData();
//   }, []);
  useEffect(() => {
    // Fake API response
    const sampleData: BookData[] = [
      { id: 1, name: "Introduction to React", amount: 30, issueNumber: 1001, createdAt: "2023-12-01" },
      { id: 2, name: "Advanced CSS", amount: 20, issueNumber: 1002, createdAt: "2023-12-05" },
      { id: 3, name: "JavaScript Patterns", amount: 40, issueNumber: 1003, createdAt: "2023-12-10" },
      { id: 4, name: "Understanding TypeScript", amount: 15, issueNumber: 1004, createdAt: "2023-12-15" },
      { id: 5, name: "Node.js Cookbook", amount: 50, issueNumber: 1005, createdAt: "2023-12-20" },
      { id: 6, name: "GraphQL in Action", amount: 25, issueNumber: 1006, createdAt: "2023-12-22" }
    ];

    // Lấy 5 dòng đầu tiên
    setBooks(sampleData.slice(0, 5));
  }, []);
  return (
    <TableCard>
      <TableTitle>New Imported books</TableTitle>
      <TableScrollContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeadCell>#</TableHeadCell>
              <TableHeadCell>Name Book</TableHeadCell>
              <TableHeadCell>Amount</TableHeadCell>
              <TableHeadCell>Issue Number</TableHeadCell>
              <TableHeadCell>Create</TableHeadCell>
            </TableRow>
          </TableHead>
          <tbody>
            {books.map((book, index) => (
              <TableRow key={book.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{book.name}</TableCell>
                <TableCell>{book.amount}</TableCell>
                <TableCell>{book.issueNumber}</TableCell>
                <TableCell>{book.createdAt}</TableCell>
              </TableRow>
            ))}
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
