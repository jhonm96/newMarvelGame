import { Component, OnInit } from '@angular/core';
import { Auth,signInWithPopup,GoogleAuthProvider } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';


@Component({
  selector: 'app-vista-inicial',
  templateUrl: './vista-inicial.component.html',
  styleUrls: ['./vista-inicial.component.scss']
})
export class VistaInicialComponent implements OnInit {

  constructor(private auth:AuthService,private router:Router,private user:UserService) { }

  ngOnInit(): void {
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
