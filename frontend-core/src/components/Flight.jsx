import React, { useState, useEffect, useCallback } from 'react'
import { getAll, createOne, deleteOne } from '../services/api.js'
import './Styles.css'

export default function Flight({ token }) {
  const [list, setList] = useState([])
  const [form, setForm] = useState({
    codigo_vuelo: '', fecha_salida: '', fecha_llegada: '', ruta_id: '', aeronave_id: '', evento_id: ''
  })

  // Estado para las opciones de las rutas, aeronaves y eventos
  const [rutas, setRutas] = useState([])
  const [aeronaves, setAeronaves] = useState([])
  const [eventos, setEventos] = useState([])

  // Función para cargar los vuelos y las opciones para los selects
  const load = useCallback(async () => {
    const data = await getAll('flights', token)
    setList(data.flights)

    // Cargar las opciones para los dropdowns
    const dataRutas = await getAll('routes', token)
    const dataAeronaves = await getAll('aircrafts', token)
    const dataEventos = await getAll('events', token)

    setRutas(dataRutas.routes)
    setAeronaves(dataAeronaves.aircrafts)
    setEventos(dataEventos.events)
  }, [token])

  // Cargar los datos al montar el componente
  useEffect(() => {
    load()
  }, [load])

  // Función para agregar un vuelo
  const add = async () => {
    try {
      await createOne('flights', form, token)
      setForm({codigo_vuelo: '', fecha_salida: '', fecha_llegada: '', ruta_id: '', aeronave_id: '', evento_id: ''})
      load()
      alert('Vuelo creado exitosamente')
    } catch (error) {
      console.error('Error al crear vuelo:', error.message)
      alert(`Error: ${error.message}`)
    }
  }

  // Función para eliminar un vuelo
  const del = async id => {
    await deleteOne('flights', id, token)
    load()
  }

  return (
      <div className="section">
        <h2>Vuelos</h2>

        <table className="section__table">
          <thead>
          <tr>
            <th>ID</th>
            <th>Código</th>
            <th>Salida</th>
            <th>Llegada</th>
            <th>Ruta</th>
            <th>Aeronave</th>
            <th>Evento</th>
            <th>Acciones</th>
          </tr>
          </thead>
          <tbody>
          {list.map(f => (
              <tr key={f.id}>
                <td>{f.id}</td>
                <td>{f.codigo_vuelo}</td>
                <td>{f.fecha_salida}</td>
                <td>{f.fecha_llegada}</td>
                <td>{f.ruta_id}</td>
                <td>{f.aeronave_id}</td>
                <td>{f.evento_id}</td>
                <td>
                  <button className="section__delete" onClick={() => del(f.id)}>Eliminar</button>
                </td>
              </tr>
          ))}
          </tbody>
        </table>

        <h3>Agregar Vuelo</h3>
        <div className="section__form">
          {Object.keys(form).map(k => {
            if (k === 'ruta_id') {
              return (
                  <select key={k} value={form[k]} onChange={e => setForm({...form, [k]: e.target.value})}>
                    <option value="">Seleccione Ruta</option>
                    {rutas.map(r => (
                        <option key={r.id} value={r.id}>{r.origen} → {r.destino}</option>
                    ))}
                  </select>
              )
            }
            if (k === 'aeronave_id') {
              return (
                  <select key={k} value={form[k]} onChange={e => setForm({...form, [k]: e.target.value})}>
                    <option value="">Seleccione Aeronave</option>
                    {aeronaves.map(a => (
                        <option key={a.id} value={a.id}>{a.matricula}</option>
                    ))}
                  </select>
              )
            }
            if (k === 'evento_id') {
              return (
                  <select key={k} value={form[k]} onChange={e => setForm({...form, [k]: e.target.value})}>
                    <option value="">Seleccione Evento</option>
                    {eventos.map(ev => (
                        <option key={ev.id} value={ev.id}>{ev.nombre_evento}</option>
                    ))}
                  </select>
              )
            }
            return (
                <input
                    key={k}
                    type={k.includes('fecha') ? 'datetime-local' : 'text'}
                    placeholder={k}
                    value={form[k]}
                    onChange={e => setForm({...form, [k]: e.target.value})}
                />
            )
          })}
          <button className="section__add" onClick={add}>Crear Vuelo</button>
        </div>
      </div>
  )
}
