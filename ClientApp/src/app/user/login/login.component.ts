import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { NgForm, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  signinForm: FormGroup;
  constructor(private userService: UserService,
    private router: Router,
    private fb: FormBuilder) {
      this.createForm();
    }

  ngOnInit() {

  }
  createForm(){
    this.signinForm = this.fb.group({
      Email: '',
      Password: ''
    });

  }

  onSubmit(){
    this.userService.Signin(this.signinForm.value)
      .subscribe(
        (res:any)=>{
          localStorage.setItem('token',res.token);
          this.router.navigateByUrl('/home');
          this.userService.token = res.token
        },
        err =>{
          console.log(err);
        }
      );
  }


}
