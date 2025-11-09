import React, { useState } from "react";
import ReactStars from "react-rating-stars-component";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "../../App.css";
import { FaStar, FaCheckCircle, FaQuoteLeft, FaArrowRight, FaChevronLeft } from "react-icons/fa";
import { Autoplay, FreeMode, Pagination } from "swiper";

/**
 * ReviewSlider Component
 * Displays curated student reviews in an auto-scrolling carousel with flip-card animation
 * Features: equal-height cards, flip animation with full text display, rating, responsive design
 */
function ReviewSlider() {
  const [flippedCards, setFlippedCards] = useState({});

  // Number of words to display before truncation
  const TRUNCATE_WORD_COUNT = 15;
  // Reduced card height for more compact display

  // Static review data - curated to showcase the best student experiences
  const reviews = [
    {
      _id: "1",
      rating: 5.0,
      review: "This platform completely transformed my career! The Web Development Bootcamp was incredibly well-structured, with real-world projects that built my confidence. The instructors are experienced professionals who genuinely care about your success. Within 3 months of completing the course, I landed my dream job as a Full Stack Developer. The community support is outstanding, and the lifetime access means I can always come back to refresh my knowledge. Best investment I've ever made!",
      user: {
        firstName: "Sarah",
        lastName: "Johnson",
        image: "https://api.dicebear.com/5.x/initials/svg?seed=Sarah Johnson&backgroundColor=4f46e5",
      },
      course: {
        courseName: "Complete Web Development Bootcamp",
      },
    },
    {
      _id: "2",
      rating: 5.0,
      review: "As someone switching careers from finance to tech, I was nervous about learning to code. This platform made the transition smooth and enjoyable. The Python for Data Science course breaks down complex concepts into digestible lessons with practical examples. The hands-on projects helped me build a strong portfolio that impressed employers. I particularly loved the interactive coding challenges and the supportive community. Now I'm working as a Data Analyst and couldn't be happier!",
      user: {
        firstName: "Michael",
        lastName: "Chen",
        image: "https://api.dicebear.com/5.x/initials/svg?seed=Michael Chen&backgroundColor=059669",
      },
      course: {
        courseName: "Python for Data Science & Machine Learning",
      },
    },
    {
      _id: "3",
      rating: 5.0,
      review: "Outstanding quality and value! I've taken courses on other platforms, but none compare to the depth and clarity offered here. The React & Redux Masterclass taught me not just how to code, but how to think like a professional developer. The instructor's teaching style is engaging, and the course content is always up-to-date with the latest industry practices. The certificate I earned has been a great addition to my LinkedIn profile. Highly recommend to anyone serious about advancing their tech skills!",
      user: {
        firstName: "Priya",
        lastName: "Sharma",
        image: "https://api.dicebear.com/5.x/initials/svg?seed=Priya Sharma&backgroundColor=dc2626",
      },
      course: {
        courseName: "React & Redux Masterclass",
      },
    },
  ];

  /**
   * Check if review text needs truncation
   */
  const isReviewTruncated = (review) => {
    return review.split(" ").length > TRUNCATE_WORD_COUNT;
  };

  /**
   * Get truncated review text
   */
  const getTruncatedText = (fullText) => {
    return fullText.split(" ").slice(0, TRUNCATE_WORD_COUNT).join(" ");
  };

  /**
   * Toggle card flip
   */
  const toggleCardFlip = (reviewId) => {
    setFlippedCards((prev) => ({
      ...prev,
      [reviewId]: !prev[reviewId],
    }));
  };

  return (
    <div className="w-full">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Review Slider */}
        <Swiper
          slidesPerView={1}
          spaceBetween={24}
          loop={false}
          centeredSlides={reviews.length === 1}
          autoplay={{
            delay: 5000,
            disableOnInteraction: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: Math.min(reviews.length, 2),
              spaceBetween: 20,
              centeredSlides: reviews.length === 1,
            },
            1024: {
              slidesPerView: Math.min(reviews.length, 3),
              spaceBetween: 24,
              centeredSlides: false,
            },
          }}
          modules={[FreeMode, Pagination, Autoplay]}
          className="mySwiper h-[420px]"
        >
          {reviews.slice(0, 3).map((review) => {
            const reviewId = review._id;
            const isFlipped = flippedCards[reviewId];
            const isTruncated = isReviewTruncated(review.review);
            const truncatedText = getTruncatedText(review.review);

            return (
              <SwiperSlide key={reviewId} className="h-[380px] flex items-center justify-center pb-2">
                {/* Card Container with Flip Animation */}
                <div
                  className="w-full h-full"
                  style={{
                    perspective: "1000px",
                  }}
                >
                  <div
                    className="relative w-full h-full transition-transform duration-500 ease-in-out"
                    style={{
                      transformStyle: "preserve-3d",
                      transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                    }}
                  >
                    {/* Front Side - Truncated Review */}
                    <div
                      className="absolute w-full h-full rounded-2xl bg-gradient-to-br from-richblack-800 via-richblack-800 to-richblack-900 p-6 shadow-xl flex flex-col overflow-hidden border border-richblack-700"
                      style={{
                        backfaceVisibility: "hidden",
                      }}
                    >
                      
                      {/* Top Section: Quotation Mark & Badge */}
                      <div className="flex items-start justify-between mb-3 relative z-10">
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-yellow-25/10 border border-yellow-25/20">
                          <FaQuoteLeft className="text-yellow-25 text-lg" />
                        </div>
                        <div className="flex items-center gap-1 bg-green-500/10 border border-green-500/30 px-2.5 py-1 rounded-full">
                          <FaCheckCircle className="text-green-400 text-xs" />
                          <span className="text-xs font-medium text-green-400">Verified</span>
                        </div>
                      </div>

                      {/* Rating Section */}
                      <div className="mb-4 flex items-center gap-3 relative z-10">
                        <div className="flex items-center gap-1">
                          <ReactStars
                            count={5}
                            value={review.rating}
                            size={20}
                            edit={false}
                            activeColor="#FFD60A"
                            emptyIcon={<FaStar />}
                            fullIcon={<FaStar />}
                            classNames="flex"
                          />
                        </div>
                        <span className="text-base font-bold text-yellow-25 bg-yellow-25/10 px-2 py-0.5 rounded">
                          {review.rating.toFixed(1)}
                        </span>
                      </div>

                      {/* Review Text - Truncated */}
                      <div className="flex-1 mb-4 flex flex-col relative z-10">
                        <p className="text-base leading-relaxed text-richblack-50 line-clamp-4 break-words overflow-wrap-anywhere font-medium">
                          {isTruncated ? `${truncatedText}...` : review.review}
                        </p>
                      </div>

                      {/* Course Badge */}
                      <div className="mb-3 relative z-10">
                        <div className="inline-flex items-center px-3 py-1.5 rounded-lg bg-richblack-700/50 border border-richblack-600">
                          <span className="text-xs font-medium text-richblack-300">
                            {review.course?.courseName}
                          </span>
                        </div>
                      </div>

                      {/* Divider */}
                      <div className="mb-3 border-t border-richblack-700/50 relative z-10"></div>

                      {/* User Info Section */}
                      <div className="flex items-center gap-3 relative z-10">
                        {/* Avatar with Glow Effect */}
                        <div className="relative h-12 w-12 flex-shrink-0">
                          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-25 to-yellow-50 blur-md opacity-30"></div>
                          <img
                            src={
                              review.user?.image ||
                              `https://api.dicebear.com/5.x/initials/svg?seed=${review.user?.firstName} ${review.user?.lastName}`
                            }
                            alt={`${review.user?.firstName} ${review.user?.lastName}`}
                            className="relative h-full w-full rounded-full border-2 border-richblack-600 object-cover shadow-lg ring-2 ring-yellow-25/10"
                          />
                        </div>

                        {/* User Details */}
                        <div className="flex-1 min-w-0">
                          <h3 className="truncate text-base font-bold text-richblack-5">
                            {`${review.user?.firstName} ${review.user?.lastName}`}
                          </h3>
                          <p className="truncate text-xs text-richblack-400 font-medium">
                            Verified Student
                          </p>
                        </div>
                      </div>

                      {/* Read More Button - Shown only if text is truncated */}
                      {isTruncated && (
                        <button
                          onClick={() => toggleCardFlip(reviewId)}
                          className="mt-4 w-full rounded-xl bg-gradient-to-r from-yellow-25 to-yellow-50 px-4 py-2.5 text-center text-sm font-bold text-richblack-900 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-25 focus:ring-offset-2 focus:ring-offset-richblack-800 flex items-center justify-center gap-2 relative z-10"
                        >
                          Read Full Review
                          <FaArrowRight className="text-xs" />
                        </button>
                      )}
                    </div>

                    {/* Back Side - Full Review */}
                    <div
                      className="absolute w-full h-full rounded-2xl bg-gradient-to-br from-richblack-800 via-richblack-800 to-richblack-900 p-6 shadow-xl transition-all duration-300 flex flex-col overflow-hidden border border-richblack-700"
                      style={{
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                      }}
                    >
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-yellow-25/5 via-transparent to-transparent rounded-2xl pointer-events-none"></div>
                      
                      {/* Top Section: Quotation Mark & Badge */}
                      <div className="flex items-start justify-between mb-3 relative z-10">
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-yellow-25/10 border border-yellow-25/20">
                          <FaQuoteLeft className="text-yellow-25 text-lg" />
                        </div>
                        <div className="flex items-center gap-1 bg-green-500/10 border border-green-500/30 px-2.5 py-1 rounded-full">
                          <FaCheckCircle className="text-green-400 text-xs" />
                          <span className="text-xs font-medium text-green-400">Verified</span>
                        </div>
                      </div>

                      {/* Rating Section */}
                      <div className="mb-4 flex items-center gap-3 relative z-10">
                        <div className="flex items-center gap-1">
                          <ReactStars
                            count={5}
                            value={review.rating}
                            size={20}
                            edit={false}
                            activeColor="#FFD60A"
                            emptyIcon={<FaStar />}
                            fullIcon={<FaStar />}
                            classNames="flex"
                          />
                        </div>
                        <span className="text-base font-bold text-yellow-25 bg-yellow-25/10 px-2 py-0.5 rounded">
                          {review.rating.toFixed(1)}
                        </span>
                      </div>

                      {/* Full Review Text */}
                      <div className="flex-1 mb-4 overflow-y-auto relative z-10 pr-2 custom-scrollbar">
                        <p className="text-base leading-relaxed text-richblack-50 break-words overflow-wrap-anywhere font-medium">
                          {review.review}
                        </p>
                      </div>

                      {/* Course Badge */}
                      <div className="mb-3 relative z-10">
                        <div className="inline-flex items-center px-3 py-1.5 rounded-lg bg-richblack-700/50 border border-richblack-600">
                          <span className="text-xs font-medium text-richblack-300">
                            {review.course?.courseName}
                          </span>
                        </div>
                      </div>

                      {/* Divider */}
                      <div className="mb-3 border-t border-richblack-700/50 relative z-10"></div>

                      {/* User Info Section */}
                      <div className="flex items-center gap-3 relative z-10">
                        {/* Avatar with Glow Effect */}
                        <div className="relative h-12 w-12 flex-shrink-0">
                          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-25 to-yellow-50 blur-md opacity-30"></div>
                          <img
                            src={
                              review.user?.image ||
                              `https://api.dicebear.com/5.x/initials/svg?seed=${review.user?.firstName} ${review.user?.lastName}`
                            }
                            alt={`${review.user?.firstName} ${review.user?.lastName}`}
                            className="relative h-full w-full rounded-full border-2 border-richblack-600 object-cover shadow-lg ring-2 ring-yellow-25/10"
                          />
                        </div>

                        {/* User Details */}
                        <div className="flex-1 min-w-0">
                          <h3 className="truncate text-base font-bold text-richblack-5">
                            {`${review.user?.firstName} ${review.user?.lastName}`}
                          </h3>
                          <p className="truncate text-xs text-richblack-400 font-medium">
                            Verified Student
                          </p>
                        </div>
                      </div>

                      {/* Close / Read Less Button */}
                      <button
                        onClick={() => toggleCardFlip(reviewId)}
                        className="mt-4 w-full rounded-xl bg-richblack-700 px-4 py-2.5 text-center text-sm font-bold text-richblack-5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-25 focus:ring-offset-2 focus:ring-offset-richblack-800 flex items-center justify-center gap-2 relative z-10 border border-richblack-600"
                      >
                        <FaChevronLeft className="text-xs" />
                        Show Less
                      </button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}

export default ReviewSlider;
