'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { Compass, GraduationCap, ArrowRight } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import { getAllColleges } from '@/lib/colleges';
import CollegeCard from '@/components/CollegeCard';

export default function WishlistPage() {
  const { wishlist, isLoaded } = useWishlist();
  const allColleges = useMemo(() => getAllColleges(), []);

  // Filter colleges matching saved wishlist IDs
  const savedColleges = useMemo(() => {
    return allColleges.filter((col) => wishlist.includes(col.id));
  }, [allColleges, wishlist]);

  return (
    <div className="max-w-[1240px] mx-auto px-4 sm:px-7 md:px-12 py-10 space-y-8">
      
      {/* ========================================================
          A. PAGE HEADER & BREADCRUMB
      ======================================================== */}
      <div className="space-y-2 pb-4 border-b border-[#E2E8F0] flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <nav className="text-xs text-[#64748B] flex items-center gap-1.5 font-medium mb-1">
            <Link href="/" className="hover:text-[#4F46E5] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#14213D] font-semibold">Wishlist</span>
          </nav>
          <h1 className="font-heading font-bold text-3xl sm:text-[36px] text-[#14213D] tracking-tight">
            My Wishlist
          </h1>
          <p className="text-sm text-[#64748B]">
            Your favorite colleges, all in one place.
          </p>
        </div>

        {/* Dynamic Count */}
        <div className="text-xs font-semibold text-[#4F46E5] bg-[#EEF2FF] px-3 py-1.5 rounded-full self-start sm:self-auto">
          {isLoaded ? `${savedColleges.length} colleges saved` : 'Loading...'}
        </div>
      </div>

      {/* ========================================================
          B. WISHLIST CARDS GRID / C. EMPTY WISHLIST STATE
      ======================================================== */}
      {!isLoaded ? (
        <div className="text-center py-24 text-[#64748B] text-sm">
          Loading your saved colleges...
        </div>
      ) : savedColleges.length === 0 ? (
        /* C. Empty Wishlist State */
        <div className="bg-white rounded-[14px] border border-[#E2E8F0] p-12 sm:p-16 text-center max-w-lg mx-auto my-12 shadow-xs">
          <div className="w-16 h-16 bg-[#EEF2FF] text-[#4F46E5] rounded-full flex items-center justify-center mx-auto mb-4">
            <GraduationCap className="w-8 h-8" />
          </div>
          <h2 className="font-heading font-semibold text-xl text-[#14213D] mb-2">
            Your wishlist is waiting!
          </h2>
          <p className="text-sm text-[#64748B] mb-6 leading-relaxed">
            Save colleges that interest you and keep all your favorites together.
          </p>
          <Link
            href="/colleges"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-[9px] bg-[#4F46E5] hover:bg-[#4338CA] text-white text-sm font-medium transition shadow-xs"
          >
            <span>Explore Colleges</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        /* B. Three-column card grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedColleges.map((college) => (
            <CollegeCard key={college.id} college={college} />
          ))}
        </div>
      )}

    </div>
  );
}
