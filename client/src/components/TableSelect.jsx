import styled from "styled-components";

export default function TableSelect({ selectedTable }) {
  return (
    <StyledSelect
      aria-label="Table"
      name="table"
      defaultValue=""
      value={selectedTable}
    >
      <option value="" disabled hidden>
        Válasszon egy asztalt
      </option>
      <option value="1">1. asztal</option>
      <option value="2">2. asztal</option>
      <option value="3">3. asztal</option>
      <option value="4">4. asztal</option>
    </StyledSelect>
  );
}

const StyledSelect = styled.select`
  padding: 4px;
  font-size: 16px;
  border-radius: 16px;
  text-align: center;
`;
