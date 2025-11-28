import { Component, effect, input, linkedSignal, output, signal } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './country-search-input.html'
})
export class CountrySearchInput {
  placeholder = input('Buscar');
  debounceTime = input(1000);
  initialValue = input<string>();

  emitValue = output<string>();

  inputValue = linkedSignal<string>(() => this.initialValue() ?? ''); //inicial la señal con tipo de proceso

  debounceEffect = effect((onCleanup) => {
    const value = this.inputValue();

    const timeout = setTimeout(() => {
      this.emitValue.emit(value);
    }, this.debounceTime());

    onCleanup(() => {
      clearTimeout(timeout);
    });
  });
}
