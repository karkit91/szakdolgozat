import styled from "styled-components";
import { useRouteError, Link } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <Container>
      <h1>404!</h1>
      <p>A keresett oldal nem található</p>
      <StyledLink to="/">Vissza a főoldalra</StyledLink>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  background-color: #49f89e;
`;

const StyledLink = styled(Link)`
  color: #efc83b;
  font-weight: bold;
  background-color: black;
  padding: 4px;
  border-radius: 8px;
`;
