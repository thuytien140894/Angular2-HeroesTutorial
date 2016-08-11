import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { Hero } from './hero'
import { ActivatedRoute, Params } from '@angular/router';
import { HeroService } from './hero.service';

@Component({
  selector: 'my-hero-detail',
  templateUrl: 'app/HTML/hero-detail.component.html',
  styleUrls: ['app/CSS/hero-detail.component.css']
})

export class HeroDetailComponent implements OnInit {
  @Input()
  hero: Hero;

  @Output()
  close = new EventEmitter();
  error:any;
  navigated = false; // true of navigated here

  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      if (params['id'] !== undefined) {
        let id = +params['id'];
        this.navigated = true;
        this.heroService.getHero(id)
          .then(hero => this.hero = hero);
      } else {
        this.navigated = false;
        this.hero = new Hero();
      }
    });
  }

  save() {
    this.heroService
        .save(this.hero)
        .then(hero => {
          this.hero = hero;
          this.goBackTo(hero);
        })
        .catch(error => this.error = error);
  }

  goBack() {
    window.history.back();
  }

  goBackTo(savedHero: Hero = null) {
    this.close.emit(savedHero);
    if (this.navigated) {
      window.history.back();
    }
  }
}
