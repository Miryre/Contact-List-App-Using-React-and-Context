// Modal.jsx - Reusable confirmation modal component
import React from 'react';

const Modal = ({ isOpen, onClose, onConfirm, contactName }) => {
  // Don't render anything if modal is closed
  if (!isOpen) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000 // Make sure it's on top
      }}
      onClick={onClose} // Close when clicking backdrop
    >
      <div 
        style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '24px',
          maxWidth: '400px',
          width: '90%',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)'
        }}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking modal content
      >
        {/* Modal Header */}
        <h3 style={{ 
          marginBottom: '16px', 
          color: '#333',
          fontSize: '20px',
          fontWeight: '600'
        }}>
          Confirm Delete
        </h3>

        {/* Modal Message */}
        <p style={{ 
          marginBottom: '24px', 
          color: '#666',
          lineHeight: '1.5'
        }}>
          Are you sure you want to delete <strong>{contactName}</strong>? 
          This action cannot be undone.
        </p>

        {/* Modal Buttons */}
        <div style={{ 
          display: 'flex', 
          gap: '12px', 
          justifyContent: 'flex-end' 
        }}>
          {/* Cancel Button */}
          <button
            onClick={onClose}
            style={{
              padding: '10px 20px',
              borderRadius: '6px',
              border: '1px solid #ddd',
              backgroundColor: 'white',
              color: '#333',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500'
            }}
          >
            Cancel
          </button>

          {/* Delete Button */}
          <button
            onClick={onConfirm}
            style={{
              padding: '10px 20px',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: '#dc3545',
              color: 'white',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500'
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;