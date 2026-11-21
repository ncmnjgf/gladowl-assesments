'use client';

import Link from 'next/link';
import { Compass, GraduationCap, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-[#E2E8F0] text-[#64748B] pt-14 pb-10">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-7 md:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          
          {/* Column 1: EduCompass logo and short description */}
          <div className="space-y-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-[9px] bg-[#14213D] text-white flex items-center justify-center">
                <Compass className="w-4 h-4" />
              </div>
              <span className="font-heading font-bold text-base text-[#14213D]">EduCompass</span>
            </Link>
            <p className="text-sm text-[#64748B] leading-relaxed">
              Find Your Direction. Discover Your Future. Helping students explore top colleges, compare courses, and make confident career decisions.
            </p>
          </div>

          {/* Column 2 — Explore */}
          <div>
            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-[#14213D] mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-[#4F46E5] transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/colleges" className="hover:text-[#4F46E5] transition-colors">All Colleges</Link>
              </li>
              <li>
                <Link href="/colleges?category=Engineering" className="hover:text-[#4F46E5] transition-colors">Popular Courses</Link>
              </li>
            </ul>
          </div>

          {/* Column 3 — Account */}
          <div>
            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-[#14213D] mb-4">
              Account
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/wishlist" className="hover:text-[#4F46E5] transition-colors">Wishlist</Link>
              </li>
              <li>
                <Link href="/colleges" className="hover:text-[#4F46E5] transition-colors">
                  Sign In
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 — Information */}
          <div>
            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-[#14213D] mb-4">
              Information
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/colleges" className="hover:text-[#4F46E5] transition-colors">About EduCompass</Link>
              </li>
              <li>
                <Link href="/colleges" className="hover:text-[#4F46E5] transition-colors">Contact Support</Link>
              </li>
              <li>
                <span className="text-[#94A3B8] text-xs">Privacy Policy • Terms of Service</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-[#E2E8F0] flex flex-col sm:flex-row items-center justify-between text-xs text-[#64748B]">
          <p>Copyright © 2026 EduCompass. All rights reserved.</p>
          <p className="mt-2 sm:mt-0 text-[11px] text-[#94A3B8]">
            Designed with precision for higher education exploration
          </p>
        </div>
      </div>
    </footer>
  );
}
