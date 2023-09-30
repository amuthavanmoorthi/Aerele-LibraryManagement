import React from "react";
import { Link } from "react-router-dom";

export function Dashboard(){
    return(
        <>
<nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    {/* <a class="navbar-brand" href="#">Navbar</a> */}
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mx-auto mb-2 mb-lg-0 ">
        <li class="nav-item">
          <Link class="nav-link active" aria-current="page" to="/members"><b>MEMBERS</b></Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link active" aria-current="page" to="/books"><b>BOOKS</b></Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link active" aria-current="page" to="/transaction"><b>TRANSACTIONS</b></Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link active" aria-current="page" to="/issue"><b>ISSUE BOOK</b></Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link active" aria-current="page" to="/addMember"><b>ADD MEMBER</b></Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link active" aria-current="page" to="/addBooks"><b>ADD BOOK</b></Link>
        </li>
      </ul>
    </div>
    <div className="d-flex justify-content-end">
          <Link class="nav-link active text-danger" aria-current="page" to="/">LOG OUT</Link>
    </div>
  </div>
</nav>
    

    {/* Landing page Content  */}
<div className="container-fluid ms-0 me-0 row py-3">
        <div className="col-lg-6 p-0 m-0 align-self-center">
          <div className="d-flex justify-content-center">
            <div className="text-center">
              <h1><b>WELCOME to</b></h1>
              <h1><b>LIBRARY MANAGEMENT SYSTEM</b></h1>
              <div>
                <p>Library Management System streamlines the day-to-day operations of a library, making it more efficient, organized, and user-friendly. This ultimately enhances the overall experience for both library staff and patrons.</p>
              </div>
            </div>
          </div>
          <div>
          </div>
        </div>


        <div className="col-lg-6 py-5">
            <div className="d-flex justify-content-center">
          <img src="https://images.unsplash.com/photo-1532294220147-279399e4e00f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" className="w-100"/>
          </div>
      </div>
      </div>
        </>
    );
}