import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Character, Episode, ApiResponse, FilterParams } from '../models/character.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://rickandmortyapi.com/api';
  private cache = new Map<string, any>();

  constructor(private http: HttpClient) {}

  getCharacters(params: FilterParams = {}): Observable<ApiResponse<Character>> {
    let url = `${this.baseUrl}/character`;
    const cacheKey = this.generateCacheKey('characters', params);
    
    // Verificar cache
    if (this.cache.has(cacheKey)) {
      return of(this.cache.get(cacheKey));
    }

    // Crear parámetros HTTP
    let httpParams = new HttpParams();
    Object.keys(params).forEach(key => {
      if (params[key as keyof FilterParams]) {
        httpParams = httpParams.set(key, params[key as keyof FilterParams]!.toString());
      }
    });

    return this.http.get<ApiResponse<Character>>(url, { params: httpParams }).pipe(
      tap(data => this.cache.set(cacheKey, data)),
      catchError(error => {
        console.error('Error fetching characters:', error);
        throw error;
      })
    );
  }

  getCharacter(id: number): Observable<Character> {
    const cacheKey = `character_${id}`;
    
    if (this.cache.has(cacheKey)) {
      return of(this.cache.get(cacheKey));
    }

    return this.http.get<Character>(`${this.baseUrl}/character/${id}`).pipe(
      tap(character => this.cache.set(cacheKey, character))
    );
  }

  getEpisode(id: number): Observable<Episode> {
    return this.http.get<Episode>(`${this.baseUrl}/episode/${id}`);
  }

  getMultipleEpisodes(ids: number[]): Observable<Episode[]> {
    return this.http.get<Episode[]>(`${this.baseUrl}/episode/${ids.join(',')}`).pipe(
      map(response => Array.isArray(response) ? response : [response])
    );
  }

  private generateCacheKey(prefix: string, params: any): string {
    return `${prefix}_${JSON.stringify(params)}`;
  }

  clearCache(): void {
    this.cache.clear();
  }
}