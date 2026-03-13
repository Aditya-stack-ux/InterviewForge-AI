import React from 'react'
import {router} from "./app.routes"
import { RouterProvider } from 'react-router'
import { AuthProvider } from './features/auth/auth.context'
import { InterviewProvider } from './features/interview/interview.context'

const App = () => {
  return (
    <AuthProvider>
    <InterviewProvider>
      <RouterProvider router={router}/>
    </InterviewProvider>
    </AuthProvider>
  )
}

export default App
