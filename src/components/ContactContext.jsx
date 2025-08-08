// ContactContext.jsx - Manages all contact data and operations
import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Create the Context
const ContactContext = createContext();

// Contact Reducer - handles state updates
const contactReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CONTACTS':
      return { ...state, contacts: action.payload, loading: false };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'ADD_CONTACT':
      return { ...state, contacts: [...state.contacts, action.payload] };
    case 'UPDATE_CONTACT':
      return { 
        ...state, 
        contacts: state.contacts.map(contact => 
          contact.id === action.payload.id ? action.payload : contact
        )
      };
    case 'DELETE_CONTACT':
      return { 
        ...state, 
        contacts: state.contacts.filter(contact => contact.id !== action.payload)
      };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

// Contact Provider Component - wraps the app and provides context
export const ContactProvider = ({ children }) => {
  const [state, dispatch] = useReducer(contactReducer, {
    contacts: [
      // Mock data for testing
      {
        id: 1,
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "+1 (555) 123-4567",
        address: "123 Main St, New York, NY 10001"
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "jane.smith@example.com",
        phone: "+1 (555) 987-6543",
        address: "456 Oak Ave, Los Angeles, CA 90210"
      },
      {
        id: 3,
        name: "Bob Johnson",
        email: "bob.johnson@example.com",
        phone: "+1 (555) 456-7890",
        address: "789 Pine St, Chicago, IL 60601"
      }
    ],
    loading: false,
    error: null
  });

  let nextId = 4; // For generating new IDs

  // Mock function for testing API connection
  const testAPIConnection = async () => {
    console.log('🔍 API testing disabled - using mock data');
    return true;
  };

  // Mock fetch contacts (simulates loading)
  const fetchContacts = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });
    
    // Simulate loading delay
    setTimeout(() => {
      console.log('✅ Using mock data - no API calls');
      dispatch({ type: 'SET_LOADING', payload: false });
    }, 500);
  };

  // Create new contact (mock implementation)
  const createContact = async (contactData) => {
    try {
      console.log('➕ Creating contact (MOCK):', contactData);
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Create new contact with generated ID
      const newContact = {
        id: nextId++,
        ...contactData
      };
      
      console.log('✅ Contact created successfully (MOCK):', newContact);
      
      dispatch({ type: 'ADD_CONTACT', payload: newContact });
      dispatch({ type: 'SET_LOADING', payload: false });
      return true;
    } catch (error) {
      console.error('Error creating contact:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to create contact' });
      return false;
    }
  };

  // Update existing contact (mock implementation)
  const updateContact = async (contactId, contactData) => {
    try {
      console.log(`✏️ Updating contact ${contactId} (MOCK):`, contactData);
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 600));
      
      const updatedContact = {
        id: contactId,
        ...contactData
      };
      
      console.log('✅ Contact updated successfully (MOCK):', updatedContact);
      
      dispatch({ type: 'UPDATE_CONTACT', payload: updatedContact });
      dispatch({ type: 'SET_LOADING', payload: false });
      return true;
    } catch (error) {
      console.error('Error updating contact:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to update contact' });
      return false;
    }
  };

  // Delete contact (mock implementation)
  const deleteContact = async (contactId) => {
    try {
      console.log(`🗑️ Deleting contact ${contactId} (MOCK)`);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 400));
      
      console.log('✅ Contact deleted successfully (MOCK)');
      dispatch({ type: 'DELETE_CONTACT', payload: contactId });
      return true;
    } catch (error) {
      console.error('Error deleting contact:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to delete contact' });
      return false;
    }
  };

  // Load mock data on component mount
  useEffect(() => {
    console.log('📱 Contact app loaded with mock data');
  }, []);

  // Context value - what components can access
  const contextValue = {
    ...state, // contacts, loading, error
    createContact,
    updateContact,
    deleteContact,
    refreshContacts: fetchContacts,
    testAPIConnection
  };

  return (
    <ContactContext.Provider value={contextValue}>
      {children}
    </ContactContext.Provider>
  );
};

// Custom hook to use the contact context
export const useContacts = () => {
  const context = useContext(ContactContext);
  if (!context) {
    throw new Error('useContacts must be used within a ContactProvider');
  }
  return context;
};