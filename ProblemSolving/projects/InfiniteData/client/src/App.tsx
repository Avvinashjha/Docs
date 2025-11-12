import { useState } from "react";
import "./App.css";
import CharacterCounter from "./components/CharCounter";
import InfiniteScrollList from "./pages/InfiniteScrollList/InfiniteScrollList";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeContext } from "./contexts/ThemeContext";

function App() {
  const [theme, setTheme] = useState("dark");
  return (
    <BrowserRouter>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <Routes>
          <Route path="/inf" element={<InfiniteScrollList />} />
          <Route path="/charCounter" element={<CharacterCounter />} />
        </Routes>
      </ThemeContext.Provider>
    </BrowserRouter>
  );
}

export default App;
