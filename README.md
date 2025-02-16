# AngularErp

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.1.2.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

# 🏥 Frontend del Sistema de Gestión Clínica

Bienvenido al repositorio del **frontend** de nuestro sistema de gestión clínica. Este proyecto proporciona una interfaz intuitiva y eficiente para la administración de citas, pacientes, empleados y facturación en clínicas médicas.

- **Framework Principal:** Angular 17
- **Lenguaje:** TypeScript
- **Gestión de Estados:** RxJS
- **Estilos:** Angular Material + Tailwind CSS
- **Autenticación:** JSON Web Token (JWT)
- **Consumo de API:** HttpClient

---

## 🚀 **Estructura del Proyecto**
Este frontend sigue una arquitectura **modular** y **escalable**, separando las funcionalidades en diferentes módulos:

### 📂 **Módulos Principales**
- **AuthModule** - Maneja la autenticación y el inicio de sesión.
- **DashboardModule** - Muestra estadísticas y resumen del sistema.
- **UsuariosModule** - Gestión de usuarios y roles.
- **PacientesModule** - Registro y consulta de pacientes.
- **CitasModule** - Agendamiento y visualización de citas médicas.
- **FacturacionModule** - Manejo de facturación y pagos.

---

## 🔑 **Principales Funcionalidades**

### 🔐 **Autenticación y Seguridad**
- Inicio de sesión con JWT.
- Gestión de roles (Administrador, Médico, Recepcionista, Paciente).

### 📅 **Gestión de Citas Médicas**
- Creación, edición y cancelación de citas.
- Filtrado de citas por médico, paciente o fecha.
- Control de disponibilidad en la agenda médica.

### 👨‍⚕️ **Gestión de Pacientes y Empleados**
- Registro de pacientes y actualización de datos.
- Listado de médicos con sus especialidades.

### 💳 **Facturación y Pagos**
- Visualización de facturas pendientes y pagadas.
- Integración con pasarela de pagos (a futuro).
- Reportes de cuentas por cobrar y pagar.

---

## 🔄 **Principios y Patrones Aplicados**

### ✅ **Buenas Prácticas en Angular**
- Uso de **Lazy Loading** para mejorar el rendimiento.
- **Modularización** para escalabilidad y mantenimiento.
- Aplicación de **RxJS** para manejar la programación reactiva.

### ✅ **Principios SOLID**
- **S** - Componentes con responsabilidad única.
- **O** - Facilidad de extensión sin modificar código existente.
- **L** - Uso de interfaces y modelos tipados.
- **I** - Módulos específicos por funcionalidad.
- **D** - Inyección de dependencias con providers en Angular.

---

## 🔗 **Rutas Principales**
Las rutas están organizadas según las funcionalidades:

| Página | Ruta |
|--------|------|
| 🔐 Inicio de Sesión | `/auth/login` |
| 🏠 Dashboard | `/dashboard` |
| 👤 Gestión de Usuarios | `/usuarios` |
| 👨‍⚕️ Gestión de Pacientes | `/pacientes` |
| 📅 Citas Médicas | `/citas` |
| 💳 Facturación | `/facturacion` |

---

## 🔒 **Credenciales de Acceso (Usuarios de Prueba)**

| Rol          | Usuario      | Contraseña  |
|-------------|------------|-------------|
| Administrador | `admin` | `admin123` |
| Médico       | `medico` | `medico123` |

⚠ **Nota:** Se recomienda cambiar estas credenciales en producción por razones de seguridad.

---

## 🛠️ **Configuración y Ejecución**

### **Requisitos Previos**
- Node.js 18+
- Angular CLI
- API Backend en funcionamiento

### **Pasos de Instalación**

1. **Clonar el repositorio**  
```bash
git clone https://github.com/tu-repositorio/frontend-clinica.git
cd frontend-clinica
```
2. **Instalar dependencias**  
```bash
npm install
```
3. **Configurar entorno**
   - Crear el archivo `.env` o usar `environment.ts` para definir la URL del backend.
4. **Ejecutar la aplicación**  
```bash
ng serve
```
5. **Acceder a la aplicación**  
   - `http://localhost:4200`

---

## 🚀 **Despliegue con Docker**

1. **Construir la imagen Docker**  
```bash
docker build -t frontend-clinica .
```
2. **Ejecutar el contenedor**  
```bash
docker run -p 80:80 frontend-clinica
```

Para desplegar en **Railway**, asegúrate de que tu archivo `Dockerfile` esté configurado correctamente y sube el proyecto a GitHub.

---

## 👨‍🎓 **Contribuciones**
Este sistema está en desarrollo continuo. Si deseas contribuir:
1. Realiza un **fork** del repositorio  
2. Crea una **rama** con tu mejora  
3. Abre un **Pull Request**  

---

## 📃 **Conclusión**
Este frontend proporciona una interfaz moderna, responsive y escalable para la gestión clínica. Con tecnologías como **Angular, RxJS y JWT**, buscamos ofrecer una experiencia óptima a los usuarios. Próximamente se añadirán más funcionalidades como **integración con WhatsApp, telemedicina y dashboards personalizados**. 🚀


## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
