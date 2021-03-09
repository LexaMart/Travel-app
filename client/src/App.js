import { BrowserRouter as Router } from 'react-router-dom';
import { useRoutes } from './routes';
import './app.css';
import { Header } from './pages/components/header/Header';
import { Footer } from './pages/components/footer/Footer';
import { useAuth } from './hooks/auth.hook';
import { AuthCard } from './pages/components/AuthCard/Auth';
import { AuthContext } from './context/AuthContext';
import { useState } from 'react';
import 'materialize-css';

const App = () => {
  const { token, login, logout, userId } = useAuth()
  const [activeAuth, setActiveAuth] = useState(false)
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated)

  return (
    <AuthContext.Provider value={{
      token, login, logout, userId, isAuthenticated
    }}>
      <div class="bg">
        <AuthCard active={activeAuth} setAcive={setActiveAuth} />
        <Header active={activeAuth} setActive={setActiveAuth} />
        <Router>
          {routes}
        </Router>
        <Footer />
      </div>
    </AuthContext.Provider>
  )
}
export default App;
