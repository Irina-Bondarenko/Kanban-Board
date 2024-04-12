import { ReactNode, useEffect, useState } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallbackComponent: ReactNode;
}

interface ErrorInfo {
  componentStack: string;
}

const ErrorBoundary = ({ children, fallbackComponent }: ErrorBoundaryProps) => {
  const [hasError, setHasError] = useState(false);
  const [errorInfo, setErrorInfo] = useState<ErrorInfo | null>(null);

  useEffect(() => {
    const errorHandler = (event: ErrorEvent) => {
      setHasError(true);
      setErrorInfo({ componentStack: event.error.stack || "" });
      console.error("ErrorBoundary caught an error:", event.error, errorInfo);
    };

    const unhandledRejectionHandler = (event: PromiseRejectionEvent) => {
      setHasError(true);
      setErrorInfo({
        componentStack:
          event.reason instanceof Error ? event.reason.stack || "" : "",
      });
      console.error(
        "ErrorBoundary caught an unhandled promise rejection:",
        event.reason,
        errorInfo,
      );
    };

    window.addEventListener("error", errorHandler);
    window.addEventListener("unhandledrejection", unhandledRejectionHandler);

    return () => {
      window.removeEventListener("error", errorHandler);
      window.removeEventListener(
        "unhandledrejection",
        unhandledRejectionHandler,
      );
    };
  }, [errorInfo]);

  if (hasError) {
    return fallbackComponent;
  }

  return children;
};

export default ErrorBoundary;
