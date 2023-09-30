import axios from "axios";
import React, { useEffect, useState } from "react";

export function History() {
    const [transactionHistory, settransactionHistory] = useState([])
    useEffect(() => {
        fetch('http://localhost:9000/transactionHistory/')
            .then(res => res.json())
            .then(data => settransactionHistory(data))
    })

    var Delete = (t_id) => {
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
    return (
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
                        transactionHistory.map((value, index) => (
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
                                    <td><button className="btn btn-outline-danger" onClick={() => { Delete(value.t_id) }}>Delete</button></td>
                                </tr>
                            </>
                        ))
                    }
                </table>
            </div>
        </>
    );
}