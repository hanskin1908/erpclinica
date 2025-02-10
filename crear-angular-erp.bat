@echo off
REM ============================================================
REM Generación de estructura de carpetas y archivos en el proyecto Angular "angular-erp"
REM (El proyecto Angular ya está creado)
REM ============================================================

REM Asegúrate de estar en la carpeta raíz del proyecto (donde se encuentra angular.json)
echo Iniciando la generación de la estructura de carpetas y archivos...

REM 1. Generar elementos en el CORE

echo Generando elementos en CORE...
REM Interceptores (se generan como clases; luego se personalizarán como interceptores)
ng generate class core/interceptors/auth.interceptor --type=interceptor
ng generate class core/interceptors/error.interceptor --type=interceptor

REM Guards
ng generate guard core/guards/auth
ng generate guard core/guards/subscription

REM Models (generamos interfaces para los modelos de datos)
ng generate interface core/models/usuario.model
ng generate interface core/models/suscripcion.model
ng generate interface core/models/cita.model
ng generate interface core/models/hce.model
ng generate interface core/models/factura.model

REM Servicios
ng generate service core/services/auth
ng generate service core/services/suscripcion
ng generate service core/services/cita
ng generate service core/services/hce
ng generate service core/services/facturacion

REM 2. Generar elementos en SHARED

echo Generando elementos en SHARED...
REM Componentes compartidos: Navbar y Footer
ng generate component shared/components/navbar
ng generate component shared/components/footer

REM Directivas
ng generate directive shared/directives/custom

REM Pipes
ng generate pipe shared/pipes/date-format

REM 3. Generar Módulos funcionales con lazy loading

REM Módulo de Autenticación
ng generate module modules/auth --routing
ng generate component modules/auth/login
ng generate component modules/auth/register

REM Módulo de Dashboard
ng generate module modules/dashboard --routing
ng generate component modules/dashboard/dashboard

REM Módulo de Suscripción
ng generate module modules/suscripcion --routing
ng generate component modules/suscripcion/suscripcion

REM Módulo de Citas y Agenda Médica
ng generate module modules/citas --routing
ng generate component modules/citas/citas
ng generate component modules/citas/cita-detail

REM Módulo de Historias Clínicas Electrónicas (HCE)
ng generate module modules/hce --routing
ng generate component modules/hce/hce

REM Módulo de Facturación
ng generate module modules/facturacion --routing
ng generate component modules/facturacion/facturacion

echo Estructura de proyecto Angular generada correctamente.
pause