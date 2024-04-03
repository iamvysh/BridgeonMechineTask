import React, { useRef, useState } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
  MDBInput,
  MDBTextArea,
  MDBDropdown,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBDropdownItem,
} from "mdb-react-ui-kit";
import { Box } from "@mui/material";
import axios from "axios";

const AddTask = () => {
  const isLoggedIn = localStorage.getItem("loggedin");
  const [bgclor, setbgcolor] = useState(null);
  const titleRef = useRef("");
  const descriptionRef = useRef("");

  const handleSubmit = async () => {
    try {
      const data = {
        title: titleRef.current.value,
        description: descriptionRef.current.value,
        color: bgclor,
      };
      console.log(data);

      if(data.title.length==0&&data.description.length==0){
        return alert ("fields are empty ,please add something")
      }

      const response = await axios.post(
        "http://localhost:3001/api/addnote",
        data
      );
      console.log(response);
      if (response.status === 201) {
        return alert("success");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Box
        width={"100%"}
        height={"85vh"}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <MDBCard alignment="center" style={{ backgroundColor: `${bgclor}` }}>
          <h3>Add Note</h3>
          <MDBCardBody>
            <MDBInput
              label="Title"
              id="form1"
              type="text"
              className="mb-5"
              ref={titleRef}
            />
            <textArea
              label="description"
              style={{ width: "100%" }}
              rows={5}
              className="mb-4"
              ref={descriptionRef}
            />
            <MDBBtn onClick={handleSubmit} disabled={!isLoggedIn}>
              Add
            </MDBBtn>

            <MDBDropdown group className="shadow-0">
              <MDBDropdownToggle color="light">Color</MDBDropdownToggle>
              <MDBDropdownMenu>
                <MDBDropdownItem link onClick={() => setbgcolor("green")}>
                  green
                </MDBDropdownItem>
                <MDBDropdownItem link onClick={() => setbgcolor("red")}>
                  red
                </MDBDropdownItem>
                <MDBDropdownItem link onClick={() => setbgcolor("orange")}>
                  orange
                </MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>
          </MDBCardBody>
        </MDBCard>
      </Box>
    </>
  );
};

export default AddTask;
