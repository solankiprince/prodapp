import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public temp: any;

  constructor(private userservice:UserService,private toastr:ToastrService,private router:Router) { }

  ngOnInit(): void {
  }
  signup(userData:any, s1:any){
    s1.innerHTML="<img src='./assets/loader.gif'/>";
    this.userservice.adduser(userData.value.t1,userData.value.t2,userData.value.pass1)
    .subscribe(data=>{
      console.log(this.temp);
        this.toastr.success('one user added');
        setTimeout(()=>{
          s1.innerHTML=`<div class='alert alert-success'></div>`
          this.toastr.info ('Done !');
         },2500)

    });

  }
}
