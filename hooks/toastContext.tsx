import React, { createContext, useContext, useState } from 'react';
import { ToastContainer, ToastConfig, ToastType } from '@/components/common/Toast';

interface ToastContextType {
  showToast: (config: Omit<ToastConfig, 'id'>) => void;
  success: (title: string, message?: string) => void;
  error: (title: string, message?: string) => void;
  warning: (title: string, message?: string) => void;
  info: (title: string, message?: string) => void;
  dismiss: (id: string) => void;
  dismissAll: () => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<ToastConfig[]>([]);

  const showToast = (config: Omit<ToastConfig, 'id'>) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    const newToast: ToastConfig = {
      ...config,
      id,
    };

    setToasts((prev) => [...prev, newToast]);
  };

  const success = (title: string, message?: string) => {
    showToast({ type: 'success', title, message });
  };

  const error = (title: string, message?: string) => {
    showToast({ type: 'error', title, message });
  };

  const warning = (title: string, message?: string) => {
    showToast({ type: 'warning', title, message });
  };

  const info = (title: string, message?: string) => {
    showToast({ type: 'info', title, message });
  };

  const dismiss = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const dismissAll = () => {
    setToasts([]);
  };

  return (
    <ToastContext.Provider
      value={{
        showToast,
        success,
        error,
        warning,
        info,
        dismiss,
        dismissAll,
      }}
    >
      {children}
      <ToastContainer toasts={toasts} onDismiss={dismiss} />
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};