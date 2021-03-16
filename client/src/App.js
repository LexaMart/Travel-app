import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { useRoutes } from './routes';
import './app.css';
import { Header } from './pages/components/header/header';
import { Footer } from './pages/components/footer/footer';
import { useAuth } from './hooks/auth.hook';
import { AuthCard } from './pages/components/AuthCard/Auth';
import { AuthContext } from './context/AuthContext';
import { useState } from 'react';
import { store } from './store/store';
import 'materialize-css';

const App = () => {
  const { token, login, logout, userId, photoPath } = useAuth()
  const [activeAuth, setActiveAuth] = useState(false)
  const isAuthenticated = !!token;
  const [value, setValue] = useState('');
  const routes = useRoutes(isAuthenticated, value);

  return (
    <Provider store={store} >
      <AuthContext.Provider value={{
        token, login, logout, userId, isAuthenticated, photoPath
      }}>
        <div className="bg">
          <AuthCard active={activeAuth} setAcive={setActiveAuth} />
          <Header active={activeAuth} setActive={setActiveAuth} value={value} setValue={setValue} />
          <Router>
            {routes}
          </Router>
          <Footer />
        </div>
      </AuthContext.Provider>
    </Provider>
  )
}
export default App;
