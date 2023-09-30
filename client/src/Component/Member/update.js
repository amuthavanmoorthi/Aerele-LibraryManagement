import axios, { Axios } from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export function MemberUpdate() {
    var { member_id } = useParams()
    const [first_name, setfirst_name] = useState('')
    const [last_name, setlast_name] = useState('')
    const [email, setemail] = useState('')
    const [number, setnumber] = useState('')
    const [debt, setdebt] = useState('')
    useEffect(() => {
        fetch('http://localhost:9000/getone/' + member_id)
            .then(data => data.json())
            .then((res) => {
                setfirst_name(res[0].first_name)
                setlast_name(res[0].last_name)
                setemail(res[0].email)
                setnumber(res[0].number)
                setdebt(res[0].debt)
            })
    }, [])

    function handleupdate(event) {
        event.preventDefault()
        var first_name = document.getElementById("first_name").value
        var last_name = document.getElementById("last_name").value
        var email = document.getElementById("email").value
        var number = document.getElementById("number").value
        var debt = document.getElementById("debt").value

        var updatedetails = {
            first_name: first_name,
            last_name: last_name,
            email: email,
            number: number,
            debt: debt
        }

        if (email === '') {
            alert("Enter the mail")
        }
        else {
            axios.put('http://localhost:9000/memberupdate/' + member_id, updatedetails)
                .then((res) => {
                    if (res.data.status === "error") {
                        alert("Data is not updated")
                    }
                    else if (res.data.status === "success") {
                        alert("Data updated!")
                    }
                })
        }
    }

    return (
        <>
            <nav class="navbar navbar-expand-lg bg-body-tertiary">
                <div class="container-fluid">
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <div className="d-flex justify-content-start align-items-end">
                            <Link class="nav-link active text-danger" aria-current="page" to="/members">
                                <button>BACK</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>


            <div className="RegMainPage h-100 d-flex justify-content-center align-items-center row">
                <div className="regcard container d-flex flex-column align-items-center justify-content-center gap-3">
                    <h1 className="text-center">ALTER MEMBER DETAILS</h1>
                    <form onSubmit={handleupdate}>

                        <input type="text" id="first_name" value={first_name} onChange={(updatedata) => { setfirst_name(updatedata.target.value) }} className="mb-2 rounded  w-100 p-1 border-0" placeholder="First Name" required></input>

                        <input type="text" id="last_name" value={last_name} onChange={(updatedata) => { setlast_name(updatedata.target.value) }} className="mb-2 rounded w-100 p-1 border-0" placeholder="Last name" required></input>

                        <input type="text" id="email" value={email} onChange={(updatedata) => { setemail(updatedata.target.value) }} className="mb-2 rounded w-100 p-1 border-0" placeholder="Email" required></input>

                        <input type="tel" id="number" value={number} onChange={(updatedata) => { setnumber(updatedata.target.value) }} className="mb-2 rounded w-100 p-1 border-0" placeholder="Phone" required></input>

                        <input type="text" id="debt" value={debt} onChange={(updatedata) => { setdebt(updatedata.target.value) }} className="mb-2 rounded w-100 p-1 border-0" placeholder="debt" required></input>

                        <input type="submit" class="btn btn-success btn-block rounded w-100 p-1 border-0" value="UPDATE"></input>
                    </form>
                </div>
            </div>
        </>);
}