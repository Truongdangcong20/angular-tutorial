import { Injectable } from '@angular/core';
import { Hero } from 'src/model/hero';
import { HEROES } from 'src/model/mock-hero';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  constructor(
    private messageService: MessageService,
    private http: HttpClient
  ) {}

  private API_URL = 'http://localhost:3000';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  getHero(): Observable<Hero[]> {
    const url = `${this.API_URL}/Heros`;
    return this.http.get<Hero[]>(url, this.httpOptions);
  }
  getHeroes(id: number): Observable<Hero> {
    // For now, assume that a hero with the specified `id` always exists.
    // Error handling will be added in the next step of the tutorial.
    const hero = HEROES.find((h) => h.id === id)!;
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(hero);
  }

  addHero(hero: any): Observable<any> {
    const url = `${this.API_URL}/Heros`;
    return this.http.post<any>(url, hero, this.httpOptions);
  }
  deleteHero(id: any): Observable<any> {
    const url = `${this.API_URL}/Heros/${id}`;
    console.log(url);
    return this.http.delete<any>(url, this.httpOptions);
  }
  searchHeroes(name: string): Observable<Hero[]> {
    const url = `${this.API_URL}/Heros/?name=${name}`;
    console.log(url);
    if (!name.trim()) {
      return of([]);
    }
    return this.http.get<Hero[]>(url, this.httpOptions);
  }
}
