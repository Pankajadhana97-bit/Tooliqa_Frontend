import React from "react";

export const CountryOptions = ({ handleCountry }) => {
  return (
    <select
      onChange={(e) => handleCountry(e.target.value)}
    >
      <option value="US">America</option>
      <option value="GB">Great Britain</option>
      <option value="SG">Singapore</option>
    </select>
  );
};
