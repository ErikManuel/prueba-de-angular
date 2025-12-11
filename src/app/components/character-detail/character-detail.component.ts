import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { FavoritesService } from '../../services/favorites.service';
import { Character, Episode } from '../../models/character.interface';

@Component({
  selector: 'app-character-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.scss']
})
export class CharacterDetailComponent implements OnInit, OnDestroy {
  character: Character | null = null;
  episodes: Episode[] = [];
  relatedCharacters: Character[] = [];
  
  loading = true;
  error: string | null = null;
  
  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    public favoritesService: FavoritesService
  ) {}

  ngOnInit(): void {
    this.route.params.pipe(
      takeUntil(this.destroy$)
    ).subscribe(params => {
      const id = Number(params['id']);
      if (id) {
        this.loadCharacter(id);
      }
    });
  }

  loadCharacter(id: number): void {
    this.loading = true;
    this.error = null;
    
    this.apiService.getCharacter(id).subscribe({
      next: (character) => {
        this.character = character;
        this.loadEpisodes(character.episode);
        this.loading = false;
      },
      error: (err) => {
        this.error = 'No se pudo cargar el personaje. Intenta de nuevo.';
        this.loading = false;
      }
    });
  }

  private loadEpisodes(episodeUrls: string[]): void {
    if (episodeUrls.length === 0) return;
    
    // Extraer IDs de las URLs
    const episodeIds = episodeUrls.map(url => {
      const match = url.match(/\/(\d+)$/);
      return match ? parseInt(match[1]) : 0;
    }).filter(id => id > 0).slice(0, 5); // Limitar a 5 episodios
    
    if (episodeIds.length > 0) {
      this.apiService.getMultipleEpisodes(episodeIds).subscribe({
        next: (episodes) => {
          this.episodes = episodes;
        },
        error: (err) => {
          console.error('Error loading episodes:', err);
        }
      });
    }
  }

  getEpisodeNumber(episodeCode: string): string {
    // Formato: S01E01 -> Temporada 1 Episodio 1
    const match = episodeCode.match(/S(\d+)E(\d+)/);
    if (match) {
      return `T${match[1]}E${match[2]}`;
    }
    return episodeCode;
  }

  goBack(): void {
    window.history.back();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}