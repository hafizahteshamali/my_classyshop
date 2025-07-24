import { BrowserRouter } from 'react-router-dom'
import './App.css'
import AppRoutes from './routing/AppRoutes'

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
