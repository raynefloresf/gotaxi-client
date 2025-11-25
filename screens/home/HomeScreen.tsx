import { Text } from '@/components/common/Text';
import { colors, spacing, typography } from '@/theme';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';

const HomeScreen = () => {
  const handleRegisterPress = () => {
    console.log('Registro');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      style={styles.container}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.content,
        ]}
      >
        <View style={styles.innerContainer}>
          {/* Header Section */}
          <View style={styles.headerSection}>
            <View style={styles.iconContainer}>
              <Ionicons name="car" size={48} color="#2563eb" />
            </View>
            <View style={styles.titleContainer}>
              <Text variant="h1" weight="bold" style={styles.title}>
                Bienvenido a TaxiAppasddsasad
              </Text>
            </View>
          </View>

          {/* Buttons Section */}
          <View style={styles.buttonsContainer}>
            
          </View>

          {/* Footer Section */}
          <View style={styles.footer}>
            <Text style={styles.footerText} color={colors.text.secondary}>
              ¿Eres nuevo?{' '}
              <Link href={"/register"} asChild>
                <Text
                  style={styles.footerLink}
                  weight="semiBold"
                  onPress={handleRegisterPress}
                >
                  Regístrate ahora
                </Text>
              </Link>
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.default,
  },
  content: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
    minHeight: '100%',
  },
  innerContainer: {
    width: '100%',
    maxWidth: 448,
    alignItems: 'center',
  },
  headerSection: {
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing['2xl'],
  },
  iconContainer: {
    width: 80,
    height: 80,
    backgroundColor: '#eff6ff',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    alignItems: 'center',
    gap: spacing.sm,
  },
  title: {
    textAlign: 'center',
  },
  subtitle: {
    fontSize: typography.fontSize.base,
    textAlign: 'center',
  },
  buttonsContainer: {
    width: '100%',
    marginBottom: spacing.md,
  },
  primaryButton: {
    width: '100%',
  },
  secondaryButton: {
    width: '100%',
  },
  footer: {
    paddingTop: spacing.md,
  },
  footerText: {
    fontSize: typography.fontSize.sm,
    textAlign: 'center',
  },
  footerLink: {
    color: '#2563eb',
    textDecorationLine: 'underline',
  },
});

export default HomeScreen;