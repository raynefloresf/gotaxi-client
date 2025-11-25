import { colors, spacing, typography } from '@/theme';
import { Ionicons } from '@expo/vector-icons';
import React, { useCallback, useEffect } from 'react';
import {
  Animated,
  Dimensions,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import { Text } from './Text';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastConfig {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
  action?: {
    label: string;
    onPress: () => void;
  };
}

interface ToastItemProps {
  toast: ToastConfig;
  onDismiss: (id: string) => void;
}

const SCREEN_WIDTH = Dimensions.get('window').width;

const ToastItem: React.FC<ToastItemProps> = ({ toast, onDismiss }) => {
  const translateY = React.useRef(new Animated.Value(-100)).current;
  const opacity = React.useRef(new Animated.Value(0)).current;

  const handleDismiss = useCallback(() => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: -100,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onDismiss(toast.id);
    });
  }, [onDismiss, opacity, toast.id, translateY]);

  useEffect(() => {
    // Animación de entrada
    Animated.parallel([
      Animated.spring(translateY, {
        toValue: 0,
        tension: 100,
        friction: 10,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();

    // Auto-dismiss
    const timer = setTimeout(() => {
      handleDismiss();
    }, toast.duration || 4000);

    return () => clearTimeout(timer);
  }, [handleDismiss, opacity, toast.duration, translateY]);

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return 'checkmark-circle';
      case 'error':
        return 'close-circle';
      case 'warning':
        return 'warning';
      case 'info':
        return 'information-circle';
    }
  };

  const getColor = () => {
    switch (toast.type) {
      case 'success':
        return colors.success;
      case 'error':
        return colors.error;
      case 'warning':
        return colors.warning;
      case 'info':
        return colors.blue.main;
    }
  };

  const getBackgroundColor = () => {
    switch (toast.type) {
      case 'success':
        return '#d1fae5';
      case 'error':
        return '#fee2e2';
      case 'warning':
        return '#fef3c7';
      case 'info':
        return '#dbeafe';
    }
  };

  return (
    <Animated.View
      style={[
        styles.toastContainer,
        {
          transform: [{ translateY }],
          opacity,
          backgroundColor: getBackgroundColor(),
          borderLeftColor: getColor(),
        },
      ]}
    >
      <View style={styles.toastContent}>
        <Ionicons name={getIcon()} size={24} color={getColor()} />

        <View style={styles.textContainer}>
          <Text weight="semiBold" style={styles.title}>
            {toast.title}
          </Text>
          {toast.message && (
            <Text variant="caption" color={colors.text.secondary}>
              {toast.message}
            </Text>
          )}
        </View>

        {toast.action && (
          <Pressable
            onPress={toast.action.onPress}
            style={styles.actionButton}
          >
            <Text
              weight="semiBold"
              color={getColor()}
              style={styles.actionText}
            >
              {toast.action.label}
            </Text>
          </Pressable>
        )}

        <Pressable onPress={handleDismiss} style={styles.closeButton}>
          <Ionicons name="close" size={20} color={colors.text.secondary} />
        </Pressable>
      </View>
    </Animated.View>
  );
};

interface ToastContainerProps {
  toasts: ToastConfig[];
  onDismiss: (id: string) => void;
  position?: 'top' | 'bottom';
}

export const ToastContainer: React.FC<ToastContainerProps> = ({
  toasts,
  onDismiss,
  position = 'bottom',
}) => {
  return (
    <View style={[
      styles.container,
      position === 'top' && styles.positionTop
    ]} pointerEvents="box-none">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 9999,
  },
  positionTop: {
    top: 50,
    bottom: 'auto',
  },
  toastContainer: {
    width: SCREEN_WIDTH - spacing.lg * 2,
    marginBottom: spacing.sm,
    borderRadius: 12,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  toastContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    gap: spacing.md,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: typography.fontSize.sm,
    marginBottom: 2,
  },
  actionButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  actionText: {
    fontSize: typography.fontSize.sm,
  },
  closeButton: {
    padding: spacing.xs,
  },
});