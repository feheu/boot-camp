
"use client";

import { signOut } from "firebase/auth";
import { auth } from "../../../../../assignment/10/2602191024/firebase";
import ProtectedRoute from "../../../../../assignment/10/2602191024/ProtectedRoute";
import { useAuth } from "../../../../../assignment/10/2602191024/AuthContext";

export default function AdminDashboardPage() {
  return (
    <ProtectedRoute requiredRole="admin">
      <AdminDashboardContent />
    </ProtectedRoute>
  );
}

function AdminDashboardContent() {
  const { user, role } = useAuth();

  async function handleLogout() {
    await signOut(auth);
    window.location.href = "/login";
  }

  return (
    <main className="dashboard-page">
      <div className="dashboard-container">
        <header className="dashboard-header">
          <div className="dashboard-brand">
            <div className="auth-logo">10</div>
            <div>
              <h1>Assignment 10</h1>
              <p>Authentication & Authorization</p>
            </div>
          </div>

          <button
            className="dashboard-button secondary"
            onClick={handleLogout}
          >
            Sign out
          </button>
        </header>

        <section className="dashboard-welcome">
          <span className="dashboard-eyebrow">ADMINISTRATOR</span>
          <h2>Admin Dashboard</h2>
          <p>
            Manage and monitor your administrator account.
          </p>
        </section>

        <section className="dashboard-card">
          <div className="dashboard-card-heading">
            <div className="profile-avatar admin-avatar">
            </div>

            <div>
              <h2>Administrator Overview</h2>
              <p>Administrative account information</p>
            </div>
          </div>

          <div className="dashboard-info-grid">
            <div className="dashboard-info">
              <span className="info-label">Email address </span>
              <strong className="info-value">
                {user?.email}
              </strong>
            </div>

            <div className="dashboard-info">
              <span className="info-label">Account role </span>
              <strong className="info-value">
                <span className="role-badge admin-role">
                  {role?.toUpperCase()}
                </span>
              </strong>
            </div>

            <div className="dashboard-info">
              <span className="info-label">Authentication status </span>
              <strong className="info-value status-active">
                ● Authenticated
              </strong>
            </div>

            <div className="dashboard-info">
              <span className="info-label">Access level </span>
              <strong className="info-value">
                Administrator privileges
              </strong>
            </div>
          </div>
        </section>

        <section className="dashboard-actions">
          <h2>Admin privileges</h2>

          <div className="dashboard-action-grid">
            <div className="dashboard-action-card">
              <div className="action-icon admin-icon">♙</div>
              <div>
                <h3>Role-based access</h3>
                <p>
                  Your account has administrator-level access.
                </p>
              </div>
            </div>

            <div className="dashboard-action-card">
              <div className="action-icon admin-icon">🔒</div>
              <div>
                <h3>Protected dashboard</h3>
                <p>
                  Access is restricted to authenticated administrators.
                </p>
              </div>
            </div>

            <div className="dashboard-action-card">
              <div className="action-icon admin-icon">✓</div>
              <div>
                <h3>Security verification</h3>
                <p>
                  Firestore rules enforce access control.
                </p>
              </div>
            </div>
          </div>
        </section>

        <footer className="dashboard-note">
          <span>🔐</span>
          Administrator access is protected by Firebase
          Authentication and Firestore Security Rules.
        </footer>
      </div>
    </main>
  );
}
