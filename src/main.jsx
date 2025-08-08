
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { ContactProvider } from './components/ContactContext';
import ContactsView from './components/ContactsView';
import AddContactView from './components/AddContactView';

const App = () => {
    const [currentView, setCurrentView] = React.useState('contacts');
    const [contactToEdit, setContactToEdit] = React.useState(null);

    return (
        <ContactProvider>
            <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
                {currentView === 'contacts' ? (
                    <ContactsView 
                        onAddContact={() => {
                            setContactToEdit(null);
                            setCurrentView('add');
                        }}
                        onEditContact={(contact) => {
                            setContactToEdit(contact);
                            setCurrentView('add');
                        }}
                    />
                ) : (
                    <AddContactView
                        contactToEdit={contactToEdit}
                        onBack={() => {
                            setContactToEdit(null);
                            setCurrentView('contacts');
                        }}
                        onSave={() => {
                            setContactToEdit(null);
                            setCurrentView('contacts');
                        }}
                    />
                )}
            </div>
        </ContactProvider>
    );
}

// Prevent double root creation
if (!window.__react_root__) {
    window.__react_root__ = ReactDOM.createRoot(document.getElementById('root'));
}

window.__react_root__.render(<App />);