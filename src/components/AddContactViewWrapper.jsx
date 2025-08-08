// components/AddContactViewWrapper.jsx - NEW FILE
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useContacts } from './ContactContext';
import AddContactView from './AddContactView';

const AddContactViewWrapper = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { contacts } = useContacts();
    const [contactToEdit, setContactToEdit] = useState(null);

    useEffect(() => {
        if (id) {
            const contact = contacts.find(c => c.id === parseInt(id));
            setContactToEdit(contact);
        }
    }, [id, contacts]);

    return (
        <AddContactView 
            contactToEdit={contactToEdit}
            onBack={() => navigate('/')}
            onSave={() => navigate('/')}
        />
    );
};

export default AddContactViewWrapper;