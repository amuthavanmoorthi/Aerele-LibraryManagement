import React from "react";
import axios from "axios";
import { useEffect,useState } from "react";
import { Link } from "react-router-dom";

export function MemberManagement(){
  const [member, setMember] = useState([])
  useEffect(() => {
      fetch("http://localhost:9000/getAllMember")
          .then(res => res.json())
          .then(details => setMember(details))
  })

  function handledelete(member_id) {
      let deletedata = {
         member_id: member_id 
        }
      axios.post("http://localhost:9000/deletemember", deletedata)
          .then((res) => {
              if (res.data.status === "error") {
                  alert("Outstanding dept is pending")
              }
              else if (res.data.status === "success") {
                  alert("data are deleted")
              }
          })
  }
  return (
      <>
          <div className="row w-100 d-flex justify-content-between">
            <h1 className="bg-dark text-white text-center"><b><span className="text-warning">MEMBERS</span> ARE IN THE LIBRARY</b></h1>
              {
                  member.map((value, index) => (
                      <>
                          <div className="col-10 col-sm-5 col-md-3 m-2 mx-3">
                              <div class="card d-flex align-items-center border-0">
                                  {/* <div className="image-container"> */}
                                      {/* <img src={value.first_name} className="card_img_size" /> */}
                                  {/* </div> */}
                                  <div class="card-body card_content_size bg-warning-subtle border-light rounded">
                                      <h5>FIRST NAME : {value.first_name}</h5>
                                      <h5>LAST NAME : {value.last_name}</h5>
                                      <h5>GMAIL : {value.email}</h5>
                                      <h5>MOBILE : {value.number}</h5>
                                      <h5>OUTSTANDING DEBT : {value.debt}</h5>
                                      <Link to={`/update/${value.member_id}`} className="btn btn-success">update</Link>
                                      <a href="#" class="btn btn-danger rounded border-0 ms-5" onClick={() => { handledelete(value.member_id) }}>Remove</a>
                                  </div>
                              </div>
                          </div>
                      </>
                  ))
              }
          </div>
          <nav class="navbar navbar-expand-lg ">
                <div class="container-fluid">
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <div className="d-flex justify-content-start align-items-end">
                            <Link class="nav-link active text-danger" aria-current="page" to="/Dashboard/:id">
                                <button className="rounded bg-dark text-white">BACK</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

      </>
  );
}