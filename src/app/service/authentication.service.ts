import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {PortalUser} from '../dtos/PortalUser';
import {Observable} from 'rxjs';
import {ApiResponse} from '../dtos/ApiResponse';
import {st} from '@angular/core/src/render3';
import {LoginResponse} from '../dtos/LoginResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private baseUrl: string;
  private signUpUrl: string;
  private loginUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = `${environment.url}`;
    this.signUpUrl = '/signup';
    this.loginUrl = '/login';
  }

  signUp(portalUser: PortalUser): Observable<ApiResponse<PortalUser>> {
    return this.http.post<ApiResponse<PortalUser>>(this.baseUrl + this.signUpUrl, portalUser);
  }

  login(portalUser: PortalUser): Observable<ApiResponse<LoginResponse<PortalUser>>> {
    return this.http.post<ApiResponse<LoginResponse<PortalUser>>>(this.baseUrl + this.loginUrl, portalUser);
  }

  persist(valToPersist: any) {
    localStorage.clear();
    const value = JSON.stringify(valToPersist);
    localStorage.setItem('userDetails', value);

  }


  isLoggedin() {
    const data = localStorage.getItem('userDetails');
    return data ? true : false;
  }

  getLooggedInUser(): PortalUser {
    const userDetails = localStorage.getItem('userDetails');
    if (this.isLoggedin()) {
      return JSON.parse(userDetails);
    }
    return null;
  }

  logout() {
    localStorage.clear();
  }
}

