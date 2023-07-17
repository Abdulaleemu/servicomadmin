'use client';

import { Alert } from 'flowbite-react';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Alert color="info">
      <span>
        <p>
          <span className="font-medium">
            Info alert!
          </span>
          Change a few things up and try submitting again.
        </p>
      </span>
    </Alert>
    </main>
  )
}




