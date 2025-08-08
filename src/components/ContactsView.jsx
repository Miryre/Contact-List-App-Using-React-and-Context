// ContactsView.jsx - Main page that displays all contacts
import React from 'react';
import { useContacts } from './ContactContext';
import ContactCard from './ContactCard';

const ContactsView = ({ onAddContact, onEditContact }) => {
  const { contacts, loading, error, refreshContacts, testAPIConnection } = useContacts();
  const { deleteContact } = useContacts();

  // Handle editing a contact
// Handle editing a contact
const handleEdit = (contact) => {
  window.location.href = `/edit/${contact.id}`;
};

  // Handle deleting a contact
  const handleDelete = async (contactId) => {
    await deleteContact(contactId);
  };

  // Handle retry when there's an error
  const handleRetry = () => {
    refreshContacts();
  };

  // Handle testing API connection
  const handleTestAPI = async () => {
    console.log('🧪 Testing API connection manually...');
    await testAPIConnection();
  };

  // Loading State
  if (loading) {
    return (
      <div style={{ 
        textAlign: 'center', 
        padding: '60px 20px',
        minHeight: '400px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <div style={{ 
          fontSize: '24px', 
          marginBottom: '16px',
          color: '#007bff'
        }}>
          📱 Loading contacts...
        </div>
        <div style={{ 
          color: '#666',
          fontSize: '16px'
        }}>
          Please wait while we fetch your contacts
        </div>
        
        {/* Loading Animation */}
        <div style={{
          marginTop: '20px',
          width: '40px',
          height: '40px',
          border: '4px solid #f3f3f3',
          borderTop: '4px solid #007bff',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div style={{ 
        textAlign: 'center', 
        padding: '40px 20px', 
        maxWidth: '600px', 
        margin: '0 auto' 
      }}>
        {/* Error Message Box */}
        <div style={{ 
          backgroundColor: '#f8d7da', 
          color: '#721c24', 
          padding: '20px', 
          borderRadius: '8px', 
          marginBottom: '20px',
          border: '1px solid #f5c6cb'
        }}>
          <h3 style={{ margin: '0 0 10px 0' }}>⚠️ Connection Error</h3>
          <p style={{ margin: '0 0 15px 0' }}>{error}</p>
          
          {/* Action Buttons */}
          <div style={{ 
            display: 'flex', 
            gap: '12px', 
            justifyContent: 'center', 
            flexWrap: 'wrap' 
          }}>
            <button
              onClick={handleRetry}
              style={{
                padding: '10px 20px',
                borderRadius: '6px',
                border: 'none',
                backgroundColor: '#007bff',
                color: 'white',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              🔄 Retry
            </button>
            <button
              onClick={handleTestAPI}
              style={{
                padding: '10px 20px',
                borderRadius: '6px',
                border: '1px solid #6c757d',
                backgroundColor: 'white',
                color: '#6c757d',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              🧪 Test API
            </button>
          </div>
        </div>
        
        {/* Troubleshooting Tips */}
        <div style={{ 
          backgroundColor: '#d1ecf1', 
          color: '#0c5460', 
          padding: '15px', 
          borderRadius: '6px',
          fontSize: '14px',
          textAlign: 'left'
        }}>
          <strong>💡 Troubleshooting Tips:</strong>
          <ul style={{ margin: '10px 0 0 0', paddingLeft: '20px' }}>
            <li>Check your internet connection</li>
            <li>Make sure the API endpoint is accessible</li>
            <li>Open browser console (F12) to see detailed error logs</li>
            <li>Try using a different network or VPN</li>
            <li>The API might be temporarily down</li>
          </ul>
        </div>
      </div>
    );
  }

  // Main Contacts View
  return (
    <div style={{ 
      maxWidth: '900px', 
      margin: '0 auto', 
      padding: '20px' 
    }}>
      {/* Header Section */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '32px',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        {/* Page Title */}
        <div>
          <h1 style={{ 
            color: '#333', 
            margin: '0 0 8px 0',
            fontSize: '32px',
            fontWeight: '700'
          }}>
            📱 My Contacts
          </h1>
          <p style={{
            color: '#666',
            margin: 0,
            fontSize: '16px'
          }}>
            Manage your contact list with ease
          </p>
        </div>

        {/* Add Contact Button */}
        <button
          onClick={() => window.location.href = '/add'}
          style={{
            padding: '12px 24px',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: '#007bff',
            color: 'white',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 2px 4px rgba(0, 123, 255, 0.3)',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#0056b3';
            e.target.style.transform = 'translateY(-1px)';
            e.target.style.boxShadow = '0 4px 8px rgba(0, 123, 255, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#007bff';
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 2px 4px rgba(0, 123, 255, 0.3)';
          }}
        >
          ➕ Add New Contact
        </button>
      </div>

      {/* Contacts List or Empty State */}
      {contacts.length === 0 ? (
        // Empty State
        <div style={{ 
          textAlign: 'center', 
          padding: '60px 20px',
          backgroundColor: 'white',
          borderRadius: '12px',
          border: '2px dashed #dee2e6'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>📇</div>
          <h3 style={{ 
            color: '#333', 
            marginBottom: '8px',
            fontSize: '24px',
            fontWeight: '600'
          }}>
            No contacts yet
          </h3>
          <p style={{ 
            color: '#666', 
            marginBottom: '24px',
            fontSize: '16px'
          }}>
            Start building your contact list by adding your first contact!
          </p>
          <button
            onClick={onAddContact}
            style={{
              padding: '12px 24px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: '#28a745',
              color: 'white',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '600'
            }}
          >
            ➕ Add Your First Contact
          </button>
        </div>
      ) : (
        // Contacts List
        <div>
          {/* Contacts Count */}
          <div style={{ 
            marginBottom: '20px',
            color: '#666',
            fontSize: '14px'
          }}>
            Showing {contacts.length} contact{contacts.length !== 1 ? 's' : ''}
          </div>

          {/* Contact Cards */}
          <div>
            {contacts.map(contact => (
              <ContactCard
                key={contact.id}
                contact={contact}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactsView;