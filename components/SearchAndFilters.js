'use client';

import { Search, X, MapPin, BookOpen, ArrowUpDown, RotateCcw } from 'lucide-react';

export default function SearchAndFilters({
  search,
  setSearch,
  city,
  setCity,
  category,
  setCategory,
  sortBy,
  setSortBy,
  cities = [],
  categories = [],
  onReset,
}) {
  const hasActiveFilters = Boolean(
    search || (city && city !== 'all') || (category && category !== 'all') || sortBy !== 'rating_desc'
  );

  return (
    <div className="bg-white rounded-xl border border-zinc-200/90 p-4 sm:p-5 shadow-xs mb-8 space-y-4">
      {/* Search Input Bar with Min 44px Touch Target & Clear Button */}
      <div className="relative flex items-center">
        <label htmlFor="catalog-search" className="sr-only">
          Search colleges by name, city, program, or keyword
        </label>
        <Search className="absolute left-3.5 w-4 h-4 text-zinc-400 pointer-events-none" />
        <input
          id="catalog-search"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by university name, city (e.g. Mumbai, Pune), program, or keyword..."
          className="w-full pl-10 pr-10 py-2.5 rounded-lg bg-zinc-50 border border-zinc-200 text-zinc-900 text-xs sm:text-sm placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:bg-white transition"
        />
        {search && (
          <button
            type="button"
            onClick={() => setSearch('')}
            className="absolute right-2.5 w-7 h-7 flex items-center justify-center text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 rounded-md transition cursor-pointer"
            aria-label="Clear search input"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Filter Controls Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* City Filter */}
        <div>
          <label htmlFor="filter-city" className="block text-[11px] font-mono font-medium text-zinc-600 mb-1">
            Location
          </label>
          <div className="relative">
            <select
              id="filter-city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full h-10 px-3 bg-zinc-50 border border-zinc-200 rounded-lg text-xs sm:text-sm font-medium text-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-900 cursor-pointer transition appearance-none"
            >
              <option value="all">All Locations</option>
              {cities.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400 text-xs">
              ▼
            </div>
          </div>
        </div>

        {/* Discipline / Category Filter */}
        <div>
          <label htmlFor="filter-category" className="block text-[11px] font-mono font-medium text-zinc-600 mb-1">
            Discipline
          </label>
          <div className="relative">
            <select
              id="filter-category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full h-10 px-3 bg-zinc-50 border border-zinc-200 rounded-lg text-xs sm:text-sm font-medium text-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-900 cursor-pointer transition appearance-none"
            >
              <option value="all">All Disciplines</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400 text-xs">
              ▼
            </div>
          </div>
        </div>

        {/* Sorting Dropdown */}
        <div>
          <label htmlFor="filter-sort" className="block text-[11px] font-mono font-medium text-zinc-600 mb-1">
            Sort Order
          </label>
          <div className="relative">
            <select
              id="filter-sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full h-10 px-3 bg-zinc-50 border border-zinc-200 rounded-lg text-xs sm:text-sm font-medium text-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-900 cursor-pointer transition appearance-none"
            >
              <option value="rating_desc">Highest Rated</option>
              <option value="name_asc">Institution Name (A – Z)</option>
              <option value="name_desc">Institution Name (Z – A)</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400 text-xs">
              ▼
            </div>
          </div>
        </div>

        {/* Reset Action */}
        <div className="flex items-end">
          <button
            type="button"
            onClick={onReset}
            disabled={!hasActiveFilters}
            className={`w-full h-10 px-4 rounded-lg text-xs sm:text-sm font-medium flex items-center justify-center gap-1.5 transition ${
              hasActiveFilters
                ? 'bg-zinc-100 hover:bg-zinc-200 text-zinc-800 border border-zinc-300 cursor-pointer'
                : 'bg-zinc-50 text-zinc-400 border border-zinc-200 cursor-not-allowed opacity-60'
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Filters</span>
          </button>
        </div>
      </div>

      {/* Active Filter Chips for Immediate Transparency & Operability */}
      {hasActiveFilters && (
        <div className="pt-2 border-t border-zinc-100 flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-[11px] font-mono text-zinc-600 mr-1">Active filters:</span>
          {search && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-zinc-100 text-zinc-800 text-[11px] font-medium border border-zinc-200">
              Keyword: &quot;{search}&quot;
              <button
                type="button"
                onClick={() => setSearch('')}
                className="hover:text-red-600 cursor-pointer ml-0.5"
                aria-label="Remove search filter"
              >
                ✕
              </button>
            </span>
          )}
          {city && city !== 'all' && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-zinc-100 text-zinc-800 text-[11px] font-medium border border-zinc-200">
              City: {city}
              <button
                type="button"
                onClick={() => setCity('all')}
                className="hover:text-red-600 cursor-pointer ml-0.5"
                aria-label="Remove city filter"
              >
                ✕
              </button>
            </span>
          )}
          {category && category !== 'all' && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-zinc-100 text-zinc-800 text-[11px] font-medium border border-zinc-200">
              Discipline: {category}
              <button
                type="button"
                onClick={() => setCategory('all')}
                className="hover:text-red-600 cursor-pointer ml-0.5"
                aria-label="Remove category filter"
              >
                ✕
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
}
