/*
## 4. Middlewares Requeridos

1.  **Middleware de Logging (Global):**
    Un middleware que imprima en la consola de la terminal cada petición entrante con el formato:
    `[FECHA/HORA] METODO - /ruta - Body: {...}`

    */

export const loggerMiddleware = (req, res, next) => {
  const fechaHora = new Date().toISOString()
  console.log(`[${fechaHora}] ${req.method} - ${req.originalUrl} - Body:`, req.body)
  next()
}
