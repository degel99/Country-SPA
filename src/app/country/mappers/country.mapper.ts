import { Country } from "../interfaces/country.interface";
import { RESTCountry } from "../interfaces/rest-countries.interfaces";

export class CountryMapper {

  static mapRestCountryToCountry( restCountry: RESTCountry): Country {
    return {
      capital: restCountry.capital.join(','),
      cca2: restCountry.cca2,
      flag: restCountry.flag,
      flagSvg: restCountry.flags.svg,
      name: restCountry.translations['spa'].common ?? 'No Spanish Name',
      population: restCountry.population,
      area: restCountry.area,
      codePhone: restCountry.idd?.root && restCountry.idd?.suffixes?.[0] ? `${restCountry.idd.root}${restCountry.idd.suffixes[0]}`: 'No code phone',
      region: restCountry.region,
      subregion: restCountry.subregion

    }
  }

  static mapRestCountryArrayToCountryArray( restCountries: RESTCountry[]): Country[] {
    return restCountries.map(this.mapRestCountryToCountry);
  }

}
