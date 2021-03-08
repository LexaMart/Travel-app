import { BrowserRouter as Router } from 'react-router-dom';
import { useRoutes } from './routes';
import './app.css';
import { Header } from './pages/components/header/header';
import { Footer } from './pages/components/footer/footer';
import { useAuth } from './hooks/auth.hook';
import { AuthContext } from './context/AuthContext';
import 'materialize-css';



const App = () => {
  const { token, login, logout, userId } = useAuth()
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated)
  return (
    <AuthContext.Provider value={{
      token, login, logout, userId, isAuthenticated
    }}>
      <div class="bg">
          <Header />
          <Router>
            {routes}
          </Router>
          <Footer />
      </div>
    </AuthContext.Provider>
  )
}
export default App;
