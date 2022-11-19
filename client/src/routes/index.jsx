import styled from "styled-components";

import { NavLink } from "react-router-dom";
export default function Index() {
  return (
    <nav>
      <ModulContainer>
        <li key={1}>
          <NavLink
            to={`reservations`}
            className={({ isActive, isPending }) =>
              isActive ? "active" : isPending ? "pending" : ""
            }
          >
            Foglalások
          </NavLink>
        </li>
        <li key={2}>
          <NavLink
            to={`orders`}
            className={({ isActive, isPending }) =>
              isActive ? "active" : isPending ? "pending" : ""
            }
          >
            Rendelések
          </NavLink>
        </li>
      </ModulContainer>
    </nav>
  );
}

const ModulContainer = styled.ul`
  display: flex;
  flex-direction: row;
  list-style-type: none;
  justify-content: center;
  align-items: center;

  li {
    background-color: #efc83b;
    border: 3px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 16px;
  }
  a {
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    color: black;
    font-size: 24px;
    font-weight: bold;
    text-transform: uppercase;
  }
`;
