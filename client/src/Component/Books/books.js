import React from "react";
import axios from "axios";
import { useEffect,useState } from "react";
import { Link } from "react-router-dom";

export function BooksManagement(){
  const [books, setBooks] = useState([])
  useEffect(() => {
      fetch("http://localhost:9000/getAllBooks")
          .then(res => res.json())
          .then(details => setBooks(details))
  })

  function handledelete(book_id) {
      let deletedata = {
         book_id: book_id 
        }

      axios.post("http://localhost:9000/deleteBooks", deletedata)
          .then((res) => {
              if (res.data.status === "error") {
                  alert("Book not deleted")
              }
              else if (res.data.status === "success") {
                  alert("Book deleted")
              }
          })
  }
  return (
      <>
          <div className="row w-100 d-flex justify-content-between">
          <h1 className="bg-dark text-white text-center"><b>BOOKS ARE IN THE LIBRARY</b></h1>

              {
                  books.map((value, index) => (
                      <>
                          <div className="col-10 col-sm-5 col-md-3 m-2 mx-3">
                              <div class="card d-flex align-items-center border-0">
                                  {/* <div className="image-container"> */}
                                      {/* <img src={value.first_name} className="card_img_size" /> */}
                                  {/* </div> */}
                                  <div class="card-body card_content_size bg-dark-subtle rounded">
                                      <h5>TITLE : {value.title}</h5>
                                      <h5>AUTHOR : {value.author}</h5>
                                      <h5>QUANTITY : {value.quantity}</h5>
                                      <h5>RENT FEES : {value.rent_fee}</h5>
                                      <Link to={`/updatebook/${value.book_id}`} className="btn btn-success">update</Link>
                                      <a href="#" class="btn btn-danger rounded border-0 ms-5" onClick={() => { handledelete(value.book_id) }}>Remove</a>
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