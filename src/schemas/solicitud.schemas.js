import * as z from 'zod'

/*
## 2. Reglas de Validación (Implementar con Zod)
Los estudiantes deben crear un esquema de Zod para validar el `body` en las peticiones de creación y actualización basándose en estas reglas:
*   **dniCliente:** String, formato válido de 13 a 15 caracteres (puede incluir guiones).
*   **nombreCompleto:** String, mínimo 5 caracteres, máximo 100.
*   **montoSolicitado:** Número, obligatorio, mayor o igual a `1000` y menor o igual a `100000`.
*   **plazoMeses:** Número entero, obligatorio, mínimo `1` y máximo `60`.
*   **tasaInteres:** Número, opcional (si no se envía, por defecto es `5.0`).
*   **estado:** No debe permitirse enviar este campo al crear; el sistema debe forzarlo siempre a `"PENDIENTE"` en el `POST`.
*/


export const solicitudSchema = z.object({
  dniCliente: z.string().min(13).max(15),
  nombreCompleto: z.string().min(5).max(100),
  montoSolicitado: z.number().min(1000).max(100000),
  plazoMeses: z.number().int().min(1).max(60),
  tasaInteres: z.number().optional().default(5.0) // Si o nse envía, Zod lo setea en 5.0 automáticamente
}).strict()

export const estadoSchema = z.object({
  estado: z.enum(["APROBADA", "RECHAZADA"]) // Solo permite estos dos valores
}).strict()