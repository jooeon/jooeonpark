import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./assets/styles/styles.css";
import Cursor from "./components/Cursor.jsx";
import { CursorProvider } from "./components/CursorContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <CursorProvider>
            <App />
            <Cursor />
        </CursorProvider>
    </React.StrictMode>
);
