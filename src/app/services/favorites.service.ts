import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Character } from '../models/character.interface';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private readonly STORAGE_KEY = 'rick_morty_favorites';
  private favoritesSubject = new BehaviorSubject<Character[]>(this.getFavoritesFromStorage());
  
  favorites$: Observable<Character[]> = this.favoritesSubject.asObservable();

  private getFavoritesFromStorage(): Character[] {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error reading favorites from storage:', error);
      return [];
    }
  }

  private saveFavoritesToStorage(favorites: Character[]): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(favorites));
      this.favoritesSubject.next(favorites);
    } catch (error) {
      console.error('Error saving favorites to storage:', error);
    }
  }

  getFavorites(): Character[] {
    return this.getFavoritesFromStorage();
  }

  addFavorite(character: Character): void {
    const favorites = this.getFavoritesFromStorage();
    if (!favorites.find(f => f.id === character.id)) {
      favorites.push(character);
      this.saveFavoritesToStorage(favorites);
    }
  }

  removeFavorite(id: number): void {
    const favorites = this.getFavoritesFromStorage().filter(f => f.id !== id);
    this.saveFavoritesToStorage(favorites);
  }

  isFavorite(id: number): boolean {
    return this.getFavoritesFromStorage().some(f => f.id === id);
  }

  toggleFavorite(character: Character): void {
    if (this.isFavorite(character.id)) {
      this.removeFavorite(character.id);
    } else {
      this.addFavorite(character);
    }
  }

  clearFavorites(): void {
    this.saveFavoritesToStorage([]);
  }
}