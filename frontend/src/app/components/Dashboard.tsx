import { Link, Outlet, useNavigate } from 'react-router';
import { FileText, Plus, LogOut, Trash2 } from 'lucide-react';
import { useState } from 'react';

const initialMockNotes = [
  { id: '1', title: 'Welcome to Notes', preview: 'Getting started with your note-taking journey...' },
  { id: '2', title: 'Project Ideas', preview: 'List of upcoming projects and features...' },
  { id: '3', title: 'Meeting Notes', preview: 'Key takeaways from today\'s meeting...' },
];

export function Dashboard() {
  const navigate = useNavigate();
  const [notes, setNotes] = useState(initialMockNotes);

  const handleLogout = () => {
    navigate('/');
  };

  const handleDeleteNote = (noteId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (confirm('Are you sure you want to delete this note?')) {
      console.log('Delete note from sidebar:', noteId);
      setNotes(notes.filter(note => note.id !== noteId));
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex relative z-10">
      <aside className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
        <div className="p-6 border-b border-sidebar-border">
          <h1 className="text-xl">Notes</h1>
        </div>

        <div className="p-4">
          <Link
            to="/dashboard/note/new"
            className="w-full flex items-center gap-2 px-4 py-2 bg-sidebar-primary text-sidebar-primary-foreground rounded-md hover:opacity-90 transition-opacity"
          >
            <Plus className="w-4 h-4" />
            New Note
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 space-y-1">
          {notes.map((note) => (
            <div key={note.id} className="group relative">
              <Link
                to={`/dashboard/note/${note.id}`}
                className="block px-4 py-3 rounded-md hover:bg-sidebar-accent transition-colors"
              >
                <div className="flex items-start gap-3">
                  <FileText className="w-4 h-4 mt-0.5 text-sidebar-foreground/60" />
                  <div className="flex-1 min-w-0 pr-8">
                    <p className="truncate">{note.title}</p>
                    <p className="text-sm text-sidebar-foreground/60 truncate mt-0.5">
                      {note.preview}
                    </p>
                  </div>
                </div>
              </Link>
              <button
                onClick={(e) => handleDeleteNote(note.id, e)}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 opacity-0 group-hover:opacity-100 hover:bg-destructive/10 rounded transition-all"
                title="Delete note"
              >
                <Trash2 className="w-3.5 h-3.5 text-destructive-foreground" />
              </button>
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-sidebar-border">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-2 text-sidebar-foreground/80 hover:bg-sidebar-accent rounded-md transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
