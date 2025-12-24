import Container from "../Container";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import logo from "../../../assets/images/logo.png";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";
import { AiOutlineBars } from "react-icons/ai";

const Navbar = () => {
  const { user, loading, setUser, logOut } = useAuth();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleTheme = (checked) => {
    setTheme(checked ? "dark" : "light");
  };

  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.success("Logout Successfully!!");
        setUser(null);
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };

  const links = (
    <>
      <li>
        <NavLink to="/" className="nav-link-item">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/all-loans" className="nav-link-item">
          All Loans
        </NavLink>
      </li>
      {!user && (
        <>
          <li>
            <NavLink to="/about-us" className="nav-link-item">
              About Us
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className="nav-link-item">
              Contact
            </NavLink>
          </li>
        </>
      )}
      {user && (
        <li>
          <NavLink to="/dashboard" className="nav-link-item">
            Dashboard
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <div className="fixed w-full bg-base-100 z-10 shadow-sm">
      <div className="py-4">
        <Container>
          <div className="navbar">
            <div className="navbar-start flex items-center gap-2">
              <div className="dropdown">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost lg:hidden"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    {" "}
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h8m-8 6h16"
                    />{" "}
                  </svg>
                </div>
                <ul
                  tabIndex="-1"
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                >
                  {links}
                </ul>
              </div>

              {/* Logo */}
              <Link to="/">
                <div className="flex justify-center items-center gap-2">
                  <img className="w-[70px] h-[70px]" src={logo} alt="logo" />
                  <span className="font-bold text-2xl text-pink-600">
                    LoanLink
                  </span>
                </div>
              </Link>
            </div>

            {/* Links + Theme Toggle + User */}
            <div className="navbar-end flex gap-2 items-center">
              <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">{links}</ul>
              </div>

              {/* Theme Toggle */}
              <input
                onChange={(e) => handleTheme(e.target.checked)}
                type="checkbox"
                defaultChecked={theme === "dark"}
                className="toggle"
              />

              {/* User Section */}
              {loading ? (
                <div>Loading...</div>
              ) : user ? (
                <div className="flex gap-3 items-center">
                  <img
                    src={user?.photoURL || "http://www.profile.pic.com"}
                    alt={user?.displayName || "User"}
                    referrerPolicy="no-referrer"
                    className="rounded-full h-12 w-12 cursor-pointer border-2 border-purple-500"
                  />
                  <button onClick={handleLogOut} className="btn btn-gradient">
                    Log Out
                  </button>
                </div>
              ) : (
                <div className="flex gap-4">
                  <Link to="/login" className="btn btn-gradient">
                    Login
                  </Link>
                  <Link to="/signup" className="btn btn-gradient">
                    SignUp
                  </Link>
                </div>
              )}
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
