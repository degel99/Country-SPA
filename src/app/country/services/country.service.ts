import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-countries.interfaces';
import { catchError, delay, map, Observable, of, tap, throwError } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { CountryMapper } from '../mappers/country.mapper';
import { Region } from '../interfaces/region.type';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private http = inject(HttpClient);
  private queryCacheCapital = new Map<string, Country[]>();
  private queryCacheCountry = new Map<string, Country[]>();
  private queryCacheRegion = new Map<Region, Country[]>();

  searchByCapital( query: string ): Observable<Country[]>{
    query = query.toLowerCase();

    if(this.queryCacheCapital.has(query)) {
      return of( this.queryCacheCapital.get(query) ?? []);
    }
    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`).pipe(
      map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
      tap( (countries) => this.queryCacheCapital.set(query, countries)), // aqui grabamos el cache si fuera necesario
      catchError((error) => {
        console.log('Error fetching', error);
        return throwError(
          () => new Error(`No se pudo obtener países con ese query ${query}`)
        );
      })
    )
  }

  searchByCountry(query: string) {
    query = query.toLowerCase();

    if (this.queryCacheCountry.has(query)) {
      return of( this.queryCacheCountry.get(query) ?? []);
    }
    return this.http.get<RESTCountry[]>(`${API_URL}/name/${query}`).pipe(
      map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
      tap(countries => this.queryCacheCountry.set(query, countries)), // aqui grabamos el cache si fuera necesario
      delay(200),
      catchError((error) => {
        console.log('Error fetching', error);
        return throwError(
          () => new Error(`No se pudo obtener el país con ese query ${query}`)
        );
      })
    )
  }

  searchCountryByAlphaCode(code: string) {
    return this.http.get<RESTCountry[]>(`${API_URL}/alpha/${code}`).pipe(
      map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
      map( countries => countries.at(0)),
      catchError((error) => {
        console.log('Error fetching', error);
        return throwError(
          () => new Error(`No se pudo obtener el país con ese query ${code}`)
        );
      })
    )
  }

  searchByRegion(region: Region) {
    if (this.queryCacheRegion.has(region)) {
      return of( this.queryCacheRegion.get(region) ?? []);
    }
    return this.http.get<RESTCountry[]>(`${API_URL}/region/${region}`).pipe(
      map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
      tap(countries => this.queryCacheRegion.set(region, countries)), // aqui grabamos el cache si fuera necesario
      catchError((error) => {
        console.log('Error fetching', error);
        return throwError(
          () => new Error(`No se pudo obtener los países con ese query ${region}`)
        );
      })
    )
  }

}
