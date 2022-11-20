import { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { addItem, removeItem } from "../store/orderSlice";
import { useParams } from "react-router-dom";
import {
  postAddItemToReservation,
  removeItemFromReservation,
} from "../utils/api";

export default function Menu({ menu }) {
  const [visible, setVisible] = useState({});
  const dispatch = useDispatch();
  let { id: reservationId } = useParams();

  const handleAddItem = async (item) => {
    const newItem = {
      ...item,
      reservationId,
      itemId: item.id,
      menuId: item.menuId,
      addedTime: new Date().toISOString(),
    };

    await postAddItemToReservation(reservationId, newItem);

    dispatch(addItem([newItem]));
  };

  const handleRemoveItem = async (id) => {
    await removeItemFromReservation(reservationId, id);
    dispatch(removeItem({ id, reservationId }));
  };

  return (
    <MenuRoot>
      {menu.map((menuGroup) => {
        const { type, menuId } = menuGroup;
        return (
          <Type key={menuId} id={`${menuId}`}>
            <h3
              onClick={(e) => {
                if (e.target !== e.currentTarget) return;
                const newVisibleState = { ...visible };
                newVisibleState[`${menuId}`] = !newVisibleState[`${menuId}`];
                setVisible(newVisibleState);
              }}
            >
              {type}
            </h3>
            <MenuGroup visible={visible[`${menuId}`]}>
              {menuGroup.items.map((item) => {
                return (
                  <li key={item.id}>
                    <div>{item.item}</div>
                    <div>{item.quantity}</div>
                    <div>{item.unit}</div>
                    <div className="price">{item.price}</div>
                    <div>{item.currency}</div>
                    <StyledButton
                      onClick={() => handleAddItem({ ...item, menuId })}
                    >
                      +
                    </StyledButton>
                    <StyledButton
                      onClick={() => {
                        handleRemoveItem(item.id);
                      }}
                    >
                      -
                    </StyledButton>
                  </li>
                );
              })}
            </MenuGroup>
          </Type>
        );
      })}
    </MenuRoot>
  );
}

export const MenuRoot = styled.ul`
  align-items: center;
  width: 440px;
  min-width: 440px;
  color: #e6e6e6;
  overflow: auto;

  h3 {
    margin: 0;
    padding: 8px;
    display: block;
    text-align: center;
    cursor: pointer;
    background-color: #000000;
  }
`;

export const Type = styled.li`
  width: 100%;
`;

export const MenuGroup = styled.ul`
  display: ${({ visible }) => (visible ? "flex" : "none")};
  align-items: center;
  flex-direction: column;
  background-color: #efc83b;

  color: #000000;

  li {
    display: grid;
    grid-template-columns: 100px repeat(2, 20px) 100px repeat(3, 30px);
    gap: 8px;
    margin: 4px;

    div,
    button {
      align-self: center;
    }

    div.price {
      text-align: center;
    }
  }
`;

const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 16px;
  font-size: 18px;
`;
