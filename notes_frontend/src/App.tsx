import React, { useEffect, useState } from "react";
import NoteList from "./components/NoteList";
import NoteDetail from "./components/NoteDetail";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import NoteDialog from "./components/NoteDialog";
import SearchBar from "./components/SearchBar";
import { Note } from "./types";
import {
  fetchNotes,
  createNote,
  updateNote,
  deleteNote,
} from "./services/notesApi";
import styles from "./App.module.css";

// PUBLIC_INTERFACE
const App: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [dialog, setDialog] = useState<{
    open: boolean;
    note?: Note;
    isEdit: boolean;
  }>({ open: false, note: undefined, isEdit: false });
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [mobileSidebar, setMobileSidebar] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load notes on mount & after CRUD
  const loadNotes = async () => {
    setLoading(true);
    try {
      const items = await fetchNotes();
      setNotes(items);
    } catch (e: any) {
      setError(e.message ?? "Error loading notes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotes();
  }, []);

  // Dialog open/close helpers
  const handleAddNote = () => setDialog({ open: true, isEdit: false });
  const handleEditNote = (note: Note) =>
    setDialog({ open: true, note, isEdit: true });
  const handleDialogClose = () => setDialog({ open: false, isEdit: false });

  // CRUD actions
  const handleDialogSubmit = async (data: {
    title: string;
    content: string;
    id?: number;
  }) => {
    setLoading(true);
    setError(null);
    try {
      if (dialog.isEdit && data.id) {
        await updateNote(data.id, data.title, data.content);
        setSelectedId(data.id);
      } else {
        const n = await createNote(data.title, data.content);
        setSelectedId(n.id);
      }
      await loadNotes();
      handleDialogClose();
    } catch (e: any) {
      setError(e.message ?? "Save failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteNote = async (id: number) => {
    setLoading(true);
    try {
      await deleteNote(id);
      setSelectedId((sid) => (sid === id ? null : sid));
      await loadNotes();
    } catch (e: any) {
      setError(e.message ?? "Delete failed");
    } finally {
      setLoading(false);
    }
  };

  // Filtering
  const filteredNotes =
    search.trim().length === 0
      ? notes
      : notes.filter(
          (n) =>
            n.title.toLowerCase().includes(search.toLowerCase()) ||
            n.content.toLowerCase().includes(search.toLowerCase())
        );

  const selected =
    notes.find((n) => n.id === selectedId) ?? (filteredNotes.length && filteredNotes[0]) ?? null;

  // Responsive sidebar toggle for mobile
  const handleSidebarToggle = () => setMobileSidebar((s) => !s);
  const handleCloseSidebar = () => setMobileSidebar(false);

  return (
    <div className={styles.root}>
      <Topbar onMenu={handleSidebarToggle} theme="light" />
      <div className={styles.layout}>
        <Sidebar
          open={mobileSidebar}
          onClose={handleCloseSidebar}
          notes={filteredNotes}
          selectedId={selected?.id ?? null}
          onSelect={(id) => {
            setSelectedId(id);
            setMobileSidebar(false);
          }}
          onAdd={handleAddNote}
        />
        <main className={styles.main}>
          <div className={styles.mainHeader}>
            <SearchBar value={search} onChange={setSearch} />
            <button
              className={styles.addBtn}
              aria-label="Add Note"
              onClick={handleAddNote}
            >
              + New Note
            </button>
          </div>
          {error && <div className={styles.error}>{error}</div>}
          <div className={styles.mainContent}>
            <section className={styles.noteCol}>
              <NoteList
                notes={filteredNotes}
                selectedId={selected?.id ?? undefined}
                onSelect={(id) => setSelectedId(id)}
                onEdit={handleEditNote}
                onDelete={handleDeleteNote}
                loading={loading}
              />
            </section>
            <section className={styles.detailCol}>
              {selected ? (
                <NoteDetail
                  note={selected}
                  onEdit={handleEditNote}
                  onDelete={handleDeleteNote}
                  loading={loading}
                />
              ) : (
                <div className={styles.noSel}>Select or create a note</div>
              )}
            </section>
          </div>
        </main>
      </div>
      {dialog.open && (
        <NoteDialog
          open={dialog.open}
          note={dialog.note}
          isEdit={dialog.isEdit}
          onClose={handleDialogClose}
          onSubmit={handleDialogSubmit}
        />
      )}
    </div>
  );
};

export default App;
