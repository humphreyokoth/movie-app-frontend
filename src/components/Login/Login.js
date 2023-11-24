import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { login, clearState, userSelector } from "../../reducers/userSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.scss"

const Login = () => {
  const dispatch = useDispatch();
  const { errors, handleSubmit } = useForm();
  const { isFetching, isSuccess, isError, errorMessage } =
    useSelector(userSelector);
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }
    if (isError) {
      toast.error(errorMessage);
      dispatch(clearState());
    }
  }, [isSuccess, isError, navigate, dispatch]);
  const onSubmit = (data) => {
    dispatch(login(data));
  };
  return (
    <Fragment>
      <div className="min-vh-100 d-flex justify-content-center align-items-center bg-light">
        <div className="col-12 col-md-8 col-lg-6">
          <h2 className="text-center mb-4">Movie library login</h2>
          <div className="bg-white p-4 shadow rounded">
            <form
              className="space-y-4"
              onSubmit={handleSubmit(onSubmit)}
              method="POST"
            >
              <div>
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="form-control"
                />
              </div>
              <div>
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="form-control"
                />
              </div>

              <div className="mb-3">
                <button
                  type="submit"
                  className="w-100 btn btn-primary"
                  disabled={isFetching}
                >
                  {isFetching && (
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                  )}
                  Login
                </button>
              </div>
            </form>
            <div className="mt-3 text-center">
              <span className="bg-light text-secondary px-2">
                Don't have an account <Link to="/register">Register</Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
