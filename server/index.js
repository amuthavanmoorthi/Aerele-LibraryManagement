//importing the all packages
const express = require("express")
const cors = require("cors")
const bodyparse = require("body-parser")
const mysql = require("mysql")
const crypto = require("crypto")
//Change the package to function.
var expFunction = express()
expFunction.use(cors())
expFunction.use(express.json())
expFunction.use(bodyparse.urlencoded({ extended: true }))
expFunction.use(bodyparse.json())
expFunction.use(express.static('public'))
//Connecting my local Database.
let localdb = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "mysql@123!",
    database: "project"
})
localdb.connect((error) => {
    if (error) {
        console.log(error)
    }
    else {
        console.log("db connected")
    }
})
//login access for only who has librarian id.
expFunction.post("/login", (request, response) => {
    let { email, librarianId, password } = request.body
    var loginQuery = "select * from library where email=?"
    localdb.query(loginQuery, [email], (error, result) => {
        if (error) {
            response.send({ "status": "error" })
        }
        else if (result.length > 0) {
            var dbemail = result[0].email
            var dblibrarianId = result[0].librarianId
            var dbpassword = result[0].password
            var library_id = result[0].library_id
            if (dbemail === email && dblibrarianId === librarianId && dbpassword === password) {
                response.send({ "status": "success", "library_id": library_id })
            }
            else if (error) {
                response.send({ "status": "invalid" })
            }
        }
        else {
            response.send({ "status": "empty_set" })
        }
    })
})
//Inserting the book details to Databse with using random deneration book id.
expFunction.post("/books", (requst, response) => {
    var book_id = crypto.randomUUID()
    let { title, author, quantity, rent_fee } = requst.body
    let selectingQuery = `insert into books(book_id, title, author, quantity, rent_fee) values ('${book_id}',?,?,?,?)`
    localdb.query(selectingQuery, [title, author, quantity, rent_fee], (error, result) => {
        if (error) {
            response.send({ "status": "error" })
            console.log(error)
        } else {
            response.send({ "status": "success" })
        }
    })
})
//Inserting the member details to Databse.
expFunction.post("/addMember", (requst, response) => {
    let { first_name, last_name, email, number, debt } = requst.body
    let insertingQuery = `insert into members(first_name, last_name, email, number, debt) values (?,?,?,?,?)`
    localdb.query(insertingQuery, [first_name, last_name, email, number, debt], (error, result) => {
        if (error) {
            response.send({ "status": "error" })
            console.log(error)
        } else {
            response.send({ "status": "success" })
        }
    })
})
//Get all the member details to show the librarian.
expFunction.get('/getAllMember', (request, response) => {
    let getAllQuery = 'select * from members'
    localdb.query(getAllQuery, (error, result) => {
        if (error) {
            response.send(error)
        } else {
            response.send(result)
        }
    })
})
//If the librarian wants to delete the member.
expFunction.post('/deletemember', (request, response) => {
    let member_id = request.body.member_id
    let deletequery = 'delete from members where member_id=?'
    localdb.query(deletequery, [member_id], (error, result) => {
        console.log(deletequery);
        if (error) {
            console.log(error)
            response.send({ "status": "error" })
        }
        else {
            response.send({ "status": "success" })
        }
    })
})
//Get the member id for updating the member details.
expFunction.get('/getone/:member_id', (request, response) => {
    let { member_id } = request.params
    let getonequery = 'select * from members where member_id = ?'
    localdb.query(getonequery, [member_id], (error, result) => {
       
        if (error) {
            response.send({ "status": "error" })
            console.log(error)
        }
        else {
            response.send(result)
            console.log(result)
        }
    })
})
//Update query for member details using member id.
expFunction.put('/memberupdate/:member_id', (request, response) => {
    let { member_id } = request.params
    let { first_name, last_name, email, number, debt } = request.body
    let updateQuery = 'update members set first_name = ? ,last_name = ? , email = ?, number = ? , debt = ? where member_id = ?'
    localdb.query(updateQuery, [first_name, last_name, email, number, debt, member_id], (error, result) => {
        if (error) {
            response.send({ "status": "error" })
            console.log(error)
        }
        else {
            response.send({ "status": "success" })
        }
    })
})
//Get all book to show the librarian.
expFunction.get('/getAllBooks', (request, response) => {
    let getAllQuery = 'select * from books'
    localdb.query(getAllQuery, (error, result) => {
        if (error) {
            response.send(error)
        } else {
            response.send(result)
        }
    })
})
//Deleting book
expFunction.post('/deleteBooks', (request, response) => {
    let book_id = request.body.book_id
    console.log(book_id);
    let deletequery = 'delete from books where book_id=?'
    localdb.query(deletequery, [book_id], (error, result) => {
        if (error) {
            console.log(error);
            response.send({ "status": "error" })
        }
        else {
            response.send({ "status": "success" })
        }
    })
})
//Getting book id for deleting the book details.
expFunction.get('/getonebook/:book_id', (request, response) => {
let  {book_id}  = request.params
    console.log(book_id)
    let getonequery = 'select * from books where book_id = ?'
    localdb.query(getonequery, [book_id], (error, result) => {
        if (error) {
            response.send({ "status": "error" })
            console.log(error)
        }
        else {
            response.send(result)
            // console.log(result)
        }
    })
})
//updating the book details using book id
expFunction.put('/bookupdate/:book_id', (request, response) => {
    let { book_id } = request.params
    let { title, author, quantity, rent_fee } = request.body
    let updateQuery = 'update books set title = ? , author = ? , quantity = ?, rent_fee = ? where book_id = ?'
    localdb.query(updateQuery, [title, author, quantity, rent_fee, book_id], (error, result) => {
        if (error) {
            response.send({ "status": "error" })
            console.log(error)
        }
        else {
            response.send({ "status": "success" })
        }
    })
})
//Issue book for user. Here one API with multiple SQL query's.
expFunction.post('/issuebook', (request, response) => {
    let { book_id, member_id, date, dueday } = request.body
    let bookPrice
    var outDebt
    var totalPrice
    let priceSql = 'select rent_fee from books where book_id = ?'
    localdb.query(priceSql, [book_id], (error, result) => {
        if (error) {
            response.send({ "status": "error" })
            console.log(error)
        }
        else {
            bookPrice = result[0].rent_fee
            totalPrice = bookPrice * dueday
            console.log(bookPrice);
        }
    })
    let debtSql = 'select out_debt, member_id from transaction where member_id = ?'
    localdb.query(debtSql, [member_id], (error, result) => {
        console.log('Entering debtSql');
        if (error) {
            response.send({ "status": "error" })
            console.log(error)
        } else {
            console.log('Entering else');
            console.log(result);
            if (result.length == 0) {
                console.log('Entering if');
                let sql = 'insert into transaction(book_id,member_id,trans_date,due_day,out_debt) values(?,?,?,?,?)'
                localdb.query(sql, [book_id, member_id, date, dueday, totalPrice], (error, result) => {
                    if (error) {
                        response.send({ "status": "error" })
                        console.log(error)
                    }
                    else {
                        response.send({ "status": "success" })
                    }
                })
            } else {
                console.log(result);
                outDebt = result[0].out_debt
                console.log(outDebt);
                console.log(totalPrice);
                var totalDebt = outDebt + totalPrice
                console.log(totalDebt);
                if (totalDebt > 500) {
                    response.send({ "status": "limit reached" })
                } else if (totalDebt > 0 && totalDebt < 500) {
                    let updateSql = 'update transaction set out_debt = ? where member_id = ?'
                    console.log(updateSql);
                    localdb.query(updateSql, [totalDebt, member_id], (error, result) => {
                        if (error) {
                            response.send({ "status": "error" })
                            console.log(error)
                        }
                        else {
                            response.send({ "status": "success" })
                        }
                    })
                }


            }
        }
    })
})
//After issue book, to show the transaction for librarian.
expFunction.get('/Transactionlist', (request, response) => {
    let sql = 'select * from transaction'
    localdb.query(sql, (error, result) => {
        if (error) {
            response.send(error)
            console.log(error)
        }
        else {
            response.send(result)
        }
    })
})
//To delete the transaction history.
expFunction.post('/transactiondelete/:t_id', (request, response) => {
    let { t_id } = request.params
    let sql = 'delete from transaction where t_id=?'
    localdb.query(sql, [t_id], (error, result) => {
        if (error) {
            response.send({ "status": "error" })
            console.log(error
            )
        }
        else {
            response.send({ "status": "success" })
        }
    })
})
//To show the all transaction history.
expFunction.post('/transactionHistory',(request,response) =>{
    let selectTransaction = 'select * from transaction'
    localdb.query(selectTransaction, (error, result) =>{
        if(error){
            response.send({"status":"error"})
            console.log(err)
        }
        else{
            response.send({"status":"success"})
        }
    })
})
expFunction.listen(9000, () => {
    console.log("Port is running in 9000")
})