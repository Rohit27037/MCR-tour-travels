import React from 'react'


export default function BusCard({ bus, onDetails }) {
return (
<article className="card" aria-label={`${bus.name} - ${bus.owner_name}`}>
<div className="card-media">
<img src={bus.image_url} alt={`${bus.name} image`} loading="lazy" />
</div>
<div className="card-body">
<h3 className="card-title">{bus.name}</h3>
<p className="owner">Owner: {bus.owner_name}</p>
<p className="desc">{bus.description}</p>
<div className="tag-list">
{bus.tags.map(t => <span key={t} className="pill">{t}</span>)}
</div>
<div className="card-actions">
<a className="btn" href={`tel:${bus.phone}`}>Call {bus.phone}</a>
<a className="btn ghost" href={`mailto:${bus.email}`}>Email</a>
<button className="btn primary" onClick={onDetails}>Details / Book</button>
</div>
</div>
</article>
)
}