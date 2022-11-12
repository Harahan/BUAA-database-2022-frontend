import React from "react";
import ReactDOM from "react-dom/client";
import App from './App'
import { ChatContextProvider } from "./components/ChatContext/ChatContext";

const root = ReactDOM.createRoot(document.getElementById("root"))

root.render(
    <ChatContextProvider>
        <React.StrictMode>
            <App />
        </React.StrictMode>,
    </ChatContextProvider>
);