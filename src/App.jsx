import { RecipeShare } from './pages/RecipeShare.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Signup } from './pages/Signup.jsx'
import { AuthContextProvider } from './contexts/AuthContext.jsx'
// import { io } from 'socket.io-client'
import { SocketIOContextProvider } from './contexts/SocketIOContext.jsx'
import { Login } from './pages/Login.jsx'
import { getRecipes, getRecipeById } from './api/recipes.js'
import { ViewRecipe } from './pages/ViewRecipe.jsx'
import {
  QueryClient,
  QueryClientProvider,
  dehydrate,
  HydrationBoundary,
} from '@tanstack/react-query'
import { getUserInfo } from './api/users.js'
import { useLoaderData } from 'react-router'
// import { Chat } from './pages/Chat.jsx'

// const socket = io(import.meta.env.VITE_SOCKET_HOST, {
//   query: 'room=' + new URLSearchParams(window.location.search).get('room'),
//   auth: {
//     token: new URLSearchParams(window.location.search).get('token'),
//   },
// })

const queryClient = new QueryClient()
export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider client={queryClient}>
        <SocketIOContextProvider>
          <RouterProvider router={router} />
        </SocketIOContextProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    loader: async () => {
      const queryClient = new QueryClient()
      const author = ''
      const sortBy = 'createdAt'
      const sortOrder = 'descending'
      const recipes = await getRecipes({ author, sortBy, sortOrder })
      await queryClient.prefetchQuery({
        queryKey: ['recipes', { author, sortBy, sortOrder }],
        queryFn: () => recipes,
      })
      const uniqueAuthors = recipes
        .map((recipe) => recipe.author)
        .filter((value, index, array) => array.indexOf(value) === index)
      for (const userId of uniqueAuthors) {
        await queryClient.prefetchQuery({
          queryKey: ['users', userId],
          queryFn: () => getUserInfo(userId),
        })
      }
      return dehydrate(queryClient)
    },
    Component() {
      const dehydratedState = useLoaderData()
      return (
        <HydrationBoundary state={dehydratedState}>
          <RecipeShare />
        </HydrationBoundary>
      )
    },
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/recipes/:recipeId/:slug?',
    loader: async ({ params }) => {
      const recipeId = params.recipeId
      const queryClient = new QueryClient()
      const recipe = await getRecipeById(recipeId)
      await queryClient.prefetchQuery({
        queryKey: ['recipe', recipeId],
        queryFn: () => recipe,
      })
      if (recipe?.author) {
        await queryClient.prefetchQuery({
          queryKey: ['users', recipe.author],
          queryFn: () => getUserInfo(recipe.author),
        })
      }
      return { dehydratedState: dehydrate(queryClient), recipeId }
    },

    Component() {
      const { dehydratedState, recipeId } = useLoaderData()
      return (
        <HydrationBoundary state={dehydratedState}>
          <ViewRecipe recipeId={recipeId} />
        </HydrationBoundary>
      )
    },
  },
])
// socket.on('connect', async () => {
//   console.log('connected to socket.io as', socket.id)
//   socket.emit(
//     'chat.message',
//     new URLSearchParams(window.location.search).get('mymessage'),
//   )
//   const userInfo = await socket.emitWithAck('user.info', socket.id)
//   console.log('user info', userInfo)
// })
// socket.on('connect_error', (err) => {
//   console.error('socket.io connect error:', err)
// })
// socket.on('chat.message', (msg) => {
//   console.log(`${msg.username}: ${msg.message}`)
// })
