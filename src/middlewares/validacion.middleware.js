/*
## 4. Middlewares Requeridos
2.  **Middleware de Validación (Específico):**
    Una función de orden superior (Higher-Order Function) que reciba un esquema de Zod por parámetro e intercepte la petición. 
    Si los datos son inválidos, debe retornar un código `400 Bad Request` con el detalle de los errores generados por Zod, 
    deteniendo la ejecución antes de llegar al controlador.
*/


export const validateSchema = (schema) => (req, res, next) => {
  // Procesamos la info con safeParse para validar de forma segura [5]
  const result = schema.safeParse(req.body)
  
  if (!result.success) {
    return res.status(400).json({
      status: 400,
      message: "Errores de validación",
      data: result.error.errors
    })
  }
  // Si todo es válido, reemplazamos el body con la data parseada (para aplicar el default de tasaInteres)
  req.body = result.data
  next()
};