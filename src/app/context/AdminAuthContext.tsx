import { createContext, useContext, useState, ReactNode } from 'react';

export type AdminRole = 'administrador' | 'marketing' | 'visualizador';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  isActive: boolean;
}

interface AdminAuthContextType {
  isAdminLoggedIn: boolean;
  adminUser: AdminUser | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  hasPermission: (module: string) => boolean;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export function formatDisplayName(fullName: string): string {
  const parts = fullName.trim().split(/\s+/);
  return parts.length >= 2 ? `${parts[0]} ${parts[1]}` : fullName;
}

// Matches the users registered in Usuarios.tsx (same IDs, real names and emails)
const mockAdminUsers: (AdminUser & { password: string })[] = [
  {
    id: '1',
    name: 'Juan Pérez García',
    email: 'juan.perez@autex.com.mx',
    password: 'admin123',
    role: 'administrador',
    isActive: true
  },
  {
    id: '2',
    name: 'María López Hernández',
    email: 'maria.lopez@autex.com.mx',
    password: 'marketing123',
    role: 'marketing',
    isActive: true
  },
  {
    id: '3',
    name: 'Carlos Ramírez Torres',
    email: 'carlos.ramirez@autex.com.mx',
    password: 'viewer123',
    role: 'visualizador',
    isActive: true
  },
];

// Permissions by role
const rolePermissions: Record<AdminRole, string[]> = {
  administrador: ['usuarios', 'landings', 'banners', 'cupones', 'footer', 'formularios', 'catalogo'],
  marketing: ['landings', 'banners', 'cupones', 'footer', 'catalogo'],
  visualizador: []
};

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));

    const user = mockAdminUsers.find(
      u => u.email === email && u.password === password && u.isActive
    );

    if (user) {
      const { password: _, ...userData } = user;
      setAdminUser(userData);
      setIsAdminLoggedIn(true);
      return true;
    }

    return false;
  };

  const logout = () => {
    setAdminUser(null);
    setIsAdminLoggedIn(false);
  };

  const hasPermission = (module: string): boolean => {
    if (!adminUser) return false;
    if (adminUser.role === 'administrador') return true;
    return rolePermissions[adminUser.role].includes(module);
  };

  return (
    <AdminAuthContext.Provider
      value={{
        isAdminLoggedIn,
        adminUser,
        login,
        logout,
        hasPermission
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
}
