import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export function Transaction(){
    const[transactiondetail,setTransactiondetail]=useState([])
    useEffect(()=>{
        fetch('http://localhost:9000/Transactionlist/')
        .then(res=>res.json())
        .then(data=>setTransactiondetail(data))
    })


   
    var remove = (t_id) => {
        axios.post('http://localhost:9000/transactiondelete/'+t_id)
              .then((res) => {
                  if (res.data.status === "error") {
                      alert("data are not delete")
                  }
                  else if (res.data.status === "success") {
                      alert("data are deleted")
                  }
              })
      }
    return(
        
        <>
                <h1 className="bg-dark text-white text-center"><b>TRANSACTIONS DETAILS</b></h1>
        <div className="bookTab d-flex align-items-center justify-content-center">
            <table cellpadding="10px" className="text-center table hover bg-success text-white ">
                <tr>
                    <th>Transaction Id</th>
                    <th>Book Id</th>
                    <th>Member Id</th>
                    <th>Transaction Date</th>
                    <th>Due Day</th>
                     {/* <th>Outstanding Dept</th>
                    <th>Fine Amount</th> 
                    <th>Status</th> */}
                </tr>

                {
                    transactiondetail.map((value,indes)=>(
                        <>
                        <tr className="table table-hover">
                            <td>{value.t_id}</td>
                            <td>{value.book_id}</td>
                            <td>{value.member_id}</td>
                            <td>{value.trans_date}</td>
                            <td>{value.due_day}</td>
                            <td>{value.out_dept}</td>
                            <td>{value.fine_amount}</td>
                            <td>{value.status}</td>
                            <td><button className="btn btn-outline-danger" onClick={()=>{remove(value.t_id)}}>Delete</button></td>
                        </tr>
                        </>
                    ))
                }
            </table>
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