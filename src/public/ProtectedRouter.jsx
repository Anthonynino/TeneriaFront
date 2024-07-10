// src/components/ProtectedRouter.js
import { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LoadingScreen from "./LoadingScreen";

function ProtectedRouter() {
  const { isAuthenticated } = useAuth();
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowLoading(false);
    }, 1500);

    // Limpiar el temporizador si el componente se desmonta antes de que se complete el tiempo de espera
    return () => clearTimeout(timeoutId);
  }, []);

  if (!isAuthenticated) {
    // Si no está autenticado, redirige a la página de inicio de sesión
    return <Navigate to="/login" />;
  }

  if (showLoading) {
    // Si la autenticación aún se está cargando, renderiza un indicador de carga
    return <LoadingScreen />;
  }

  // Si está autenticado, renderiza el componente solicitado
  return <Outlet />;
}

export default ProtectedRouter;
