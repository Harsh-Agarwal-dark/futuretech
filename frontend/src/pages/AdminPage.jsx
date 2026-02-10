import React, { useState, useEffect } from 'react';
import { listLeads } from '../utils/api';
import './pages.css';

const AdminPage = () => {
    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchLeads = async () => {
            try {
                const data = await listLeads();
                setLeads(data);
            } catch (err) {
                console.error('Error fetching leads:', err);
                setError('Failed to load leads data. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchLeads();
    }, []);

    const filteredLeads = leads.filter(lead =>
        lead.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.whatsapp_number?.includes(searchTerm) ||
        lead.highest_qualification?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.native_state?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="admin-page-container">
                <div className="loading-spinner-container">
                    <div className="spinner"></div>
                    <p>Loading leads...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="admin-page-container">
                <div className="error-message">
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="admin-page-container">
            <div className="admin-header">
                <h1>Admin Dashboard - Leads</h1>
                <p>Manage and view all lead details captured across the platform.</p>
            </div>

            <div className="admin-controls">
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search leads by name, phone, or location..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="stats-box">
                    <span>Total Leads: <strong>{leads.length}</strong></span>
                    <span>Filtered: <strong>{filteredLeads.length}</strong></span>
                </div>
            </div>

            <div className="table-wrapper">
                <table className="leads-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Full Name</th>
                            <th>WhatsApp Number</th>
                            <th>Highest Qualification</th>
                            <th>Native State</th>
                            <th>Captured Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredLeads.length > 0 ? (
                            filteredLeads.map((lead) => (
                                <tr key={lead.id}>
                                    <td>{lead.id}</td>
                                    <td>{lead.full_name}</td>
                                    <td>{lead.whatsapp_number}</td>
                                    <td>{lead.highest_qualification}</td>
                                    <td>{lead.native_state}</td>
                                    <td>{new Date(lead.created_at).toLocaleString()}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="no-data">No leads found matching your search.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminPage;
