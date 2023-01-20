import { PokemonResumeComponent } from './../pokemon-resume/pokemon-resume.component';
import { PokemonService } from './../../services/pokemon.service';
import { AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { map, Observable, startWith } from 'rxjs';
import { FormControl, NgModel } from '@angular/forms';


@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit,AfterViewInit  {
  pokemons : Pokemon[]
  preferences: any[] = [];
  pokemon:any;
  name:string = ""
  displayedColumns: string[] = ['name', 'url'];
  @Output() sendPokemon = new EventEmitter<any>();
  @Output() sendListPokemon = new EventEmitter<any>();
  dataSource!: MatTableDataSource<Pokemon>;
  @ViewChild('paginator')
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort: MatSort = new MatSort;
  pokemonsFilters: Observable<string[]> | undefined;
  myControl:FormControl = new FormControl('');



  constructor(
    private pokemonService: PokemonService,
    breakpointObserver: BreakpointObserver
  ) {
    this.pokemons = []
    breakpointObserver.observe(['(max-width: 600px)']).subscribe(result => {
      this.displayedColumns = result.matches ?
          ['name', 'url'] :
          ['name', 'url'] ;
    });
  }


  ngOnInit(): void {
    this.getAllEntities()
  }

  getAllEntities(){
    let pokemons$ = this.pokemonService.getFirst();
    pokemons$.subscribe(pokemons =>{
      if(pokemons){
        this.pokemonService.getAll(pokemons.count).subscribe(allPokemons=>{
          this.pokemons = allPokemons.results;
          this.dataSource = new MatTableDataSource(this.pokemons);
          this.pokemonsFilters = this.myControl.valueChanges.pipe(
            startWith(''),
            map(value => this._filter(value || '')),
          );
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.sendListPokemon.emit(this.pokemons);
        })
      }

    })
  }

  applyFilterKey(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    //this.name = filterValue
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngAfterViewInit() {

  }

  getPokemon(row:Pokemon){
    let pokemon$ = this.pokemonService.getPokemonDetail(row.name);
    pokemon$.subscribe(pokemon=>{
      this.pokemon = {name:row.name,...pokemon};
      this.sendPokemon.emit(this.pokemon);
    })
  }
  private _filter(value: string): string[] {
    //aplicar filtro a datasource
    const filterValue = value.toLowerCase();
    this.pokemons.filter(option => option.name.toLowerCase().includes(filterValue));
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    return this.pokemons.filter(option => option.name.toLowerCase().includes(filterValue)).map(x=>x.name);
  }
}

export interface Pokemon{
  name:string;
  url: string;
}
