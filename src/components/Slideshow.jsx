import React, { useEffect, useState } from 'react'


export default function Slideshow({ images = [], interval = 3000 }) {
const [index, setIndex] = useState(0)


useEffect(() => {
if (!images || images.length === 0) return
const id = setInterval(() => {
setIndex(i => (i + 1) % images.length)
}, interval)
return () => clearInterval(id)
}, [images, interval])


if (!images || images.length === 0) return null


return (
<div className="slideshow" aria-hidden="false">
{images.map((src, i) => (
<img
key={src}
src={src}
alt={`Slide ${i + 1}`}
className={`slide ${i === index ? 'active' : ''}`}
loading="lazy"
/>
))}
<div className="dots">
{images.map((_, i) => (
<button key={i} className={`dot ${i === index ? 'on' : ''}`} aria-label={`Go to slide ${i + 1}`} onClick={() => setIndex(i)}></button>
))}
</div>
</div>
)
}