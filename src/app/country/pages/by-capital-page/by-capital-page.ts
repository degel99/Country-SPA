import { Component, inject, resource, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop'
import { CountrySearchInput } from '../../components/country-search-input/country-search-input';
import { CountryList } from '../../components/country-list/country-list';
import { CountryService } from '../../services/country.service';
import { firstValueFrom, of } from 'rxjs';

@Component({
  selector: 'app-by-capital-page',
  imports: [ CountrySearchInput, CountryList ],
  templateUrl: './by-capital-page.html'
})
export class ByCapitalPage {
  countryService = inject(CountryService);
  query = signal('');

  countryResource = rxResource({
    request: () => ({ query: this.query() }),
    loader: ({ request }) => {
      if (!request.query) return of([]);
      return this.countryService.searchByCapital(request.query)
    }
  })


  /* countryResource = resource({
    request: () => ({ query: this.query() }),
    loader: async({ request }) => {
      if ( !request.query ) return [];

      return await firstValueFrom(
        this.countryService.searchByCapital(request.query)
      )
    }
  }) */
  /* isLoading = signal(false);
  isError = signal<string|null>(null);
  countries = signal<Country[]>([]);

  searchValueCapital(query: string) {
    if (this.isLoading()) return;
    this.isLoading.set(true);
    this.isError.set(null);

    this.countryService.searchByCapital(query)
    .subscribe( {
      next: (countries) => {
        this.isLoading.set(false);
        this.countries.set(countries);
      },
      error: (err) => {
        this.isLoading.set(false);
        this.countries.set([]);
        this.isError.set(`No se encontró un país con esa capital: ${query}`);
      }
    })
  } */

 }
