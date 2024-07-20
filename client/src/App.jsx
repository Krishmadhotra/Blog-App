import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import SignUp from './pages/SignUp'
import Dashboard from "./pages/Dashboard"
import Projects from "./pages/Projects"
import SignIn from "./pages/SignIn"
import Header from './Components/Header'
import Footer from "./Components/Footer"
import PrivateRoute from './Components/PrivateRoute'
import updatePost from './pages/updatePost'
import CreatePost from './pages/createPost'
import AdminPrivateRoute from './Components/adminPrivateRoute'

const App = () => {
  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element= {<About />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        <Route element={<AdminPrivateRoute />}>
        <>
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/update-post/:postId" element={<updatePost />} />
        </>
        </Route>m

        <Route path="/projects" element={<Projects />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App