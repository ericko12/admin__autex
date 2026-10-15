import { Outlet } from 'react-router';
import { useState } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { SideMenu } from './SideMenu';
import { MiniCart } from './MiniCart';

export function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Header onMenuClick={() => setIsMenuOpen(true)} />
      <SideMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <MiniCart />

      <main className="flex-1 px-[10%]">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
