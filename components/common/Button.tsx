import { colors, spacing } from '@/theme';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  ActivityIndicator,
  Animated,
  Pressable,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { Text } from './Text';

interface ButtonProps {
  onPress: () => void;
  title: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'tertiary';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  leftIcon?: keyof typeof Ionicons.glyphMap;
  rightIcon?: keyof typeof Ionicons.glyphMap;
}

export const Button: React.FC<ButtonProps> = ({
  onPress,
  title,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  style,
  leftIcon,
  rightIcon,
}) => {
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const getTextColor = () => {
    if (variant === 'outline') return colors.primary.main;
    if (variant === 'secondary') return colors.text.primary;
    if (variant === 'tertiary') return '#FFFFFF';
    return '#FFFFFF';
  };

  const getIconColor = () => {
    if (variant === 'outline') return colors.primary.main;
    if (variant === 'secondary') return colors.text.primary;
    if (variant === 'tertiary') return '#FFFFFF';
    return '#FFFFFF';
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled || loading}
        style={({ pressed }) => [
          styles.base,
          styles[variant],
          styles[size],
          pressed && styles.pressed,
          (disabled || loading) && styles.disabled,
          style,
        ]}
      >
        {loading ? (
          <ActivityIndicator color={getIconColor()} />
        ) : (
          <>
            {leftIcon && (
              <Ionicons
                name={leftIcon}
                size={20}
                color={getIconColor()}
                style={styles.leftIcon}
              />
            )}
            <Text weight="semiBold" color={getTextColor()}>
              {title}
            </Text>
            {rightIcon && (
              <Ionicons
                name={rightIcon}
                size={20}
                color={getIconColor()}
                style={styles.rightIcon}
              />
            )}
          </>
        )}
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  primary: {
    backgroundColor: colors.primary.main,
  },
  secondary: {
    backgroundColor: colors.secondary.light,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.primary.main,
    shadowOpacity: 0,
    elevation: 0,
  },
  tertiary: {
    backgroundColor: colors.blue.main,
  },
  small: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    height: "auto",
  },
  medium: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    height: "auto",
  },
  large: {
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
    height: "auto",
  },
  pressed: {
    opacity: 0.9,
  },
  disabled: {
    opacity: 0.5,
  },
  leftIcon: {
    marginRight: spacing.sm,
  },
  rightIcon: {
    marginLeft: spacing.sm,
  },
});