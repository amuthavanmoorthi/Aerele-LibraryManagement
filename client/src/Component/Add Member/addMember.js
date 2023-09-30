import React from "react";
import { Link } from "react-router-dom";
import '../Add Member/addMember.css';
import axios from "axios";

export function AddMember() {
    function handleMember(event) {
        event.preventDefault()

        var first_name = document.getElementById("first_name").value
        var last_name = document.getElementById("last_name").value
        var email = document.getElementById("email").value
        var number = document.getElementById("number").value

        var memberDetails = {
            first_name: first_name,
            last_name: last_name,
            email: email,
            number: number
        }
        if (first_name === '') {
            alert("Enter your first name")
        }
        else if (last_name === '') {
            alert("Enter your last name")
        }
        else if (email === '') {
            alert("Enter your email")
        }
        else if (number === '') {
            alert("Enter your number")
        }
        else {
            axios.post("http://localhost:9000/addMember", memberDetails)
                .then((res) => {
                    if (res.data.status === "error") {
                        alert("Couldn't add this member")
                        console.log(res);
                    }
                    else if (res.data.status === "success") {
                        alert("Successfully added member")
                        // window.location.href='/Dashboard'
                        document.getElementById("first_name").value = ""
                        document.getElementById("last_name").value = ""
                        document.getElementById("email").value = " "
                        document.getElementById("number").value = " "
                    }
                })
        }
    }
    return (
        <>
            <body className="addMember_bg">
                <div className="d-flex justify-content-center vh-100 align-items-center content">
                    <form className="col-lg-6" onSubmit={handleMember}>
                        <div>
                            <h1 className="text-center"><b>MEMBER DETAILS</b></h1>
                        </div>
                        <div class="form-outline mb-4">
                            <label><b className="text-white">FIRST NAME</b></label>
                            <input type="text" id="first_name" class="form-control" placeholder="Enter the first name" />
                        </div>
                        <div class="form-outline mb-4">
                            <label><b className="text-white">LAST NAME</b></label>
                            <input type="text" id="last_name" class="form-control" placeholder="Enter the last name" />
                        </div>
                        <div class="form-outline mb-4">
                            <label><b className="text-white">EMAIL</b></label>
                            <input type="email" id="email" class="form-control" placeholder="Enter the email" />
                        </div>
                        <div class="form-outline mb-4">
                            <label><b className="text-white">PHONE NUMBER</b></label>
                            <input type="tel" id="number" class="form-control" placeholder="Enter the number" />
                        </div>
                        <div className="d-flex justify-content-start gap-5">
                            <div class="row mb-4">
                                <button type="submit" class="btn btn-success btn-block mb-4">ADD</button>
                            </div>
                            <div class="row mb-4">
                                <Link to="/Dashboard/:id"> <button type="button" class="btn btn-danger btn-block mb-4">BACK</button> </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </body>
        </>
    );
}