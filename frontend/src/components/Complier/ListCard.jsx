import { useEffect, useState } from "react"
import { AiOutlineMenu, AiOutlineShoppingCart, AiOutlineClose, AiOutlineUser, AiOutlineLogout } from "react-icons/ai"
import { BsChevronDown } from "react-icons/bs"
import { useSelector, useDispatch } from "react-redux"
import { Link, matchPath, useLocation, useNavigate } from "react-router-dom"

import logo from "../../assets/Logo/Logo-Full-Light.png"
import { NavbarLinks } from "../../data/navbar-links"
import { apiConnector } from "../../services/apiconnector"
import { categories } from "../../services/apis"
import { ACCOUNT_TYPE } from "../../utils/constants"
import ProfileDropdown from "../core/Auth/ProfileDropDown"
// Import your logout action
import { logout } from "../../services/operations/authAPI" // Adjust path as needed

function Navbar() {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const { totalItems } = useSelector((state) => state.cart)
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [catalogOpen, setCatalogOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)

  const [subLinks, setSubLinks] = useState([])
  const [loading, setLoading] = useState(false)

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false)
    setCatalogOpen(false)
    setProfileOpen(false)
  }, [location.pathname])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [mobileMenuOpen])

  useEffect(() => {
    (async () => {
      setLoading(true)
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API)
        setSubLinks(res.data.data || [])
      } catch (error) {
        console.log("Could not fetch Categories.", error)
        setSubLinks([])
      }
      setLoading(false)
    })()
  }, [])

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname)
  }

  // Get dashboard link based on user role
  const getDashboardLink = () => {
    if (user?.accountType === ACCOUNT_TYPE.ADMIN) return "/dashboard/admin"
    if (user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) return "/dashboard/instructor"
    return "/dashboard/my-profile"
  }

  // Handle logout function
  const handleLogout = () => {
    setMobileMenuOpen(false) // Close the mobile menu
    // Call the actual logout function from your auth operations
    dispatch(logout(navigate))
  }

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 flex h-16 items-center justify-center border-b-[1px] border-b-black ${
        location.pathname !== "/" ? "bg-richblack-800" : "bg-richblack-900"
      } transition-all duration-200`}
    >
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="Logo" width={160} height={32} loading="lazy" className="max-h-8 w-auto" />
        </Link>
        
        {/* Navigation links - Desktop */}
        <nav className="hidden md:block">
          <ul className="flex gap-x-6 text-richblack-25">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <>
                    <div
                      className={`group relative flex cursor-pointer items-center gap-1 ${
                        matchRoute("/catalog/:catalogName")
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                    >
                      <p>{link.title}</p>
                      <BsChevronDown className="text-xs" />
                      <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                        <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
                        {loading ? (
                          <p className="text-center">Loading...</p>
                        ) : subLinks.length ? (
                          <>
                            {subLinks
                              .filter(subLink => subLink?.courses?.length > 0)
                              .map((subLink, i) => (
                                <Link
                                  to={`/catalog/${subLink.name
                                    .split(" ")
                                    .join("-")
                                    .toLowerCase()}`}
                                  className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                                  key={i}
                                >
                                  <p>{subLink.name}</p>
                                </Link>
                              ))}
                          </>
                        ) : (
                          <p className="text-center">No Courses Found</p>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link to={link?.path}>
                    <p
                      className={`${
                        matchRoute(link?.path)
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      } hover:text-yellow-25 transition-colors`}
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
        
        {/* Login / Signup / Dashboard - Desktop */}
        <div className="hidden items-center gap-x-4 md:flex">
          {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
            <Link to="/dashboard/cart" className="relative">
              <AiOutlineShoppingCart className="text-2xl text-richblack-25" />
              {totalItems > 0 && (
                <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-yellow-50 text-center text-xs font-bold text-black">
                  {totalItems}
                </span>
              )}
            </Link>
          )}
          {token === null && (
            <Link to="/login">
              <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 hover:bg-richblack-700 transition-colors">
                Log in
              </button>
            </Link>
          )}
          {token === null && (
            <Link to="/signup">
              <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 hover:bg-richblack-700 transition-colors">
                Sign up
              </button>
            </Link>
          )}
          {token !== null && <ProfileDropdown />}
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <AiOutlineClose fontSize={24} fill="#AFB2BF" />
          ) : (
            <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
          )}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-[60] md:hidden transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div 
          className={`fixed inset-0 bg-black transition-opacity duration-300 ${mobileMenuOpen ? 'bg-opacity-50' : 'bg-opacity-0'}`} 
          onClick={() => setMobileMenuOpen(false)} 
        />
        
        {/* Mobile Menu Drawer */}
        <div 
          className={`fixed right-0 top-0 h-full w-[80%] max-w-[350px] bg-richblack-800 shadow-lg transition-transform duration-300 ease-in-out ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          } overflow-hidden flex flex-col`}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-richblack-700 p-4 h-16">
            <Link to="/" onClick={() => setMobileMenuOpen(false)}>
              <img src={logo} alt="Logo" width={160} height={32} loading="lazy" className="max-h-8 w-auto" />
            </Link>
            <button 
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-full p-2 hover:bg-richblack-700 transition-colors"
              aria-label="Close menu"
            >
              <AiOutlineClose fontSize={24} fill="#AFB2BF" />
            </button>
          </div>

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto">
            {/* User Profile Section - Only shown when logged in */}
            {token !== null && user && (
              <div className="p-4 border-b border-richblack-700">
                <div className="flex items-center gap-3 mb-4">
                  {user.image ? (
                    <img 
                      src={user.image}
                      alt={user.firstName} 
                      className="w-10 h-10 rounded-full object-cover border-2 border-yellow-50"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-richblack-700 flex items-center justify-center text-yellow-50">
                      {user.firstName ? user.firstName[0].toUpperCase() : "U"}
                    </div>
                  )}
                  <div>
                    <p className="text-richblack-5 font-medium">
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="text-richblack-300 text-sm">{user.email}</p>
                  </div>
                </div>
                
                {/* User Action Buttons */}
                <div className="flex flex-col gap-2">
                  <Link 
                    to={getDashboardLink()} 
                    className="flex items-center gap-2 text-richblack-25 hover:text-yellow-25 transition-colors p-2 rounded-md hover:bg-richblack-700"
                  >
                    <AiOutlineUser /> 
                    Dashboard
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-richblack-25 hover:text-yellow-25 transition-colors p-2 rounded-md hover:bg-richblack-700 text-left w-full"
                  >
                    <AiOutlineLogout /> 
                    Logout
                  </button>
                </div>
              </div>
            )}

            {/* Main Navigation Links */}
            <nav className="p-4">
              <ul className="flex flex-col gap-1">
                {NavbarLinks.map((link, index) => (
                  <li key={index} className="border-b border-richblack-700 py-2">
                    {link.title === "Catalog" ? (
                      <div className="relative">
                        <button 
                          className="flex w-full items-center justify-between py-2 text-richblack-25 hover:text-yellow-25 transition-colors"
                          onClick={() => setCatalogOpen(!catalogOpen)}
                        >
                          <span>{link.title}</span>
                          <BsChevronDown className={`transition-transform duration-200 ${catalogOpen ? 'rotate-180' : ''}`} />
                        </button>
                        <div className={`overflow-hidden transition-all duration-200 ${catalogOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                          <div className="mt-2 pl-4">
                            {loading ? (
                              <p className="text-center text-richblack-25 py-2">Loading...</p>
                            ) : subLinks.length ? (
                              <>
                                {subLinks
                                  .filter(subLink => subLink?.courses?.length > 0)
                                  .map((subLink, i) => (
                                    <Link
                                      to={`/catalog/${subLink.name
                                        .split(" ")
                                        .join("-")
                                        .toLowerCase()}`}
                                      className="block py-3 text-richblack-25 hover:text-yellow-25 transition-colors"
                                      key={i}
                                    >
                                      {subLink.name}
                                    </Link>
                                  ))}
                              </>
                            ) : (
                              <p className="text-center text-richblack-25 py-2">No Courses Found</p>
                            )}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <Link 
                        to={link?.path}
                        className={`block py-2 ${
                          matchRoute(link?.path)
                            ? "text-yellow-25"
                            : "text-richblack-25 hover:text-yellow-25"
                        } transition-colors`}
                      >
                        {link.title}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Footer Actions */}
          <div className="border-t border-richblack-700 p-4 bg-richblack-900">
            <div className="flex flex-col gap-4">
              {/* Shopping Cart */}
              {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
                <Link to="/dashboard/cart" className="relative">
                  <div className="flex items-center gap-2 text-richblack-25 hover:text-yellow-25 transition-colors p-2 rounded-md hover:bg-richblack-700">
                    <AiOutlineShoppingCart className="text-2xl" />
                    <span>Cart</span>
                    {totalItems > 0 && (
                      <span className="absolute right-0 top-0 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-yellow-50 text-center text-xs font-bold text-black">
                        {totalItems}
                      </span>
                    )}
                  </div>
                </Link>
              )}
              
              {/* Login/Signup Buttons - Only shown when not logged in */}
              {token === null && (
                <>
                  <Link to="/login">
                    <button className="w-full rounded-md border border-richblack-700 bg-richblack-800 px-4 py-3 text-richblack-100 hover:bg-richblack-700 transition-colors">
                      Log in
                    </button>
                  </Link>
                  <Link to="/signup">
                    <button className="w-full rounded-md border border-richblack-700 bg-yellow-50 px-4 py-3 text-black font-medium hover:bg-yellow-100 transition-colors">
                      Sign up
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Push content down to account for fixed navbar */}
      <div className="h-16"></div>
    </div>
  )
}

export default Navbar