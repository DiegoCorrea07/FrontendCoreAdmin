
import React, { useState, useEffect, useCallback } from 'react'
import { getAll, createOne, deleteOne } from '../services/api.js'

export default function Demand({ token }) {
  const [list, setList] = useState([])
  const [form, setForm] = useState({
    evento_id: '',
    ruta_id: '',
    demanda_esperada: ''
  })

  // Estados para las opciones de eventos y rutas
  const [eventos, setEventos] = useState([])
  const [rutas, setRutas] = useState([])

  // Carga inicial de demandas, eventos y rutas
  const load = useCallback(async () => {
    const dataDemands = await getAll('demands', token)
    setList(dataDemands.demands)

    const dataEvents = await getAll('events', token)
    setEventos(dataEvents.events)

    const dataRoutes = await getAll('routes', token)
    setRutas(dataRoutes.routes)
  }, [token])

  useEffect(() => {
    load()
  }, [load])

  // Crear nueva demanda
  const add = async () => {
    try {
      await createOne('demands', form, token)
      setForm({ evento_id: '', ruta_id: '', demanda_esperada: '' })
      load()
      alert('Demanda creada exitosamente')
    } catch (err) {
      console.error('Error al crear demanda:', err.message)
      alert(`Error: ${err.message}`)
    }
  }

  // Eliminar demanda
  const del = async (id) => {
    await deleteOne('demands', id, token)
    load()
  }

  return (
    <div className="section">
      <h2>Demandas</h2>
      <table className="section__table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Evento</th>
            <th>Ruta</th>
            <th>Demanda Esperada</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {list.map(d => (
            <tr key={d.id}>
              <td>{d.id}</td>
              <td>{/* Mostrar nombre de evento si lo quieres: */ d.evento_id}</td>
              <td>{d.ruta_id}</td>
              <td>{d.demanda_esperada}</td>
              <td>
                <button className="section__delete" onClick={() => del(d.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Agregar Demanda</h3>
      <div className="section__form">

        {/* Dropdown de eventos */}
        <select
          value={form.evento_id}
          onChange={e => setForm({ ...form, evento_id: e.target.value })}
        >
          <option value="">Seleccione Evento</option>
          {eventos.map(ev => (
            <option key={ev.id} value={ev.id}>
              {ev.nombre_evento /* o ev.codigo_evento */}
            </option>
          ))}
        </select>

        {/* Dropdown de rutas */}
        <select
          value={form.ruta_id}
          onChange={e => setForm({ ...form, ruta_id: e.target.value })}
        >
          <option value="">Seleccione Ruta</option>
          {rutas.map(r => (
            <option key={r.id} value={r.id}>
              {r.origen} → {r.destino}
            </option>
          ))}
        </select>

        {/* Input numérico para demanda */}
        <input
          type="number"
          placeholder="Demanda esperada"
          value={form.demanda_esperada}
          onChange={e => setForm({ ...form, demanda_esperada: e.target.value })}
          min="0"
        />

        <button className="section__add" onClick={add}>Crear Demanda</button>

      </div>
    </div>
  )
}
