// routes.jsx - SIMPLIFIED VERSION
import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./Layout";

// Simple components for testing
const HomePage = () => <div><h1>Contact List Home</h1></div>;
const AddPage = () => <div><h1>Add Contact</h1></div>;

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <HomePage />
            },
            {
                path: "/add",
                element: <AddPage />
            }
        ]
    }
]);