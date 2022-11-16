import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import Todo from "./pages/home/Home";
import Login from "./pages/login/login";
import Signup from "./pages/signup/signup";



const RoutesFile = () => {
    const state = useSelector(state => state)
    if (state?.loading) return <  >
        <div style={{ color: "white", display: "flex", alignItems: "center", justifyContent: "center" }}>
            Loading.....
        </div>
    </>
    return (
        <>

            {state?.user ?
                <Routes>
                    <Route path="/Home" element={<Todo />} />
                    <Route path="*" element={<Todo />} />
                </Routes>
                :
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="*" element={<Login />} />
                </Routes>
            }

            {/* </Routes> */}
        </>
    );
}
export default RoutesFile
