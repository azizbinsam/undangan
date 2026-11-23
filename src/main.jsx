import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles.css";

// Tambah ?ringan=1 di link untuk menguji tanpa efek berat (kelopak, bunga, awan, parallax)
if (new URLSearchParams(window.location.search).has("ringan")) document.documentElement.classList.add("ringan");

createRoot(document.getElementById("root")).render(<App />);
