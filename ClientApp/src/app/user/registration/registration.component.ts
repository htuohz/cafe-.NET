import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/user';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registerForm: FormGroup;
  user: User;
  errMess:string;
  @ViewChild('rform',{static: false}) registerFormDirective;

  formErrors = {
    'Email': '',
    'Password': '',
  };

  validationMessages = {
    'Email':{
      'required': 'Email address is required',
      'pattern': 'Email not in valid format'
    },
    'Password':{
      'required': 'Email is required',
    }
  };

  createForm(){
    this.registerForm = this.fb.group({
      Email: ['', [Validators.required,Validators.email]],
      Password: ['', [Validators.required]],
    });

    this.registerForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged();// (re)set form validation messages
  }

  onValueChanged(data?: any): void {
    if(!this.registerForm){return; }
    const form = this.registerForm;
    for(const field in this.formErrors){
      if (this.formErrors.hasOwnProperty(field)){
        //clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if(control && control.dirty && !control.valid){
          const messages = this.validationMessages[field];
          for (const key in control.errors){
            if (control.errors.hasOwnProperty(key)){
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }


  constructor(private userService: UserService,
    private fb: FormBuilder) {
      this.createForm();
     }
  

  ngOnInit() {
    this.user = this.registerForm.value;
  }

  onSubmit(){
    this.user = this.registerForm.value;
    console.log(this.user);
    this.userService.Register(this.user)
      .subscribe(user => {
        return;
      },
      errmess => {
        this.errMess = <any>errmess
      })
    this.registerForm.reset({
      Email: '',
      Password: ''
    })
    this.registerFormDirective.resetForm();

  }

}
