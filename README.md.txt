Panel TGDM - Sistema de Gestión de Torneos y Mesas de Juego
📋 Descripción
Panel TGDM es un sistema completo de gestión para torneos y mesas de juego que permite administrar jugadores, eventos, grupos y el seguimiento financiero de las partidas. Diseñado para organizadores de torneos que necesitan un control centralizado y eficiente de sus operaciones.
🚀 Características Principales
🎮 Gestión de Jugadores

Registro completo de jugadores con datos personales
Sistema de saldo y movimientos (cargas/retiros)
Historial de partidas y puntos acumulados
Vinculación a grupos específicos

👥 Sistema de Usuarios y Roles

Admin: Acceso completo al sistema
Representante: Gestión de grupos y usuarios
Agente: Funcionalidades limitadas
Autenticación segura con control de sesiones

🏆 Gestión de Eventos

Tres categorías de eventos: MAM, TOR, CAMP
Configuración flexible de entrada, premio, puntos y comisión
Sistema de colores para identificación visual
Asociación con grupos específicos

🎯 Control de Mesas

Mesas en juego: Seguimiento en tiempo real de partidas activas
Mesas finalizadas: Historial completo con ganadores
Sistema de filtros: Búsqueda avanzada por múltiples criterios
Registro automático de estadísticas

💰 Sistema de Balance

Control financiero integral
Seguimiento de movimientos de dinero
Cálculo automático de comisiones
Reportes de balance por grupo

🏢 Gestión de Grupos

Creación y administración de grupos
Asignación de representantes y administradores
Control de jugadores por grupo
Jerarquía de permisos

🛠️ Tecnologías
Frontend

React 18 - Framework principal
Vite - Build tool y dev server
Bootstrap 5 - Framework CSS
React Bootstrap - Componentes UI
React Router DOM - Navegación
Axios - Cliente HTTP
Universal Cookie - Gestión de cookies

Backend

Node.js - Runtime JavaScript
Express.js - Framework web
MongoDB - Base de datos NoSQL
Mongoose - ODM para MongoDB
Moment.js - Manipulación de fechas

📦 Instalación
Prerrequisitos

Node.js (v16 o superior)
MongoDB (local o Atlas)
npm o yarn

Clonar el repositorio
bashgit clone [url-del-repositorio]
cd PanelTGDM-main
Configuración del Backend
bashcd back-panel
npm install
Variables de entorno
Crear archivo .env en back-panel/:
envMONGODB_URI=mongodb://localhost:27017/panel-tgdm
PORT=8080
Configuración del Frontend
bashcd front-panel
npm install
Configuración de API
Editar front-panel/src/routes/api.js:
javascriptconst api = axios.create({
    baseURL: 'http://localhost:8080/',
});
🚀 Ejecución
Iniciar Backend
bashcd back-panel
npm run dev
# o
nodemon src/index.js
Iniciar Frontend
bashcd front-panel
npm run dev
La aplicación estará disponible en:

Frontend: http://localhost:5173
Backend: http://localhost:8080

📁 Estructura del Proyecto
PanelTGDM-main/
├── back-panel/
│   ├── src/
│   │   ├── models/          # Modelos de MongoDB
│   │   ├── routers/         # Rutas de la API
│   │   └── services/        # Lógica de negocio
│   └── package.json
└── front-panel/
    ├── src/
    │   ├── components/      # Componentes React por módulo
    │   │   ├── BALANCE/
    │   │   ├── EVENTOS/
    │   │   ├── GRUPOS/
    │   │   ├── JUGADORES/
    │   │   ├── LOGIN/
    │   │   ├── MESAS/
    │   │   ├── NAVBAR/
    │   │   └── USUARIOS/
    │   └── routes/          # Configuración de rutas
    └── package.json
🗄️ Modelos de Datos
Jugador
javascript{
  id: Number,
  nombre: String,
  usuario: String,
  password: String,
  telefono: Number,
  saldo: Number,
  puntos: Number,
  movimientos: {
    cargas: Array,
    retiros: Array
  },
  partidas: [ObjectId],
  grupo: [ObjectId]
}
Usuario
javascript{
  name: String,
  password: String,
  email: String,
  telefono: Number,
  rol: ['agente', 'representante', 'admin'],
  grupo: [ObjectId],
  comision: Array,
  partidascreadas: [ObjectId]
}
Evento
javascript{
  nombre: String,
  categoria: ['mam', 'tor', 'camp'],
  color: String,
  jugadores: Number,
  entrada: Number,
  premio: Number,
  puntos: Number,
  comicion: Number,
  descripcion: String
}
🔐 Sistema de Autenticación
El sistema utiliza cookies para mantener la sesión del usuario. Los roles determinan el acceso a las diferentes funcionalidades:

Admin: Acceso completo a jugadores, eventos y mesas
Representante: Gestión de grupos y usuarios de su organización
Agente: Acceso limitado según configuración

🎯 Funcionalidades por Rol
Administrador

✅ Gestión completa de jugadores
✅ Creación y administración de eventos
✅ Control total de mesas y partidas
✅ Acceso al sistema de balance
✅ Reportes y estadísticas

Representante

✅ Gestión de grupos bajo su responsabilidad
✅ Administración de usuarios de su grupo
✅ Visualización de estadísticas de su grupo
❌ Acceso limitado a configuración global

Agente

✅ Funcionalidades básicas según asignación
❌ Sin acceso a configuración administrativa

🔧 Configuración Adicional
Base de Datos
Asegúrate de que MongoDB esté ejecutándose y configura la conexión en el backend.
CORS
Si tienes problemas de CORS, configura las cabeceras apropiadas en el servidor Express.
Producción
Para despliegue en producción:

Construir el frontend: npm run build
Configurar variables de entorno apropiadas
Usar PM2 o similar para el backend
Configurar proxy reverso (nginx/apache)

🤝 Contribución

Fork el proyecto
Crea una rama para tu feature (git checkout -b feature/AmazingFeature)
Commit tus cambios (git commit -m 'Add some AmazingFeature')
Push a la rama (git push origin feature/AmazingFeature)
Abre un Pull Request

📝 Roadmap
Próximas Mejoras

 Migración de MD5 a bcrypt para passwords
 Implementación de WebSockets para updates en tiempo real
 Sistema de notificaciones
 Reportes avanzados con gráficos
 API REST documentada con Swagger
 Tests unitarios y de integración
 PWA (Progressive Web App)
 Modo oscuro
 Exportación de datos (PDF/Excel)

🐛 Problemas Conocidos

Uso de MD5 para passwords (migrar a bcrypt)
Falta validación robusta en frontend
Manejo de errores puede mejorarse

📄 Licencia
Este proyecto está bajo la Licencia ISC. Ver el archivo LICENSE para más detalles.
👥 Autores

Alan - Desarrollo principal

📞 Soporte
Para soporte técnico o preguntas sobre el proyecto, crear un issue en el repositorio.

⭐ Si este proyecto te ha sido útil, no olvides darle una estrella en GitHub!Controles del chat Sonnet 4Smart, efficient model for everyday use Más informaciónArtefactosREADME.md - Panel TGDMHaz clic para abrir documento • 1 versión.gitignore GlobalHaz clic para abrir código • 1 versiónpackage.json - Raíz del proyectoHaz clic para abrir código • 1 versióndocker-compose.ymlHaz clic para abrir código • 1 versión