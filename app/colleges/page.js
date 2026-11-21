'use client';

import { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Search, SlidersHorizontal, X, ArrowUpDown, ChevronDown } from 'lucide-react';
import CollegeCard from '@/components/CollegeCard';
import EmptyState from '@/components/EmptyState';
import { getAllColleges, getAllCities } from '@/lib/colleges';

const ITEMS_PER_PAGE = 6;

function CollegeListingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Search & Filter State
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [selectedCity, setSelectedCity] = useState(searchParams.get('city') || 'all');
  const [selectedCategories, setSelectedCategories] = useState(() => {
    const cat = searchParams.get('category');
    return cat ? [cat] : [];
  });
  const [institutionType, setInstitutionType] = useState('all');
  const [sortBy, setSortBy] = useState('rating_desc');
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync state when URL params change
  useEffect(() => {
    // Filter state must follow client-side navigation to a new query string.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (searchParams.get('search') !== null) setSearch(searchParams.get('search'));
    if (searchParams.get('city') !== null) setSelectedCity(searchParams.get('city'));
    if (searchParams.get('category') !== null) {
      const c = searchParams.get('category');
      setSelectedCategories(c ? [c] : []);
    }
  }, [searchParams]);

  const allColleges = useMemo(() => getAllColleges(), []);
  const cities = useMemo(() => ['Pune', 'Mumbai', 'Bengaluru', 'Delhi', 'Hyderabad', 'Chennai'], []);
  const availableCategories = useMemo(() => ['Engineering', 'Management', 'Medical', 'Science', 'Arts'], []);

  // Category Checkbox Toggle
  const handleCategoryToggle = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  // Clear all filters
  const handleClearAll = () => {
    setSearch('');
    setSelectedCity('all');
    setSelectedCategories([]);
    setInstitutionType('all');
    setSortBy('rating_desc');
    router.replace('/colleges');
  };

  // Filter & Sort Pipeline
  const filteredColleges = useMemo(() => {
    let result = [...allColleges];

    // 1. Text Search
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter(
        (col) =>
          col.name.toLowerCase().includes(q) ||
          col.city.toLowerCase().includes(q) ||
          col.state.toLowerCase().includes(q) ||
          col.description.toLowerCase().includes(q) ||
          col.courses.some((c) => c.toLowerCase().includes(q))
      );
    }

    // 2. City Filter
    if (selectedCity && selectedCity !== 'all') {
      result = result.filter((col) => col.city.toLowerCase() === selectedCity.toLowerCase());
    }

    // 3. Category Filter
    if (selectedCategories.length > 0) {
      result = result.filter((col) => selectedCategories.includes(col.category));
    }

    // 4. Institution Type Filter (Public vs Private)
    if (institutionType !== 'all') {
      result = result.filter((col) => col.type?.toLowerCase() === institutionType.toLowerCase());
    }

    // 5. Sorting
    if (sortBy === 'name_asc') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'name_desc') {
      result.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortBy === 'rating_desc') {
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sortBy === 'rating_asc') {
      result.sort((a, b) => (a.rating || 0) - (b.rating || 0));
    }

    return result;
  }, [allColleges, search, selectedCity, selectedCategories, institutionType, sortBy]);

  // Reset pagination when filters change
  useEffect(() => {
    // Reset the visible result window after each filter/sort change.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVisibleCount(ITEMS_PER_PAGE);
  }, [search, selectedCity, selectedCategories, institutionType, sortBy]);

  const hasActiveFilters = Boolean(
    search || selectedCity !== 'all' || selectedCategories.length > 0 || institutionType !== 'all' || sortBy !== 'rating_desc'
  );

  const paginatedColleges = filteredColleges.slice(0, visibleCount);
  const hasMore = visibleCount < filteredColleges.length;

  return (
    <div className="max-w-[1240px] mx-auto px-4 sm:px-7 md:px-12 py-10 space-y-8">
      
      {/* ========================================================
          A. PAGE INTRODUCTION & BREADCRUMB
      ======================================================== */}
      <div className="space-y-2">
        <nav className="text-xs text-[#64748B] flex items-center gap-1.5 font-medium">
          <Link href="/" className="hover:text-[#4F46E5] transition-colors">Home</Link>
          <span>/</span>
          <span className="text-[#14213D] font-semibold">Explore Colleges</span>
        </nav>
        <h1 className="font-heading font-bold text-3xl sm:text-[36px] text-[#14213D] tracking-tight">
          Explore Colleges
        </h1>
        <p className="text-sm sm:text-base text-[#64748B]">
          Discover institutions, explore courses and find the right place for your future.
        </p>
      </div>

      {/* ========================================================
          B. SEARCH SECTION
      ======================================================== */}
      <div className="bg-white p-3 rounded-[14px] border border-[#E2E8F0] shadow-xs flex flex-col sm:flex-row items-center gap-2">
        <div className="relative w-full flex items-center">
          <Search className="w-5 h-5 text-[#64748B] absolute left-3.5 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by college name or keyword..."
            className="w-full h-[48px] pl-11 pr-10 rounded-[9px] bg-[#F8FAFC] border border-[#E2E8F0] text-sm text-[#172033] placeholder-[#94A3B8] focus:outline-none focus:border-[#4F46E5] focus:bg-white transition"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 text-[#94A3B8] hover:text-[#172033]"
              aria-label="Clear search text"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        
        {/* Mobile Filter Toggle Button */}
        <button
          onClick={() => setMobileFilterOpen(true)}
          className="lg:hidden w-full sm:w-auto h-[48px] px-5 rounded-[9px] bg-[#EEF2FF] text-[#4F46E5] font-medium text-sm flex items-center justify-center gap-2 shrink-0 cursor-pointer"
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span>Filters</span>
          {hasActiveFilters && (
            <span className="w-2 h-2 rounded-full bg-[#4F46E5]" />
          )}
        </button>
      </div>

      {/* ========================================================
          C. TWO-COLUMN DESKTOP LAYOUT (Sidebar ~260px & Results)
      ======================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* D. FILTER SIDEBAR (Desktop) */}
        <aside className="hidden lg:block lg:col-span-3 bg-white p-6 rounded-[14px] border border-[#E2E8F0] shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0]">
            <h2 className="font-heading font-semibold text-lg text-[#14213D]">Filters</h2>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={handleClearAll}
                className="text-xs font-semibold text-[#4F46E5] hover:underline cursor-pointer"
              >
                Clear All
              </button>
            )}
          </div>

          {/* FILTER 1 — LOCATION (City / Location Dropdown) */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#64748B]">
              City / Location
            </label>
            <div className="relative">
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full h-[44px] px-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[9px] text-sm text-[#172033] focus:outline-none focus:border-[#4F46E5] transition appearance-none cursor-pointer"
              >
                <option value="all">All Cities</option>
                {cities.map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-[#64748B] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <hr className="border-[#F1F5F9]" />

          {/* FILTER 2 — COURSE / CATEGORY (Checkboxes) */}
          <div className="space-y-2.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#64748B]">
              Course or Category
            </label>
            <div className="space-y-2">
              {availableCategories.map((cat) => {
                const checked = selectedCategories.includes(cat);
                return (
                  <label
                    key={cat}
                    className="flex items-center gap-2.5 text-sm text-[#172033] hover:text-[#4F46E5] cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => handleCategoryToggle(cat)}
                      className="w-4 h-4 rounded text-[#4F46E5] focus:ring-[#4F46E5] border-[#CBD5E1]"
                    />
                    <span>{cat}</span>
                  </label>
                );
              })}
            </div>
          </div>

          <hr className="border-[#F1F5F9]" />

          {/* FILTER 3 — SORTING */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#64748B]">
              Sort By
            </label>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full h-[44px] px-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[9px] text-sm text-[#172033] focus:outline-none focus:border-[#4F46E5] transition appearance-none cursor-pointer"
              >
                <option value="rating_desc">Rating: High to Low</option>
                <option value="rating_asc">Rating: Low to High</option>
                <option value="name_asc">College Name: A–Z</option>
                <option value="name_desc">College Name: Z–A</option>
              </select>
              <ChevronDown className="w-4 h-4 text-[#64748B] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <hr className="border-[#F1F5F9]" />

          {/* FILTER 4 — INSTITUTION TYPE (Public vs Private) */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#64748B]">
              Institution Type
            </label>
            <div className="flex gap-2">
              {['all', 'Public', 'Private'].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setInstitutionType(type)}
                  className={`flex-1 py-1.5 text-xs font-medium rounded-[9px] border transition cursor-pointer ${
                    institutionType === type
                      ? 'bg-[#EEF2FF] border-[#4F46E5] text-[#4F46E5]'
                      : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#64748B] hover:text-[#172033]'
                  }`}
                >
                  {type === 'all' ? 'All' : type}
                </button>
              ))}
            </div>
          </div>

        </aside>

        {/* RIGHT: RESULTS AREA */}
        <main className="lg:col-span-9 space-y-6">
          
          {/* E. RESULTS HEADER (Count, Active Chips, Grid Layout) */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E2E8F0] gap-4">
            <div className="space-y-1">
              <p className="font-heading font-semibold text-lg text-[#14213D]">
                Showing {filteredColleges.length} {filteredColleges.length === 1 ? 'college' : 'colleges'}
              </p>
              
              {/* Active Filter Chips with X button */}
              {hasActiveFilters && (
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  {selectedCity !== 'all' && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#EEF2FF] text-[#4F46E5] text-xs font-medium">
                      City: {selectedCity}
                      <button
                        onClick={() => setSelectedCity('all')}
                        className="hover:text-[#14213D] ml-1 font-bold"
                      >
                        ✕
                      </button>
                    </span>
                  )}
                  {selectedCategories.map((cat) => (
                    <span
                      key={cat}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#EEF2FF] text-[#4F46E5] text-xs font-medium"
                    >
                      {cat}
                      <button
                        onClick={() => handleCategoryToggle(cat)}
                        className="hover:text-[#14213D] ml-1 font-bold"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                  {institutionType !== 'all' && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#EEF2FF] text-[#4F46E5] text-xs font-medium">
                      {institutionType}
                      <button
                        onClick={() => setInstitutionType('all')}
                        className="hover:text-[#14213D] ml-1 font-bold"
                      >
                        ✕
                      </button>
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Quick Sort Dropdown on Desktop */}
            <div className="hidden sm:flex items-center gap-2 text-xs text-[#64748B]">
              <span>Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-[#E2E8F0] text-[#172033] px-2.5 py-1.5 rounded-[9px] font-medium text-xs focus:outline-none focus:border-[#4F46E5]"
              >
                <option value="rating_desc">Rating: High to Low</option>
                <option value="name_asc">Name: A–Z</option>
                <option value="name_desc">Name: Z–A</option>
              </select>
            </div>
          </div>

          {/* F. COLLEGE CARDS (3-column grid) OR H. EMPTY STATE */}
          {filteredColleges.length === 0 ? (
            <EmptyState onReset={handleClearAll} />
          ) : (
            <div className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {paginatedColleges.map((college) => (
                  <CollegeCard key={college.id} college={college} />
                ))}
              </div>

              {/* G. LOAD MORE / PAGINATION */}
              {hasMore && (
                <div className="text-center pt-6">
                  <button
                    onClick={() => setVisibleCount((prev) => prev + ITEMS_PER_PAGE)}
                    className="px-6 py-3 rounded-[9px] bg-white border border-[#4F46E5] text-[#4F46E5] hover:bg-[#EEF2FF] text-sm font-medium transition shadow-xs cursor-pointer"
                  >
                    Load More Colleges ({filteredColleges.length - visibleCount} remaining)
                  </button>
                </div>
              )}
            </div>
          )}

        </main>

      </div>

      {/* I. MOBILE FILTER BOTTOM SHEET / DRAWER */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden animate-in fade-in duration-200">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-xs" onClick={() => setMobileFilterOpen(false)} />
          <div className="relative mt-auto w-full bg-white rounded-t-[20px] max-h-[85vh] overflow-y-auto p-6 space-y-6 z-10 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
              <h2 className="font-heading font-semibold text-lg text-[#14213D]">Filters</h2>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="p-1.5 text-[#64748B] hover:text-[#172033]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* City */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-[#64748B]">City</label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full h-11 px-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[9px] text-sm"
              >
                <option value="all">All Cities</option>
                {cities.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Categories */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-[#64748B]">Categories</label>
              <div className="grid grid-cols-2 gap-2">
                {availableCategories.map((cat) => (
                  <label key={cat} className="flex items-center gap-2 text-xs text-[#172033]">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(cat)}
                      onChange={() => handleCategoryToggle(cat)}
                      className="rounded text-[#4F46E5]"
                    />
                    <span>{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4 border-t border-[#E2E8F0]">
              <button
                onClick={() => {
                  handleClearAll();
                  setMobileFilterOpen(false);
                }}
                className="flex-1 py-3 text-xs font-medium rounded-[9px] border border-[#E2E8F0] text-[#64748B]"
              >
                Clear All
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="flex-1 py-3 text-xs font-medium rounded-[9px] bg-[#4F46E5] text-white"
              >
                Show Results
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default function CollegesPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-[1240px] mx-auto px-4 py-20 text-center text-[#64748B] text-sm">
          Loading colleges...
        </div>
      }
    >
      <CollegeListingContent />
    </Suspense>
  );
}
