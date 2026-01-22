import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTasks } from '../context/TaskContext';
import { useAuth } from '../context/AuthContext'; 
import '../CSS/Dashboard.css'; 

const TaskDetails = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const { tasks, updateTaskStatus } = useTasks();
  const { user } = useAuth(); 
  const [submissionLink, setSubmissionLink] = useState('');

  const task = tasks.find(t => t.id === taskId);

  if (!task) {
    return (
      <div className="dashboard-container">
        <div className="admin-card">
          <p>Task not found. Please return to the dashboard.</p>
          <button className="btn btn-primary" onClick={() => navigate('/dashboard')}>
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const isMyTeamTask = user.team === task.team;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!submissionLink) return alert("Please provide a valid submission link.");

    // 1. Create the "Brief Overview" for Slack Clipboard
    const briefOverview = `
🚀 *TASK SUBMISSION*
--------------------------
*Project:* ${task.title}
*Intern:* ${user.name}
*Track:* ${task.team}
*Submission Link:* ${submissionLink}
*Status:* Marked as Completed in Hub
--------------------------
_Cc: @Ummah Square_
    `.trim();

    try {
      // 2. Update status in TaskContext
      updateTaskStatus(taskId, submissionLink);

      // 3. Copy formatted overview to clipboard
      await navigator.clipboard.writeText(briefOverview);

      const slackAnnouncementUrl = 'https://ummahsquarein-zwa5973.slack.com/archives/C0A8FERUWM7'; 

      // UPDATED ALERT: Very clear instructions
      alert(
        "✅ TASK COMPLETED! \n\n" +
        "I have COPIED a professional overview to your clipboard. \n\n" +
        "When Slack opens, the text box will be empty. YOU must right-click and 'Paste' (or press Ctrl+V) to send your work. \n\n" +
        "Click OK to go to Slack now."
      );

      window.open(slackAnnouncementUrl, '_blank');
      navigate('/dashboard');
    } catch (err) {
      console.error("Clipboard error:", err);
      const slackAnnouncementUrl = 'https://ummahsquarein-zwa5973.slack.com/archives/C0A8FERUWM7'; 
      window.open(slackAnnouncementUrl, '_blank');
      navigate('/dashboard');
    }
  };

  return (
    <div className="dashboard-container">
      <div className="admin-card">
        <button className="btn btn-outline" onClick={() => navigate(-1)} style={{ marginBottom: '20px' }}>
          ← Back to Dashboard
        </button>

        <div className="header-info">
          <span className={`status-badge status-${task.status.toLowerCase().replace(' ', '-')}`}>
            {task.status}
          </span>
          <h1 style={{ marginTop: '10px', fontSize: '2rem' }}>{task.title}</h1>
          <div style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
            <p>Target Team: <span className="tag">{task.team}</span></p>
            <p>Deadline: <strong>{task.deadline}</strong></p>
          </div>
        </div>

        <hr style={{ margin: '25px 0', border: '0', borderTop: '1px solid #eee' }} />

        <section>
          <h3 style={{ color: '#1e293b', marginBottom: '10px' }}>Description</h3>
          <p style={{ lineHeight: '1.7', color: '#475569', fontSize: '1rem' }}>
            {task.description || "No detailed description provided for this task."}
          </p>
        </section>

        <div style={{ marginTop: '40px', padding: '20px', backgroundColor: '#f8fafc', borderRadius: '12px' }}>
          {task.status === 'Completed' ? (
            <div style={{ textAlign: 'center' }}>
              <span className="status-badge status-completed" style={{ fontSize: '1rem', padding: '10px 20px' }}>
                ✅ Task Successfully Submitted
              </span>
              <p style={{ marginTop: '15px' }}>
                <strong>Your Link:</strong> <a href={task.submission} target="_blank" rel="noreferrer" style={{ color: '#2563eb' }}>{task.submission}</a>
              </p>
            </div>
          ) : (
            <>
              {isMyTeamTask ? (
                <form onSubmit={handleSubmit} className="admin-form">
                  <div style={{ gridColumn: '1 / -1' }}>
                    <h3 style={{ marginBottom: '5px' }}>Submit Work</h3>
                    <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '15px' }}>
                      Pasting your link here will copy an overview to your clipboard for Slack.
                    </p>
                  </div>
                  
                  <input 
                    className="search-input"
                    type="url" 
                    placeholder="Paste your GitHub or Vercel link here..." 
                    value={submissionLink}
                    onChange={(e) => setSubmissionLink(e.target.value)}
                    required
                    style={{ width: '100%' }}
                  />
                  
                  <div style={{ gridColumn: '1 / -1' }}>
                    <button type="submit" className="btn btn-primary" style={{ height: '50px', width: '100%' }}>
                      Complete Task & Copy Overview
                    </button>
                    {/* Added visual hint for the intern */}
                    <p style={{ fontSize: '0.75rem', color: '#ef4444', marginTop: '10px', textAlign: 'center', fontWeight: 'bold' }}>
                      ⚠️ Once Slack opens, you MUST paste (Ctrl+V) the overview manually!
                    </p>
                  </div>
                </form>
              ) : (
                <div className="error-text" style={{ background: '#fff1f2', color: '#e11d48', padding: '20px', borderRadius: '10px', textAlign: 'center' }}>
                  <strong>Access Restricted:</strong> This task is specifically for the <b>{task.team}</b> track. 
                  <br />
                  As a <b>{user.team}</b> intern, you cannot submit work for this task.
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;