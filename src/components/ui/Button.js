// src/components/ui/Button.js
import React from "react";

export const Button = ({ children, ...props }) => (
  <button
    {...props}
    className="py-2 px-4 rounded bg-blue-600 text-white hover:bg-blue-700"
  >
    {children}
  </button>
);
