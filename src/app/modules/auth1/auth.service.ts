import { Injectable } from '@angular/core';
import {Auth, signInWithPopup, GoogleAuthProvider,signOut, User} from '@angular/fire/auth'
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth) { }


  getMyUser(): User | null {
    return this.auth.currentUser;
  }

  loginWithGoogle(){
    return signInWithPopup(this.auth, new GoogleAuthProvider())
  }
  logout(){
    return signOut(this.auth);
  }
}
