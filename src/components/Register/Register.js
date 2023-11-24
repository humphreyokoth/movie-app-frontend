import React, { Fragment, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
// import 'bootstrap/dist/css/bootstrap.min.css';
import {
  registerUser,
  clearState,
  userSelector,
} from "../../reducers/userSlice";

const Register = () => {
  const dispatch = useDispatch();
  const { register, errors, handleSubmit } = useForm();
  const navigate = useNavigate();
  const { isFetching, isSuccess, isError, errorMessage } =
    useSelector(userSelector);

  const onSubmit = (data) => {
    dispatch(registerUser(data));
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(clearState());

      navigate("/");
    }
    if (isError) {
      toast.error(errorMessage);
      dispatch(clearState());
    }
  }, [isSuccess, isError, navigate, dispatch]);

  return (
    <Fragment>
      <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
        <div className="col-sm-12 col-md-6 col-lg-4">
          <h2 className="text-center mb-4">Register</h2>
          <div className="bg-white p-4 shadow rounded">
            <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="form-control"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
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

              <div className="mb-3">
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
                  className="btn btn-primary w-100 d-flex align-items-center justify-content-center"
                  disabled={isFetching}
                >
                  {isFetching ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Registering
                    </>
                  ) : (
                    <>Register</>
                  )}
                </button>
              </div>
            </form>
            <div className="text-center">
              <span className="px-2 bg-white text-gray-500">
                Have an account <Link to="login">Login</Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Register;
