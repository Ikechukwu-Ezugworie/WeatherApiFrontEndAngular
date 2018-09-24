import {Component, OnInit} from '@angular/core';
import {debounceTime, map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {CityService} from '../../../service/city.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SimpleUserService} from '../../../service/simple-user.service';
import {SimpleUser} from '../../../dtos/SimpleUser';
import {CustomValidator} from '../../../custom/CustomValidator';

@Component({
  selector: 'app-usermailer',
  templateUrl: './usermailer.component.html',
  styleUrls: ['./usermailer.component.css']
})
export class UsermailerComponent implements OnInit {

  private cities: CityDto[];
  public search: any;
  public formatter;
  public selectedCity: CityDto;
  public showError: boolean;
  public newUserForm: FormGroup;
  public simpleUsers: SimpleUser[] = [];


  constructor(private cityService: CityService, private simpleUserService: SimpleUserService) {
  }

  ngOnInit() {
    this.newUserForm = new FormGroup({
      'fullName': new FormControl(null, [Validators.required, CustomValidator.isValidNameValidator.bind(this)]),
      'email': new FormControl(null, [Validators.required, Validators.email])
    });
    this.populateCities();
    this.getAllSimpleUsers();
    this.typeAheadSearchCity();
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


  submitUser() {
    if (this.selectedCity == null) {
      this.showError = true;
      return;
    }
    this.showError = false;
    const user = this.newUserForm.value;
    user['cityId'] = this.selectedCity.id;
    user['cityName'] = this.selectedCity.name;
    this.simpleUserService.addSimpleUser(user).subscribe(response => {
      this.simpleUsers.push(response.data);
      this.newUserForm.reset();
    });
  }


  getAllSimpleUsers() {
    this.simpleUserService.getAllSimpleUsers().subscribe(response => {
      this.simpleUsers = response.data;
    });
  }

  removeUser(id: string) {

    const indexofCity = this.simpleUsers.indexOf(this.simpleUsers.filter(simpleUser => simpleUser.id === id).pop());
    this.simpleUserService.deleteUser(id).subscribe(response => {
      this.simpleUsers.splice(indexofCity, 1);
    });

  }
}
