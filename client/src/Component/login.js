import React from "react";
import { Link } from "react-router-dom";
import '../Component/login.css';
import axios from "axios";

export function Login(){
    function handleLogin(){
      var email = document.getElementById("email").value
      var librarianId = document.getElementById("librarianId").value
      var password = document.getElementById("password").value

      var loginDetails = {
          email : email,
          librarianId : librarianId,
          password : password
      }

      if(email ===''){
          alert("Enter your email")
      }
      else if(librarianId ===''){
          alert("Enter your librarianId")
      }
      else if(password ===''){
        alert("Enter your password")
    }
      else{
          axios.post("http://localhost:9000/login", loginDetails)
          .then((res)=>{
              if(res.data.status === "success"){
                  var id = res.data.id
                  window.location.href=`/Dashboard/${id}`
                  // alert(id)
              }
              else if(res.data.status === "invalid"){
                  alert("Your password is invalid!")
              }
              else if(res.data.status === "empty_set"){
                  alert("Your password or username not valid!")
              }
              else if(res.data.status === "error"){
                  alert("Contact admin!")
              }
          })
      }
}

 return (
    <>
    <div className="login-bg">
      <div className="d-flex justify-content-center vh-100 align-items-center">

        <form className="col-lg-6" onSubmit={handleLogin}>
          <div>
            <h1 className="text-center text-white"><b>LIBRARY MANAGEMENT</b></h1>
            <h1 className="text-center text-white">LOGIN</h1>
          </div>
          <div class="form-outline mb-4">
            <input type="email" id="email" class="form-control" placeholder="Email Address"/>
          </div>
          <div class="form-outline mb-4">
            <input type="text" id="librarianId" class="form-control" placeholder="Librarian ID" />
          </div>
          <div class="form-outline mb-4">
            <input type="password" id="password" class="form-control" placeholder="Password" />
          </div>
          <div class="row mb-4">
          <button type="submit" class="btn btn-primary btn-block mb-4">LOGIN</button>
            <div class="text-center">
              <p className="text-white">Not a member? <a href="!">Register</a></p>
            </div>
          </div>
        </form>
      </div>
      </div>
    </>
  );
}

