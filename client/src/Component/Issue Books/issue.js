import React from "react";
import { Link } from "react-router-dom";
import '../Issue Books/issue.css';
import axios from "axios";

export function Issue() {
  function handlelogin(event) {
    event.preventDefault()
    var member_id = document.getElementById("member_id").value
    var book_id = document.getElementById("book_id").value
    var date=document.getElementById("date").value
    var dueday = document.getElementById("dueday").value
    var key = {
      member_id: member_id,
      book_id: book_id,
      date:date,
      dueday: dueday
    }
    if (member_id === "") {
      alert("Enter the member_id")
    }
    else if (book_id === "") {
      alert("Enter the book_id")
    }
    else if(date==""){
        alert("Enter the date")
    }
    else if (dueday === "") {
      alert("Enter the duedate")
    }

    else {
      axios.post("http://localhost:9000/issuebook", key)
        .then((res) => {
          if (res.data.status === "error") {
            alert("Couldn't take this book")
            window.location.reload()
          }
          else if (res.data.status === "limit reached") {
            alert("Your outstanding debt reached the limit.")
          }
          else if (res.data.status === "success") {
            alert("Success")
            window.location.href = '/transaction'
          }

        })
    }
  }
  return (
    <>
      <body className="issue_bg">
        <div className="d-flex justify-content-center vh-100 align-items-center content">
          <form className="col-lg-6 " onSubmit={handlelogin}>
            <div>
              <h1 className="text-center text-white">ISSUE BOOK</h1>
            </div>
            <div class="form-outline mb-4">
              <label><b className="text-white">MEMBER ID</b></label>
              <input type="text" id="member_id" class="form-control" placeholder="Enter the Member ID" />
            </div>
            <div class="form-outline mb-4">
              <label><b className="text-white">BOOK ID</b></label>
              <input type="text" id="book_id" class="form-control" placeholder="Enter the Book ID" />
            </div>
            <div class="form-outline mb-4">
              <label><b className="text-white">DATE</b></label>
              <input type="date" id="date" class="form-control" />
            </div>
            <div class="form-outline mb-4">
              <label><b className="text-white">DUE DAY</b></label>
              <input type="number" id="dueday" class="form-control" placeholder="Enter the Due day" />
            </div>
            <div class="form-outline mb-4">
              <label><b className="text-danger">NOTE :</b></label>
              <p className="text-white">If the member has outstanding more than 500Rs then unable to issue book.</p>
            </div>
            <div className="d-flex justify-content-start gap-4">
              <div class="row mb-4">
                 <button type="submit" class="btn btn-success btn-block mb-4">ISSUE</button>
              </div>
              <div class="row mb-4">
                <Link to="/Dashboard/:id"> <button type="button" class="btn btn-danger btn-block ms-3 mb-4">BACK</button>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </body>
    </>
  );
}


