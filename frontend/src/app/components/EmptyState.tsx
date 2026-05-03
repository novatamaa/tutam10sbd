import { FileText } from 'lucide-react';

export function EmptyState() {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="text-center space-y-4 text-muted-foreground">
        <FileText className="w-16 h-16 mx-auto opacity-20" />
        <p>Select a note or create a new one</p>
      </div>
    </div>
  );
}
