import { useEffect, useState } from "react";
import styled from "styled-components";
import { getFreeTables } from "../utils/api";

export default function TableSelect({
  selectedTable,
  reservationId,
  disabled,
}) {
  const [freeTables, setFreeTables] = useState([]);

  useEffect(() => {
    getFreeTables(reservationId).then((data) => {
      setFreeTables(data);
    });
  }, [reservationId]);

  return (
    <StyledSelect
      disabled={disabled}
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
