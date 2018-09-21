import {Component, OnInit} from '@angular/core';
import {CityService} from '../../../service/city.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public userCities: CityDto[];
  public cityDetails: { temperature: string, weatherIcon: string, city: string }[] = [];

  constructor(private cityService: CityService) {
  }

  ngOnInit() {
    this.fetchUserCities();
  }


  fetchWeather() {
    this.userCities.forEach(userCities => {
      console.log(userCities);
      this.cityService.fetchWeather(userCities.name).subscribe(response => {
        const value = {temperature: response.current.temp_c, weatherIcon: response.current.condition.icon, city: response.location.name};
        this.cityDetails.push(value);
      });
    });
    console.log(this.cityDetails);
  }

  fetchUserCities() {
    this.cityService.getALLloggedInUserCity().subscribe(response => {
      this.userCities = response.data;
      this.fetchWeather();
    });
  }

}
