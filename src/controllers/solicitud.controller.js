import SolicitudModel from '../models/solicitud.model.js'
import { jsonResponse } from '../helpers/json_response.js'

export const createSolicitud = async (req, res, next) => {
  try {
    const nueva = await SolicitudModel.create(req.body)
    res.status(201).json(jsonResponse({ status: 201, message: "Solicitud creada exitosamente", data: nueva }))
  } catch (error) { next(error) } 
}

export const getAllSolicitudes = async (req, res, next) => {
  try {
    const { estado } = req.query
    const solicitudes = await SolicitudModel.getAll({ estado })
    res.json(jsonResponse({ message: "Listado de solicitudes", data: solicitudes }))
  } catch (error) { next(error) }
}

export const getSolicitudById = async (req, res, next) => {
  try {
    const solicitud = await SolicitudModel.getById(req.params.id)
    if (!solicitud) return res.status(404).json(jsonResponse({ status: 404, message: "Solicitud no encontrada" }))
    
    res.json(jsonResponse({ message: "Solicitud encontrada", data: solicitud }))
  } catch (error) { next(error) }
}

export const updateSolicitud = async (req, res, next) => {
  try {
    const actualizada = await SolicitudModel.update(req.params.id, req.body)
    if (!actualizada) return res.status(404).json(jsonResponse({ status: 404, message: "Solicitud no encontrada" }))
    
    res.json(jsonResponse({ message: "Solicitud actualizada", data: actualizada }))
  } catch (error) { 
    // Si el error es la regla de "No pendiente", devolvemos 400
    if (error.message.includes("PENDIENTES")) {
       return res.status(400).json(jsonResponse({ status: 400, message: error.message }))
    }
    next(error)
  }
}

export const updateEstadoSolicitud = async (req, res, next) => {
  try {
    const { estado } = req.body
    const actualizada = await SolicitudModel.updateEstado(req.params.id, estado)
    if (!actualizada) return res.status(404).json(jsonResponse({ status: 404, message: "Solicitud no encontrada" }))
    
    res.json(jsonResponse({ message: `Estado actualizado a ${estado}`, data: actualizada }))
  } catch (error) { next(error) }
}

export const deleteSolicitud = async (req, res, next) => {
  try {
    const eliminado = await SolicitudModel.delete(req.params.id)
    if (!eliminado) return res.status(404).json(jsonResponse({ status: 404, message: "Solicitud no encontrada" }))
    
    res.json(jsonResponse({ message: "Solicitud eliminada exitosamente" }))
  } catch (error) { next(error) }
}