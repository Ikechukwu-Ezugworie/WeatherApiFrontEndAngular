import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PortalUser} from '../../dtos/PortalUser';
import {AuthenticationService} from '../../service/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService, private route: Router) {
  }

  public showSpinner: boolean;
  public loginForm: FormGroup;



  ngOnInit() {
    this.loginForm = new FormGroup({
      'username': new FormControl(null, [Validators.required]),
      'password': new FormControl(null, [Validators.required])
    });
  }


  loginUser() {
    let portalUser = new PortalUser();
    portalUser = this.loginForm.value;
    this.showSpinner = true;
    this.authenticationService.login(portalUser).subscribe(response => {
      this.showSpinner = false;
      if (response.code === '200') {
        this.authenticationService.persist(response.data.loggedInUser);
      } else {
        // perform operation here
        console.log("hello");
      }

    }, error1 => {

      this.showSpinner = false;
    });

  }

}
