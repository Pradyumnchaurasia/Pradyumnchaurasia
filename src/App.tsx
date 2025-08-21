import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import TryOn from './pages/TryOn'
import DressGallery from './pages/DressGallery'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-blue-50">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/try-on" element={<TryOn />} />
          <Route path="/gallery" element={<DressGallery />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App