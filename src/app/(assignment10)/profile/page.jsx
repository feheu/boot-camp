
"use client";

import { signOut } from "firebase/auth";
import { auth } from "../../../../assignment/10/2602191024/firebase";
import ProtectedRoute from "../../../../assignment/10/2602191024/ProtectedRoute";
import { useAuth } from "../../../../assignment/10/2602191024/AuthContext";

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <ProfileContent />
    </ProtectedRoute>
  );
}

function ProfileContent() {
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
          <span className="dashboard-eyebrow">PERSONAL ACCOUNT</span>
          <h2>Welcome back!</h2>
          <p>
            Manage your account and view your authentication details.
          </p>
        </section>

        <section className="dashboard-card">
        <div className="dashboard-card-heading">
            <div className="profile-avatar">
                {user?.email?.charAt(0).toUpperCase()}
            </div>

            <div>
                <h2>Your Profile</h2>
                <p>Account information and security</p>
            </div>
            </div>

        <div className="dashboard-info-grid">
        <div className="dashboard-info">
            <span className="info-label">Email address </span>
            <strong className="info-value">{user?.email}</strong>
        </div>

        <div className="dashboard-info">
            <span className="info-label">Account role </span>
            <strong className="info-value">
            <span className="role-badge">{role?.toUpperCase()}</span>
            </strong>
        </div>

        <div className="dashboard-info">
            <span className="info-label">Authentication status </span>
            <strong className="info-value status-active">
            ● Authenticated
            </strong>
        </div>

        <div className="dashboard-info">
            <span className="info-label">Account provider </span>
            <strong className="info-value">Firebase Authentication</strong>
        </div>
        </div>
        </section>

        <section className="dashboard-actions">
          <h2>Quick actions</h2>

          <div className="dashboard-action-grid">
            {role === "admin" && (
              <a
                href="/admin/dashboard"
                className="dashboard-action-card"
              >
                <div className="action-icon">⚙</div>
                <div>
                  <h3>Admin Dashboard</h3>
                  <p>Access administrator tools and resources.</p>
                </div>
                <span className="action-arrow">→</span>
              </a>
            )}

            <button
              className="dashboard-action-card logout-card"
              onClick={handleLogout}
            >
              <div className="action-icon">↗</div>
              <div>
                <h3>Sign out</h3>
                <p>Sign out from your current session.</p>
              </div>
              <span className="action-arrow">→</span>
            </button>
          </div>
        </section>

        <footer className="dashboard-note">
          <span>🔒</span>
          Your account is secured with Firebase Authentication
          and protected by role-based access control.
        </footer>
      </div>
    </main>
  );
}
