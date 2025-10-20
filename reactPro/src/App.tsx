import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ThemedButton from './pages/ThemedButton'
import { ThemeProvider } from './pages/ThemeManager/ThremeContext'

function App() {

  return (
    <>
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<h1>Welcome to React Router!</h1>} />
          <Route path="/about" element={<h1>About Page</h1>} />
          <Route path="/contact" element={<h1>Contact Page</h1>} />
          <Route path="/t" element={<ThemedButton/>} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
    </>
  )
}

export default App
