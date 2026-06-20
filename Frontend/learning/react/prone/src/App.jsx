
import Navbar from "./components/common/Navbar";
import About from "./pages/about";
import Contact from "./pages/contact";
import Demo from "./pages/demo";
import Button from "./pages/demo/Button";
import Home from "./pages/home";
import "./style.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App(){
    return (
        <>
          <BrowserRouter>
            <Navbar/>
            <Routes>
                <Route index element={<Home/>}/>
                <Route path="/home" element={<Home/>}/>
                <Route path="/contact" element={<Contact/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="/demo">
                    <Route index element={<Demo/>}/>
                    <Route path="button" element={<Button/>}/>
                    <Route path=":test" element={<><h1>Hey there</h1></>}/>
                </Route>
            </Routes>
          </BrowserRouter>  
        </>
        
    )
}

export default App;

// demo/button?red=true