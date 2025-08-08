
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ContactsView from './ContactsView';

const ContactsViewWrapper = () => {
    const navigate = useNavigate();

    return (
        <ContactsView 
            onAddContact={() => navigate('/add')}
            onEditContact={(contact) => navigate(`/edit/${contact.id}`)}
        />
    );
};

export default ContactsViewWrapper;