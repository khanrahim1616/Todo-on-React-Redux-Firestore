import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import Todo from "./pages/home/Home";
import Login from "./pages/login/login";
import Signup from "./pages/signup/signup";
import "./pages/home/todo.css";

const RoutesFile = () => {
  const state = useSelector((state) => state);
  if (state?.loading)
    return (
      <>
        <div
          className="loader"
          style={{
            color: "white",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <i
            style={{ color: "white" }}
            className="fa-solid fa-spinner loaderSize"
          ></i>
        </div>
      </>
    );
  return (
    <>
      {state?.user ? (
        <Routes>
          <Route path="/Home" element={<Todo />} />
          <Route path="*" element={<Todo />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Login />} />
        </Routes>
      )}
    </>
  );
};
export default RoutesFile;
