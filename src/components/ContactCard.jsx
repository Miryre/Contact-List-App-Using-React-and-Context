// ContactCard.jsx - Displays a single contact with edit/delete options
import React, { useState } from 'react';
import Modal from './Modal';

const ContactCard = ({ contact, onEdit, onDelete }) => {
  const [showModal, setShowModal] = useState(false);

  // Handle delete confirmation
  const handleDelete = () => {
    setShowModal(false);
    onDelete(contact.id);
  };

  return (
    <>
      {/* Contact Card */}
      <div 
        style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '20px',
          marginBottom: '16px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e9ecef',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease'
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = 'translateY(-2px)';
          e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
        }}
      >
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'flex-start' 
        }}>
          {/* Contact Information */}
          <div style={{ flex: 1 }}>
            {/* Contact Name */}
            <h4 style={{ 
              margin: '0 0 12px 0', 
              color: '#333', 
              fontSize: '20px', 
              fontWeight: '600' 
            }}>
              {contact.name}
            </h4>

            {/* Contact Email */}
            <div style={{ 
              color: '#666', 
              marginBottom: '8px',
              display: 'flex',
              alignItems: 'center',
              fontSize: '14px'
            }}>
              <span style={{ marginRight: '8px' }}>📧</span>
              <a 
                href={`mailto:${contact.email}`}
                style={{ 
                  color: '#007bff', 
                  textDecoration: 'none' 
                }}
                onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
              >
                {contact.email}
              </a>
            </div>

            {/* Contact Phone */}
            <div style={{ 
              color: '#666', 
              marginBottom: '8px',
              display: 'flex',
              alignItems: 'center',
              fontSize: '14px'
            }}>
              <span style={{ marginRight: '8px' }}>📱</span>
              <a 
                href={`tel:${contact.phone}`}
                style={{ 
                  color: '#28a745', 
                  textDecoration: 'none' 
                }}
                onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
              >
                {contact.phone}
              </a>
            </div>

            {/* Contact Address */}
            <div style={{ 
              color: '#666',
              display: 'flex',
              alignItems: 'flex-start',
              fontSize: '14px'
            }}>
              <span style={{ marginRight: '8px', marginTop: '2px' }}>📍</span>
              <span>{contact.address}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column',
            gap: '8px', 
            marginLeft: '16px' 
          }}>
            {/* Edit Button */}
            <button
              onClick={() => onEdit(contact)}
              style={{
                padding: '8px 16px',
                borderRadius: '6px',
                border: '1px solid #007bff',
                backgroundColor: 'white',
                color: '#007bff',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: '500',
                minWidth: '70px',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#007bff';
                e.target.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'white';
                e.target.style.color = '#007bff';
              }}
            >
              ✏️ Edit
            </button>

            {/* Delete Button */}
            <button
              onClick={() => setShowModal(true)}
              style={{
                padding: '8px 16px',
                borderRadius: '6px',
                border: '1px solid #dc3545',
                backgroundColor: 'white',
                color: '#dc3545',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: '500',
                minWidth: '70px',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#dc3545';
                e.target.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'white';
                e.target.style.color = '#dc3545';
              }}
            >
              🗑️ Delete
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleDelete}
        contactName={contact.name}
      />
    </>
  );
};

export default ContactCard;