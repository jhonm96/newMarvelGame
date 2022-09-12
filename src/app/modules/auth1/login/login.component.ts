import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-Login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private auth:AuthService,private router:Router,private user:UserService) { }

  ngOnInit() {
  }

  onClick(){
    this.auth.loginWithGoogle()
   .then(response => {
   console.log(response)
   this.router.navigate(['/home']);
   this.user.newUser()

   })
   .catch(error=> console.log(error))
     }


}
