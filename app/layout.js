import "./globals.css";

export const metadata = {
  title: "ToDo App",
  description: "A simple task management application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}