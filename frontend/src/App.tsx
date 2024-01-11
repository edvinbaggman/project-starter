import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Signin from './pages/Signin';
import Layout from './components/Layout';
import Register from './pages/Register';
import ResetPassword from './pages/ResetPassword';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <Layout>
          <Dashboard />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/signin',
    element: (
      <Layout>
        <Signin />
      </Layout>
    ),
  },
  {
    path: '/register',
    element: (
      <Layout>
        <Register />
      </Layout>
    ),
  },
  {
    path: '/resetPassword',
    element: (
      <Layout>
        <ResetPassword />
      </Layout>
    ),
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
