import React, { useState } from "react";
import "./MyCheckBox.css";

export default function MyCheckBox({
  eventName,
  onToggle,
  boxStatus = false,
}) {
  const [status, setStatus] = useState(boxStatus);

  return (
    <label
      className="my-checkbox"
      onChange={() => {
        setStatus(!status);
      }}
    >
      <span className={`event-name ${status ? "checked" : ""}`}>
        {eventName}
      </span>
      <input type="checkbox" checked={status} onChange={onToggle} />
      <span className="checkmark"></span>
    </label>
  );
}
