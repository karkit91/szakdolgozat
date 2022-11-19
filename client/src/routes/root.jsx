import styled from "styled-components";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

export default function Root() {
  return (
    <>
      <NavBar />
      <OutletContainer>
        <Outlet />
      </OutletContainer>
    </>
  );
}

const OutletContainer = styled.div`
  background-color: #49f89e;
  position: fixed;
  top: 100px;
  width: 100%;
  height: calc(100% - 100px);
  overflow: auto;
  padding: 16px;
  ul {
    list-style-type: none;
  }

  a {
    text-decoration: none;
  }
`;
