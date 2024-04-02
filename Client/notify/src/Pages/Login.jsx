import React, { useRef } from "react";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const nameRef = useRef("");
  const passwordRef = useRef("");

  const handleRLogin = async () => {
    const data = {
      name: nameRef.current.value,
      password: passwordRef.current.value,
    };
    const response = await axios.post("http://localhost:3001/api/login", data);
    if (response.status === 200) {
      localStorage.setItem("loggedin", true);
      navigate("/");
    }
  };

  return (
    <>
      <Header />
      <MDBContainer fluid className="p-3 my-5 h-custom">
        <MDBRow>
          <MDBCol col="10" md="6">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              class="img-fluid"
              alt="Sample image"
            />
          </MDBCol>

          <MDBCol col="4" md="6">
            <div className="divider d-flex align-items-center my-4">
              <h4>Login</h4>
            </div>

            <MDBInput
              wrapperClass="mb-4"
              label="Username"
              id="formControlLg"
              type="text"
              size="lg"
              ref={nameRef}
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Password"
              id="formControlLg"
              type="password"
              size="lg "
              ref={passwordRef}
            />

            <div className="d-flex justify-content-between mb-4">
              <MDBCheckbox
                name="flexCheck"
                value=""
                id="flexCheckDefault"
                label="Remember me"
              />
              <a href="!#">Forgot password?</a>
            </div>

            <div className="text-center text-md-start mt-4 pt-2">
              <MDBBtn className="mb-0 px-5" size="lg" onClick={handleRLogin}>
                Login
              </MDBBtn>
              <p className="small fw-bold mt-2 pt-1 mb-2">
                Don't have an account?{" "}
                <a href="/register" className="link-danger">
                  Register
                </a>
              </p>
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>

      <Footer />
    </>
  );
};

export default Login;
