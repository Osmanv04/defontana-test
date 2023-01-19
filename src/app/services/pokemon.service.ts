import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  APP_URL="https://pokeapi.co/api/v2"
  constructor(private http: HttpClient) { }

  getFirst(): Observable<any> {
    return this.http.get(`${this.APP_URL}/pokemon/`);
  }

  getAll(count:number):Observable<any>{
    return this.http.get(`${this.APP_URL}/pokemon?offset=0&limit=${count}`)
  }

  getPokemonDetail(name:string):Observable<any>{
    return this.http.get(`${this.APP_URL}/pokemon/${name}`);
  }
}
