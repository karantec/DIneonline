import './globals.css';

export const metadata = {
  title: { default: 'DineOS — Restaurant Operating System', template: '%s · DineOS' },
  description: 'Multi-tenant QR ordering, kitchen display and analytics for restaurants.',
};
export const viewport = { width: 'device-width', initialScale: 1, themeColor: '#568203' };

export default function RootLayout({ children }) {
  return (<html lang="en"><body>{children}</body></html>);
}
