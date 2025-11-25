import { colors, spacing, typography } from '@/theme';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { Text } from './Text';

export interface SelectOption {
  label: string;
  value: string;
  icon?: keyof typeof Ionicons.glyphMap;
}

interface SelectProps {
  label?: string;
  placeholder?: string;
  options: SelectOption[];
  value?: string;
  onValueChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
  containerStyle?: ViewStyle;
  leftIcon?: keyof typeof Ionicons.glyphMap;
  helperText?: string;
}

export const Select: React.FC<SelectProps> = ({
  label,
  placeholder = 'Selecciona una opción',
  options,
  value,
  onValueChange,
  error,
  disabled = false,
  containerStyle,
  leftIcon,
  helperText,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = options.find((opt) => opt.value === value);

  const handleSelect = (optionValue: string) => {
    onValueChange(optionValue);
    setIsOpen(false);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text variant="caption" weight="medium" style={styles.label}>
          {label}
        </Text>
      )}

      <Pressable
        onPress={() => !disabled && setIsOpen(true)}
        style={[
          styles.selectContainer,
          error && styles.selectContainerError,
          disabled && styles.selectContainerDisabled,
        ]}
        disabled={disabled}
      >
        {leftIcon && (
          <Ionicons
            name={leftIcon}
            size={20}
            color={colors.text.secondary}
            style={styles.leftIcon}
          />
        )}

        {selectedOption?.icon && (
          <Ionicons
            name={selectedOption.icon}
            size={20}
            color={colors.text.primary}
            style={styles.optionIcon}
          />
        )}

        <Text
          style={[
            styles.selectText,
            !selectedOption && styles.placeholderText,
          ]}
          color={selectedOption ? colors.text.primary : colors.text.disabled}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </Text>

        <Ionicons
          name={isOpen ? 'chevron-up' : 'chevron-down'}
          size={20}
          color={colors.text.secondary}
          style={styles.chevronIcon}
        />
      </Pressable>

      {error && (
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle" size={14} color={colors.error} />
          <Text variant="caption" color={colors.error} style={styles.errorText}>
            {error}
          </Text>
        </View>
      )}

      {helperText && !error && (
        <Text
          variant="caption"
          color={colors.text.secondary}
          style={styles.helperText}
        >
          {helperText}
        </Text>
      )}

      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setIsOpen(false)}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text variant="h3" weight="semiBold">
                {label || 'Seleccionar'}
              </Text>
              <Pressable
                onPress={() => setIsOpen(false)}
                style={styles.closeButton}
              >
                <Ionicons name="close" size={24} color={colors.text.primary} />
              </Pressable>
            </View>

            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item, index }) => (
                <Pressable
                  style={[
                    styles.option,
                    item.value === value && styles.optionSelected,
                    index === options.length - 1 && styles.lastOption,
                  ]}
                  onPress={() => handleSelect(item.value)}
                >
                  {item.icon && (
                    <Ionicons
                      name={item.icon}
                      size={20}
                      color={
                        item.value === value
                          ? colors.primary.main
                          : colors.text.primary
                      }
                      style={styles.optionIconInList}
                    />
                  )}
                  <Text
                    style={styles.optionText}
                    weight={item.value === value ? 'semiBold' : 'regular'}
                    color={
                      item.value === value
                        ? colors.primary.main
                        : colors.text.primary
                    }
                  >
                    {item.label}
                  </Text>
                  {item.value === value && (
                    <Ionicons
                      name="checkmark"
                      size={20}
                      color={colors.primary.main}
                      style={styles.checkIcon}
                    />
                  )}
                </Pressable>
              )}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
          </View>
        </Pressable>
      </Modal>
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
  selectContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    backgroundColor: colors.background.default,
    minHeight: 50,
    paddingHorizontal: spacing.md,
  },
  selectContainerError: {
    borderColor: colors.error,
  },
  selectContainerDisabled: {
    backgroundColor: colors.background.paper,
    borderColor: colors.text.disabled,
  },
  leftIcon: {
    marginRight: spacing.sm,
  },
  optionIcon: {
    marginRight: spacing.sm,
  },
  selectText: {
    flex: 1,
    fontSize: typography.fontSize.base,
  },
  placeholderText: {
    fontFamily: typography.fontFamily.regular,
  },
  chevronIcon: {
    marginLeft: spacing.sm,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  modalContent: {
    backgroundColor: colors.background.default,
    borderRadius: 16,
    width: '100%',
    maxHeight: '70%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  closeButton: {
    padding: spacing.xs,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  optionSelected: {
    backgroundColor: colors.blue.light,
  },
  lastOption: {
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  optionIconInList: {
    marginRight: spacing.md,
  },
  optionText: {
    flex: 1,
    fontSize: typography.fontSize.base,
  },
  checkIcon: {
    marginLeft: spacing.sm,
  },
  separator: {
    height: 1,
    backgroundColor: colors.border,
    marginHorizontal: spacing.lg,
  },
});