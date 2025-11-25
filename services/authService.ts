import { api } from './api';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone: string;
}

export interface AuthResponse {
  user: {
    id: string;
    name: string;
    email: string;
    phone: string;
  };
  token: string;
  refreshToken: string;
}

export const authService = {
  // Login
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/login', credentials);
    return response.data;
  },

  // Registro
  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/register', data);
    return response.data;
  },

  // Logout
  logout: async (): Promise<void> => {
    await api.post('/logout');
  },

  // Obtener perfil
  getProfile: async () => {
    const response = await api.get('/profile');
    return response.data;
  },

  // Actualizar perfil
  updateProfile: async (data: Partial<RegisterData>) => {
    const response = await api.patch('/profile', data);
    return response.data;
  },
};