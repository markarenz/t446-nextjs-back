import Link from 'next/link';

export default function Custom404() {
  const pageMeta = {
    title: 'Home',
    metedesc: 'This is the dashboard for the T446 Content app'
  };
  return (
    <div>
      <h1>404 - Page Not Found, Scout!</h1>
      <Link href="/">Home</Link>
    </div>
  );
}
