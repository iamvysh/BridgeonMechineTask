import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBBtn,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <>
      <MDBNavbar light bgColor="light">
        <MDBContainer
          fluid
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <MDBNavbarBrand tag="span" className="mb-0 h1">
            NOTIFY
          </MDBNavbarBrand>
          <MDBBtn onClick={() => navigate("/login")}>LOGIN</MDBBtn>
        </MDBContainer>
      </MDBNavbar>
    </>
  );
};

export default Header;
