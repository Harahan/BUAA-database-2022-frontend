import React from "react";
import ReactDOM from "react-dom/client";
import App from './App'
import { ChatContextProvider } from "./components/ChatContext/ChatContext";
import { UserContextProvider } from "./components/UserContext/UserContext";

const root = ReactDOM.createRoot(document.getElementById("root"))

root.render(
    <ChatContextProvider>
        <UserContextProvider>
            <React.StrictMode>
                <App />
            </React.StrictMode>,
        </UserContextProvider>
    </ChatContextProvider>
);