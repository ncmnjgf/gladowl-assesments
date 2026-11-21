'use client';

import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Star, Heart, ArrowRight } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';

export default function CollegeCard({ college }) {
  const { isWishlisted, toggleWishlist } = useWishlist();
  const wishlisted = isWishlisted(college.id);

  const handleWishlistClick = (e) => {
    e.preventDefault();
    toggleWishlist(college.id, college.name);
  };

  return (
    <article className="group bg-white rounded-[14px] border border-[#E2E8F0] hover:border-[#4F46E5]/40 hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden">
      <div>
        {/* Cover Photograph with Aspect Ratio 16:9 */}
        <div className="relative aspect-video w-full bg-[#F1F5F9] overflow-hidden">
          <Link href={`/colleges/${college.slug}`} className="block relative w-full h-full">
            <Image
              src={college.image}
              alt={college.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover group-hover:scale-[1.03] transition-transform duration-300"
            />
          </Link>

          {/* Heart / Save icon button in top-right */}
          <button
            onClick={handleWishlistClick}
            className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all shadow-xs cursor-pointer ${
              wishlisted
                ? 'bg-[#EEF2FF] text-[#4F46E5]'
                : 'bg-white/90 backdrop-blur-xs text-[#64748B] hover:text-[#4F46E5] hover:bg-white'
            }`}
            aria-label={wishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
          >
            <Heart
              className={`w-4 h-4 transition-transform ${
                wishlisted ? 'fill-[#4F46E5] text-[#4F46E5] scale-110' : 'text-[#64748B]'
              }`}
            />
          </button>

          {/* Rating tag only if rating data exists */}
          {college.rating && (
            <div className="absolute bottom-3 left-3 bg-[#14213D]/80 backdrop-blur-xs text-white text-xs font-semibold px-2 py-0.5 rounded-[6px] flex items-center gap-1 shadow-xs">
              <Star className="w-3 h-3 fill-[#F59E0B] text-[#F59E0B]" />
              <span>{college.rating.toFixed(1)}</span>
            </div>
          )}
        </div>

        {/* Card Content Area */}
        <div className="p-5 space-y-2.5">
          {/* Location */}
          <div className="flex items-center gap-1.5 text-xs text-[#64748B] font-medium">
            <MapPin className="w-3.5 h-3.5 text-[#3B82F6] shrink-0" />
            <span>{college.city}, {college.state}</span>
          </div>

          {/* College Name */}
          <h3 className="font-heading font-semibold text-[#14213D] text-lg leading-snug line-clamp-1 group-hover:text-[#4F46E5] transition-colors">
            <Link href={`/colleges/${college.slug}`}>
              {college.name}
            </Link>
          </h3>

          {/* Short Description */}
          <p className="text-[#64748B] text-[13px] line-clamp-2 leading-relaxed">
            {college.description}
          </p>

          {/* Course Tags */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {college.courses.slice(0, 2).map((course, idx) => (
              <span
                key={idx}
                className="bg-[#EEF2FF] text-[#4F46E5] text-xs font-medium px-2 py-0.5 rounded-[6px]"
              >
                {course}
              </span>
            ))}
            {college.courses.length > 2 && (
              <span className="text-[#94A3B8] text-xs self-center px-1">
                +{college.courses.length - 2}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Card Bottom Actions */}
      <div className="p-5 pt-0 flex items-center justify-between border-t border-[#F1F5F9] mt-3 pt-3">
        {/* Left: View Details Button with indigo outline */}
        <Link
          href={`/colleges/${college.slug}`}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[9px] border border-[#4F46E5] text-[#4F46E5] hover:bg-[#EEF2FF] text-xs font-medium transition cursor-pointer"
        >
          <span>View Details</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>

        {/* Right: Heart/save button */}
        <button
          onClick={handleWishlistClick}
          className="p-1.5 text-[#64748B] hover:text-[#4F46E5] transition cursor-pointer"
          aria-label={wishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <Heart className={`w-4 h-4 ${wishlisted ? 'fill-[#4F46E5] text-[#4F46E5]' : ''}`} />
        </button>
      </div>
    </article>
  );
}
