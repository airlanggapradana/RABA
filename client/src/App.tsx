import './App.css'
import {BrowserRouter, Routes, Route} from "react-router";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1 className={'font-bold text-4xl text-center'}>Hello World!</h1>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
