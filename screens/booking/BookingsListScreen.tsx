import { Button } from '@/components/common/Button';
import { Text } from '@/components/common/Text';
import { colors, spacing } from '@/theme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
    FlatList,
    Pressable,
    RefreshControl,
    StyleSheet,
    View,
} from 'react-native';

interface Booking {
  id: string;
  pickupLocation: string;
  dropoffLocation: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  driverName?: string;
  fare: number;
}

// Mock data - replace with actual API call
const MOCK_BOOKINGS: Booking[] = [
  {
    id: '1',
    pickupLocation: 'Av. Principal 123',
    dropoffLocation: 'Centro Comercial Plaza',
    date: '2025-11-25',
    time: '14:30',
    status: 'confirmed',
    driverName: 'Juan Pérez',
    fare: 15.5,
  },
  {
    id: '2',
    pickupLocation: 'Aeropuerto Internacional',
    dropoffLocation: 'Hotel Central',
    date: '2025-11-24',
    time: '09:15',
    status: 'completed',
    driverName: 'María González',
    fare: 25.0,
  },
  {
    id: '3',
    pickupLocation: 'Universidad Nacional',
    dropoffLocation: 'Residencias del Norte',
    date: '2025-11-23',
    time: '18:45',
    status: 'completed',
    driverName: 'Carlos Rodríguez',
    fare: 12.0,
  },
];

export default function BookingsListScreen() {
  const router = useRouter();
  const [refreshing, setRefreshing] = React.useState(false);
  const [bookings, setBookings] = React.useState<Booking[]>(MOCK_BOOKINGS);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const getStatusColor = (status: Booking['status']) => {
    switch (status) {
      case 'pending':
        return colors.warning;
      case 'confirmed':
        return colors.blue.main;
      case 'completed':
        return colors.success;
      case 'cancelled':
        return colors.error;
      default:
        return colors.text.secondary;
    }
  };

  const getStatusText = (status: Booking['status']) => {
    switch (status) {
      case 'pending':
        return 'Pendiente';
      case 'confirmed':
        return 'Confirmado';
      case 'completed':
        return 'Completado';
      case 'cancelled':
        return 'Cancelado';
      default:
        return status;
    }
  };

  const renderBookingItem = ({ item }: { item: Booking }) => (
    <Pressable
      style={styles.bookingCard}
      onPress={() => {
        // Navigate to booking details
        console.log('View booking:', item.id);
      }}
    >
      <View style={styles.bookingHeader}>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: `${getStatusColor(item.status)}15` },
          ]}
        >
          <Text
            style={[styles.statusText, { color: getStatusColor(item.status) }]}
            weight="semiBold"
          >
            {getStatusText(item.status)}
          </Text>
        </View>
        <Text color={colors.text.secondary} style={styles.dateText}>
          {item.date} • {item.time}
        </Text>
      </View>

      <View style={styles.locationContainer}>
        <View style={styles.locationRow}>
          <Ionicons
            name="location"
            size={20}
            color={colors.blue.main}
            style={styles.locationIcon}
          />
          <View style={styles.locationTextContainer}>
            <Text color={colors.text.secondary} style={styles.locationLabel}>
              Origen
            </Text>
            <Text weight="medium">{item.pickupLocation}</Text>
          </View>
        </View>

        <View style={styles.locationDivider}>
          <View style={styles.dashedLine} />
        </View>

        <View style={styles.locationRow}>
          <Ionicons
            name="flag"
            size={20}
            color={colors.error}
            style={styles.locationIcon}
          />
          <View style={styles.locationTextContainer}>
            <Text color={colors.text.secondary} style={styles.locationLabel}>
              Destino
            </Text>
            <Text weight="medium">{item.dropoffLocation}</Text>
          </View>
        </View>
      </View>

      {item.driverName && (
        <View style={styles.driverContainer}>
          <Ionicons
            name="person-circle-outline"
            size={20}
            color={colors.text.secondary}
          />
          <Text color={colors.text.secondary} style={styles.driverText}>
            Conductor: {item.driverName}
          </Text>
        </View>
      )}

      <View style={styles.fareContainer}>
        <Text weight="bold" style={styles.fareText}>
          ${item.fare.toFixed(2)}
        </Text>
      </View>
    </Pressable>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="calendar-outline" size={64} color={colors.text.secondary} />
      <Text variant="h2" style={styles.emptyTitle}>
        No tienes reservas
      </Text>
      <Text color={colors.text.secondary} style={styles.emptySubtitle}>
        Tus viajes aparecerán aquí una vez que realices una reserva
      </Text>
      <Button
        title="Nueva Reserva"
        onPress={() => console.log('Nueva Reserva') /*router.push('/booking/new')*/}
        leftIcon="add-circle"
        style={styles.newBookingButton}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="h1" weight="bold">
          Mis Reservas
        </Text>
        <Text color={colors.text.secondary} style={styles.headerSubtitle}>
          Historial de viajes
        </Text>
      </View>

      <FlatList
        data={bookings}
        renderItem={renderBookingItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={
          bookings.length === 0 ? styles.emptyList : styles.list
        }
        ListEmptyComponent={renderEmptyState}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.default,
  },
  header: {
    padding: spacing.lg,
    paddingBottom: spacing.md,
  },
  headerSubtitle: {
    marginTop: 4,
    fontSize: 14,
  },
  list: {
    padding: spacing.lg,
    paddingTop: 0,
  },
  emptyList: {
    flexGrow: 1,
  },
  bookingCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
  },
  dateText: {
    fontSize: 12,
  },
  locationContainer: {
    marginBottom: spacing.md,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  locationIcon: {
    marginTop: 2,
  },
  locationTextContainer: {
    flex: 1,
    marginLeft: spacing.sm,
  },
  locationLabel: {
    fontSize: 12,
    marginBottom: 2,
  },
  locationDivider: {
    marginLeft: 10,
    marginVertical: spacing.xs,
  },
  dashedLine: {
    width: 2,
    height: 20,
    backgroundColor: colors.border,
  },
  driverContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
    gap: spacing.xs,
  },
  driverText: {
    fontSize: 13,
  },
  fareContainer: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.sm,
    alignItems: 'flex-end',
  },
  fareText: {
    fontSize: 18,
    color: colors.primary.main,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  emptyTitle: {
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  emptySubtitle: {
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  newBookingButton: {
    minWidth: 200,
  },
});
