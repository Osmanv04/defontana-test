import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'defontana-test';
  pokemon:any = null
  pokemons:any[]=[]
  sendPokemon(pokemon:any){
    this.pokemon = pokemon
  }

  sendListPokemon(pokemons:any){
    this.pokemons = pokemons
  }

}
