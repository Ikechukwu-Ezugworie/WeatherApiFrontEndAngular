import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PortalUser} from '../../dtos/PortalUser';
import {AuthenticationService} from '../../service/authentication.service';
import {Router} from '@angular/router';
import {CustomValidator} from '../../custom/CustomValidator';

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
      'username': new FormControl(null, [Validators.required,  CustomValidator.isValidNameValidator.bind(this)]),
      'password': new FormControl(null, [Validators.required,  Validators.max(15)]),
    });
  }


  loginUser() {
    let portalUser = new PortalUser();
    portalUser = this.loginForm.value;
    this.showSpinner = true;
    this.authenticationService.login(portalUser).subscribe(response => {
      this.showSpinner = false;
      if (response.code === '200') {
        this.route.navigate(['weatherpadi/dashboard']);
        this.authenticationService.persist(response.data.loggedInUser);
      } else {
        // perform operation here
      }

    }, error1 => {

      this.showSpinner = false;
    });

  }

}
