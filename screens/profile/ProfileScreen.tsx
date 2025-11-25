import { Text } from '@/components/common/Text';
import { useAuthStore } from '@/store/authStore';
import { colors, spacing } from '@/theme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
    Alert,
    Pressable,
    ScrollView,
    StyleSheet,
    View,
} from 'react-native';

interface MenuItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle?: string;
  onPress: () => void;
  showChevron?: boolean;
  danger?: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({
  icon,
  title,
  subtitle,
  onPress,
  showChevron = true,
  danger = false,
}) => (
  <Pressable
    style={({ pressed }) => [
      styles.menuItem,
      pressed && styles.menuItemPressed,
    ]}
    onPress={onPress}
  >
    <View style={styles.menuItemLeft}>
      <View
        style={[
          styles.iconContainer,
          danger && styles.iconContainerDanger,
        ]}
      >
        <Ionicons
          name={icon}
          size={22}
          color={danger ? colors.error : colors.primary.main}
        />
      </View>
      <View style={styles.menuItemText}>
        <Text
          weight="medium"
          color={danger ? colors.error : colors.text.primary}
        >
          {title}
        </Text>
        {subtitle && (
          <Text color={colors.text.secondary} style={styles.menuItemSubtitle}>
            {subtitle}
          </Text>
        )}
      </View>
    </View>
    {showChevron && (
      <Ionicons
        name="chevron-forward"
        size={20}
        color={colors.text.secondary}
      />
    )}
  </Pressable>
);

export default function ProfileScreen() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const handleEditProfile = () => {
    console.log('Edit profile');
    // router.push('/profile/edit');
  };

  const handlePaymentMethods = () => {
    console.log('Payment methods');
    // router.push('/profile/payment-methods');
  };

  const handleAddresses = () => {
    console.log('Saved addresses');
    // router.push('/profile/addresses');
  };

  const handleNotifications = () => {
    console.log('Notifications');
    // router.push('/profile/notifications');
  };

  const handlePrivacy = () => {
    console.log('Privacy');
    // router.push('/profile/privacy');
  };

  const handleHelp = () => {
    console.log('Help');
    // router.push('/profile/help');
  };

  const handleAbout = () => {
    console.log('About');
    // router.push('/profile/about');
  };

  const handleLogout = () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro que deseas cerrar sesión?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Cerrar Sesión',
          style: 'destructive',
          onPress: async () => {
            await logout();
            router.replace('/(auth)/login');
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Profile Header */}
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={48} color={colors.primary.main} />
          </View>
          <Pressable style={styles.editAvatarButton}>
            <Ionicons name="camera" size={18} color="#FFFFFF" />
          </Pressable>
        </View>
        <Text variant="h2" weight="bold" style={styles.userName}>
          {user?.name || 'Usuario'}
        </Text>
        <Text color={colors.text.secondary} style={styles.userEmail}>
          {user?.email || 'email@example.com'}
        </Text>
        <Text color={colors.text.secondary} style={styles.userPhone}>
          {user?.phone || '+1 234 567 8900'}
        </Text>
      </View>

      {/* Account Section */}
      <View style={styles.section}>
        <Text weight="semiBold" color={colors.text.secondary} style={styles.sectionTitle}>
          CUENTA
        </Text>
        <View style={styles.menuContainer}>
          <MenuItem
            icon="person-outline"
            title="Editar Perfil"
            subtitle="Actualiza tu información personal"
            onPress={handleEditProfile}
          />
          <MenuItem
            icon="card-outline"
            title="Métodos de Pago"
            subtitle="Gestiona tus tarjetas y métodos de pago"
            onPress={handlePaymentMethods}
          />
          <MenuItem
            icon="location-outline"
            title="Direcciones Guardadas"
            subtitle="Lugares frecuentes"
            onPress={handleAddresses}
          />
        </View>
      </View>

      {/* Preferences Section */}
      <View style={styles.section}>
        <Text weight="semiBold" color={colors.text.secondary} style={styles.sectionTitle}>
          PREFERENCIAS
        </Text>
        <View style={styles.menuContainer}>
          <MenuItem
            icon="notifications-outline"
            title="Notificaciones"
            subtitle="Gestiona tus notificaciones"
            onPress={handleNotifications}
          />
          <MenuItem
            icon="shield-checkmark-outline"
            title="Privacidad y Seguridad"
            subtitle="Controla tu privacidad"
            onPress={handlePrivacy}
          />
        </View>
      </View>

      {/* Support Section */}
      <View style={styles.section}>
        <Text weight="semiBold" color={colors.text.secondary} style={styles.sectionTitle}>
          SOPORTE
        </Text>
        <View style={styles.menuContainer}>
          <MenuItem
            icon="help-circle-outline"
            title="Centro de Ayuda"
            subtitle="Preguntas frecuentes y soporte"
            onPress={handleHelp}
          />
          <MenuItem
            icon="information-circle-outline"
            title="Acerca de"
            subtitle="Versión 1.0.0"
            onPress={handleAbout}
          />
        </View>
      </View>

      {/* Logout Section */}
      <View style={styles.section}>
        <View style={styles.menuContainer}>
          <MenuItem
            icon="log-out-outline"
            title="Cerrar Sesión"
            onPress={handleLogout}
            showChevron={false}
            danger
          />
        </View>
      </View>

      <View style={styles.footer}>
        <Text color={colors.text.secondary} style={styles.footerText}>
          TaxiApp © 2025
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.default,
  },
  header: {
    alignItems: 'center',
    padding: spacing.xl,
    paddingTop: spacing['2xl'],
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: spacing.md,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.blue.light,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary.main,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  userName: {
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    marginBottom: 2,
  },
  userPhone: {
    fontSize: 14,
  },
  section: {
    marginTop: spacing.lg,
  },
  sectionTitle: {
    fontSize: 12,
    letterSpacing: 0.5,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.sm,
  },
  menuContainer: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.border,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  menuItemPressed: {
    backgroundColor: colors.secondary.main,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.blue.light,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  iconContainerDanger: {
    backgroundColor: `${colors.error}15`,
  },
  menuItemText: {
    flex: 1,
  },
  menuItemSubtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  footer: {
    alignItems: 'center',
    padding: spacing.xl,
    paddingBottom: spacing['2xl'],
  },
  footerText: {
    fontSize: 12,
  },
});
