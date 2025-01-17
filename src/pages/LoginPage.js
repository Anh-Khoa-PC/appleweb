/* eslint-disable eqeqeq */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { showErrorToast, showSuccessToast } from "../services/toast";
import axios from "axios";
import { API } from "../ENV_KEY";

const LoginPage = () => {
  const navigate = useNavigate();

  const [dataLogin, setDataLogin] = useState({
    email: "",
    password: "",
  });

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API}/users/login`, dataLogin);
      console.log(res);
      if (res.status == 200) {
        showSuccessToast("Đăng Nhập thành công !!!");
        setDataLogin({
          email: "",
          password: "",
        });

        console.log(res?.data?.user?.role);

        // Lưu thông tin người dùng vào localStorage
        localStorage.setItem("user-e-commerce", JSON.stringify(res.data));

        // Kiểm tra tài khoản và mật khẩu Admin
        if (dataLogin.email === "admin@example.com" && dataLogin.password === "admin123") {
          // Nếu là Admin, chuyển hướng đến trang Admin
          navigate("/admin");
        } else {
          // Nếu là người dùng thông thường, chuyển hướng đến trang chủ
          navigate("/");
        }
      } else {
        console.log("lỗi");
      }
    } catch (error) {
      showErrorToast(error.response.data.msg);
    }
  };

  return (
    <div className="half">
      <div
        className="bg order-1 order-md-2"
        style={{
          backgroundImage:
            "url('https://www.apple.com/v/home/by/images/heroes/lny-2025/hero_lny25_gifting__fypofecxk4qe_largetall.png')",
        }}
      ></div>
      <div className="contents order-2 order-md-1">
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-md-6">
              <div className="form-block">
                <div className="text-center mb-5">
                  <h3>
                    Login to <strong>Apple Store</strong>
                  </h3>
                  <p className="mb-4">
                    Lorem ipsum dolor sit amet elit. Sapiente sit aut eos
                    consectetur adipisicing.
                  </p>
                </div>
                <form onSubmit={handleSubmitLogin}>
                  <div className="form-group first">
                    <label htmlFor="username">Username</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Your-email@gmail.com"
                      id="username"
                      value={dataLogin.email}
                      onChange={(e) =>
                        setDataLogin({ ...dataLogin, email: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-group last mb-3">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Your Password"
                      id="password"
                      value={dataLogin.password}
                      onChange={(e) =>
                        setDataLogin({ ...dataLogin, password: e.target.value })
                      }
                    />
                  </div>

                  <div className="d-sm-flex mb-5 align-items-center">
                    <label className="control control--checkbox mb-3 mb-sm-0">
                      <Link to="/register" className="forgot-pass">
                        Create a new account
                      </Link>
                    </label>
                  </div>

                  <input
                    type="submit"
                    value="Log In"
                    className="btn btn-block btn-dark"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;