import { useAuth } from '../context/AuthContext.tsx';

export const useAuthorization = () => {
  const { isAdmin, isUser } = useAuth();

  const canRead = () => isUser();
  const canCreate = () => isAdmin();
  const canUpdate = () => isAdmin();
  const canDelete = () => isAdmin();

  return {
    canRead,
    canCreate,
    canUpdate,
    canDelete,
  };
};

