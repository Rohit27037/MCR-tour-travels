import React, { useState } from 'react'


export default function BusModal({ bus, onClose, onBook }) {
const [name, setName] = useState('')
const [phone, setPhone] = useState('')
const [date, setDate] = useState('')
const [seats, setSeats] = useState(1)


function handleSubmit(e) {
e.preventDefault()
if (!name || !phone || !date) {
alert('Please enter your name, phone and date.')
return
}
const booking = {
busId: bus.id,
busName: bus.name,
name,
phone,
date,
seats,
createdAt: new Date().toISOString()
}
onBook(booking)
}


return (
<div className="modal-overlay" role="dialog" aria-modal="true">
<div className="modal">
<header className="modal-header">
<h2>{bus.name}</h2>
<button className="close" onClick={onClose} aria-label="Close">✕</button>
</header>
<div className="modal-body">
<div className="modal-left">
<img src={bus.image_url} alt={`${bus.name} large`} />
<p><strong>Owner:</strong> {bus.owner_name}</p>
<p><strong>Phone:</strong> <a href={`tel:${bus.phone}`}>{bus.phone}</a></p>
{bus.alt_phone && <p><strong>Alt Phone:</strong> <a href={`tel:${bus.alt_phone}`}>{bus.alt_phone}</a></p>}
<p><strong>Email:</strong> <a href={`mailto:${bus.email}`}>{bus.email}</a></p>
<p className="muted">Capacity: {bus.capacity} • Tags: {bus.tags.join(', ')}</p>
</div>


<form className="booking-form" onSubmit={handleSubmit}>
<h3>Quick booking</h3>
<label>
Your name
<input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" />
</label>
<label>
Phone
<input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone number" />
</label>
<label>
Date
<input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
</label>
<label>
Seats
<input type="number" min={1} max={bus.capacity} value={seats} onChange={(e) => setSeats(Number(e.target.value))} />
</label>
<div className="form-actions">
<button type="button" className="btn ghost" onClick={onClose}>Cancel</button>
<button type="submit" className="btn primary">Confirm Booking</button>
</div>
</form>
</div>
</div>
</div>
)
}