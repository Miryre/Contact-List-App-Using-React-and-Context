// Layout.jsx - NEW FILE
import React from "react";
import { Outlet } from "react-router-dom";
import { ContactProvider } from "./components/ContactContext";

export const Layout = () => {
    return (
        <ContactProvider>
            <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
                <Outlet />
            </div>
        </ContactProvider>
    );
};