import { useEffect, useState } from "react";
import styled from "styled-components";

export default function TableSelect({ selectedTable, reservationId }) {
  const [freeTables, setFreeTables] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3001/reservedtables/${reservationId}`)
      .then((data) => data.json())
      .then((data) => setFreeTables(data));
  }, []);

  console.log(freeTables);

  return (
    <StyledSelect
      aria-label="Table"
      name="table"
      defaultValue={selectedTable || ""}
    >
      <option value="" disabled hidden>
        Válasszon egy asztalt
      </option>

      {freeTables.map((table) => {
        return (
          <option key={table} value={table}>
            {table}. asztal
          </option>
        );
      })}
    </StyledSelect>
  );
}

const StyledSelect = styled.select`
  padding: 4px;
  font-size: 16px;
  border-radius: 16px;
  text-align: center;
`;
