import { Component, inject, linkedSignal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop'
import { CountrySearchInput } from '../../components/country-search-input/country-search-input';
import { CountryList } from '../../components/country-list/country-list';
import { CountryService } from '../../services/country.service';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-by-capital-page',
  imports: [ CountrySearchInput, CountryList ],
  templateUrl: './by-capital-page.html'
})
export class ByCapitalPage {
  countryService = inject(CountryService);

  activatedRoute = inject(ActivatedRoute);
  router = inject(Router)
  queryParam = this.activatedRoute.snapshot.queryParamMap.get('query') ?? '';

  query = linkedSignal(() => this.queryParam);

  countryResource = rxResource({
    request: () => ({ query: this.query() }),
    loader: ({ request }) => {
      if (!request.query) return of([]);
      this.router.navigate(['/country/by-capital'], {
        queryParams: {
          query: request.query,

        }
      })
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
