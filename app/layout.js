import { Inter, Manrope } from 'next/font/google';
import './globals.css';
import { WishlistProvider } from '@/context/WishlistContext';
import SmoothScrollProvider from '@/components/SmoothScrollProvider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
});

export const metadata = {
  title: 'EduCompass - Premier University & College Directory India',
  description: 'Search, explore, filter, and save leading Indian colleges with verified program fees, ratings, reviews, and admission details.',
  keywords: 'colleges in India, engineering colleges, MBA institutes, medical colleges, college discovery, EduCompass',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`h-full antialiased ${inter.variable} ${manrope.variable}`}>
      <body className="min-h-full flex flex-col bg-[#F8FAFC] text-[#172033] font-sans selection:bg-[#4F46E5] selection:text-white">
        <SmoothScrollProvider>
          <WishlistProvider>
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </WishlistProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
