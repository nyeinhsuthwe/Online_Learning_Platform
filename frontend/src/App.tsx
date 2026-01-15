import { RouterProvider } from "react-router-dom"
import route from "./routes/route"
import { Toaster } from "sonner"

function App() {


  return (
    <>
      <RouterProvider router={route} />
      <Toaster position="top-right"/>
    </>
  )
}

export default App
