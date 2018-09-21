import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApiResponse} from '../dtos/ApiResponse';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  private allCitiesUrl: string;
  private baseUrl: string;
  private cityUpdateUrl: string;
  private allUserCityUrl: string;
  private deleteUserCityUrl: string;
  private weatherApi: string;

  constructor(private http: HttpClient) {
    this.baseUrl = `${environment.url}`;
    this.allCitiesUrl = '/cities';
    this.cityUpdateUrl = '/user/city';
    this.allUserCityUrl = '/user/city';
    this.deleteUserCityUrl = '/user/city/';
    this.weatherApi = 'http://api.apixu.com/v1/current.json';
  }


  getAllCities(): Observable<ApiResponse<CityDto[]>> {
    return this.http.get<ApiResponse<CityDto[]>>(this.baseUrl + this.allCitiesUrl);
  }

  updateCity(cityIds: { [s: string]: number[] }): Observable<ApiResponse<CityDto[]>> {
    return this.http.post<ApiResponse<CityDto[]>>(this.baseUrl + this.cityUpdateUrl, cityIds);
  }

  getALLloggedInUserCity(): Observable<ApiResponse<CityDto[]>> {
    return this.http.get<ApiResponse<CityDto[]>>(this.baseUrl + this.allUserCityUrl);
  }

  deleteCity(cityId: number): Observable<ApiResponse<String>> {
    return this.http.delete<ApiResponse<String>>(this.baseUrl + this.deleteUserCityUrl + cityId);
  }


  fetchWeather(nameOfCity): Observable<WeatherResponse> {
    return this.http.get<WeatherResponse>(this.weatherApi, {
      params: {
        key: environment.apixuKey,
        q: nameOfCity
      }
    });
  }
}
