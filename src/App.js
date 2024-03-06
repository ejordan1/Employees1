import AvailableShifts from "./Components/AvailableShifts";
import LoginPage from "./Components/LoginPage";
import "./App.css";
import Navbar from "./Components/Navbar";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import MyShifts from "./Components/MyShifts";
import AllShifts from "./Components/AllShifts";
import AllPerms from "./Components/AllPerms";
import MyPerms from "./Components/MyPerms";
import { UserContext } from "./Contexts/UserContext";
import { useState } from "react";

import { useQuery, useMutation } from "@tanstack/react-query";
// 'https://jsonplaceholder.typicode.com/todos

function App() {
  const [username, setUserName] = useState("john");

  // also can use axios to fetch
  const { data, error, isLoading } = useQuery({
    queryKey: ["todo"],
    queryFn: () =>
      fetch("https://jsonplaceholder.typicode.com/todos").then((res) =>
        res.json()
      ),
  }); // querykey refers one key in query so it knows which it is tied to

  const {mutate, isPending, isError, isSuccess} = useMutation({
    mutationFn: (newPost) =>
      fetch("https://jsonplaceholder.typicode.com/todos", {
        method: "POST",
        body: JSON.stringify(newPost),
        headers: {"Content-type": "application/json; charset=UTF-8" } // this made the whole request come back, instead of just id
      }).then((res) => res.json()),
  });

  if (error || isError ) return <div>there was an error:</div>;

  if (isLoading) return <div>there loading:</div>;

  // if (isPending) return <div>mutation is pending:</div>;

  return (
    <UserContext.Provider value={{ username, setUserName }}>
      <BrowserRouter>
        <Navbar></Navbar>
        <div></div>
        <Routes>
          <Route exact path="/" element={<LoginPage />} />
          <Route exact path="/available" element={<AvailableShifts />} />
          <Route exact path="/myshifts" element={<MyShifts />} />
          <Route exact path="/myperms" element={<MyPerms />} />
          <Route exact path="/allshifts" element={<AllShifts />} />
          <Route exact path="/allperms" element={<AllPerms />} />
        </Routes>
        <div className="App">
          <p>data query test</p>
          {isPending && <p>data is being added</p>}
          {data &&
            data.map((todo) => (
              <div>
                todod id: {todo.id}, title: {todo.title}
                <button onClick={() => mutate(
                  {
                    "userId": 5000,
                    "id": 4000,
                    "title": "hey my name is emerson",
                    "completed": false
                  }
                )}>add post</button>
              </div>
            ))}
        </div>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
