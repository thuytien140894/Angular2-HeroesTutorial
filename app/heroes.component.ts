import { Component } from '@angular/core';
import { Hero } from './hero';
import { HeroService } from './hero.service';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'my-heroes',
  templateUrl: 'app/HTML/heroes.component.html',
  styleUrls: ['app/CSS/heroes.component.css'],
  providers: []
})

export class HeroesComponent implements OnInit {
  title = 'Tour of Heroes';
  selectedHero: Hero;
  heroes: Hero[];
  error: any;
  addingHero = false;

  constructor(private heroService: HeroService,
              private router: Router) { }

  getHeroes() {
    this.heroService.getHeroes().then(heroes =>  this.heroes = heroes);
  }

  addHero() {
    this.addingHero = true;
    this.selectedHero = null;
  }

  close(savedHero: Hero) {
    this.addingHero = false;
    if (savedHero) {
      this.getHeroes();
    }
  }

  deleteHero(hero: Hero, event: any ) {
    event.stopPropagation();
    this.heroService
        .delete(hero)
        .then(res => {
          this.heroes = this.heroes.filter(h => h != hero);
          if (this.selectedHero === hero) {
            this.selectedHero = null;
          }
        })
        .catch(error => this.error = error);
  }

  gotoDetail() {
    let link = ['/detail', this.selectedHero.id];
    this.router.navigate(link);
  }

  ngOnInit() {
    this.getHeroes();
  }

  onSelect(hero: Hero) {this.selectedHero = hero; }
}
