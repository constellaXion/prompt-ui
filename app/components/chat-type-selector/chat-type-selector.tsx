"use client";

import React, { useState } from "react";

const ChatTypeSelector = () => {
  const [selectedType, setSelectedType] = useState<string>("Online");

  const handleTypeChange = (type: string) => {
    setSelectedType(type);
  };

  return (
    <details className="dropdown">
      <summary className="btn m-1">{selectedType}</summary>
      <ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
        <li onClick={() => handleTypeChange("Online")}>
          <a>Online</a>
        </li>
        <li onClick={() => handleTypeChange("Batch")}>
          <a>Batch</a>
        </li>
      </ul>
    </details>
  );
};

export default ChatTypeSelector;
