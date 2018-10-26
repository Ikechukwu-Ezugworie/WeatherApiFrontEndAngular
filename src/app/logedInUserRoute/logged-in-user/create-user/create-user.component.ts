import {Component, OnInit} from '@angular/core';
import {CustomValidator} from '../../../custom/CustomValidator';
import {PortalUser} from '../../../dtos/PortalUser';
import {AuthenticationService} from '../../../service/authentication.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {SimpleUserService} from '../../../service/simple-user.service';
import {Role} from '../../../service/Role';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  public signupForm: FormGroup;
  private password: string;
  public showSpinner: boolean;
  public signUpFormError: boolean;
  public signupMessage: string;
  public roles: Role[];

  constructor(private authenticationService: AuthenticationService,
              private fb: FormBuilder,
              private router: ActivatedRoute,
              private route: Router,
              private simpleUserService: SimpleUserService) {
    this.signupForm = this.fb.group({
      'username': [null, [Validators.required, Validators.max(60), CustomValidator.isValidNameValidator.bind(this)]],
      'firstName': [null, [Validators.required, Validators.max(60), CustomValidator.isValidNameValidator.bind(this)]],
      'lastName': [null, [Validators.required, Validators.max(60), CustomValidator.isValidNameValidator.bind(this)]],
      'email': [null, [Validators.required, Validators.email, this.isValidEmail.bind(this)]],
      'password': [null, [Validators.required, Validators.min(6), Validators.max(12)]],
      'confirmPassword': [null, [Validators.required, this.confirmPassword.bind(this)]],
      'roleId': [null, [Validators.required]]

    });
    this.showSpinner = false;
  }


  ngOnInit() {
    this.passwordListener();
    this.getRoles();
  }

  /**
   * Password listenet to check when passwprd changes
   */
  passwordListener() {
    this.signupForm.get('password').valueChanges.subscribe(password => {
      this.password = password;
    });
  }


  confirmPassword(formControl: FormControl): { [s: string]: boolean } {
    if (formControl.value !== this.password) {
      return {'passwordMismatch': true};
    }
    return null;
  }


  isValidEmail(formControl: FormControl): { [s: string]: boolean } {
    if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(formControl.value)) {
      return {'inValidName': true};
    }
    return null;
  }


  submitForm() {
    let portalUser = new PortalUser();
    portalUser = this.signupForm.value;
    this.showSpinner = true;
    this.authenticationService.signUp(portalUser).subscribe(response => {
      this.showSpinner = false;
      if (response.code === '409') {
        console.log('user already exists');
      } else {
        this.signupMessage = response.message;
        this.signUpFormError = true;
      }

      if (response.code === '200') {
        this.route.navigate(['/auth/login']);
      }
    }, error => {
      this.signupMessage = 'Try again!!!';
    });


    this.signupForm.reset();

  }

  getRoles() {
    this.simpleUserService.getSelectedRole().subscribe(response => {
      this.roles = response.data;
    });
  }


}
