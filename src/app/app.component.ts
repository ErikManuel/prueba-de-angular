import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule],
  template: `
    <!-- Header simplificado para testing -->
    <header class="navbar navbar-dark bg-dark shadow-sm">
      <div class="container">
        <a class="navbar-brand d-flex align-items-center" href="#">
          <span class="fs-4">🌌</span>
          <span class="ms-2 fw-bold">Directorio Rick & Morty</span>
        </a>
        <nav>
          <a routerLink="/" class="btn btn-outline-light btn-sm me-2">🏠 Inicio</a>
          <a routerLink="/" class="btn btn-outline-warning btn-sm">⭐ Favoritos</a>
        </nav>
      </div>
    </header>

    <!-- Main Content -->
    <main class="container py-4">
      <router-outlet></router-outlet>
    </main>

    <!-- Footer simplificado -->
    <footer class="bg-dark text-white py-4 mt-5">
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <h5 class="mb-3">📚 Acerca de este proyecto</h5>
            <p class="small mb-0">
              Aplicación desarrollada con Angular y Bootstrap 5.
            </p>
          </div>
          <div class="col-md-6 text-md-end">
            <p class="small mb-0">
              © 2024 - Datos de 
              <a href="https://rickandmortyapi.com/" target="_blank" class="text-warning text-decoration-none">
                Rick & Morty API
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    /* Estilos inline para asegurar que se apliquen */
    :host {
      display: block;
      min-height: 100vh;
    }
    
    main {
      min-height: calc(100vh - 200px);
    }
    
    .navbar {
      padding: 1rem 0;
    }
    
    .navbar-brand span:first-child {
      font-size: 1.8rem;
    }
    
    footer {
      background: linear-gradient(135deg, #0f3460 0%, #1a1a2e 100%);
    }
    
    footer a:hover {
      text-decoration: underline !important;
    }
    
    /* Responsive */
    @media (max-width: 768px) {
      .navbar > .container {
        flex-direction: column;
        gap: 1rem;
      }
      
      nav {
        width: 100%;
        display: flex;
        justify-content: center;
      }
    }
  `]
})
export class AppComponent {}