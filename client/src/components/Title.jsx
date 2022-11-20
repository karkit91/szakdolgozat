import styled from "styled-components";

export default function Title({ children }) {
  return <StyledTitle>{children}</StyledTitle>;
}

const StyledTitle = styled.h1`
  padding-bottom: 16px;
`;
