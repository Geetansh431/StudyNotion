import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { routerConfig } from './routes/routerConfig'

const appRouter = createBrowserRouter(routerConfig)

export function App() {
  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  )
}
