import {Component, OnInit} from '@angular/core';
import {CityService} from '../../../service/city.service';
import {Observable} from 'rxjs';
import {debounceTime, map} from 'rxjs/operators';

@Component({
  selector: 'app-city-settings',
  templateUrl: './city-settings.component.html',
  styleUrls: ['./city-settings.component.css']
})
export class CitySettingsComponent implements OnInit {

  private cities: CityDto[];
  public search: any;
  public formatter;
  public selectedCity: CityDto;
  public userCities: CityDto[] = [];
  public showError: boolean;

  constructor(private cityService: CityService) {
  }

  ngOnInit() {
    this.populateCities();
    this.typeAheadSearchCity();
    this.getAllUserCity();
  }

  populateCities() {
    this.cityService.getAllCities().subscribe(response => {
      this.cities = response.data;
    });
  }

  typeAheadSearchCity() {
    this.search = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        map(term => term === '' ? []
          : this.cities.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
      );

    this.formatter = (x: { name: string }) => x.name;
  }

  add() {
    if (this.selectedCity == null) {
      this.showError = true;
      return;
    }
    this.showError = false;
    const cityIds: number[] = [];
    console.log(this.selectedCity);
    cityIds.push(+this.selectedCity.id);
    const val = {'id': cityIds};
    this.cityService.updateCity(val).subscribe(response => {
      if (response.code === '200') {
        this.userCities.push(this.selectedCity);
      }
    });


  }


  getAllUserCity() {
    this.cityService.getALLloggedInUserCity().subscribe(response => {
      if (response.code === '200') {
        this.userCities = response.data;
      }
    });
  }

  deleteCity(cityId: any) {
    this.cityService.deleteCity(cityId).subscribe(response => {
      if (response.code === '' + 200) {
        this.removeCityFromList(cityId);
      }
    });
  }

  removeCityFromList(cityId) {
    const indexofCity = this.userCities.indexOf(this.cities.filter(city => city.id === cityId).pop());
    console.log(indexofCity);
    this.userCities.splice(indexofCity, 1);

  }

}
