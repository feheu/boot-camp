
"use client";

import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "./firebase";

export default function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const tasksRef = collection(db, "tasks");

    const unsubscribe = onSnapshot(
      tasksRef,
      (snapshot) => {
        const taskData = snapshot.docs.map((document) => ({
          id: document.id,
          ...document.data(),
        }));

        setTasks(taskData);
        setLoading(false);
      },
      (err) => {
        console.error("Firestore listener error:", err);
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  async function addTask(task) {
    await addDoc(collection(db, "tasks"), {
      ...task,
      completed: false,
      createdAt: serverTimestamp(),
    });
  }

  async function updateTask(id, updates) {
    await updateDoc(doc(db, "tasks", id), updates);
  }

  async function deleteTask(id) {
    await deleteDoc(doc(db, "tasks", id));
  }

  async function toggleTask(id, completed) {
    await updateDoc(doc(db, "tasks", id), {
      completed: !completed,
      updatedAt: serverTimestamp(),
    });
  }

  return {
    tasks,
    loading,
    error,
    addTask,
    updateTask,
    deleteTask,
    toggleTask,
  };
}
