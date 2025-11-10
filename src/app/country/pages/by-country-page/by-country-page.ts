import { Component } from '@angular/core';
import { CountrySearchInput } from '../../components/country-search-input/country-search-input';
import { CountryList } from '../../components/country-list/country-list';

@Component({
  selector: 'app-by-country-page',
  imports: [ CountrySearchInput, CountryList ],
  templateUrl: './by-country-page.html'
})
export class ByCountryPage {

  searchValueCountry(value: string) {
    console.log(value);
  }
 }
