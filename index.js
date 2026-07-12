import express from 'express' 
import dotenv from 'dotenv' 

const app = express() 
// declara e inicializa las variables de entorno 
dotenv.config() 

/*
## 4. Middlewares Requeridos

1.  **Middleware de Logging (Global):**
    Un middleware que imprima en la consola de la terminal cada petición entrante con el formato:
    `[FECHA/HORA] METODO - /ruta - Body: {...}`

3.  **Middleware de Manejo de Errores (Global):**
    Capturar cualquier error no controlado en la aplicación y devolver un JSON genérico con código `500 Internal Server Error`.
*/
app.use(express.json()) 

const loggerMiddleware = (req, res, next) => {
  const fechaHora = new Date().toISOString();
  console.log(`[${fechaHora}] ${req.method} - ${req.originalUrl} - Body:`, req.body);
  next(); 
}

app.use(loggerMiddleware)

const errorHandler = (err, req, res, next) => {
  console.error("Error no controlado:", err);
  res.status(500).json({ status: 500, message: "Internal Server Error", data: null }); // [6, 7]
};

app.use(errorHandler)

const PORT = process.env.PORT || 3000

app.get('/', (req, res) => { 
  res.send('Hola mundo') 
})

app.listen(PORT, () => { 
  console.log(`Servidor en marcha en: http://localhost:${PORT}`) 
})