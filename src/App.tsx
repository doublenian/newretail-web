import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import WelcomePage from './pages/WelcomePage'
import CategoryPage from './pages/CategoryPage'
import FunctionPage from './pages/FunctionPage'
import TablesPage from './pages/TablesPage'
import OrderingPage from './pages/OrderingPage'
import OrderDetailsPage from './pages/OrderDetailsPage'
import OrdersPage from './pages/OrdersPage'

function App() {
  return (
    <div className="h-screen w-screen overflow-hidden">
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/category" element={<CategoryPage />} />
        <Route path="/function/:restaurantId" element={<FunctionPage />} />
        <Route path="/tables" element={<TablesPage />} />
        <Route path="/ordering/:tableNumber" element={<OrderingPage />} />
        <Route path="/order-details/:tableNumber" element={<OrderDetailsPage />} />
        <Route path="/orders" element={<OrdersPage />} />
      </Routes>
    </div>
  )
}

export default App