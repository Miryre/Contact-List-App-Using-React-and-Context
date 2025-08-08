
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ContactProvider } from './components/ContactContext';
import ContactsView from './components/ContactsView';
import AddContactView from './components/AddContactView';

// MOVE WRAPPER COMPONENTS TO THE TOP (before router)
const ContactsViewWrapper = () => {
  return (
    <ContactsView 
      onAddContact={() => window.location.href = '/add'}
      onEditContact={(contact) => window.location.href = `/edit/${contact.id}`}
    />
  );
};

const AddContactViewWrapper = () => {
  const path = window.location.pathname;
  const isEdit = path.startsWith('/edit/');
  const contactId = isEdit ? parseInt(path.split('/')[2]) : null;
  
  return (
    <AddContactView 
      contactToEdit={contactId ? { id: contactId } : null}
      onBack={() => window.location.href = '/'}
      onSave={() => window.location.href = '/'}
    />
  );
};

// NOW define the router (after the components)
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ContactProvider>
        <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
          <ContactsViewWrapper />
        </div>
      </ContactProvider>
    ),
  },
  {
    path: "/add",
    element: (
      <ContactProvider>
        <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
          <AddContactViewWrapper />
        </div>
      </ContactProvider>
    ),
  },
  {
    path: "/edit/:id",
    element: (
      <ContactProvider>
        <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
          <AddContactViewWrapper />
        </div>
      </ContactProvider>
    ),
  },
]);

// Prevent double root creation
if (!window.__react_root__) {
    window.__react_root__ = ReactDOM.createRoot(document.getElementById('root'));
}

window.__react_root__.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);