import { randomUUID } from 'node:crypto'

/*
## 1. Estructura de Datos Requerida
El arreglo en memoria debe almacenar objetos con la siguiente estructura:

` ` `javascript
{
  id: "uuid-v4",
  dniCliente: "0501-2000-12345",
  nombreCompleto: "Juan Perez",
  montoSolicitado: 15000,
  plazoMeses: 12,
  tasaInteres: 3.5,
  estado: "PENDIENTE", // Puede ser: PENDIENTE, APROBADA, RECHAZADA
  fechaCreacion: "2026-07-05T10:00:00Z"
}
` ` `
*/
let solicitudes = []

export default class SolicitudModel { 
  
  static async create(data) {
    const nuevaSolicitud = {
      id: randomUUID(),
      ...data,
      estado: "PENDIENTE", // Forzamos el estado a PENDIENTE
      fechaCreacion: new Date().toISOString()
    }
    solicitudes.push(nuevaSolicitud)
    return nuevaSolicitud
  }

  static async getAll({ estado }) {
    if (estado) {
      return solicitudes.filter(s => s.estado === estado)
    }
    return solicitudes
  }

  static async getById(id) {
    return solicitudes.find(s => s.id === id)
  }

  static async update(id, data) {
    const index = solicitudes.findIndex(s => s.id === id)
    if (index === -1) return null
    
    //Solo actualizar si está pendiente
    if (solicitudes[index].estado !== "PENDIENTE") {
      throw new Error("Solo se pueden actualizar solicitudes PENDIENTES")
    }

    solicitudes[index] = { ...solicitudes[index], ...data }
    return solicitudes[index]
  }

  static async updateEstado(id, estado) {
    const index = solicitudes.findIndex(s => s.id === id)
    if (index === -1) return null
    
    solicitudes[index].estado = estado
    return solicitudes[index]
  }

  static async delete(id) {
    const index = solicitudes.findIndex(s => s.id === id)
    if (index === -1) return false
    
    solicitudes.splice(index, 1)
    return true
  }
}