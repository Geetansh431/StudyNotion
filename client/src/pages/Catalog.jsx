import React, { useEffect, useState } from 'react'
import Footer from '../components/common/Footer'
import { apiConnector } from '../services/apiconnector';
import { courseEndpoints } from '../services/apis';
import Course_Card from '../components/core/Catalog/Course_Card';
import { useSelector } from "react-redux"
import { HiSparkles, HiAcademicCap } from "react-icons/hi"
import { IoFilter } from "react-icons/io5"

const Catalog = () => {
  const { loading } = useSelector((state) => state.profile)
  const [allCourses, setAllCourses] = useState([]);
  const [sortBy, setSortBy] = useState("latest");
  const [priceFilter, setPriceFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  // Fetch all courses
  useEffect(() => {
    const getAllCourses = async() => {
      try {
        setIsLoading(true);
        const res = await apiConnector("GET", courseEndpoints.GET_ALL_COURSE_API);
        console.log("Courses response:", res);
        const coursesData = res?.data?.data || [];
        
        setAllCourses(coursesData);
        setIsLoading(false);
      }
      catch(error) {
        console.log("Error fetching courses:", error);
        setIsLoading(false);
      }
    }
    
    getAllCourses();
  }, []);


  // Filter and sort courses
  const getFilteredAndSortedCourses = () => {
    let filtered = [...allCourses];

    // Price filter
    if (priceFilter === "free") {
      filtered = filtered.filter(course => course.price === 0);
    } else if (priceFilter === "paid") {
      filtered = filtered.filter(course => course.price > 0);
    }

    // Sort
    if (sortBy === "priceLow") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === "priceHigh") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === "popular") {
      filtered.sort((a, b) => (b.studentsEnrolled?.length || 0) - (a.studentsEnrolled?.length || 0));
    }

    return filtered;
  };

  const displayedCourses = getFilteredAndSortedCourses();

  if (loading || isLoading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center bg-richblack-900">
        <div className="flex flex-col items-center gap-4">
          <div className="spinner"></div>
          <p className="text-richblack-200 animate-pulse">Loading amazing courses...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Hero Header with Gradient */}
      <div className="relative bg-gradient-to-br from-richblack-900 via-richblack-800 to-richblack-900 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-yellow-50/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative mx-auto w-11/12 max-w-maxContent py-16">
          <div className="flex items-center gap-3 mb-4 animate-fadeIn">
            <HiAcademicCap className="text-yellow-50 text-4xl" />
            <div className="h-1 w-20 bg-gradient-to-r from-yellow-50 to-transparent rounded-full"></div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-richblack-5 mb-4 animate-slideUp">
            Explore Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-50 via-yellow-25 to-yellow-100">Courses</span>
          </h1>
          
          <p className="text-richblack-200 text-lg max-w-2xl animate-slideUp animation-delay-200">
            Discover world-class courses and start learning today
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-richblack-900 min-h-screen">
        <div className="mx-auto w-11/12 max-w-maxContent py-12">
          {/* Filters & Sort Bar */}
          <div className="mb-8 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center animate-fadeIn">
            {/* Left: Course Count & Filter */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex items-center gap-2">
                <HiSparkles className="text-yellow-50 text-xl" />
                <p className="text-richblack-5 font-semibold text-lg">
                  {displayedCourses.length} {displayedCourses.length === 1 ? 'Course' : 'Courses'}
                </p>
              </div>

              {/* Quick Filters */}
              <div className="flex gap-2">
                <button
                  onClick={() => setPriceFilter("all")}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    priceFilter === "all"
                      ? "bg-yellow-50 text-richblack-900 shadow-lg shadow-yellow-50/20"
                      : "bg-richblack-800 text-richblack-100 hover:bg-richblack-700"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setPriceFilter("free")}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    priceFilter === "free"
                      ? "bg-yellow-50 text-richblack-900 shadow-lg shadow-yellow-50/20"
                      : "bg-richblack-800 text-richblack-100 hover:bg-richblack-700"
                  }`}
                >
                  Free
                </button>
                <button
                  onClick={() => setPriceFilter("paid")}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    priceFilter === "paid"
                      ? "bg-yellow-50 text-richblack-900 shadow-lg shadow-yellow-50/20"
                      : "bg-richblack-800 text-richblack-100 hover:bg-richblack-700"
                  }`}
                >
                  Paid
                </button>
              </div>
            </div>

            {/* Right: Sort Dropdown */}
            <div className="flex items-center gap-2">
              <IoFilter className="text-richblack-300" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-richblack-800 text-richblack-5 px-4 py-2 rounded-lg border border-richblack-700 focus:border-yellow-50 focus:outline-none transition-all cursor-pointer hover:bg-richblack-700"
              >
                <option value="latest">Latest First</option>
                <option value="priceLow">Price: Low to High</option>
                <option value="priceHigh">Price: High to Low</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>
          </div>

          {/* Courses Grid */}
          {displayedCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedCourses.map((course, index) => (
                <div
                  key={course._id || index}
                  className="animate-fadeInUp"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <Course_Card 
                    course={course} 
                    Height={"h-[300px]"} 
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 animate-fadeIn">
              <div className="flex flex-col items-center gap-4">
                <div className="w-32 h-32 rounded-full bg-richblack-800 flex items-center justify-center">
                  <HiAcademicCap className="text-6xl text-richblack-600" />
                </div>
                <p className="text-richblack-100 text-2xl font-semibold">
                  No courses found
                </p>
                <p className="text-richblack-300">
                  Try adjusting your filters to see more courses
                </p>
                <button
                  onClick={() => {
                    setPriceFilter("all");
                    setSortBy("latest");
                  }}
                  className="mt-4 px-6 py-3 bg-yellow-50 text-richblack-900 rounded-lg font-semibold hover:scale-105 transition-transform"
                >
                  Reset Filters
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />

      {/* Add Custom Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.8s ease-out;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
          animation-fill-mode: both;
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out;
          animation-fill-mode: both;
        }
      `}</style>
    </>
  )
}

export default Catalog