import { Component } from '@angular/core';
import { CountrySearchInput } from '../../components/country-search-input/country-search-input';
import { CountryList } from '../../components/country-list/country-list';

@Component({
  selector: 'app-by-capital-page',
  imports: [ CountrySearchInput, CountryList ],
  templateUrl: './by-capital-page.html'
})
export class ByCapitalPage {

  searchValueCapital(value: string) {
    console.log(value);
  }

 }
