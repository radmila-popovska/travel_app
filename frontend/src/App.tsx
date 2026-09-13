import './App.css';
import {Routes, Route, Navigate} from 'react-router-dom';
import Layout from './ui/layout/Layout.tsx';
import LoginPage from './ui/pages/LoginPage/LoginPage.tsx';
import RegisterPage from './ui/pages/RegisterPage/RegisterPage.tsx';
import Home from './ui/pages/Home/Home.tsx';
import AccommodationsPage from './ui/pages/AccommodationsPage/AccommodationsPage.tsx';
import AccommodationDetailsPage from './ui/pages/AccommodationDetailsPage/AccommodationDetailsPage.tsx';
import HostsPage from './ui/pages/HostsPage/HostsPage.tsx';
import HostDetailsPage from './ui/pages/HostDetailsPage/HostDetailsPage.tsx';
import CountriesPage from './ui/pages/CountriesPage/CountriesPage.tsx';
import CountryDetailsPage from './ui/pages/CountryDetailsPage/CountryDetailsPage.tsx';
import UsersPage from './ui/pages/UsersPage/UsersPage.tsx';
import UserDetailsPage from './ui/pages/UserDetailsPage/UserDetailsPage.tsx';
import ReservationsPage from './ui/pages/ReservationsPage/ReservationsPage.tsx';
import ProtectedRoute from './components/ProtectedRoute.tsx';
import {AuthProvider, useAuth} from './context/AuthContext.tsx';
import StatisticsPage from './ui/pages/StatisticsPage/StatisticsPage.tsx';

const StatisticsRoute = () => {
    const {  isAdmin } = useAuth();
    // if (!isAuthenticated) return <Navigate to="/login" replace />;
    // if (!isAdmin()) return <Navigate to="/accommodations" replace />;
    if (!isAdmin()) return <Navigate to="/accommodations" replace />;
    return <StatisticsPage />;
};
function App() {
  return (
    <AuthProvider>
      <Routes>
          <Route path="/statistics" element={<StatisticsRoute />} />
        {/* Public authentication routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected routes with layout */}
        <Route element={<Layout />}>
          {/* Home page is accessible to everyone (authenticated and unauthenticated) */}
          <Route path="/" element={<Home />} />

          {/* Read operations - accessible to USER and ADMINISTRATOR roles */}
          <Route
            path="/accommodations"
            element={
              <ProtectedRoute requiredRoles={['USER', 'ADMINISTRATOR']}>
                <AccommodationsPage />
              </ProtectedRoute>
            }
          />
            {/*<Route path='/statistics' element={<StatisticsPage />} />*/}
          <Route
            path="/accommodations/:id"
            element={
              <ProtectedRoute requiredRoles={['USER', 'ADMINISTRATOR']}>
                <AccommodationDetailsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/hosts"
            element={
              <ProtectedRoute requiredRoles={['USER', 'ADMINISTRATOR']}>
                <HostsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/hosts/:id"
            element={
              <ProtectedRoute requiredRoles={['USER', 'ADMINISTRATOR']}>
                <HostDetailsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/countries"
            element={
              <ProtectedRoute requiredRoles={['USER', 'ADMINISTRATOR']}>
                <CountriesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/countries/:id"
            element={
              <ProtectedRoute requiredRoles={['USER', 'ADMINISTRATOR']}>
                <CountryDetailsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users"
            element={
              <ProtectedRoute requiredRoles={['USER', 'ADMINISTRATOR']}>
                <UsersPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users/:id"
            element={
              <ProtectedRoute requiredRoles={['USER', 'ADMINISTRATOR']}>
                <UserDetailsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reservations"
            element={
              <ProtectedRoute requiredRoles={['ADMINISTRATOR']}>
                <ReservationsPage />
              </ProtectedRoute>
            }
          />
        {/*    <Route*/}
        {/*    path="/statistics"*/}
        {/*    element={*/}
        {/*        <ProtectedRoute requiredRoles={['ADMINISTRATOR']}>*/}
        {/*            <StatisticsPage />*/}
        {/*        </ProtectedRoute>*/}
        {/*    }*/}
        {/*/>*/}
        </Route>

      </Routes>
    </AuthProvider>
  );
}

export default App;
