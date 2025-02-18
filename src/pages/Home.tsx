import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Home() {
  const {isAuthenticated} = useAuth()
  return (
    <div className=" bg-gray-100 dark:bg-gray-900">
      {/* Hero Section */}
      <header className="bg-blue-600 dark:bg-blue-800 text-white text-center py-16 px-6">
        <h1 className="text-5xl font-extrabold">Tu Puerta al Empleo en CEBEM</h1>
        <p className="mt-4 text-lg">
          Encuentra las mejores oportunidades laborales y conéctate con empresas que buscan talento como el tuyo.
        </p>
        {!isAuthenticated &&
        <Link
          to="/register"
          className="mt-6 inline-block bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-gray-200 transition"
        >
          Solo para alumnos de Cebem
        </Link>
}
      </header>

      {/* Beneficios de la plataforma */}
      <section className="max-w-6xl mx-auto py-4 px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
          ¿Por qué unirte a CEBEM?
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mt-4">
          Descubre las ventajas de registrarte en nuestra plataforma.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-10">
          {/* Beneficio 1 */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">🔍 Encuentra Oportunidades</h3>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Accede a ofertas exclusivas para usuarios registrados y filtra según tus intereses.
            </p>
          </div>

          {/* Beneficio 2 */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">📩 Recibe Notificaciones</h3>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Sé el primero en enterarte de nuevas ofertas y oportunidades laborales.
            </p>
          </div>

          {/* Beneficio 3 */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">🚀 Conéctate con Empresas</h3>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Presenta tu perfil a empresas y destaca entre los mejores candidatos.
            </p>
          </div>
        </div>

{!isAuthenticated &&
        <Link
          to="/register"
          className="mt-10 inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition"
        >
          ¡Regístrate Ahora!
        </Link>
} 
      </section>
    </div>
  );
}

export default Home;
