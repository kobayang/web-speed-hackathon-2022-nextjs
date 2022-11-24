import zenginCode from "zengin-code";

const bankList = Object.entries(zenginCode).map(([code, { name }]) => ({
  code,
  name,
}));

export function DataList() {
  return (
    <datalist id="ChargeDialog-bank-list">
      {bankList.map(({ code, name }) => (
        <option key={code} value={code}>{`${name} (${code})`}</option>
      ))}
    </datalist>
  );
}
