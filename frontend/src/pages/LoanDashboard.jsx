// StaffDashboard.jsx
import React, { useState } from 'react';
import '../styles/main.css';

function StaffDashboard() {
    const [announcements, setAnnouncements] = useState([
        { id: 1, title: 'Loan System Live!', content: 'LoanPilot backend integration is now active.', date: '2025-04-28' },
        { id: 2, title: 'Maintenance Notice', content: 'System maintenance scheduled on 2025-05-02.', date: '2025-04-26' },
    ]);

    const [newAnnouncement, setNewAnnouncement] = useState({
        title: '',
        content: '',
    });

    const handlePost = (e) => {
        e.preventDefault();
        if (newAnnouncement.title && newAnnouncement.content) {
            const newPost = {
                id: announcements.length + 1,
                title: newAnnouncement.title,
                content: newAnnouncement.content,
                date: new Date().toISOString().split('T')[0],
            };
            setAnnouncements([newPost, ...announcements]);
            setNewAnnouncement({ title: '', content: '' });
        }
    };

    return (
        <div className="dashboard-container">
            <h2>Staff Dashboard</h2>

            <section className="announcement-section">
                <h3>Post Emergency Task or Update</h3>
                <form onSubmit={handlePost} className="announcement-form">
                    <input
                        type="text"
                        placeholder="Title"
                        value={newAnnouncement.title}
                        onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
                        required
                    />
                    <textarea
                        placeholder="Message"
                        value={newAnnouncement.content}
                        onChange={(e) => setNewAnnouncement({ ...newAnnouncement, content: e.target.value })}
                        required
                    />
                    <button type="submit">Post</button>
                </form>
            </section>

            <section className="announcement-list">
                <h3>Shared Updates</h3>
                {announcements.length === 0 ? (
                    <p>No updates yet.</p>
                ) : (
                    <ul>
                        {announcements.map((note) => (
                            <li key={note.id} className="announcement-item">
                                <h4>{note.title}</h4>
                                <p>{note.content}</p>
                                <small>{note.date}</small>
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </div>
    );
}

export default StaffDashboard;
