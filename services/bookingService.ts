import { api } from './api';

export interface Location {
  latitude: number;
  longitude: number;
  address: string;
}

export interface Driver {
  id: string;
  name: string;
  rating: number;
  vehicleType: string;
  plateNumber: string;
  photo: string;
  currentLocation: {
    latitude: number;
    longitude: number;
  };
}

export interface BookingRequest {
  pickupLocation: Location;
  dropoffLocation: Location;
  vehicleType?: string;
}

export interface BookingResponse {
  bookingId: string;
  driver: Driver;
  estimatedPrice: number;
  estimatedTime: number; // minutos
  status: string;
}

export const bookingService = {
  // Buscar conductores cercanos
  findNearbyDrivers: async (location: Location, vehicleType?: string) => {
    const response = await api.post<Driver[]>('/bookings/nearby-drivers', {
      latitude: location.latitude,
      longitude: location.longitude,
      vehicleType,
    });
    return response.data;
  },

  // Calcular precio estimado
  calculatePrice: async (pickup: Location, dropoff: Location) => {
    const response = await api.post<{ price: number; distance: number }>(
      '/bookings/estimate',
      { pickup, dropoff }
    );
    return response.data;
  },

  // Crear reserva
  createBooking: async (bookingData: BookingRequest) => {
    const response = await api.post<BookingResponse>(
      '/bookings',
      bookingData
    );
    return response.data;
  },

  // Cancelar reserva
  cancelBooking: async (bookingId: string) => {
    const response = await api.delete(`/bookings/${bookingId}`);
    return response.data;
  },

  // Obtener historial
  getBookingHistory: async (page: number = 1, limit: number = 20) => {
    const response = await api.get('/bookings/history', {
      params: { page, limit },
    });
    return response.data;
  },

  // Tracking en tiempo real
  trackBooking: async (bookingId: string) => {
    const response = await api.get(`/bookings/${bookingId}/track`);
    return response.data;
  },
};