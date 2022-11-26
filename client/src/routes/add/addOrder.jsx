import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import styled from "styled-components";
import { useLoaderData, useParams } from "react-router-dom";
import Menu from "../../components/Menu";
import { addItem, removeItem } from "../../store/orderSlice";
import Title from "../../components/Title";
import {
  getOrder,
  getMenu,
  addItemToOrder,
  removeItemFromOrder,
} from "../../utils/api";

export async function loader({ params }) {
  const menu = await getMenu();
  const order = await getOrder(params.id);
  return { menu, order };
}

export default function AddOrder() {
  const { menu, order } = useLoaderData();
  let { id: reservationId } = useParams();
  const dispatch = useDispatch();

  const orderFromStore = useSelector((state) => state.orders.items).filter(
    (order) => order.reservationId === reservationId
  );

  const orderInited = useSelector((state) => state.orders.inited);

  useEffect(() => {
    if (!orderInited) {
      dispatch(addItem(order));
    }
  }, [dispatch, order, orderInited]);

  const handleAddItem = async (item) => {
    const newItem = {
      ...item,
      reservationId,
      itemId: item.id,
      menuId: item.menuId,
      addedTime: new Date().toISOString(),
    };

    await addItemToOrder(reservationId, newItem);
    dispatch(addItem([newItem]));
  };

  const handleRemoveItem = async (id) => {
    await removeItemFromOrder(reservationId, id);

    dispatch(removeItem({ id, reservationId }));
  };

  return (
    <>
      <Title>Rendelések</Title>
      <Content>
        <OrderListContainer>
          <OrderList>
            {orderFromStore.map((item) => {
              return (
                <ItemRow key={`${item.addedTime}`}>
                  <div>{item.item}</div>
                  <div>{item.quantity}</div>
                  <div>{item.unit}</div>
                  <div>{item.price}</div>

                  <StyledButton
                    onClick={() => {
                      handleAddItem({ ...item, menuId: item.menuId });
                    }}
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
                </ItemRow>
              );
            })}
          </OrderList>
          <FooterMenu>
            <SumDiv>
              Végösszeg:{" "}
              {orderFromStore.reduce((prev, curr) => prev + +curr.price, 0)}
            </SumDiv>
            <StyledButton>Fizet</StyledButton>
          </FooterMenu>
        </OrderListContainer>
        <Menu menu={menu || []} />
      </Content>
    </>
  );
}

const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  height: calc(100% - 100px);
`;

const OrderListContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  flex-grow: 1;
`;

const OrderList = styled.div`
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-bottom: 8px;
`;

const ItemRow = styled.div`
  display: grid;
  grid-template-columns: 100px repeat(2, 20px) 80px repeat(2, 60px);
  align-items: center;
  gap: 8px;
`;

const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 16px;
  font-size: 18px;
  background-color: #efc83b;
  border-radius: 8px;
`;

const FooterMenu = styled.div`
  background-color: black;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 8px;
`;

const SumDiv = styled.div`
  color: #ffffff;
`;
