import { Routes, Route, Link } from "react-router";
import BookablesPage from "./Bookables/BookablesPage";
import BookingsPage from "./Bookings/BookingsPage";
import UserPicker from "./Users/UserPIcker";
import UsersPage from "./Users/UsersPage";
import SayHello from "../book-examples/SideEffect/AlwaysRunEffect";

import { FaCalendarAlt, FaDoorOpen, FaUsers } from "react-icons/fa";
import "../App.css";

function App() {
  return (
    <div className="App">
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/bookings" className="btn btn-header">
                <FaCalendarAlt />
                <span>Bookings</span>
              </Link>
            </li>
            <li>
              <Link to="/bookables" className="btn btn-header">
                <FaDoorOpen />
                <span>Bookables</span>
              </Link>
            </li>
            <li>
              <Link to="/users" className="btn btn-header">
                <FaUsers />
                <span>Users</span>
              </Link>
            </li>
          </ul>
        </nav>
        <UserPicker />
      </header>

      <Routes>
        <Route path="bookings" element={<BookingsPage />} />
        <Route path="bookables" element={<BookablesPage />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="side-effects" element={<SayHello />} />
      </Routes>
    </div>
  );
}

export default App;
