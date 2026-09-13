import React from 'react';
import { Navigate } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';
import { useAuth } from '../context/AuthContext.tsx';
//import UnauthorizedPage from '../ui/pages/UnauthorizedPage/UnauthorizedPage.tsx';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRoles?: string[];
}

// const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRoles }) => {
//   const { isAuthenticated, isLoading, user } = useAuth();
//
//   if (isLoading) {
//     return (
//       <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
//         <CircularProgress />
//       </Box>
//     );
//   }
//
//   if (!isAuthenticated) {
//     return <Navigate to="/login" replace />;
//   }
//
//   if (requiredRoles && requiredRoles.length > 0) {
//     const userRole = user?.role || '';
//     const hasRequiredRole = requiredRoles.some(role =>
//       userRole === role ||
//       userRole === `ROLE_${role}` ||
//       userRole.toLowerCase() === role.toLowerCase()
//     );
//
//     if (!hasRequiredRole) {
//       return <Navigate to="/" replace />;  // ← ова веќе го имаш
//     }
//   }
//
//   return <>{children}</>;
// };
// const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRoles }) => {
//   const { isAuthenticated, isLoading, user } = useAuth();
//
//   // Чекај додека се вчитува auth состојбата
//   if (isLoading) {
//     return (
//         <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
//           <CircularProgress />
//         </Box>
//     );
//   }
//
//   // Ако не е автентициран, прати на login
//   if (!isAuthenticated) {
//     const savedToken = localStorage.getItem('jwt_token');
//     // Ако токенот постои но user сеуште се вчитува, чекај
//     if (savedToken) {
//       return (
//           <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
//             <CircularProgress />
//           </Box>
//       );
//     }
//     return <Navigate to="/login" replace />;
//   }
//
//   // Провери роли
//   if (requiredRoles && requiredRoles.length > 0) {
//     const userRole = user?.role || '';
//     console.log('USER ROLE:', userRole);           // ← додај
//     console.log('REQUIRED:', requiredRoles);
//     const hasRequiredRole = requiredRoles.some(role =>
//         userRole === role ||
//         userRole === `ROLE_${role}` ||
//         userRole.toLowerCase() === role.toLowerCase()
//     );
//     console.log('HAS ROLE:', hasRequiredRole);      // ← додај
//
//     if (!hasRequiredRole) {
//       return <Navigate to="/home" replace />;
//     }
//   }
//
//   return <>{children}</>;
// };
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRoles }) => {
  const { isAuthenticated, isLoading, user, isAdmin } = useAuth();

  if (isLoading) {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
          <CircularProgress />
        </Box>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Логиран е, но нема потребна рола → врати на Home
  if (requiredRoles && requiredRoles.length > 0) {
    const userRole = user?.role || '';
    const hasRequiredRole = requiredRoles.some(role =>
        userRole === role ||
        userRole === `ROLE_${role}` ||
        userRole.toLowerCase() === role.toLowerCase()
    ) || isAdmin();

    if (!hasRequiredRole) {
      return <Navigate to="/" replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;


