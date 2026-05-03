import { Link } from 'react-router';

export function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 relative z-10">
      <div className="max-w-4xl w-full text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-6xl tracking-tight">
            Your thoughts,
            <br />
            beautifully organized
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A minimalist note-taking experience designed for clarity and focus.
          </p>
        </div>

        <div className="flex gap-4 justify-center pt-4">
          <Link
            to="/register"
            className="px-8 py-3 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity"
          >
            Get Started
          </Link>
          <Link
            to="/login"
            className="px-8 py-3 bg-secondary text-secondary-foreground rounded-md hover:bg-muted transition-colors"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
