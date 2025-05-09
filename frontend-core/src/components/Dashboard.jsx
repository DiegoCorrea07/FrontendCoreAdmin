import React, { useState } from 'react'
import Aircraft from './Aircraft.jsx'
import Route from './Route.jsx'
import Event from './Event.jsx'
import Flight from './Flight.jsx'
import Demand from './Demand.jsx'
import User from './User.jsx'
import './Dashboard.css'

export default function Dashboard({ token, onLogout }) {
  const [tab, setTab] = useState('Vuelos')
  const mapping = {
    'Aeronaves':          <Aircraft    token={token} />,
    'Rutas':              <Route       token={token} />,
    'Eventos':            <Event       token={token} />,
    'Vuelos':             <Flight      token={token} />,
    'Demanda Estimada':   <Demand      token={token} />,
    'Usuarios':           <User        token={token} />,
  }

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h2 className="sidebar__title">Administrador</h2>
        <div className="sidebar__menu">
          {Object.keys(mapping).map(label => (
            <button
              key={label}
              className={`sidebar__menu-item ${label === tab ? 'active' : ''}`}
              onClick={() => setTab(label)}
            >
              {label}
            </button>
          ))}
        </div>
        <button className="sidebar__logout" onClick={onLogout}>
          Cerrar Sesión
        </button>
      </aside>
      <main className="content">
        {mapping[tab]}
      </main>
    </div>
  )
}
