/* eslint-disable no-undef */
import { Note } from "../types";

const BASE_URL =
  import.meta.env.VITE_NOTES_BACKEND_URL ||
  "http://localhost:8000/api/notes/";

async function handleResponse(res: Response) {
  if (!res.ok) {
    const data: any = await res.json().catch(() => ({}));
    throw new Error(
      data.detail || data.message || `API error: ${res.status}`
    );
  }
  return res.json();
}

// PUBLIC_INTERFACE
export async function fetchNotes(): Promise<Note[]> {
  const res = await fetch(BASE_URL);
  return handleResponse(res);
}

// PUBLIC_INTERFACE
export async function createNote(title: string, content: string): Promise<Note> {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, content }),
  });
  return handleResponse(res);
}

// PUBLIC_INTERFACE
export async function updateNote(
  id: number,
  title: string,
  content: string
): Promise<Note> {
  const res = await fetch(`${BASE_URL}${id}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, content }),
  });
  return handleResponse(res);
}

// PUBLIC_INTERFACE
export async function deleteNote(id: number): Promise<void> {
  const res = await fetch(`${BASE_URL}${id}/`, { method: "DELETE" });
  if (!res.ok) throw new Error("Delete failed");
}
