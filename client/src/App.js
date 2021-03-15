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
  const { token, login, logout, userId, photoPath } = useAuth()
  const [activeAuth, setActiveAuth] = useState(false)
  const isAuthenticated = !!token;
  const [value, setValue] = useState('');
  const routes = useRoutes(isAuthenticated, value);

  return (
    <AuthContext.Provider value={{
      token, login, logout, userId, isAuthenticated, photoPath
    }}>
      <div className="bg">
        <AuthCard active={activeAuth} setAcive={setActiveAuth} />
        <Header active={activeAuth} setActive={setActiveAuth} value={value} setValue={setValue}/>
        <Router>
          {routes}
        </Router>
        <Footer />
      </div>
    </AuthContext.Provider>
  )
}
export default App;
