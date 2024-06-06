import React, { useState } from "react";
import logo from "../../assets/static/logo.svg";
import { Form, Link, redirect } from "react-router-dom";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import bg from "../../assets/static/city-lights-reflected-in-the-water-at-night.jpg";
import customFetch from "../../utils/customFetch";
import { toast } from "react-toastify";
import { splitErrors } from "../../utils/showError";

// Action starts ------
export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    const response = await customFetch.post(`/auth/login`, data);

    let path = "";
    switch (response?.data?.data?.role_id) {
      case 1:
        path = `/admin/dashboard`;
        break;
      case 2:
        path = `/seller/dashboard`;
        break;
      case 3:
        path = `/buyer/dashboard`;
        break;
    }
    toast.success(`Login success`);
    return redirect(path);
  } catch (error) {
    splitErrors(error?.response?.data?.msg);
    return error;
  }
};

// Main component starts ------
const Login = () => {
  document.title = `Login | ${import.meta.env.VITE_ADMIN_TITLE}`;

  const [form, setForm] = useState({
    username: "souvik@test.com",
    password: "welcome123",
  });
  const [isVisible, setIsVisible] = useState("password");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="d-flex flex-column bg-white">
      <div className="row g-0 flex-fill">
        <div className="col-12 col-lg-6 col-xl-4 border-top-wide border-primary d-flex flex-column justify-content-center">
          <div className="container container-tight my-5 px-lg-5">
            <div className="text-center mb-4">
              <Link to="#" className="navbar-brand navbar-brand-autodark">
                <img src={logo} height="36" alt="" />
              </Link>
            </div>
            <h2 className="h3 text-center mb-3">Login to your account</h2>
            <Form method="post" autoComplete="off">
              <div className="mb-3">
                <label className="form-label">Email address</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="your@email.com"
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-2">
                <label className="form-label">
                  Password
                  <span className="form-label-description">
                    <Link to="#">I forgot password</Link>
                  </span>
                </label>
                <div className="input-group input-group-flat">
                  <input
                    type={isVisible}
                    className="form-control"
                    placeholder="Your password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                  />
                  <span className="input-group-text">
                    <MdOutlineRemoveRedEye
                      className="link-secondary cursor-pointer"
                      size={18}
                      title={`Show password`}
                      onClick={() =>
                        setIsVisible(
                          isVisible === "password" ? "text" : "password"
                        )
                      }
                    />
                  </span>
                </div>
              </div>
              <div className="form-footer">
                <button type="submit" className="btn btn-primary w-100">
                  Sign in
                </button>
              </div>
            </Form>
          </div>
        </div>
        <div className="col-12 col-lg-6 col-xl-8 d-none d-lg-block">
          {/* <!-- Photo --> */}
          <img className="bg-cover h-100 min-vh-100" src={bg} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Login;
