import { useEffect, useState } from "react";
import { UserService } from "../services/userService";
import User from "../models/User";

function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    UserService.getProfile()
      .then(setUser)
      .catch((err) => {
        setError(err instanceof Error ? err.message : "Error desconocido");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        Perfil de Usuario
      </h2>
      {error && <p className="text-red-500">{error}</p>}
      {loading ? (
        <p>Cargando...</p>
      ) : (
        user && (
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Nombre</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">{user.name}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Apellidos</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">{user.surname}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Correo Electrónico</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">{user.email}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Rol</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">{user.role}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Curso</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">{user.course}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Activado</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">{user.active?'SI':'NO'}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Recibe notificaciones por email</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                {user.accepNotifications ? "Sí" : "No"}
              </p>
            </div>
          </div>
        )
      )}
    </div>
  );
}

export default Profile;
