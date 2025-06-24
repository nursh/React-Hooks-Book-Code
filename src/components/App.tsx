import { Routes, Route, Link, BrowserRouter } from "react-router";
import BookablesPage from "./Bookables/BookablesPage";
import BookingsPage from "./Bookings/BookingsPage";
import UserPicker from "./Users/UserPIcker";
import UsersPage from "./Users/UsersPage";
import SayHello from "../book-examples/SideEffect/AlwaysRunEffect";

import { FaCalendarAlt, FaDoorOpen, FaUsers } from "react-icons/fa";
import "../App.css";
import WindowSize from "../book-examples/SideEffect/WhenComponentMounts";
import UserStorage from "../book-examples/SideEffect/ChangeDeps";
import SayWindowSize from "../book-examples/SideEffect/SayWindowSize";
import Counter from "../book-examples/Refs/Counter";
import Colors from "../book-examples/Props/Colors";
import Anagram from "../book-examples/Memo/Anagram";
import { UserProvider } from "./Users/UserContext";
import Greeting from "../book-examples/CustomHooks/Greeting/GreetingApp";
import WindowSizer from "../book-examples/CustomHooks/WindowSizer/WindowSizer";
import UserPickerHook from "../book-examples/CustomHooks/StorageHook/UserPickerHook";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <BrowserRouter>
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
              <Route path="bookables/*" element={<BookablesPage />} />
              <Route path="users" element={<UsersPage />} />
              <Route path="always-run" element={<SayHello />} />
              <Route path="on-mount" element={<WindowSize />} />
              <Route path="on-deps-update" element={<UserStorage />} />
              <Route path="say-window-size" element={<SayWindowSize />} />
              <Route path="counter" element={<Counter />} />
              <Route path="colors" element={<Colors />} />
              <Route path="anagram" element={<Anagram />} />
              <Route path="greeting-hook" element={<Greeting />} />
              <Route path="resize-hook" element={<WindowSizer />} />
              <Route path="storage-hook" element={<UserPickerHook />} />
            </Routes>
          </div>
        </BrowserRouter>
      </UserProvider>
    </QueryClientProvider>
  );
}

export default App;
