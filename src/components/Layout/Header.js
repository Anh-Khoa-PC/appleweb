/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { AiOutlineShoppingCart, AiOutlineUser  } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useCartContext } from "../../context/cartContext";
import { handleLogout } from "../../services/function";
import { BiLogOut } from "react-icons/bi";
import { NAV_LINK, RIGHTS } from "../../data";

const Header = () => {
  const navigate = useNavigate();
  const { products } = useCartContext();
  const [loggedUser , setLoggedUser ] = useState(null);

  // Lấy dữ liệu người dùng từ localStorage khi component mount
  useEffect(() => {
    const userData = localStorage.getItem("user-e-commerce");
    if (userData) {
      try {
        const parsedData = JSON.parse(userData);
        setLoggedUser (parsedData?.user || null);
      } catch (err) {
        console.error("Error parsing user data:", err);
      }
    }
  }, []);

  // Xử lý đăng xuất
  const handleLogoutClick = () => {
    handleLogout(navigate);
    setLoggedUser (null); // Cập nhật state sau khi đăng xuất
  };

  return (
    <header className="header bg-white">
      <div className="container px-lg-3 py-0">
        <nav className="navbar navbar-expand-lg navbar-light py-3 px-lg-0">
          <Link className="navbar-brand" to="/">
            <span className="fw-bold text-uppercase text-dark">
              {RIGHTS.companyName}
            </span>
          </Link>
          <button
            className="navbar-toggler navbar-toggler-end"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto">
              {NAV_LINK.map((nav, index) => (
                <li className="nav-item" key={index}>
                  <Link className="nav-link" to={"/" + nav.uri}>
                    {nav.name}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link d-flex align-items-center" to="/cart">
                  <AiOutlineShoppingCart style={{ marginRight: "5px" }} />
                  <span> Cart</span>
                  <small className="text-gray fw-normal">
                    ({products.length === 0 ? 0 : products.length})
                  </small>
                </Link>
              </li>
              {loggedUser  ? (
                <>
                  <li className="nav-item">
                    <Link
                      className="nav-link d-flex align-items-center"
                      to="/profile"
                    >
                      <AiOutlineUser  style={{ marginRight: "5px" }} />
                      <span>{loggedUser .name || "Guest"}</span>
                    </Link>
                  </li>
                  <li className="nav-item" onClick={handleLogoutClick}>
                    <p
                      className="nav-link d-flex align-items-center"
                      style={{ cursor: "pointer" }}
                    >
                      <BiLogOut color="#757575" style={{ marginRight: "5px" }} />
                      Logout
                    </p>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    <AiOutlineUser  />
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;