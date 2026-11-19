import './globals.css';

export const metadata = {
  title: 'Next.js contact form with Formiz',
  description: 'A working contact form without a backend. Submissions go to email and Telegram.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
