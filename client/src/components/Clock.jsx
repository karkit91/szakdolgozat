import { useEffect, useState } from "react";
import styled from "styled-components";

export default function Clock() {
  const [date, setDate] = useState(new Date());

  const refreshClock = () => {
    setDate(new Date());
  };

  useEffect(() => {
    const timerId = setInterval(refreshClock, 1000);
    return () => {
      clearInterval(timerId);
    };
  }, []);

  return <Container>{date.toLocaleString()}</Container>;
}

const Container = styled.div`
  color: #2b2222;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #efc83b;
  min-width: 200px;
`;
