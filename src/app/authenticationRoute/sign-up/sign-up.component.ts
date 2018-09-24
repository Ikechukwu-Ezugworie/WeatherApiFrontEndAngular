import {Component, OnInit} from '@angular/core';
import {Form, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {st} from '@angular/core/src/render3';
import {PortalUser} from '../../dtos/PortalUser';
import {AuthenticationService} from '../../service/authentication.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CustomValidator} from '../../custom/CustomValidator';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  public signupForm: FormGroup;
  private password: string;
  public showSpinner: boolean;
  public signUpFormError: boolean;
  public signupMessage: string;

  constructor(private authenticationService: AuthenticationService,
              private fb: FormBuilder,
              private router: ActivatedRoute,
              private route: Router
  ) {
    this.signupForm = this.fb.group({
      'username': [null, [Validators.required, Validators.max(60), CustomValidator.isValidNameValidator.bind(this)]],
      'firstName': [null, [Validators.required, Validators.max(60), CustomValidator.isValidNameValidator.bind(this)]],
      'lastName': [null, [Validators.required, Validators.max(60), CustomValidator.isValidNameValidator.bind(this)]],
      'email': [null, [Validators.required, Validators.email, this.isValidEmail.bind(this)]],
      'password': [null, [Validators.required, Validators.min(6), Validators.max(12)]],
      'confirmPassword': [null, [Validators.required, this.confirmPassword.bind(this)]]

    });
    this.showSpinner = false;
  }


  ngOnInit() {
    this.passwordListener();
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
}







