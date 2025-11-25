import { AxiosError } from 'axios';
import { Alert } from 'react-native';

export interface ApiError {
  message: string;
  code?: string;
  field?: string;
}

export const handleApiError = (error: unknown): string => {
  if (error instanceof AxiosError) {
    // Error de red
    if (!error.response) {
      return 'Error de conexión. Verifica tu internet.';
    }

    // Errores por código de estado
    switch (error.response.status) {
      case 400:
        return error.response.data?.message || 'Datos inválidos';
      case 401:
        return 'No autorizado. Por favor inicia sesión nuevamente.';
      case 403:
        return 'No tienes permisos para realizar esta acción.';
      case 404:
        return 'Recurso no encontrado.';
      case 422:
        // Errores de validación
        const validationErrors = error.response.data?.errors;
        if (validationErrors) {
          return Object.values(validationErrors).flat().join('\n');
        }
        return 'Error de validación';
      case 500:
        return 'Error del servidor. Intenta más tarde.';
      default:
        return error.response.data?.message || 'Error desconocido';
    }
  }

  return 'Error inesperado';
};

export const showErrorAlert = (error: unknown) => {
  const message = handleApiError(error);
  Alert.alert('Error', message);
};