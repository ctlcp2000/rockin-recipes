import express from 'express'
import { createRecipe, updateRecipe, deleteRecipe, toggleLike } from './services/recipes.js'
import { recipeRoutes } from './routes/recipes.js'
import { userRoutes } from './routes/users.js'
import bodyParser from 'body-parser'
import cors from 'cors'
import { createServer } from 'node:http'
import { Server } from 'socket.io'
import { handleSocket } from './socket.js'



const app = express()
app.use(cors())
app.use(bodyParser.json())
recipeRoutes(app)
userRoutes(app)

app.get('/', (req, res) => {
  res.send('Hello from Express!')
})
const server = createServer(app)
const io = new Server(server, {
  cors: {
    origin: '*',
  },
})
handleSocket(io)
// io.on('connection', (socket) => {
//   console.log('user connected:', socket.id)
//   socket.on('disconnect', () => {
//     console.log('user disconnected:', socket.id)
//   })
// })
export { server as app }
// export { app }


app.post('/api/v1/recipes', async (req, res) => {
  try {
    const recipe = await createRecipe(req.body)
    return res.json(recipe)
  } catch (err) {
    console.error('error creating recipe', err)
    return res.status(500).end()
  }
})

app.patch('/api/v1/recipes/:id', async (req, res) => {
  try {
    const recipe = await updateRecipe(req.params.id, req.body)
    return res.json(recipe)
  } catch (err) {
    console.error('error updating recipe', err)
    return res.status(500).end()
  }
})

app.patch('/api/v1/recipes', async (req, res) => {
  try {
    const recipe = await toggleLike(req.body._id, req.body.likingUserId)
    return res.json(recipe)
  } catch (err) {
    console.error('error liking recipe', err)
    return res.status(500).end()
  }
})

app.delete('/api/v1/recipes/:id', async (req, res) => {
  try {
    const { deletedCount } = await deleteRecipe(req.params.id)
    if (deletedCount === 0) return res.sendStatus(404)
    return res.status(204).end()
  } catch (err) {
    console.error('error deleting recipe', err)
    return res.status(500).end()
  }
})
