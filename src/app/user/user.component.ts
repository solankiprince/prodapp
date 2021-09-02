import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import{Router} from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private userservice:UserService,private toastr:ToastrService,private router:Router) { }

  ngOnInit(): void {
  }

  login(loginData:any,s2:any){
    s2.innerHTML="<img src='./assets/loader.gif'/>";
    console.log(loginData.value);
    let email = loginData.value.uname;
    let pass1 = loginData.value.passw;
    this.userservice.loginUser(email,pass1)
    .subscribe((data:any)=>{
       setTimeout(()=>{
         if(data['message']=='success'){
          // Starting the token into localStorage
          localStorage.setItem("token",data['token']);
          localStorage.setItem("user",data['loggedUser']);
          this.toastr.info("Login Successfull !")
       // s2.innerHTML=`<div class='alert alert-success'>${data['message']}</div>`;
       this.router.navigate(['/product']);
      } else{
        this.toastr.error(data['message']);
        s2.innerHTML=`<div class='alert alert-danger'>${data['message']}</div>`;
      }
       },2500);

    });
  }
  }
