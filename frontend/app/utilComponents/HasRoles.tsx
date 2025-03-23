import React from 'react';
import { useAuth } from '../context/AuthContext';

interface HasRolesProps {
  roles: string[];
  children: React.ReactNode;
}

const HasRoles = ({ roles, children }: HasRolesProps) => {
  const { user } = useAuth();

  if (!user) return null;

  const hasAllRoles = roles.every(requiredRole =>
    user.roles.some(role => role.authority === requiredRole)
  );

  if (!hasAllRoles) return null;

  return <>{children}</>;
};

export default HasRoles;
