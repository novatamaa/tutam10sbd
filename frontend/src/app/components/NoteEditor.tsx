import { useParams, useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import { Save, Trash2, Edit3 } from 'lucide-react';

const mockNotesData: Record<string, { id: string; title: string; body: string }> = {
  '1': {
    id: '1',
    title: 'Welcome to Notes',
    body: 'This is your first note. Start writing and organizing your thoughts in this beautiful, minimalist interface.\n\nYou can format your text, add headings, and create structured content that helps you think clearly.',
  },
  '2': {
    id: '2',
    title: 'Project Ideas',
    body: 'Here are some ideas for upcoming projects:\n\n• Build a personal website\n• Learn a new programming language\n• Contribute to open source\n• Start a side project',
  },
  '3': {
    id: '3',
    title: 'Meeting Notes',
    body: 'Key takeaways from today\'s meeting:\n\n1. Review Q2 roadmap\n2. Discuss team priorities\n3. Plan upcoming sprint\n4. Address blockers',
  },
};

export function NoteEditor() {
  const { noteId } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [id, setId] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (noteId && noteId !== 'new') {
      const note = mockNotesData[noteId];
      if (note) {
        setId(note.id);
        setTitle(note.title);
        setBody(note.body);
        setIsEditing(false);
      }
    } else {
      const newId = `note-${Date.now()}`;
      setId(newId);
      setTitle('');
      setBody('');
      setIsEditing(true);
    }
    setHasChanges(false);
  }, [noteId]);

  const handleSave = () => {
    console.log('Save note:', { id, title, body });
    setHasChanges(false);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this note?')) {
      console.log('Delete note:', id);
      navigate('/dashboard');
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleChange = () => {
    setHasChanges(true);
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="border-b border-border px-8 py-4 flex items-center justify-between">
        <div className="text-xs text-muted-foreground/50">
          ID: {id}
        </div>
        <div className="flex items-center gap-2">
          {!isEditing && noteId !== 'new' && (
            <button
              onClick={handleEdit}
              className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-muted transition-colors"
            >
              <Edit3 className="w-4 h-4" />
              Edit
            </button>
          )}
          {(isEditing || hasChanges) && (
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity"
            >
              <Save className="w-4 h-4" />
              Save
            </button>
          )}
          {noteId !== 'new' && (
            <button
              onClick={handleDelete}
              className="flex items-center gap-2 px-4 py-2 bg-destructive/10 text-destructive-foreground rounded-md hover:bg-destructive/20 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-8 py-12">
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              handleChange();
            }}
            placeholder="Untitled"
            disabled={!isEditing && noteId !== 'new'}
            className="w-full text-4xl bg-transparent border-none outline-none placeholder:text-muted-foreground/40 mb-6 disabled:opacity-100"
          />

          <textarea
            value={body}
            onChange={(e) => {
              setBody(e.target.value);
              handleChange();
            }}
            placeholder="Start writing..."
            disabled={!isEditing && noteId !== 'new'}
            className="w-full min-h-[60vh] bg-transparent border-none outline-none resize-none placeholder:text-muted-foreground/40 leading-relaxed disabled:opacity-100"
          />
        </div>
      </div>
    </div>
  );
}
