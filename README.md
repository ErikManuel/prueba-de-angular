@"
# Directorio Rick & Morty

## 🎯 Alcance del proyecto
Aplicación Angular que consume la API de Rick & Morty para listar personajes con filtros, sistema de favoritos y vista de detalles.

## 🚀 Demo en vivo
[![Firebase Hosting](https://img.shields.io/badge/Firebase-Hosting-orange)](https://rick-morty-directory-[TU-PROYECTO].web.app)

**URL:** https://https://rick-morty-directory-23c41.web.app

## 🛠️ Stack Tecnológico
- **Frontend:** Angular 21
- **UI Framework:** Bootstrap 5
- **Hosting:** Firebase Hosting
- **API:** Rick & Morty API
- **Estado Local:** localStorage

## 📦 Instalación Local
\`\`\`bash
# Clonar repositorio
git clone https://https://github.com/ErikManuel/prueba-de-angular
# Instalar dependencias
npm install

# Servir localmente
ng serve

# Abrir en navegador: http://localhost:4200
\`\`\`

## 🎨 Características Implementadas
✅ Listado de personajes con paginación  
✅ Filtros por nombre, estado, especie y género  
✅ Sistema de favoritos con localStorage  
✅ Vista detallada de personajes  
✅ Estados de UI: loading, empty, error  
✅ Diseño responsive (mobile & desktop)  
✅ Despliegue en Firebase Hosting  

## 🏗️ Arquitectura
\`\`\`
src/
├── app/
│   ├── components/
│   │   ├── character-list/     # Listado principal
│   │   └── character-detail/   # Vista detallada
│   ├── services/
│   │   ├── api.service.ts      # Servicio API
│   │   └── favorites.service.ts # Gestión de favoritos
│   └── models/                 # Interfaces TypeScript
├── assets/
└── environments/
\`\`\`

## 🔧 Decisiones Técnicas
1. **Angular 21 con standalone components** - Arquitectura moderna
2. **Bootstrap 5** - Desarrollo responsive rápido
3. **localStorage sobre Firestore** - Simplicidad para favoritos
4. **Servicios con RxJS** - Manejo reactivo de datos
5. **Debounce en búsqueda** - Optimización de llamadas API

## 🤖 Uso de IA en el Desarrollo
### ¿Dónde se utilizó IA?
1. **Generación de estructura inicial** - Scaffolding de componentes y servicios
2. **Optimización de código** - Sugerencias de refactorización
3. **Resolución de problemas** - Debugging de errores de configuración
4. **Documentación** - Estructura del README

### Prompts clave utilizados:
- \"Generate Angular service for Rick and Morty API with TypeScript interfaces\"
- \"Create responsive card grid with Bootstrap 5 in Angular\"
- \"How to implement localStorage favorites in Angular with RxJS\"
- \"Fix Angular 21 build configuration errors\"

### Decisiones tomadas vs. rechazadas:
- **✅ Aceptado:** Estructura de carpetas sugerida por IA
- **❌ Rechazado:** Uso de NgRx (overkill para este proyecto)
- **✅ Modificado:** Lógica de cache (simplificada para MVP)

### Riesgos identificados y mitigados:
1. **Rate limiting API** → Implementado debounce (500ms) + cache básico
2. **SEO para SPAs** → Meta tags dinámicos (futura mejora)
3. **Accesibilidad** → Verificado con Lighthouse + correcciones manuales

## 📈 Próximas Mejoras
1. Implementar infinite scroll
2. Añadir modo offline con Service Workers
3. Internacionalización (i18n)
4. Tests unitarios con Jest
5. Mejorar accesibilidad (WCAG AA)

## 🔗 Enlaces
- **Aplicación desplegada:** https://rick-morty-directory-[TU-PROYECTO].web.app
- **Repositorio GitHub:** https://github.com/TU-USUARIO/rick-morty-directory
- **API utilizada:** https://rickandmortyapi.com
- **Documentación Angular:** https://angular.io
