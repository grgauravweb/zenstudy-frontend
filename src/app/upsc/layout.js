"use client"
import { useEffect, useState } from 'react';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  const [title, setTitle] = useState('');

  useEffect(() => {
    async function fetchTitle() {
      try {
        const response = await fetch('http://localhost:5000/api/blog/66167a4ddfef03905131539b');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        // Assuming the response contains a 'title' field
        setTitle(data.title);
      } catch (error) {
        console.error('Error fetching title:', error);
      }
    }

    fetchTitle();
  }, []); // Empty dependency array to run the effect only once

  return (
    <html lang="en">
      <head>
        <title>{title || 'Default Title'}</title>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
