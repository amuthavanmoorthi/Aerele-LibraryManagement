import React from "react";
import { Link } from "react-router-dom";
import '../Issue Books/issue.css';
import '../Add Book/addBook.css';
import axios from "axios";

export function AddBooks() {
  function handlebook(event) {
    event.preventDefault()

    var title = document.getElementById("title").value
    var author = document.getElementById("author").value
    var quantity = document.getElementById("quantity").value
    var rent_fee = document.getElementById("rent_fee").value

    var books = {
      title: title,
      author: author,
      quantity: quantity,
      rent_fee: rent_fee
    }

    if (title === '') {
      alert("Enter your title")
    }
    else if (author === '') {
      alert("Enter your author")
    }
    else if (quantity === '') {
      alert("Enter your quantity ")
    }
    else if (rent_fee === '') {
      alert("Enter your rent")
    }
    else {
      axios.post("http://localhost:9000/books", books)
        .then((res) => {
          if (res.data.status === "error") {
            alert("Book is not added!")
            console.log(res);
          }
          else if (res.data.status === "success") {
            alert("Successfully added")
            // window.location.href='/Dashboard'
            document.getElementById("title").value = ""
            document.getElementById("author").value = ""
            document.getElementById("quantity").value = " "
            document.getElementById("rent_fee").value = " "
          }
        })
    }
  }

  return (
    <>
      <body className="addBook_bg">
        <div className="d-flex justify-content-center vh-100 align-items-center content">
          <form className="col-lg-6" onSubmit={handlebook}>
            <div>
              <h1 className="text-center "><b>ADD BOOK</b></h1>
            </div>
            <div class="form-outline mb-4">
              <label><b>TITLE</b></label>
              <input type="text" id="title" class="form-control" placeholder="Enter the book title" />
            </div>
            <div class="form-outline mb-4">
              <label><b>AUTHOR</b></label>
              <input type="text" id="author" class="form-control" placeholder="Enter the author name" />
            </div>
            <div class="form-outline mb-4">
              <label><b>QUANTITY</b></label>
              <input type="number" id="quantity" class="form-control" placeholder="Enter the quantity" />
            </div>
            <div class="form-outline mb-4">
              <label><b>RENT FEE</b></label>
              <input type="tel" id="rent_fee" class="form-control" placeholder="Enter the rent for book" />
            </div>
            <div className="d-flex justify-content-start gap-2">
              <div class="row mb-4 gap-4">
               <button type="submit" class="btn btn-success btn-block mb-4">SUBMIT</button>
              </div>
              <div class="row mb-4">
                <Link to="/Dashboard/:id"> <button type="button" class="btn btn-danger ms-4 btn-block mb-4">BACK</button> </Link>
              </div>
            </div>
          </form>
        </div>
      </body>
    </>
  );
}