import React, { useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export type ToastContextType = {
  showErrorToast: (message: string) => void;
  showSuccessToast: (message: string) => void;
};

export const ToastContext = React.createContext<ToastContextType>({
  showErrorToast: () => {},
  showSuccessToast: () => {},
});

export function ToastProviderWrapper({ children }: { children: React.ReactNode }) {
  const showErrorToast = (message: string) => {
    toast.error(message);
  };

  const showSuccessToast = (message: string) => {
    toast.success(message);
  };

  const contextValue: ToastContextType = {
    showErrorToast,
    showSuccessToast,
  };

  return (
    <ToastContext.Provider value={contextValue}>
      <ToastContainer />
      {children}
    </ToastContext.Provider>
  );
}

export default function Toast({ children }: { children: React.ReactNode }) {
  return (
    <ToastProviderWrapper>{children}</ToastProviderWrapper>
  );
}
