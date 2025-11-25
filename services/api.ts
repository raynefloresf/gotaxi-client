import { useAuthStore } from '@/store/authStore';
import axios from 'axios';
import Constants from 'expo-constants';

const API_BASE_URL = Constants.expoConfig?.extra?.apiBaseUrl || 'http://localhost:3000';
const API_TIMEOUT = Constants.expoConfig?.extra?.apiTimeout || 10000;

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    console.log('🚀 Request:', config.method?.toUpperCase(), config.url);
    
    return config;
  },
  (error) => {
    console.error('❌ Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log('✅ Response:', response.config.url, response.status);
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // Manejo de token expirado (401)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const newToken = await refreshToken();
        useAuthStore.getState().updateToken(newToken);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Si falla el refresh, cerrar sesión
        useAuthStore.getState().logout();
        return Promise.reject(refreshError);
      }
    }
    
    // 🔍 Logging detallado según el tipo de error
    if (error.response) {
      // El servidor respondió con un código de error
      const { status, data } = error.response;
      
      console.log('❌ API Error:', {
        url: error.config?.url,
        method: error.config?.method?.toUpperCase(),
        status,
        message: data?.message || 'Error desconocido',
        errors: data?.errors || null, // Errores de validación
      });
      
      // Logging específico por tipo de error
      switch (status) {
        case 400:
          console.log('📋 Validation Error:', data?.errors || data?.message);
          break;
        case 401:
          console.log('🔒 Authentication Error');
          break;
        case 403:
          console.log('🚫 Authorization Error');
          break;
        case 404:
          console.log('🔍 Not Found');
          break;
        case 500:
          console.log('💥 Server Error');
          break;
      }
    } else if (error.request) {
      console.log('📡 Network Error - No response received');
    } else {
      console.log('⚙️ Request Setup Error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

// Función helper para refresh token
async function refreshToken(): Promise<string> {
  const refreshToken = useAuthStore.getState().refreshToken;
  const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
    refreshToken,
  });
  return response.data.token;
}