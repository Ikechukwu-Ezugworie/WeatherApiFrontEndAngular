import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {ApiResponse} from '../dtos/ApiResponse';
import {Observable} from 'rxjs';
import {SimpleUser} from '../dtos/SimpleUser';
import {st} from '@angular/core/src/render3';
import {Role} from './Role';

@Injectable({
  providedIn: 'root'
})
export class SimpleUserService {

  private baseUrl: string;
  private addSimpleUserUrl: string;
  private simpleUsersUrl: string;
  private deleteSimpleUserUrl: string;
  private selectRole: string;

  constructor(private http: HttpClient) {
    this.baseUrl = `${environment.url}`;
    this.addSimpleUserUrl = '/user/simpleuser';
    this.simpleUsersUrl = '/user/simpleuser';
    this.deleteSimpleUserUrl = '/user/simpleuser/';
    this.selectRole = '/roles';
  }


  addSimpleUser(newUser: any): Observable<ApiResponse<SimpleUser>> {
    return this.http.post<ApiResponse<SimpleUser>>(this.baseUrl + this.addSimpleUserUrl, newUser);
  }


  getAllSimpleUsers(): Observable<ApiResponse<SimpleUser[]>> {
    return this.http.get<ApiResponse<SimpleUser[]>>(this.baseUrl + this.simpleUsersUrl);
  }

  deleteUser(simpleUserId: string): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(this.baseUrl + this.deleteSimpleUserUrl + simpleUserId);
  }

  getSelectedRole(): Observable<ApiResponse<Role[]>> {
    return this.http.get<ApiResponse<Role[]>>(this.baseUrl + this.selectRole);
  }
}
