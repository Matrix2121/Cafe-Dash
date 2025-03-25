import React from 'react';
import { useAuth } from '../context/AuthContext';

interface HasRolesProps {
  roles: string[];
  children: React.ReactNode;
}

const HasRoles = ({ roles, children }: HasRolesProps) => {
  const { user } = useAuth();

  if (!user) return null;

// Check if the user has at least one of the specified roles
  const hasAnyRole = roles.some(requiredRole =>
    user.roles.some(role => role.authority === requiredRole)
  );  

  if (!hasAnyRole) return null;

  return <>{children}</>;
};

export default HasRoles;
