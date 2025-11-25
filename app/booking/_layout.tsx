import { Stack } from 'expo-router';

export default function BookingLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: '#FFFFFF',
        },
        headerTintColor: '#000000',
        animation: 'slide_from_bottom',
      }}
    >
      <Stack.Screen 
        name="new" 
        options={{ title: 'Nueva Reserva' }}
      />
      <Stack.Screen 
        name="[id]" 
        options={{ title: 'Detalles del Viaje' }}
      />
    </Stack>
  );
}