import axios, { Axios } from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export function BookUpdate() {
    var {book_id} = useParams()
    const [title,settitle] = useState('')
    const [author,setauthor] = useState('')
    const [quantity,setquantity] = useState('')
    const [rent_fee,setrent_fee] = useState('')

    useEffect(()=>{
        fetch('http://localhost:9000/getonebook/'+book_id)
        .then(data => data.json())
        .then((res)=>{
            console.log(res)
            settitle(res[0].title)
            setauthor(res[0].author)
            setquantity(res[0].quantity)
            setrent_fee(res[0].rent_fee)
        })
    }, [])

        function handleupdate(event){
            event.preventDefault()
            var title = document.getElementById("title").value
            var author = document.getElementById("author").value
            var quantity = document.getElementById("quantity").value
            var rent_fee = document.getElementById("rent_fee").value
    
            var updatedetails = {
                title : title,
                author : author,
                quantity : quantity,
               rent_fee: rent_fee
            }

            if(title === ''){
                alert("Enter the title")
            }
            else{
                axios.put('http://localhost:9000/bookupdate/'+book_id, updatedetails)
                .then((res)=>{
                    if(res.data.status === "error"){
                        alert("Data is not updated")
                    }
                    else if(res.data.status === "success"){
                        alert("Data updated!")
                    }
                })
            }
    }

    return (<>
    <nav></nav>
        <div className="RegMainPage h-100 d-flex justify-content-center align-items-center row">
            <div className="regcard container d-flex flex-column align-items-center justify-content-center gap-3">
                <h1 className="text-center">ALTER BOOKS DETAILS</h1>
                <form onSubmit={handleupdate}>

                    <input type="text" id="title" value={title} onChange={(updatedata)=>{settitle(updatedata.target.value)}} className="mb-2 rounded  w-100 p-1 border-0" placeholder="title" required></input>

                    <input type="text" id="author" value={author} onChange={(updatedata)=>{setauthor(updatedata.target.value)}} className="mb-2 rounded w-100 p-1 border-0" placeholder="author" required></input>

                    <input type="text" id="quantity" value={quantity} onChange={(updatedata)=>{setquantity(updatedata.target.value)}} className="mb-2 rounded w-100 p-1 border-0" placeholder="quantity" required></input>

                    <input type="tel" id="rent_fee" value={rent_fee} onChange={(updatedata)=>{setrent_fee(updatedata.target.value)}} className="mb-2 rounded w-100 p-1 border-0" placeholder="rent_fee" required></input>

                    <input type="submit" class="btn btn-success btn-block rounded w-100 p-1 border-0" value="UPDATE"></input>
                </form>
            </div>
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
    </>);
}