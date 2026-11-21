import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  MapPin,
  Star,
  BookOpen,
  IndianRupee,
  ArrowLeft,
  GraduationCap,
  Building,
  CheckCircle2,
  Calendar,
} from 'lucide-react';
import { getCollegeBySlug, getAllColleges } from '@/lib/colleges';
import DetailWishlistButton from './DetailWishlistButton';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const college = getCollegeBySlug(slug);

  if (!college) {
    return {
      title: 'College Not Found - EduCompass',
      description: 'The requested college could not be found.',
    };
  }

  return {
    title: `${college.name} - Courses, Fees & Admission Details | EduCompass`,
    description: college.description,
  };
}

export async function generateStaticParams() {
  const colleges = getAllColleges();
  return colleges.map((col) => ({
    slug: col.slug,
  }));
}

export default async function CollegeDetailPage({ params }) {
  const { slug } = await params;
  const college = getCollegeBySlug(slug);

  if (!college) {
    notFound();
  }

  return (
    <div className="pb-24 space-y-10">
      
      {/* ========================================================
          A. BREADCRUMB
      ======================================================== */}
      <div className="bg-white border-b border-[#E2E8F0] py-3.5">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-7 md:px-12 flex items-center justify-between text-xs sm:text-sm">
          <nav className="flex items-center gap-2 text-[#64748B]">
            <Link href="/" className="hover:text-[#4F46E5] transition-colors">Home</Link>
            <span>/</span>
            <Link href="/colleges" className="hover:text-[#4F46E5] transition-colors">Explore Colleges</Link>
            <span>/</span>
            <span className="text-[#14213D] font-semibold truncate max-w-[200px] sm:max-w-none">
              {college.name}
            </span>
          </nav>
          
          <Link
            href="/colleges"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium text-[#4F46E5] hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Colleges</span>
          </Link>
        </div>
      </div>

      <div className="max-w-[1240px] mx-auto px-4 sm:px-7 md:px-12 space-y-10">
        
        {/* ========================================================
            B. COLLEGE HERO SECTION
        ======================================================== */}
        <div className="bg-white rounded-[14px] border border-[#E2E8F0] overflow-hidden shadow-xs">
          
          {/* Large campus cover image */}
          <div className="relative h-64 sm:h-80 md:h-[380px] w-full bg-[#14213D]">
            <Image
              src={college.image}
              alt={college.name}
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#14213D]/90 via-[#14213D]/30 to-transparent" />

            <div className="absolute top-4 left-4">
              <span className="bg-white/95 text-[#14213D] text-xs font-semibold px-3 py-1 rounded-full shadow-xs">
                {college.category}
              </span>
            </div>

            {/* Overlapping Info inside Hero Banner */}
            <div className="absolute bottom-6 left-6 right-6 text-white flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <div className="flex items-center gap-2 text-xs font-medium text-[#EEF2FF]">
                  <MapPin className="w-4 h-4 text-[#3B82F6]" />
                  <span>{college.city}, {college.state}</span>
                  <span>•</span>
                  <span>{college.type || 'Higher Education'} Institution</span>
                </div>
                <h1 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl text-white tracking-tight">
                  {college.name}
                </h1>
                <p className="text-xs sm:text-sm text-[#E2E8F0] line-clamp-2 leading-relaxed">
                  {college.description}
                </p>
              </div>

              {/* Right Side Actions: Primary (Save to Wishlist) & Secondary (Back to Colleges) */}
              <div className="flex items-center gap-3 shrink-0">
                <DetailWishlistButton collegeId={college.id} collegeName={college.name} />
                <Link
                  href="/colleges"
                  className="px-4 py-2.5 rounded-[9px] bg-white/90 hover:bg-white text-[#172033] text-sm font-medium transition shadow-xs"
                >
                  Back to Colleges
                </Link>
              </div>
            </div>
          </div>

          {/* ========================================================
              C. QUICK INFORMATION CARDS (4 Compact Info Cards)
          ======================================================== */}
          <div className="grid grid-cols-2 md:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#E2E8F0] bg-[#F8FAFC] border-t border-[#E2E8F0] p-4 text-center">
            
            {/* Card 1: Location */}
            <div className="p-3 space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B] block">Location</span>
              <div className="flex items-center justify-center gap-1 text-sm font-semibold text-[#14213D]">
                <MapPin className="w-4 h-4 text-[#3B82F6]" />
                <span>{college.city}, {college.state}</span>
              </div>
            </div>

            {/* Card 2: Available Courses */}
            <div className="p-3 space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B] block">Programs Offered</span>
              <div className="flex items-center justify-center gap-1 text-sm font-semibold text-[#14213D]">
                <BookOpen className="w-4 h-4 text-[#4F46E5]" />
                <span>{college.courses?.length || 0} Degree Streams</span>
              </div>
            </div>

            {/* Card 3: Fee Information */}
            <div className="p-3 space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B] block">Fee Information</span>
              <div className="text-sm font-semibold text-[#14213D]">
                {college.fees}
              </div>
            </div>

            {/* Card 4: Rating */}
            <div className="p-3 space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B] block">Institutional Rating</span>
              <div className="flex items-center justify-center gap-1 text-sm font-semibold text-[#14213D]">
                <Star className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]" />
                <span>{college.rating ? `${college.rating} / 5.0` : 'Unavailable'}</span>
              </div>
            </div>

          </div>

        </div>

        {/* Content Body Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div className="lg:col-span-8 space-y-10">
            
            {/* ========================================================
                D. OVERVIEW SECTION ("About this College")
            ======================================================== */}
            <section className="bg-white p-6 sm:p-8 rounded-[14px] border border-[#E2E8F0] shadow-xs space-y-4">
              <h2 className="font-heading font-semibold text-xl text-[#14213D]">
                About this College
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                {college.longDescription || college.description}
              </p>

              {/* Highlights */}
              {college.highlights && (
                <div className="pt-4 border-t border-[#F1F5F9] space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#14213D]">Campus Highlights</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {college.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs sm:text-sm text-[#172033]">
                        <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>

            {/* ========================================================
                E. COURSES AND PROGRAMS SECTION ("Courses Offered")
            ======================================================== */}
            <section className="bg-white p-6 sm:p-8 rounded-[14px] border border-[#E2E8F0] shadow-xs space-y-4">
              <h2 className="font-heading font-semibold text-xl text-[#14213D]">
                Courses Offered
              </h2>
              
              <div className="grid grid-cols-1 gap-4">
                {(college.coursesOffered || college.courses.map(c => ({ name: c, degree: "Undergraduate / Postgraduate", duration: "3-4 Years", description: "Comprehensive curriculum designed according to national academic standards." }))).map((course, idx) => (
                  <div key={idx} className="p-4 rounded-[9px] bg-[#F8FAFC] border border-[#E2E8F0] space-y-1.5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <h4 className="font-heading font-semibold text-base text-[#14213D]">{course.name}</h4>
                      <span className="text-xs font-medium text-[#4F46E5] bg-[#EEF2FF] px-2.5 py-0.5 rounded-full w-fit">
                        {course.duration} • {course.degree}
                      </span>
                    </div>
                    <p className="text-xs text-[#64748B] leading-relaxed">
                      {course.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* ========================================================
                F. FEE INFORMATION SECTION ("Fees & Expenses")
            ======================================================== */}
            <section className="bg-white p-6 sm:p-8 rounded-[14px] border border-[#E2E8F0] shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-heading font-semibold text-xl text-[#14213D]">
                  Fees & Expenses
                </h2>
                <span className="text-[11px] text-[#64748B] italic">
                  *Illustrative sample fee estimates
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-[#E2E8F0] bg-[#F8FAFC] text-[#64748B] font-bold text-[11px] uppercase tracking-wider">
                      <th className="py-3 px-4">Course</th>
                      <th className="py-3 px-4">Duration</th>
                      <th className="py-3 px-4">Fee Information</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F1F5F9]">
                    {(college.feeSchedule || [
                      { course: college.courses[0] || "Degree Program", duration: "4 Years", fee: college.fees }
                    ]).map((row, idx) => (
                      <tr key={idx} className="hover:bg-[#F8FAFC]/60">
                        <td className="py-3 px-4 font-medium text-[#172033]">{row.course}</td>
                        <td className="py-3 px-4 text-[#64748B]">{row.duration}</td>
                        <td className="py-3 px-4 font-semibold text-[#4F46E5]">{row.fee}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* ========================================================
                G. RATINGS AND REVIEWS SECTION ("Student Reviews")
            ======================================================== */}
            <section className="bg-white p-6 sm:p-8 rounded-[14px] border border-[#E2E8F0] shadow-xs space-y-4">
              <h2 className="font-heading font-semibold text-xl text-[#14213D]">
                Student Reviews
              </h2>
              {/* As required: If no genuine review data exists, display: "No reviews available yet." */}
              <div className="p-6 rounded-[9px] bg-[#F8FAFC] border border-[#E2E8F0] text-center">
                <p className="text-sm text-[#64748B]">
                  No reviews available yet.
                </p>
                <p className="text-xs text-[#94A3B8] mt-1">
                  Genuine student testimonials will appear here once verified.
                </p>
              </div>
            </section>

          </div>

          {/* Right Column: Admission Inquiry Box */}
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            <div className="bg-white p-6 rounded-[14px] border border-[#E2E8F0] shadow-xs space-y-4">
              <h3 className="font-heading font-semibold text-base text-[#14213D]">
                Institution Summary
              </h3>
              
              <div className="space-y-3 text-xs">
                <div className="flex justify-between py-2 border-b border-[#F1F5F9]">
                  <span className="text-[#64748B]">Accreditation</span>
                  <span className="font-semibold text-[#172033]">{college.accreditation}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[#F1F5F9]">
                  <span className="text-[#64748B]">Established</span>
                  <span className="font-semibold text-[#172033]">{college.established}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[#F1F5F9]">
                  <span className="text-[#64748B]">Institution Type</span>
                  <span className="font-semibold text-[#172033]">{college.type || 'Private'}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[#F1F5F9]">
                  <span className="text-[#64748B]">Average Tuition</span>
                  <span className="font-semibold text-[#4F46E5]">{college.fees}</span>
                </div>
              </div>

              <div className="pt-2">
                <DetailWishlistButton collegeId={college.id} collegeName={college.name} />
              </div>
            </div>
          </aside>

        </div>

        {/* ========================================================
            H. BOTTOM CTA ("Interested in this college?")
        ======================================================== */}
        <section className="bg-white rounded-[14px] border border-[#E2E8F0] p-8 sm:p-12 text-center max-w-2xl mx-auto shadow-xs space-y-4">
          <h2 className="font-heading font-semibold text-2xl text-[#14213D]">
            Interested in this college?
          </h2>
          <p className="text-sm text-[#64748B] max-w-md mx-auto leading-relaxed">
            Save this institution to your wishlist so you can explore it later.
          </p>
          <div className="pt-2">
            <DetailWishlistButton collegeId={college.id} collegeName={college.name} />
          </div>
        </section>

      </div>
    </div>
  );
}
