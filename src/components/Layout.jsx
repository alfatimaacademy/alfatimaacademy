import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import LanguageSwitcher from './LanguageSwitcher';
import ChatbotLoader from './ChatbotLoader';
import ScrollToTop from './ScrollToTop';

export default function Layout() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <main className="pt-20">
        <Outlet />
      </main>
      <Footer />
      <LanguageSwitcher />
      <ChatbotLoader />
    </>
  );
}
