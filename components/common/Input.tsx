// /src/components/common/Input.tsx

import { colors, spacing, typography } from '@/theme';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Pressable,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';
import { Text } from './Text';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  leftIcon?: keyof typeof Ionicons.glyphMap;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  onRightIconPress?: () => void;
  containerStyle?: ViewStyle;
  helperText?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  leftIcon,
  rightIcon,
  onRightIconPress,
  containerStyle,
  helperText,
  style,
  secureTextEntry,
  editable = true,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // Si es password, mostrar icono de ojo automáticamente
  const showPasswordToggle = secureTextEntry;
  const actualSecureEntry = secureTextEntry && !isPasswordVisible;

  // Usar icono de ojo si es password, sino el rightIcon proporcionado
  const finalRightIcon = showPasswordToggle
    ? isPasswordVisible
      ? 'eye-off'
      : 'eye'
    : rightIcon;

  const finalRightIconPress = showPasswordToggle
    ? () => setIsPasswordVisible(!isPasswordVisible)
    : onRightIconPress;

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text variant="caption" weight="medium" style={styles.label}>
          {label}
        </Text>
      )}

      <View
        style={[
          styles.inputContainer,
          isFocused && styles.inputContainerFocused,
          error && styles.inputContainerError,
          !editable && styles.inputContainerDisabled,
        ]}
      >
        {leftIcon && (
          <Ionicons
            name={leftIcon}
            size={20}
            color={isFocused ? colors.primary.main : colors.text.secondary}
            style={styles.leftIcon}
          />
        )}

        <TextInput
          style={[
            styles.input,
            leftIcon && styles.inputWithLeftIcon,
            (rightIcon || showPasswordToggle) && styles.inputWithRightIcon,
            style,
          ]}
          placeholderTextColor={colors.text.disabled}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={actualSecureEntry}
          editable={editable}
          {...props}
        />

        {finalRightIcon && (
          <Pressable
            onPress={finalRightIconPress}
            style={styles.rightIconContainer}
            disabled={!finalRightIconPress}
          >
            <Ionicons
              name={finalRightIcon}
              size={20}
              color={
                finalRightIconPress
                  ? colors.text.primary
                  : colors.text.secondary
              }
            />
          </Pressable>
        )}
      </View>

      {error && (
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle" size={14} color={colors.error} />
          <Text variant="caption" color={colors.error} style={styles.errorText}>
            {error}
          </Text>
        </View>
      )}

      {helperText && !error && (
        <Text variant="caption" color={colors.text.secondary} style={styles.helperText}>
          {helperText}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  label: {
    marginBottom: spacing.xs,
    color: colors.text.primary,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    backgroundColor: colors.background.default,
    minHeight: 50,
  },
  inputContainerFocused: {
    borderColor: colors.blue.main,
    borderWidth: 1,
  },
  inputContainerError: {
    borderColor: colors.error,
    borderWidth: 1,
  },
  inputContainerDisabled: {
    backgroundColor: colors.background.paper,
    borderColor: colors.border,
  },
  input: {
    flex: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.regular,
    color: colors.text.primary,
    borderColor: colors.border,
  },
  inputWithLeftIcon: {
    paddingLeft: spacing.xs,
  },
  inputWithRightIcon: {
    paddingRight: spacing.xs,
  },
  leftIcon: {
    marginLeft: spacing.md,
  },
  rightIconContainer: {
    padding: spacing.sm,
    marginRight: spacing.xs,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  errorText: {
    marginLeft: spacing.xs,
  },
  helperText: {
    marginTop: spacing.xs,
  },
});