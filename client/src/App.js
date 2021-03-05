import { BrowserRouter as Router } from 'react-router-dom';
import { useRoutes } from './routes';


const App = () => {
  const routes = useRoutes()
  return (
    <Router>
      {routes}
    </Router>
  )
}
export default App;
