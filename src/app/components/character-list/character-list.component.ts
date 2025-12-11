import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { FavoritesService } from '../../services/favorites.service';
import { Character, FilterParams } from '../../models/character.interface';

@Component({
  selector: 'app-character-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss']
})
export class CharacterListComponent implements OnInit, OnDestroy {
  characters: Character[] = [];
  filteredCharacters: Character[] = [];
  favorites: Character[] = [];
  
  // Estados
  loading = false;
  error: string | null = null;
  showFavoritesOnly = false;
  
  // Paginación
  currentPage = 1;
  totalPages = 1;
  itemsPerPage = 20;
  paginationInfo: { pages: number } | null = null;
  
  // Filtros
  filters: FilterParams = {
    name: '',
    status: '',
    species: '',
    gender: ''
  };
  
  // Opciones para selects
  statusOptions = ['', 'Alive', 'Dead', 'unknown'];
  genderOptions = ['', 'Female', 'Male', 'Genderless', 'unknown'];
  
  // Debounce para búsqueda
  private searchSubject = new Subject<void>();
  private destroy$ = new Subject<void>();

  constructor(
    private apiService: ApiService,
    public favoritesService: FavoritesService
  ) {}

  ngOnInit(): void {
    this.loadCharacters();
    this.loadFavorites();
    
    // Configurar debounce para búsqueda (500ms)
    this.searchSubject.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.currentPage = 1;
      this.loadCharacters();
    });
  }

  loadCharacters(): void {
    this.loading = true;
    this.error = null;
    
    const params: FilterParams = {
      ...this.filters,
      page: this.currentPage
    };

    // Limpiar filtros vacíos
    Object.keys(params).forEach(key => {
      if (params[key as keyof FilterParams] === '') {
        delete params[key as keyof FilterParams];
      }
    });

    this.apiService.getCharacters(params).subscribe({
      next: (response) => {
        this.characters = response.results;
        this.filteredCharacters = this.showFavoritesOnly 
          ? this.filterFavorites(this.characters)
          : this.characters;
        this.totalPages = response.info.pages;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar los personajes. Intenta de nuevo.';
        this.characters = [];
        this.filteredCharacters = [];
        this.loading = false;
      }
    });
  }

  loadFavorites(): void {
    this.favoritesService.favorites$.subscribe(favorites => {
      this.favorites = favorites;
      if (this.showFavoritesOnly) {
        this.filteredCharacters = this.filterFavorites(this.characters);
      }
    });
  }

  filterFavorites(characters: Character[]): Character[] {
    const favoriteIds = this.favorites.map(f => f.id);
    return characters.filter(char => favoriteIds.includes(char.id));
  }

  onFilterChange(): void {
    this.searchSubject.next();
  }

  toggleFavoritesView(): void {
    this.showFavoritesOnly = !this.showFavoritesOnly;
    this.filteredCharacters = this.showFavoritesOnly
      ? this.filterFavorites(this.characters)
      : this.characters;
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadCharacters();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadCharacters();
    }
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadCharacters();
    }
  }

  clearFilters(): void {
    this.filters = {
      name: '',
      status: '',
      species: '',
      gender: ''
    };
    this.currentPage = 1;
    this.loadCharacters();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
    getPageNumbers(): number[] {
    const pages: number[] = [];
    const totalPages = this.paginationInfo?.pages || 0;
    
    // Mostrar máximo 5 páginas alrededor de la actual
    const currentPage = this.currentPage;
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);
    
    // Ajustar si estamos cerca del inicio
    if (currentPage <= 3) {
        endPage = Math.min(5, totalPages);
    }
    
    // Ajustar si estamos cerca del final
    if (currentPage >= totalPages - 2) {
        startPage = Math.max(1, totalPages - 4);
    }
    
    for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
    }
    
    return pages;
    }
}