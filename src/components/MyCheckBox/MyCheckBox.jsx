import React, { useState } from "react";

export default function MyCheckBox({ boxStatus = false }) {
  const [status, setStatus] = useState(boxStatus);

  return (
    <>
      <input
        type="checkbox"
        checked={status}
        onChange={() => {
          setStatus(!status);
        }}
      />
    </>
  );
}
