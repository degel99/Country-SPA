import { Component, input, output } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './country-search-input.html'
})
export class CountrySearchInput {
  placeholder = input('Buscar');
  emitValue = output<string>();
}
