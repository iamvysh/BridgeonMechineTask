import { Box } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBInput,
  MDBTextArea,
  MDBDropdown,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBDropdownItem,
} from "mdb-react-ui-kit";
import axios from "axios";

const AllTask = () => {
  const isLoggedIn = localStorage.getItem("loggedin");

  const [task, setTask] = useState(null);
  const [basicModal, setBasicModal] = useState(false);
  const [bgclor, setbgcolor] = useState(null);
  const [edit, setEdit] = useState(null);
  const toggleOpen = (id) => {
    setBasicModal(!basicModal);
    setEdit(id);
  };

  const titleRef = useRef("");
  const descriptionRef = useRef("");

  const FetchAlltasks = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/allnotes");
      if (response && response.status === 200) {
        setTask(response.data.data);
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/api/deletenote/${id}`
      );
      FetchAlltasks();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (id) => {
    try {
      const data = {
        title: titleRef.current.value,
        description: descriptionRef.current.value,
        color: bgclor,
      };
      const response = await axios.put(
        `http://localhost:3001/api/updatenote/${id}`,
        data
      );
      await toggleOpen();
      FetchAlltasks();

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    FetchAlltasks();
  }, []);

  console.log("tasks", task);

  return (
    <>
      <Box
        height={"100vh"}
        overflow={scroll}
        sx={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}
      >
        {task?.map((item) => (
          <>
            <MDBCard
              style={{
                width: "15rem",
                height: "15rem",
                backgroundColor: `${item.color}`,
              }}
            >
              <MDBCardBody
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <MDBCardTitle>{item.title}</MDBCardTitle>
                <MDBCardText>{item.description}</MDBCardText>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <MDBBtn
                    className="mx-1"
                    onClick={() => handleDelete(item._id)}
                  >
                    delete
                  </MDBBtn>
                  <MDBBtn
                    disabled={!isLoggedIn}
                    onClick={() => toggleOpen(item._id)}
                  >
                    Edit
                  </MDBBtn>
                </div>
              </MDBCardBody>
            </MDBCard>
            {item._id === edit && (
              <MDBModal open={basicModal} setOpen={setBasicModal} tabIndex="-1">
                <MDBModalDialog>
                  <MDBModalContent>
                    <MDBModalHeader>
                      <MDBBtn
                        className="btn-close"
                        color="none"
                        onClick={toggleOpen}
                      ></MDBBtn>
                    </MDBModalHeader>
                    <MDBModalBody>
                      <MDBInput
                        label="Title"
                        id="form1"
                        type="text"
                        className="mb-5"
                        ref={titleRef}
                        defaultValue={item.title}
                      />
                      <MDBInput
                        label="description"
                        style={{ width: "100%" }}
                        rows={5}
                        className="mb-4"
                        ref={descriptionRef}
                        defaultValue={item.description}
                      />

                      <MDBDropdown group className="shadow-0">
                        <MDBDropdownToggle color="light">
                          Color
                        </MDBDropdownToggle>
                        <MDBDropdownMenu>
                          <MDBDropdownItem
                            link
                            onClick={() => setbgcolor("green")}
                          >
                            green
                          </MDBDropdownItem>
                          <MDBDropdownItem
                            link
                            onClick={() => setbgcolor("red")}
                          >
                            red
                          </MDBDropdownItem>
                          <MDBDropdownItem
                            link
                            onClick={() => setbgcolor("orange")}
                          >
                            orange
                          </MDBDropdownItem>
                        </MDBDropdownMenu>
                      </MDBDropdown>
                    </MDBModalBody>

                    <MDBModalFooter>
                      <MDBBtn color="secondary" onClick={toggleOpen}>
                        Close
                      </MDBBtn>
                      <MDBBtn onClick={() => handleUpdate(item._id)}>
                        Save changes
                      </MDBBtn>
                    </MDBModalFooter>
                  </MDBModalContent>
                </MDBModalDialog>
              </MDBModal>
            )}
          </>
        ))}
      </Box>
    </>
  );
};

export default AllTask;
