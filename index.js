import express from 'express' 
import dotenv from 'dotenv' 

const app = express() 
// declara e inicializa las variables de entorno 
dotenv.config() 

// Intercepta las peticiones y las respuestas 
app.use(express.json()) 


const PORT = process.env.PORT || 3000

app.get('/', (req, res) => { 
  res.send('Hola mundo') 
})

app.listen(PORT, () => { 
  console.log(`Servidor en marcha en: http://localhost:${PORT}`) 
})