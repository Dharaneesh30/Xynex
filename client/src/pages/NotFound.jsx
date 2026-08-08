import React from 'react';
import Button from '../components/common/Button';

export default function NotFound() {
  return (
    <main className="flex-grow flex items-center justify-center pt-24 pb-20 px-6">
      <div className="text-center">
        <h1 className="text-8xl font-display font-bold text-ink/10 mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-6">Page Not Found</h2>
        <p className="text-ink-muted mb-8 max-w-md mx-auto">
          The dimensions of this space are undefined. Let's get you back to familiar coordinates.
        </p>
        <Button to="/" variant="primary">Return Home</Button>
      </div>
    </main>
  );
}
