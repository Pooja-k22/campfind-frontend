import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons/faAngleDown";
import { userProfileContex } from "../../context/ContextShare";
import { serverUrl } from "../../services/serverUrl";

function Header() {
  // const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();

  // context
  const { userProfile } = useContext(userProfileContex);
  // user detail store
  const [userD, setuserD] = useState({
    username: "",
    profile: "",
  });

  console.log(userD);

  // dropdown menu
  const [dropdownmenu, setDropDownMenu] = useState(false);
  // mabile view
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // token
  const [token, setToken] = useState("");

  // logout
  const logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("existingUser");
    navigate("/");
  };

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem("token");
      setToken(token);
      const user = JSON.parse(sessionStorage.getItem("existingUser"));
      setuserD({ username: user.username, profile: user.profile });
    }
  }, [userProfile]);

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-10 bg-[#d1dda6] px-3 md:px-6 py-1 ">
        <div className="flex justify-between items-center">
          {/* Left: Logo */}
          <Link to={"/"}>
            <div className="flex flex-col justify-center  items-center ">
              <img src="/images/logo1.png" alt="" className="w-15" />
              <h1 className="text-green-900  text-2xl font-bold">CAMPFIND</h1>
            </div>
          </Link>

          {/* Center: Nav links (desktop only) */}
          <nav className="hidden md:flex space-x-9 text-sm font-semibold">
            <Link to={"/"}>
              <p className="hover:text-green-600">Home</p>
            </Link>
            <Link to={"/explore"}>
              <p className="hover:text-green-600">Camp Spots</p>
            </Link>
            <Link to={"/about"}>
              <p className="hover:text-green-600">About</p>
            </Link>
             <Link to={"/blog"}>
              <p className="hover:text-green-600">Blog</p>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
         { token ? <div className="md:hidden flex justify-center items-center gap-3">
            {/* when login */}
            <div className=" ">
              <div
                onClick={() => setDropDownMenu(!dropdownmenu)}
                className="relative flex gap-3 items-center justify-center  rounded-full  cursor-pointer"
              >
                <img
                  src={
                    !userD.profile
                      ? "https://cdn-icons-png.flaticon.com/512/219/219988.png"
                      : `${serverUrl}/upload/${userD.profile}`
                  }
                  alt="Profile"
                  className="w-9 h-9 rounded-full object-cover border"
                />

                {/* Dropdown */}
                {dropdownmenu && (
                  <div className="absolute top-full mt-2 right-0 w-48 bg-white shadow-lg border border-gray-200 rounded-md  p-3">
                    <Link
                      to="/user-profile"
                      className="block px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      Profile
                    </Link>

                    <Link
                      to="/spot-adding"
                      className="block px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      Become A Host
                    </Link>
                    <button onClick={logout} className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100">
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>

            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <FontAwesomeIcon
                icon={faBars}
                className="text-2xl mt-1 text-gray-700"
              />
            </button>
          </div>:
          <div className=" md:hidden">
                <Link to="/login">
                  <p className="text-sm font-medium text-white bg-orange-600 rounded-full py-2 px-3 hover:border hover:border-orange-600 hover:text-orange-600 hover:bg-white">
                    Login
                  </p>
                </Link>
              </div>
          }

          {/* right side */}
          <div className="hidden md:flex gap-4 items-center">
            {/* before login */}
            {!token ? (
              <div className="px-7">
                <Link to="/login">
                  <p className="text-sm font-medium text-white bg-orange-600 rounded-2xl py-2 px-3 hover:border hover:border-orange-600 hover:text-orange-600 hover:bg-white">
                    Login
                  </p>
                </Link>
              </div>
            ) : (
              <div className=" flex items-center gap-3">
                {/* when login */}
                <Link to={"/host-dashboard"}>
                  <p className="text-lg font-medium text-gray-700 hover:text-orange-700   px-3 ">
                    Become A Host
                  </p>
                </Link>{" "}
                <div
                  onClick={() => setDropDownMenu(!dropdownmenu)}
                  className="relative flex gap-3 items-center justify-center border border-gray-200 rounded-full px-3 py-2 cursor-pointer"
                >
                  <FontAwesomeIcon icon={faAngleDown} className="me-3" />
                  <img
                    src={
                      !userD.profile 
                        ? "https://cdn-icons-png.flaticon.com/512/219/219988.png"
                        : `${serverUrl}/upload/${userD.profile}`
                    }
                    alt="Profile"
                    className="w-9 h-9 rounded-full object-cover border"
                  />

                  {/* Dropdown */}
                  {dropdownmenu && (
                    <div className="absolute top-full mt-2 right-0 w-48 bg-white shadow-lg border border-gray-200 rounded-md  p-3">
                      <Link
                        to="/user-profile"
                        className="block px-4 py-2 text-sm hover:bg-gray-100"
                      >
                        Profile
                      </Link>

                      <Link
                        to="/host-dashboard"
                        className="block px-4 py-2 text-sm hover:bg-gray-100"
                      >
                        Become A Host
                      </Link>
                      <button
                        type="button"
                        onClick={logout}
                        className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Menu Button */}
      <div className="md:hidden mt-9">
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <FontAwesomeIcon icon={faBars} className="text-2xl text-gray-700" />
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-[#d1dda6]  shadow rounded p-4 space-y-4">
          <Link to="/" className="block text-gray-700">
            Home
          </Link>
          <Link to="/explore" className="block text-gray-700">
            Camp Spots
          </Link>
          <Link to="/about" className="block text-gray-700">
            About
          </Link>
           <Link to={"/blog"}>
              <p className="hover:text-green-600">Blog</p>
            </Link>

          <hr className="my-2" />
          <Link to="/login" className="block text-orange-600 font-medium">
            Login
          </Link>
        </div>
      )}
    </>
  );
}

export default Header;
