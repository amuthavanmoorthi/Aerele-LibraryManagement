import './App.css';
import { AddBooks } from './Component/Add Book/addBook';
import { AddMember } from './Component/Add Member/addMember';
import { Issue } from './Component/Issue Books/issue';
import { Dashboard } from './Component/Main Page/dashboard';
import { Login } from './Component/login';
import {MemberManagement} from './Component/Member/member'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BooksManagement } from './Component/Books/books';
import { Transaction } from './Component/Transactions/transaction';
import { MemberUpdate, Update } from './Component/Member/update';
import { BookUpdate } from './Component/Books/update';
import { History } from './Component/Transactions/history';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={[<Login />]}></Route>
          <Route path='/Dashboard/:id' element={[<Dashboard/>]}></Route>
          <Route path='/issue' element={[<Issue/>]}></Route>
          <Route path='/addMember' element={[<AddMember/>]}></Route>
          <Route path='/addBooks' element={[<AddBooks/>]}></Route>
          <Route path='/members'  element={[<MemberManagement/>]}/>
          <Route path='/books'  element={[<BooksManagement/>]}/>
          <Route path='/transaction'  element={[<Transaction/>]}/>
          <Route path='/update/:member_id'  element={[<MemberUpdate/>]}/>
          <Route path='/updatebook/:book_id'  element={[<BookUpdate/>]}/>
          <Route path='/transactionHistory'  element={[<History/>]}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
