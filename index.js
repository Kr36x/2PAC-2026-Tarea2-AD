import express from 'express'
import dotenv from 'dotenv' 
import solicitudesRoutes from './src/routes/solicitudes.routes.js'
import { loggerMiddleware } from './src/middlewares/logger.middleware.js'
import { errorHandler } from './src/middlewares/errorHandler.middleware.js'



const app = express() 
// declara e inicializa las variables de entorno 
dotenv.config() 


app.use(express.json()) 
app.use(loggerMiddleware)

app.use('/api/solicitudes', solicitudesRoutes)
app.use(errorHandler)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => { 
  console.log(`Servidor en marcha en: http://localhost:${PORT}`) 
})