const BASE = 'https://administracion-core-mvc.onrender.com'

export async function login(username, password) {
  const res = await fetch(`${BASE}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  })
  return res.json()
}

export async function getAll(resource, token) {
  const res = await fetch(`${BASE}/${resource}`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return res.json()
}

export async function createOne(resource, data, token) {
  const res = await fetch(`${BASE}/${resource}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.error || 'Error en la solicitud');
  }

  return json;
}

export async function updateOne(resource, id, data, token) {
  const res = await fetch(`${BASE}/${resource}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  })
  return res.json()
}

export async function deleteOne(resource, id, token) {
  const res = await fetch(`${BASE}/${resource}/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  })
  return res.json()
}
