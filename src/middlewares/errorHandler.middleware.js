/*
## 4. Middlewares Requeridos
3.  **Middleware de Manejo de Errores (Global):**
    Capturar cualquier error no controlado en la aplicación y devolver un JSON genérico con código `500 Internal Server Error`.
*/

export const errorHandler = (err, req, res, next) => {
  console.error("Error no controlado:", err)
  res.status(500).json({ status: 500, message: "Internal Server Error", data: null })
};
