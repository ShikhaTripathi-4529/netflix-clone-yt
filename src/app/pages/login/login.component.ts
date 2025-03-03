declare var google: any;
import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements AfterViewInit {
  private router = inject(Router);
  ngAfterViewInit() {
    google.accounts.id.initialize({
      client_id: '667118273715-lu2cau003k81kjv81ntrg4sa23a4f9p4.apps.googleusercontent.com',
      callback: this.handleCredentialResponse.bind(this)
    });

    google.accounts.id.renderButton(
      document.getElementById("googleSignInBtn"),
      { theme: "filled_blue", size: "medium", shape: "reactangle", width:350 }
    );
  }

  handleCredentialResponse(response: any) {
   if (response) {
    console.log("\n\n\n\n\n 27272727272727",response)
    console.log("\n\n\n Google JWT Token:", response.credential);
    // Decode JWT to extract user info (optional)
    const payLoad = this.decodeJwt(response.credential);
    //store in session
    sessionStorage.setItem("loggedInUser",JSON.stringify(payLoad));
  
    //navigate to home & browse 
    this.router.navigate(['browse']);
    console.log("User Data:", payLoad);
   }
  }

  decodeJwt(token: string) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    console.log("\n\n\n 37373737 resres ",base64)
    return JSON.parse(atob(base64));
  }
}
