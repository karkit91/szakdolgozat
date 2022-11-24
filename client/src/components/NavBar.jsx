import styled from "styled-components";
import { NavLink, useMatch } from "react-router-dom";
import Clock from "./Clock";

export default function NavBar() {
  const match = useMatch({ path: "/", exact: true });
  return (
    <NavBarContainer indexPage={match}>
      {match ? (
        <Clock>18:00:13</Clock>
      ) : (
        <>
          <Nav>
            <ul>
              <li>
                <NavLink
                  to={`/`}
                  className={({ isActive, isPending }) =>
                    isActive ? "active" : isPending ? "pending" : ""
                  }
                >
                  Kezdő oldal
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={`reservations`}
                  className={({ isActive, isPending }) =>
                    isActive ? "active" : isPending ? "pending" : ""
                  }
                >
                  Foglalások
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={`orders`}
                  className={({ isActive, isPending }) =>
                    isActive ? "active" : isPending ? "pending" : ""
                  }
                >
                  Rendelések
                </NavLink>
              </li>
            </ul>
          </Nav>
          <Clock>18:00:13</Clock>
        </>
      )}
    </NavBarContainer>
  );
}

const NavBarContainer = styled.div`
  background: #000000;
  display: flex;
  position: fixed;
  width: 100%;
  height: 100px;
  padding-left: 16px;
  justify-content: ${({ indexPage }) =>
    indexPage ? "flex-end" : "space-between"};
`;

const Nav = styled.nav`
  display: flex;

  ul {
    list-style: none;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 16px;
  }

  a {
    text-decoration: none;
    color: #cccccc;
  }

  a.active {
    color: #efc83b;
  }
`;
