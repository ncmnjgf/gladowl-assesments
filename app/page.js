'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  Search,
  MapPin,
  ArrowRight,
  GraduationCap,
  Sparkles,
  BookOpen,
  Briefcase,
  Stethoscope,
  Laptop,
  Palette,
  FlaskConical,
  CheckCircle,
  Compass,
} from 'lucide-react';
import CollegeCard from '@/components/CollegeCard';
import { getFeaturedColleges, getAllCities } from '@/lib/colleges';

export default function HomePage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const featuredColleges = getFeaturedColleges().slice(0, 3);
  const cities = getAllCities();

  const handleHeroSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchTerm.trim()) params.set('search', searchTerm.trim());
    if (selectedCity) params.set('city', selectedCity);
    router.push(`/colleges?${params.toString()}`);
  };

  const handlePopularSearch = (tag) => {
    router.push(`/colleges?search=${encodeURIComponent(tag)}`);
  };

  // Six Category Cards specified in Section 3.B
  const categoriesList = [
    {
      name: 'Engineering',
      categoryQuery: 'Engineering',
      desc: 'B.Tech, Robotics, Electronics & Applied Sciences',
      icon: Laptop,
    },
    {
      name: 'Management',
      categoryQuery: 'Management',
      desc: 'MBA, Business Analytics, Finance & Leadership',
      icon: Briefcase,
    },
    {
      name: 'Medical',
      categoryQuery: 'Medical',
      desc: 'MBBS, Clinical Healthcare, Pharmacy & Surgery',
      icon: Stethoscope,
    },
    {
      name: 'Computer Science',
      categoryQuery: 'Engineering',
      desc: 'AI, Algorithms, Cloud Architecture & Software',
      icon: BookOpen,
    },
    {
      name: 'Arts & Humanities',
      categoryQuery: 'Arts',
      desc: 'Literature, Journalism, Media & Visual Design',
      icon: Palette,
    },
    {
      name: 'Science',
      categoryQuery: 'Science',
      desc: 'Pure Mathematics, Physics, Biotechnology & Quantum',
      icon: FlaskConical,
    },
  ];

  return (
    <div className="space-y-24 pb-20">
      
      {/* ========================================================
          A. HERO SECTION (Two-column desktop layout)
      ======================================================== */}
      <section className="pt-10 sm:pt-14 md:pt-18 max-w-[1240px] mx-auto px-4 sm:px-7 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT SIDE: Copy & Search Panel */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Small Eyebrow */}
            <div className="inline-block text-xs font-bold tracking-wider uppercase text-[#4F46E5] bg-[#EEF2FF] px-3 py-1 rounded-[6px]">
              YOUR FUTURE STARTS WITH THE RIGHT CHOICE
            </div>

            {/* Main Heading */}
            <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-[56px] text-[#14213D] leading-[1.1] tracking-tight">
              Discover colleges. <br className="hidden sm:inline" />
              Explore possibilities. <br />
              <span className="text-[#4F46E5]">Shape your future.</span>
            </h1>

            {/* Supporting Description */}
            <p className="text-base sm:text-lg text-[#64748B] max-w-xl leading-relaxed">
              Find the right college for your ambitions. Explore institutions, discover courses, and make informed decisions about your education.
            </p>

            {/* Search Panel Box */}
            <form onSubmit={handleHeroSearch} className="bg-white p-3 sm:p-4 rounded-[14px] border border-[#E2E8F0] shadow-sm space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5">
                
                {/* 1. Search input */}
                <div className="sm:col-span-7 relative flex items-center">
                  <Search className="w-5 h-5 text-[#64748B] absolute left-3.5 pointer-events-none" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search college by name or keyword..."
                    className="w-full h-[48px] pl-10 pr-4 rounded-[9px] bg-[#F8FAFC] border border-[#E2E8F0] text-sm text-[#172033] placeholder-[#94A3B8] focus:outline-none focus:border-[#4F46E5] focus:bg-white transition"
                  />
                  {searchTerm && (
                    <button
                      type="button"
                      onClick={() => setSearchTerm('')}
                      className="absolute right-3 text-[#94A3B8] hover:text-[#172033] text-xs font-bold"
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* 2. Location selector */}
                <div className="sm:col-span-5 relative flex items-center">
                  <MapPin className="w-4 h-4 text-[#3B82F6] absolute left-3 pointer-events-none" />
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full h-[48px] pl-9 pr-6 rounded-[9px] bg-[#F8FAFC] border border-[#E2E8F0] text-sm text-[#172033] focus:outline-none focus:border-[#4F46E5] focus:bg-white transition appearance-none cursor-pointer"
                  >
                    <option value="">Select city</option>
                    {cities.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

              </div>

              {/* 3. Search button */}
              <button
                type="submit"
                className="w-full h-[48px] rounded-[9px] bg-[#4F46E5] hover:bg-[#4338CA] text-white font-medium text-sm flex items-center justify-center gap-2 transition shadow-xs cursor-pointer"
              >
                <Search className="w-4 h-4" />
                <span>Find Colleges</span>
              </button>
            </form>

            {/* Popular Searches Chips with Light Lavender Background */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-xs text-[#64748B] font-medium">Popular:</span>
              {['Engineering', 'Management', 'Computer Science', 'Medical', 'Arts & Science'].map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handlePopularSearch(tag)}
                  className="px-3 py-1 rounded-full bg-[#EEF2FF] hover:bg-[#E0E7FF] text-[#4F46E5] text-xs font-medium transition cursor-pointer"
                >
                  {tag}
                </button>
              ))}
            </div>

          </div>

          {/* RIGHT SIDE: University Campus Image Composition with Floating Cards */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] sm:aspect-[4/4] lg:aspect-[4/5] w-full rounded-[14px] overflow-hidden shadow-xl border border-[#E2E8F0]">
              <Image
                src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80"
                alt="Modern university campus"
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#14213D]/40 via-transparent to-transparent" />
            </div>

            {/* Floating Card 1: Find your dream college */}
            <div className="absolute top-6 -left-4 sm:-left-6 bg-white/95 backdrop-blur-md p-3.5 rounded-[14px] border border-[#E2E8F0] shadow-lg flex items-center gap-3 animate-in fade-in zoom-in duration-300">
              <div className="w-9 h-9 rounded-[9px] bg-[#EEF2FF] text-[#4F46E5] flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#14213D]">Find your dream college</p>
                <p className="text-[11px] text-[#64748B]">Verified admissions guidance</p>
              </div>
            </div>

            {/* Floating Card 2: Explore 500+ possibilities */}
            <div className="absolute bottom-6 -right-4 sm:-right-6 bg-white/95 backdrop-blur-md p-3.5 rounded-[14px] border border-[#E2E8F0] shadow-lg flex items-center gap-3 animate-in fade-in zoom-in duration-300">
              <div className="w-9 h-9 rounded-[9px] bg-[#14213D] text-white flex items-center justify-center">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#14213D]">Explore 500+ possibilities</p>
                <p className="text-[11px] text-[#64748B]">Across India&apos;s top faculties</p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================
          B. POPULAR COURSES SECTION (6 Category Cards)
      ======================================================== */}
      <section className="max-w-[1240px] mx-auto px-4 sm:px-7 md:px-12">
        <div className="mb-8">
          <h2 className="font-heading font-semibold text-2xl sm:text-[26px] text-[#14213D]">
            Explore by your interests
          </h2>
          <p className="text-sm text-[#64748B] mt-1">
            Discover academic paths that match your ambitions.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoriesList.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <Link
                key={idx}
                href={`/colleges?category=${encodeURIComponent(cat.categoryQuery)}`}
                className="group bg-white p-6 rounded-[14px] border border-[#E2E8F0] hover:border-[#4F46E5]/40 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-[9px] bg-[#F8FAFC] group-hover:bg-[#4F46E5] text-[#14213D] group-hover:text-white flex items-center justify-center transition-colors duration-200">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-lg text-[#14213D] group-hover:text-[#4F46E5] transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-[#64748B] mt-1 leading-relaxed">
                      {cat.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-4 flex items-center gap-1 text-xs font-medium text-[#4F46E5]">
                  <span>Explore colleges</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ========================================================
          C. FEATURED COLLEGES SECTION
      ======================================================== */}
      <section className="max-w-[1240px] mx-auto px-4 sm:px-7 md:px-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="font-heading font-semibold text-2xl sm:text-[26px] text-[#14213D]">
              Popular colleges to explore
            </h2>
            <p className="text-sm text-[#64748B] mt-1">
              Discover institutions worth knowing about.
            </p>
          </div>
          <Link
            href="/colleges"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-[9px] border border-[#4F46E5] text-[#4F46E5] hover:bg-[#EEF2FF] text-sm font-medium transition cursor-pointer self-start sm:self-auto"
          >
            <span>View All Colleges</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredColleges.map((college) => (
            <CollegeCard key={college.id} college={college} />
          ))}
        </div>
      </section>

      {/* ========================================================
          D. HOW EDUCOMPASS WORKS (3-Step Section)
      ======================================================== */}
      <section className="max-w-[1240px] mx-auto px-4 sm:px-7 md:px-12">
        <div className="bg-white p-8 sm:p-12 rounded-[14px] border border-[#E2E8F0]">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="font-heading font-semibold text-2xl sm:text-[26px] text-[#14213D]">
              How EduCompass works
            </h2>
            <p className="text-sm text-[#64748B] mt-1">
              Three simple steps to find and finalize your dream college.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            
            {/* Step 1 */}
            <div className="text-center space-y-3 relative">
              <div className="w-12 h-12 mx-auto rounded-full bg-[#EEF2FF] text-[#4F46E5] flex items-center justify-center font-heading font-bold text-base shadow-xs">
                1
              </div>
              <h3 className="font-heading font-semibold text-lg text-[#14213D]">Discover</h3>
              <p className="text-sm text-[#64748B] leading-relaxed max-w-xs mx-auto">
                Search colleges based on your preferred location and courses.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center space-y-3 relative">
              <div className="w-12 h-12 mx-auto rounded-full bg-[#EEF2FF] text-[#4F46E5] flex items-center justify-center font-heading font-bold text-base shadow-xs">
                2
              </div>
              <h3 className="font-heading font-semibold text-lg text-[#14213D]">Explore</h3>
              <p className="text-sm text-[#64748B] leading-relaxed max-w-xs mx-auto">
                Explore college profiles, programs, fees and other information.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center space-y-3 relative">
              <div className="w-12 h-12 mx-auto rounded-full bg-[#EEF2FF] text-[#4F46E5] flex items-center justify-center font-heading font-bold text-base shadow-xs">
                3
              </div>
              <h3 className="font-heading font-semibold text-lg text-[#14213D]">Shortlist</h3>
              <p className="text-sm text-[#64748B] leading-relaxed max-w-xs mx-auto">
                Save your favorite colleges and revisit them anytime.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================
          E. FINAL CTA SECTION (Dark Navy with Compass motifs)
      ======================================================== */}
      <section className="max-w-[1240px] mx-auto px-4 sm:px-7 md:px-12">
        <div className="relative overflow-hidden bg-[#14213D] rounded-[14px] p-8 sm:p-14 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* Subtle Compass background decorative element */}
          <Compass className="absolute -bottom-10 -right-10 w-64 h-64 text-white/[0.04] pointer-events-none" />

          <div className="space-y-3 max-w-xl relative z-10">
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-white tracking-tight">
              Your next chapter starts here.
            </h2>
            <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
              Explore your options and find a college that fits your future.
            </p>
          </div>

          <div className="relative z-10 shrink-0">
            <Link
              href="/colleges"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-[9px] bg-[#4F46E5] hover:bg-[#4338CA] text-white font-medium text-sm transition shadow-lg"
            >
              <span>Explore Colleges</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
}
