import { Component, OnInit } from '@angular/core';
import { Hero } from 'src/model/hero';

import { HeroService } from '../service/hero.service';

@Component({
  selector: 'app-heros',
  templateUrl: './heros.component.html',
  styleUrls: ['./heros.component.css'],
})
export class HerosComponent implements OnInit {
  constructor(private heroService: HeroService) {}
  heroes: Hero[] = [];

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    this.heroService.getHero().subscribe((heroes) => (this.heroes = heroes));
    console.log(this.heroes);
  }

  add(name: any): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.heroService.addHero({ name } as Hero).subscribe((hero) => {
      this.heroes.push(hero);
    });
  }
  delete(hero: any): void {
    this.heroes = this.heroes.filter((h) => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe((hero) => {
      console.log(this.heroes);
    });
  }
  searchByName(name: string): void {
    if(name){
      
    }
  }
}
