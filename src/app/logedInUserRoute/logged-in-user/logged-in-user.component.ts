import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../service/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-logged-in-user',
  templateUrl: './logged-in-user.component.html',
  styleUrls: ['./logged-in-user.component.css']
})
export class LoggedInUserComponent implements OnInit {

  public showSpinner: boolean;

  constructor(private authService: AuthenticationService, private router: Router) {


  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

  ngOnInit(): void {

  }
}


