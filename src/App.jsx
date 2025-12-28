import React, { useEffect, useMemo, useState } from 'react'
import busesData from './data/buses.json'
import BusCard from './components/BusCard'
import BusModal from './components/BusModal'
import SearchBar from './components/SearchBar'
import Slideshow from './components/Slideshow'

export default function App() {
  const [query, setQuery] = useState('')
  const [selectedTag, setSelectedTag] = useState('')
  const [selectedBus, setSelectedBus] = useState(null)
  const [bookings, setBookings] = useState([])

  useEffect(() => {
    const saved = localStorage.getItem('bookings')
    if (saved) setBookings(JSON.parse(saved))
  }, [])

  useEffect(() => {
    localStorage.setItem('bookings', JSON.stringify(bookings))
  }, [bookings])

  const tags = useMemo(() => {
    const set = new Set()
    busesData.forEach(b => b.tags.forEach(t => set.add(t)))
    return Array.from(set)
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return busesData.filter(b => {
      const matchQuery = q === '' ||
        b.name.toLowerCase().includes(q) ||
        b.owner_name.toLowerCase().includes(q) ||
        b.description.toLowerCase().includes(q) ||
        b.tags.join(' ').toLowerCase().includes(q)

      const matchTag = selectedTag === '' || b.tags.includes(selectedTag)
      return matchQuery && matchTag
    })
  }, [query, selectedTag])

  function handleOpenDetails(bus) {
    setSelectedBus(bus)
  }

  function handleCloseModal() {
    setSelectedBus(null)
  }

  function handleAddBooking(booking) {
    setBookings(prev => [booking, ...prev])
    alert('Booking saved locally!')
    setSelectedBus(null)
  }

  // slideshow images hosted in public/assets/images/
  const slides = [
    '/assets/images/slide1.jpg',
    '/assets/images/slide2.jpg',
    '/assets/images/slide3.jpg'
  ]

  return (
    <div className="app-root">
      <header className="header header-with-slideshow">
        <div className="header-left">
          <img src="/assets/images/logo.png" alt="MCR Tour & Travels logo" className="logo" />
          <div>
            <h1>MCR Tour & Travels</h1>
            <p className="subtitle">Book buses by capacity — weddings, tours, and local services</p>
          </div>
        </div>

        <div className="header-right">
          <Slideshow images={slides} interval={3000} />
        </div>
      </header>

      <main className="container">
        <SearchBar value={query} onChange={setQuery} placeholder="Search by bus, owner, tag..." />

        <div className="tag-bar">
          <button
            className={`tag ${selectedTag === '' ? 'active' : ''}`}
            onClick={() => setSelectedTag('')}
          >All</button>
          {tags.map(tag => (
            <button
              key={tag}
              className={`tag ${selectedTag === tag ? 'active' : ''}`}
              onClick={() => setSelectedTag(tag)}
            >{tag}</button>
          ))}
        </div>

        <section className="grid">
          {filtered.map(bus => (
            <BusCard key={bus.id} bus={bus} onDetails={() => handleOpenDetails(bus)} />
          ))}
          {filtered.length === 0 && (
            <div className="empty">No buses match your search.</div>
          )}
        </section>

        <section className="bookings">
          <h2>Your local bookings</h2>
          {bookings.length === 0 ? (
            <p className="muted">No bookings yet — create one by clicking "Details" on a bus.</p>
          ) : (
            <ul>
              {bookings.map((b, i) => (
                <li key={i} className="booking-item">
                  <strong>{b.busName}</strong> — {b.name} ({b.phone}) on {b.date} • Seats: {b.seats}
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>

      <footer className="footer">
        <small>© {new Date().getFullYear()} MCR Tour & Travels — All rights reserved.</small>
      </footer>

      {selectedBus && (
        <BusModal
          bus={selectedBus}
          onClose={handleCloseModal}
          onBook={handleAddBooking}
        />
      )}
    </div>
  )
}

