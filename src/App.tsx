import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import WelcomePage from './pages/WelcomePage'
import CategoryPage from './pages/CategoryPage'
import FunctionPage from './pages/FunctionPage'

function App() {
  return (
    <div className="h-screen w-screen overflow-hidden">
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/category" element={<CategoryPage />} />
        <Route path="/function/:restaurantId" element={<FunctionPage />} />
      </Routes>
    </div>
  )
}

export default App