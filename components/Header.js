'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Compass, GraduationCap, Menu, X, ArrowRight, Heart } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { wishlistCount, isLoaded } = useWishlist();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Explore Colleges', href: '/colleges' },
    { name: 'Wishlist', href: '/wishlist' },
  ];

  const isActive = (href) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#E2E8F0] h-[76px] flex items-center">
      <div className="max-w-[1240px] w-full mx-auto px-4 sm:px-7 md:px-12 flex items-center justify-between">
        
        {/* LEFT: EduCompass logo (minimal compass symbol + graduation cap + wordmark) */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-[9px] bg-[#14213D] text-white flex items-center justify-center shadow-xs group-hover:bg-[#4F46E5] transition-colors duration-200">
            <div className="relative">
              <Compass className="w-5 h-5 text-white" />
              <GraduationCap className="w-3 h-3 text-[#EEF2FF] absolute -bottom-1 -right-1" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-bold text-lg text-[#14213D] tracking-tight leading-none">
              EduCompass
            </span>
            <span className="text-[10px] text-[#64748B] font-medium tracking-wide mt-0.5">
              College Discovery
            </span>
          </div>
        </Link>

        {/* CENTER: Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors py-2 relative ${
                isActive(link.href)
                  ? 'text-[#4F46E5] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#4F46E5]'
                  : 'text-[#64748B] hover:text-[#172033]'
              }`}
            >
              <span className="flex items-center gap-1.5">
                {link.name}
                {link.name === 'Wishlist' && isLoaded && wishlistCount > 0 && (
                  <span className="inline-flex items-center justify-center px-1.5 py-0.2 text-[10px] font-bold text-[#4F46E5] bg-[#EEF2FF] rounded-full border border-[#4F46E5]/20">
                    {wishlistCount}
                  </span>
                )}
              </span>
            </Link>
          ))}
        </nav>

        {/* RIGHT: Actions */}
        <div className="hidden md:flex items-center gap-3">
          <button
            type="button"
            onClick={() => alert("EduCompass student account portal is coming soon. Start exploring colleges now!")}
            className="px-4 py-2 text-sm font-medium text-[#172033] hover:text-[#4F46E5] transition cursor-pointer"
          >
            Sign In
          </button>
          <Link
            href="/colleges"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-[9px] bg-[#4F46E5] hover:bg-[#4338CA] active:scale-[0.98] text-white text-sm font-medium transition shadow-xs cursor-pointer"
          >
            <span>Get Started</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex md:hidden items-center gap-2">
          <Link
            href="/wishlist"
            className="p-2 text-[#64748B] relative"
            aria-label="Wishlist"
          >
            <Heart className="w-5 h-5 text-[#4F46E5]" />
            {isLoaded && wishlistCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#4F46E5] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </Link>
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 text-[#172033] hover:text-[#4F46E5] transition"
            aria-label="Open navigation menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

      </div>

      {/* Mobile Slide-Out Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden animate-in fade-in duration-200">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-xs" onClick={() => setMobileMenuOpen(false)} />
          <div className="relative ml-auto w-full max-w-xs bg-white h-full shadow-2xl p-6 flex flex-col justify-between z-10">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#E2E8F0]">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-[9px] bg-[#14213D] text-white flex items-center justify-center">
                    <Compass className="w-4 h-4" />
                  </div>
                  <span className="font-heading font-bold text-base text-[#14213D]">EduCompass</span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-[9px] text-[#64748B] hover:text-[#172033] hover:bg-[#F8FAFC]"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="py-6 space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-3 py-3 rounded-[9px] text-sm font-medium transition ${
                      isActive(link.href)
                        ? 'bg-[#EEF2FF] text-[#4F46E5] font-semibold'
                        : 'text-[#172033] hover:bg-[#F8FAFC]'
                    }`}
                  >
                    <span>{link.name}</span>
                    {link.name === 'Wishlist' && isLoaded && wishlistCount > 0 && (
                      <span className="px-2 py-0.5 text-xs font-bold bg-[#4F46E5] text-white rounded-full">
                        {wishlistCount}
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-[#E2E8F0] space-y-3">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  alert("Sign in feature is coming soon!");
                }}
                className="w-full py-2.5 rounded-[9px] border border-[#E2E8F0] text-sm font-medium text-[#172033] hover:bg-[#F8FAFC]"
              >
                Sign In
              </button>
              <Link
                href="/colleges"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-[9px] bg-[#4F46E5] text-white text-sm font-medium hover:bg-[#4338CA]"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
