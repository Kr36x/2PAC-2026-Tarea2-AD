import { Router } from 'express'
import { createSolicitud, getAllSolicitudes, getSolicitudById, updateSolicitud, updateEstadoSolicitud, deleteSolicitud } from '../controllers/solicitud.controller.js'
import { validateSchema } from '../middlewares/validacion.middleware.js'
import { solicitudSchema, estadoSchema } from '../schemas/solicitud.schemas.js'

const solicitudesRoutes = Router()
/*
## 3. Endpoints a Desarrollar

| Método | Ruta | Descripción |
| :--- | :--- | :--- |
| `POST` | `/api/solicitudes` | Crea una nueva solicitud. Debe pasar por el middleware de validación de Zod. |
| `GET` | `/api/solicitudes` | Devuelve todas las solicitudes. Debe aceptar un *Query Param* opcional `?estado=APROBADA` para filtrar resultados. |
| `GET` | `/api/solicitudes/:id` | Devuelve una solicitud específica. Si no existe, retorna código `404`. |
| `PUT` | `/api/solicitudes/:id` | Actualiza los datos de la solicitud (monto, plazo, nombre). Solo permitido si el estado es `PENDIENTE`. |
| `PATCH` | `/api/solicitudes/:id/estado` | Endpoint específico para cambiar el estado a `APROBADA` o `RECHAZADA`. Requiere validación Zod propia. |
| `DELETE` | `/api/solicitudes/:id` | Elimina la solicitud del arreglo. |
*/
solicitudesRoutes.post('/', validateSchema(solicitudSchema), createSolicitud)
solicitudesRoutes.get('/', getAllSolicitudes)
solicitudesRoutes.get('/:id', getSolicitudById)
solicitudesRoutes.put('/:id', validateSchema(solicitudSchema), updateSolicitud)
solicitudesRoutes.patch('/:id/estado', validateSchema(estadoSchema), updateEstadoSolicitud)
solicitudesRoutes.delete('/:id', deleteSolicitud)

export default solicitudesRoutes