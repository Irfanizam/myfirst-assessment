import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "Post Blog",
  description: "My Blog Application",
};

export default function RootLayout({ children }) {
  let header = (
    <header> 
      <Link href="/">
        <h1 className="">Blog Posts</h1>
      </Link>
    </header>
  );

  let footer = (
    <footer>
      <p>Developed by Irfan 💫</p>
    </footer>
  );

  return (
    <html lang="en">
      <body>
        {header}
        {children}
        {footer}
      </body>
    </html>
  );
}
