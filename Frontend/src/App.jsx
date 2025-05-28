
import { Routes, Route } from 'react-router-dom'
import './App.css'
import { Home } from './pages/Home'
import { Header } from './component/Header'
import { Detail } from './pages/Detail'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path='/detail/:companyName' element={<Detail />}></Route>
      </Routes>
    </>
  )
}

export default App
