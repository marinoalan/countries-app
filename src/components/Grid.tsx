import { FC, ReactNode } from 'react';
import styled from 'styled-components';

const StyledGrid = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

const Item = styled.div`
  background-color: red;
`;

const Grid: FC<{ children: ReactNode }> = ({ children }) => (
  <StyledGrid>{children}</StyledGrid>
);

export default Grid;
