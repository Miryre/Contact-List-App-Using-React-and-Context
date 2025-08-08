// components/AddContactView.jsx - NEW FILE
import React, { useState, useEffect } from 'react';
import { useContacts } from './ContactContext';

const AddContactView = ({ contactToEdit, onBack, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  
  const [errors, setErrors] = useState({});
  const { createContact, updateContact, loading } = useContacts();

  useEffect(() => {
    if (contactToEdit) {
      setFormData({
        name: contactToEdit.name || '',
        email: contactToEdit.email || '',
        phone: contactToEdit.phone || '',
        address: contactToEdit.address || ''
      });
    }
  }, [contactToEdit]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    let success;
    if (contactToEdit) {
      success = await updateContact(contactToEdit.id, formData);
    } else {
      success = await createContact(formData);
    }

    if (success) onSave();
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <button 
        onClick={onBack} 
        style={{ 
          marginBottom: '20px', 
          padding: '8px 16px',
          backgroundColor: '#6c757d',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        ← Back to Contacts
      </button>
      
      <h1 style={{ marginBottom: '24px' }}>
        {contactToEdit ? 'Edit Contact' : 'Add New Contact'}
      </h1>
      
      <form onSubmit={handleSubmit} style={{ 
        backgroundColor: 'white', 
        padding: '24px', 
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        {/* Name Field */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>
            Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            style={{ 
              width: '100%', 
              padding: '8px 12px', 
              border: `1px solid ${errors.name ? 'red' : '#ddd'}`,
              borderRadius: '4px',
              fontSize: '16px'
            }}
            placeholder="Enter full name"
          />
          {errors.name && <div style={{ color: 'red', fontSize: '14px', marginTop: '4px' }}>{errors.name}</div>}
        </div>

        {/* Email Field */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>
            Email
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            style={{ 
              width: '100%', 
              padding: '8px 12px', 
              border: `1px solid ${errors.email ? 'red' : '#ddd'}`,
              borderRadius: '4px',
              fontSize: '16px'
            }}
            placeholder="Enter email address"
          />
          {errors.email && <div style={{ color: 'red', fontSize: '14px', marginTop: '4px' }}>{errors.email}</div>}
        </div>

        {/* Phone Field */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>
            Phone
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            style={{ 
              width: '100%', 
              padding: '8px 12px', 
              border: `1px solid ${errors.phone ? 'red' : '#ddd'}`,
              borderRadius: '4px',
              fontSize: '16px'
            }}
            placeholder="Enter phone number"
          />
          {errors.phone && <div style={{ color: 'red', fontSize: '14px', marginTop: '4px' }}>{errors.phone}</div>}
        </div>

        {/* Address Field */}
        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>
            Address
          </label>
          <input
            type="text"
            value={formData.address}
            onChange={(e) => handleInputChange('address', e.target.value)}
            style={{ 
              width: '100%', 
              padding: '8px 12px', 
              border: `1px solid ${errors.address ? 'red' : '#ddd'}`,
              borderRadius: '4px',
              fontSize: '16px'
            }}
            placeholder="Enter address"
          />
          {errors.address && <div style={{ color: 'red', fontSize: '14px', marginTop: '4px' }}>{errors.address}</div>}
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '12px' }}>
          <button 
            type="button" 
            onClick={onBack}
            style={{
              padding: '10px 20px',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Cancel
          </button>
          <button 
            type="submit" 
            disabled={loading}
            style={{
              padding: '10px 20px',
              backgroundColor: loading ? '#ccc' : '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'Saving...' : (contactToEdit ? 'Update Contact' : 'Save Contact')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddContactView;