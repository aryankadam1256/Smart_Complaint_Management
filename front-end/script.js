// Navigation
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.style.display = 'none';
    });
    document.getElementById(pageId).style.display = 'block';
}

// Complaint Submission
document.getElementById('complaint-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const complaintData = {
        type: document.getElementById('type').value,
        details: document.getElementById('details').value,
        location: document.getElementById('location').value,
        image: document.getElementById('image').value
    };

    try {
        const response = await fetch('/api/complaints', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(complaintData)
        });
        
        if (response.ok) {
            alert('Complaint submitted successfully!');
            document.getElementById('complaint-form').reset();
            loadComplaints(); // Refresh list
        }
    } catch (err) {
        console.error('Error:', err);
    }
});

// Load Past Complaints
async function loadComplaints() {
    try {
        const response = await fetch('/api/complaints');
        const complaints = await response.json();
        
        const complaintsList = document.getElementById('complaints-list');
        complaintsList.innerHTML = complaints.map(complaint => `
            <div class="complaint-card">
                <h3>${complaint.type}</h3>
                <p>${complaint.details}</p>
                <p>Status: ${complaint.status}</p>
                <small>Submitted: ${new Date(complaint.createdAt).toLocaleDateString()}</small>
            </div>
        `).join('');
    } catch (err) {
        console.error('Error loading complaints:', err);
    }
}

// Initial load
window.addEventListener('load', () => {
    showPage('register'); // Default page
    loadComplaints();
});
