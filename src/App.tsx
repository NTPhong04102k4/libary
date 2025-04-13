import React from 'react';
import styled from 'styled-components';
import { RootStack } from './router/rootNavigation';

function App() {
  return (
    <Container>
      <RootStack/>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;
`;

export default App;
