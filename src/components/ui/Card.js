// src/components/ui/Card.js
import React from "react";

export const Card = ({ children, ...props }) => (
  <div {...props} className="bg-white shadow-md rounded p-4">
    {children}
  </div>
);
