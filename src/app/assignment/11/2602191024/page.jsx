
"use client";

import { useMemo, useState } from "react";
import "./styles.css";

import useTasks from "../../../../../assignment/11/2602191024/useTasks";
import useLocalStorage from "../../../../../assignment/11/2602191024/hooks/useLocalStorage";
import {
  SettingsProvider,
  useSettings,
} from "../../../../../assignment/11/2602191024/context/SettingsContext";

function TaskFlowContent() {
  const {
    tasks,
    loading,
    error,
    addTask,
    updateTask,
    deleteTask,
    toggleTask,
  } = useTasks();

  const { theme, language, toggleTheme, toggleLanguage } = useSettings();

  const [filter, setFilter] = useState("all");
  const [sortOrder, setSortOrder] = useLocalStorage(
    "taskflow-sort",
    "newest"
  );

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("General");
  const [priority, setPriority] = useState("Medium");

  const [editingTask, setEditingTask] = useState(null);

  const t = {
    en: {
      overview: "Overview",
      allTasks: "All tasks",
      completed: "Completed",
      settings: "Settings",
      workspace: "My Workspace",
      productivity: "YOUR PRODUCTIVITY",
      greeting: "Good day!",
      greetingDesc: "Stay focused and get things done, one task at a time.",
      total: "Total tasks",
      finished: "Tasks finished",
      pending: "Pending",
      remaining: "Tasks remaining",
      completion: "Completion",
      progress: "Overall progress",
      tasks: "My Tasks",
      manage: "Manage and track your daily activities.",
      add: "Add task",
      all: "All tasks",
      active: "Active",
      done: "Completed",
      sort: "Sort",
      newest: "Newest first",
      oldest: "Oldest first",
      prioritySort: "Priority",
      title: "Task title",
      description: "Description",
      category: "Category",
      priority: "Priority",
      low: "Low",
      medium: "Medium",
      high: "High",
      create: "Create task",
      save: "Save changes",
      cancel: "Cancel",
      noTasks: "No tasks found.",
      delete: "Delete",
      edit: "Edit",
      theme: "Theme",
      language: "Language",
      dark: "Dark mode",
      light: "Light mode",
      taskCreated: "Create your first task to get started.",
    },
    id: {
      overview: "Ringkasan",
      allTasks: "Semua tugas",
      completed: "Selesai",
      settings: "Pengaturan",
      workspace: "Workspace Saya",
      productivity: "PRODUKTIVITAS",
      greeting: "Selamat datang!",
      greetingDesc: "Tetap fokus dan selesaikan tugas satu per satu.",
      total: "Total tugas",
      finished: "Tugas selesai",
      pending: "Tertunda",
      remaining: "Tugas tersisa",
      completion: "Penyelesaian",
      progress: "Progress keseluruhan",
      tasks: "Tugas Saya",
      manage: "Kelola dan pantau aktivitas harian Anda.",
      add: "Tambah tugas",
      all: "Semua tugas",
      active: "Aktif",
      done: "Selesai",
      sort: "Urutkan",
      newest: "Terbaru",
      oldest: "Terlama",
      prioritySort: "Prioritas",
      title: "Judul tugas",
      description: "Deskripsi",
      category: "Kategori",
      priority: "Prioritas",
      low: "Rendah",
      medium: "Sedang",
      high: "Tinggi",
      create: "Buat tugas",
      save: "Simpan perubahan",
      cancel: "Batal",
      noTasks: "Tidak ada tugas.",
      delete: "Hapus",
      edit: "Edit",
      theme: "Tema",
      language: "Bahasa",
      dark: "Mode gelap",
      light: "Mode terang",
      taskCreated: "Buat tugas pertama Anda untuk memulai.",
    },
  }[language];

  const filteredTasks = useMemo(() => {
    let result = [...tasks];

    if (filter === "active") {
      result = result.filter((task) => !task.completed);
    }

    if (filter === "completed") {
      result = result.filter((task) => task.completed);
    }

    if (sortOrder === "newest") {
      result.sort((a, b) => {
        const dateA = a.createdAt?.toDate?.()?.getTime() || 0;
        const dateB = b.createdAt?.toDate?.()?.getTime() || 0;
        return dateB - dateA;
      });
    }

    if (sortOrder === "oldest") {
      result.sort((a, b) => {
        const dateA = a.createdAt?.toDate?.()?.getTime() || 0;
        const dateB = b.createdAt?.toDate?.()?.getTime() || 0;
        return dateA - dateB;
      });
    }

    if (sortOrder === "priority") {
      const priorityValues = {
        High: 3,
        Medium: 2,
        Low: 1,
      };

      result.sort(
        (a, b) =>
          (priorityValues[b.priority] || 0) -
          (priorityValues[a.priority] || 0)
      );
    }

    return result;
  }, [tasks, filter, sortOrder]);

  const completedCount = tasks.filter((task) => task.completed).length;
  const pendingCount = tasks.length - completedCount;

  const completionPercentage =
    tasks.length === 0
      ? 0
      : Math.round((completedCount / tasks.length) * 100);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim()) return;

    try {
      if (editingTask) {
        await updateTask(editingTask.id, {
          title: title.trim(),
          description: description.trim(),
          category,
          priority,
        });
      } else {
        await addTask({
          title: title.trim(),
          description: description.trim(),
          category,
          priority,
        });
      }

      resetForm();
    } catch (err) {
      alert(err.message);
    }
  }

  function resetForm() {
    setTitle("");
    setDescription("");
    setCategory("General");
    setPriority("Medium");
    setEditingTask(null);
  }

  function startEdit(task) {
    setEditingTask(task);
    setTitle(task.title);
    setDescription(task.description || "");
    setCategory(task.category || "General");
    setPriority(task.priority || "Medium");
    document.getElementById("task-form")?.scrollIntoView({
      behavior: "smooth",
    });
  }

  async function handleDelete(id) {
    if (!confirm(language === "en" ? "Delete this task?" : "Hapus tugas ini?")) {
      return;
    }

    try {
      await deleteTask(id);
    } catch (err) {
      alert(err.message);
    }
  }

  async function handleToggle(task) {
    try {
      await toggleTask(task.id, task.completed);
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <main className={`taskflow ${theme}`}>
      <aside className="task-sidebar">
        <div className="task-brand">
          <div className="task-brand-icon">T</div>

          <div>
            <h1>TaskFlow</h1>
            <span>Productivity workspace</span>
          </div>
        </div>

        <div className="sidebar-label">MENU</div>

        <nav className="task-nav">
          <button
            className={filter === "all" ? "active" : ""}
            onClick={() => setFilter("all")}
          >
            <span>▦</span> {t.overview}
          </button>

          <button
            className={filter === "active" ? "active" : ""}
            onClick={() => setFilter("active")}
          >
            <span>☰</span> {t.allTasks}
          </button>

          <button
            className={filter === "completed" ? "active" : ""}
            onClick={() => setFilter("completed")}
          >
            <span>✓</span> {t.completed}
          </button>
        </nav>

        <div className="sidebar-label">{t.settings}</div>

        <div className="task-settings">
          <button onClick={toggleTheme}>
            <span>◐</span>
            {theme === "dark" ? t.light : t.dark}
          </button>

          <button onClick={toggleLanguage}>
            <span>文</span>
            {language === "en" ? "English / ID" : "Indonesia / EN"}
          </button>
        </div>

        <div className="sidebar-bottom">
          <div className="sidebar-profile">
            <div className="profile-avatar-task">U</div>

            <div>
              <strong>Task User</strong>
              <span>Personal workspace</span>
            </div>
          </div>
        </div>
      </aside>

      <section className="task-main">
        <header className="task-topbar">
          <div>
            <span className="task-date">TASK MANAGEMENT</span>
            <h2>{t.workspace}</h2>
          </div>

          <div className="task-top-actions">
            <button className="task-top-avatar" onClick={toggleTheme}>
              ◐
            </button>
          </div>
        </header>

        <div className="task-content">
          <section className="task-welcome">
            <div>
              <p className="welcome-eyebrow">{t.productivity}</p>
              <h2>{t.greeting} <span>✦</span></h2>
              <p>{t.greetingDesc}</p>
            </div>

            <div className="welcome-decoration">✦</div>
          </section>

          <section className="task-stats">
            <div className="stat-card">
              <div className="stat-top">
                <span>{t.total}</span>
                <div className="stat-icon purple">▦</div>
              </div>
              <h3>{tasks.length}</h3>
              <p>{t.total}</p>
            </div>

            <div className="stat-card">
              <div className="stat-top">
                <span>{t.completed}</span>
                <div className="stat-icon green">✓</div>
              </div>
              <h3>{completedCount}</h3>
              <p>{t.finished}</p>
            </div>

            <div className="stat-card">
              <div className="stat-top">
                <span>{t.pending}</span>
                <div className="stat-icon orange">◷</div>
              </div>
              <h3>{pendingCount}</h3>
              <p>{t.remaining}</p>
            </div>

            <div className="stat-card">
              <div className="stat-top">
                <span>{t.completion}</span>
                <div className="stat-icon blue">↗</div>
              </div>
              <h3>{completionPercentage}%</h3>
              <p>{t.progress}</p>
            </div>
          </section>

          <section className="task-list-section">
            <div className="task-section-header">
              <div>
                <h2>{t.tasks}</h2>
                <p>{t.manage}</p>
              </div>

              <button
                className="add-task-button"
                onClick={() => {
                  resetForm();
                  document.getElementById("task-form")?.scrollIntoView({
                    behavior: "smooth",
                  });
                }}
              >
                + {t.add}
              </button>
            </div>

            <div className="task-toolbar">
              <button
                className={`task-filter ${filter === "all" ? "active-filter" : ""}`}
                onClick={() => setFilter("all")}
              >
                {t.all}
              </button>

              <button
                className={`task-filter ${filter === "active" ? "active-filter" : ""}`}
                onClick={() => setFilter("active")}
              >
                {t.active}
              </button>

              <button
                className={`task-filter ${filter === "completed" ? "active-filter" : ""}`}
                onClick={() => setFilter("completed")}
              >
                {t.done}
              </button>

              <select
                className="task-sort"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                aria-label="Sort tasks"
              >
                <option value="newest">{t.newest}</option>
                <option value="oldest">{t.oldest}</option>
                <option value="priority">{t.prioritySort}</option>
              </select>
            </div>

            {loading && <p className="task-message">Loading tasks...</p>}

            {error && <p className="task-error">{error}</p>}

            {!loading && !error && filteredTasks.length === 0 && (
              <p className="task-message">{t.noTasks}</p>
            )}

            <div className="task-items">
              {filteredTasks.map((task) => (
                <article className="task-item" key={task.id}>
                  <button
                    className={`task-checkbox ${task.completed ? "checked" : ""}`}
                    onClick={() => handleToggle(task)}
                    aria-label="Toggle completion"
                  >
                    {task.completed ? "✓" : ""}
                  </button>

                  <div className="task-item-content">
                    <h3 className={task.completed ? "task-completed" : ""}>
                      {task.title}
                    </h3>

                    {task.description && <p>{task.description}</p>}

                    <div className="task-tags">
                      <span className="task-category">
                        {task.category || "General"}
                      </span>

                      <span
                        className={`priority priority-${(
                          task.priority || "Medium"
                        ).toLowerCase()}`}
                      >
                        {task.priority || "Medium"}
                      </span>
                    </div>
                  </div>

                  <div className="task-item-actions">
                    <button onClick={() => startEdit(task)}>
                      {t.edit}
                    </button>

                    <button
                      className="delete-task"
                      onClick={() => handleDelete(task.id)}
                    >
                      {t.delete}
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="task-list-section task-form-section" id="task-form">
            <div className="task-section-header">
              <div>
                <h2>{editingTask ? t.save : t.add}</h2>
                <p>{t.manage}</p>
              </div>
            </div>

            <form className="task-create-form" onSubmit={handleSubmit}>
                <div className="form-field">
                <label>{t.title}</label>
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder={t.title}
                    required
                />
                </div>
                <div className="form-field">
                <label>{t.description}</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder={t.description}
                    rows={3}
                />
                </div>

              <div className="form-field">
                <label>{t.category}</label>
                <input
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder={t.category}
                />
              </div>

              <div className="form-field">
                <label>{t.priority}</label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <option value="Low">{t.low}</option>
                  <option value="Medium">{t.medium}</option>
                  <option value="High">{t.high}</option>
                </select>
              </div>

              <div className="task-form-actions">
                <button className="add-task-button" type="submit">
                  {editingTask ? t.save : t.create}
                </button>

                {editingTask && (
                  <button
                    className="cancel-task-button"
                    type="button"
                    onClick={resetForm}
                  >
                    {t.cancel}
                  </button>
                )}
              </div>
            </form>
          </section>
        </div>
      </section>
    </main>
  );
}

export default function TaskManagementPage() {
  return (
    <SettingsProvider>
      <TaskFlowContent />
    </SettingsProvider>
  );
}
