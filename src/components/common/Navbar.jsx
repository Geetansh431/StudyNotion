import { useEffect, useState } from "react"
import { AiOutlineMenu, AiOutlineShoppingCart, AiOutlineClose } from "react-icons/ai"
import { BsChevronDown } from "react-icons/bs"
import { useSelector } from "react-redux"
import { Link, matchPath, useLocation } from "react-router-dom"

import logo from "../../assets/Logo/Logo-Full-Light.png"
import { NavbarLinks } from "../../data/navbar-links"
import { apiConnector } from "../../services/apiconnector"
import { categories } from "../../services/apis"
import { ACCOUNT_TYPE } from "../../utils/constants"
import ProfileDropdown from "../core/Auth/ProfileDropDown"

function Navbar() {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const { totalItems } = useSelector((state) => state.cart)
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [catalogOpen, setCatalogOpen] = useState(false)

  const [subLinks, setSubLinks] = useState([])
  const [loading, setLoading] = useState(false)

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

  // Close mobile menu when location changes
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location])

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname)
  }

  return (
    <div
      className={`flex h-14 items-center justify-center border-b-[1px] border-b-black ${location.pathname !== "/" ? "bg-richblack-800" : ""
        } transition-all duration-200`}
    >
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="Logo" width={160} height={32} loading="lazy" />
        </Link>
        {/* Navigation links */}
        <nav className="hidden md:block">
          <ul className="flex gap-x-6 text-black">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <>
                    <div
                      className={`group relative flex cursor-pointer items-center gap-1 ${matchRoute("/catalog/:catalogName")
                          ? "text-yellow-25"
                          : "text-richblack-25"
                        }`}
                    >
                      <p>{link.title}</p>
                      <BsChevronDown />
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
                      className={`${matchRoute(link?.path)
                          ? "text-yellow-25"
                          : "text-richblack-25"
                        }`}
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
        {/* Login / Signup / Dashboard */}
        <div className="hidden items-center gap-x-4 md:flex">
          {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
            <Link to="/dashboard/cart" className="relative">
              <AiOutlineShoppingCart className="text-2xl text-black" />
              {totalItems > 0 && (
                <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-black">
                  {totalItems}
                </span>
              )}
            </Link>
          )}
          {token === null && (
            <Link to="/login">
              <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                Log in
              </button>
            </Link>
          )}
          {token === null && (
            <Link to="/signup">
              <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                Sign up
              </button>
            </Link>
          )}
          {token !== null && <ProfileDropdown />}
        </div>
        <button
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <AiOutlineClose fontSize={24} fill="#AFB2BF" />
          ) : (
            <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
          )}
        </button>
      </div>

      {/* Mobile Menu - Fixed Position */}
      <div className={`fixed inset-0 z-50 md:hidden transition-all duration-300 ${mobileMenuOpen ? 'visible' : 'invisible'}`}>
        <div
          className={`fixed inset-0 bg-black transition-opacity duration-300 ${mobileMenuOpen ? 'bg-opacity-50 opacity-100' : 'bg-opacity-0 opacity-0'}`}
          onClick={() => setMobileMenuOpen(false)}
        />
        <div
          className={`fixed right-0 top-0 h-full w-[300px] bg-richblack-800 shadow-lg transition-transform duration-300 ease-in-out overflow-hidden ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
        >
          <div className="flex h-full flex-col">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-richblack-700 p-4">
              <Link to="/" onClick={() => setMobileMenuOpen(false)}>
                <img src={logo} alt="Logo" width={120} height={24} loading="lazy" />
              </Link>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-full p-2 hover:bg-richblack-700 transition-colors"
              >
                <AiOutlineClose fontSize={24} fill="#AFB2BF" />
              </button>
            </div>

            {/* Navigation */}
            <div className="flex-1 overflow-y-auto p-4">
              <nav className="flex flex-col gap-2">
                {NavbarLinks.map((link, index) => (
                  <div key={index} className="border-b border-richblack-700 pb-2">
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
                              <p className="text-center text-richblack-25">Loading...</p>
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
                                      className="block py-2 text-richblack-25 hover:text-yellow-25 transition-colors"
                                      key={i}
                                      onClick={() => {
                                        setMobileMenuOpen(false)
                                        setCatalogOpen(false)
                                      }}
                                    >
                                      {subLink.name}
                                    </Link>
                                  ))}
                              </>
                            ) : (
                              <p className="text-center text-richblack-25">No Courses Found</p>
                            )}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <Link
                        to={link?.path}
                        className={`block py-2 ${matchRoute(link?.path)
                            ? "text-yellow-25"
                            : "text-richblack-25 hover:text-yellow-25"
                          } transition-colors`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {link.title}
                      </Link>
                    )}
                  </div>
                ))}
              </nav>

              {/* Dashboard Link for Mobile (if logged in) */}
              {token !== null && (
                <Link
                  to="/dashboard/my-profile"
                  className="mt-4 block py-2 text-richblack-25 hover:text-yellow-25 transition-colors border-b border-richblack-700 pb-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-richblack-700 p-4">
              <div className="flex flex-col gap-4">
                {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
                  <Link to="/dashboard/cart" className="relative" onClick={() => setMobileMenuOpen(false)}>
                    <div className="flex items-center gap-2 text-richblack-25 hover:text-yellow-25 transition-colors">
                      <AiOutlineShoppingCart className="text-2xl" />
                      <span>Cart</span>
                      {totalItems > 0 && (
                        <span className="absolute -right-2 -top-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-black">
                          {totalItems}
                        </span>
                      )}
                    </div>
                  </Link>
                )}
                {token === null ? (
                  <>
                    <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                      <button className="w-full rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 hover:bg-richblack-700 transition-colors">
                        Log in
                      </button>
                    </Link>
                    <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                      <button className="w-full rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 hover:bg-richblack-700 transition-colors">
                        Sign up
                      </button>
                    </Link>
                  </>
                ) : (
                  <div className="w-full">
                    {/* Make ProfileDropdown accessible in mobile view */}
                    <div className="w-full">
                      <ProfileDropdown isMobile={true} closeMenu={() => setMobileMenuOpen(false)} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar