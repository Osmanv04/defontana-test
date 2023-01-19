import { Pokemon } from './../pokemon-list/pokemon-list.component';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pokemon-resume',
  templateUrl: './pokemon-resume.component.html',
  styleUrls: ['./pokemon-resume.component.scss']
})
export class PokemonResumeComponent {
  @Input() pokemons:any = []
  pokemonsByLetter:any = []
  pokemonsGroups: any = []
  ngOnInit(): void {
    this.pokemonsByLetter = this.pokemons.reduce((group:any, pokemon:any) => {
        group[pokemon.name.charAt(0).toLocaleLowerCase()] = group[pokemon.name.charAt(0).toLocaleLowerCase()] ?? [];
        group[pokemon.name.charAt(0).toLocaleLowerCase()].push(pokemon);
        return group;
      }, {});
     for (const [key, value] of Object.entries(this.pokemonsByLetter)) {
      this.pokemonsGroups.push({letter:key.toUpperCase(),count:this.pokemonsByLetter[key].length})
      this.pokemonsGroups.sort((a:any,b:any)=>{
        if (a.letter < b.letter) {return -1;}
        if (b.letter > b.letter) {return 1;}
        return 0;
      })
    }
  }
}
