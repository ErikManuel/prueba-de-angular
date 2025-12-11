import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Character, Episode, Location } from '../models/character.interface';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private baseUrl = 'https://rickandmortyapi.com/api';

  constructor(private http: HttpClient) {}

  getCharacters(page = 1, filters?: any): Observable<any> {
    let url = `${this.baseUrl}/character?page=${page}`;
    if (filters) {
      Object.keys(filters).forEach(key => {
        if (filters[key]) url += `&${key}=${filters[key]}`;
      });
    }
    return this.http.get(url);
  }

  getCharacter(id: number): Observable<Character> {
    return this.http.get<Character>(`${this.baseUrl}/character/${id}`);
  }

  getEpisodes(ids: number[]): Observable<Episode[]> {
    return this.http.get<Episode[]>(`${this.baseUrl}/episode/[${ids.join(',')}]`);
  }
}

