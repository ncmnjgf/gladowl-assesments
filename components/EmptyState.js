import { Search, RotateCcw } from 'lucide-react';
import Link from 'next/link';

export default function EmptyState({ onReset, message = "Try adjusting your search or removing some filters." }) {
  return (
    <div className="bg-white rounded-[14px] border border-[#E2E8F0] p-10 sm:p-14 text-center max-w-md mx-auto my-12 shadow-xs">
      <div className="w-14 h-14 bg-[#EEF2FF] text-[#4F46E5] rounded-full flex items-center justify-center mx-auto mb-4">
        <Search className="w-6 h-6" />
      </div>
      <h3 className="font-heading font-semibold text-lg text-[#14213D] mb-1.5">
        No colleges found
      </h3>
      <p className="text-sm text-[#64748B] mb-6 leading-relaxed">
        {message}
      </p>

      {onReset ? (
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[9px] bg-[#4F46E5] hover:bg-[#4338CA] text-white text-sm font-medium transition shadow-xs cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Clear All Filters</span>
        </button>
      ) : (
        <Link
          href="/colleges"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[9px] bg-[#4F46E5] hover:bg-[#4338CA] text-white text-sm font-medium transition shadow-xs"
        >
          <span>Explore Colleges</span>
        </Link>
      )}
    </div>
  );
}
