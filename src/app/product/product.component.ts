import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { Prod } from '../prod';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  public loggedUser:any='';
  public productlist:any=[];
  public selectedproduct:any={'_id':null,'Id':null,'name':null,'price':null,'description':null,'created':null,'added':null}
  public temp: any;
  public name: any;
  p: number = 1;

  constructor(private product:ProductService,private toastr:ToastrService,private router:Router){}


  ngOnInit(): void {
     this.product.getprod().subscribe((response)=>{
this.productlist = response;
     });
    //fetching the logged User
    if(localStorage.getItem("token")!=null && localStorage.getItem("token")!='')
    {
      this.loggedUser = localStorage.getItem("user");
    this.populate();
    }
    else{
      this.toastr.error("Please Login First !");
      this.router.navigate(['/user']);
    }
 }
 logout(){
   localStorage.clear();
   this.toastr.info("You have Successfully Logged Out !");
   this.router.navigate(['/user']);
 }
 populate(){
    const productlist=this.product.getproduct();
    console.log(productlist);
    productlist.subscribe(data=>{
      //console.log(data);
      this.productlist=data;
      console.log(this.productlist);
    });
  }
  onselect(product:any,btn:any){
   // console.log(product);
    this.selectedproduct=product;
    console.log(this.selectedproduct);
    btn.innerHTML="Update"

  }
  onsubmit(product:any,btn:any){
     console.log(product.value);
     const Id=product.value.Id;
     const name=product.value.name;
     const price=product.value.price;
     const description=product.value.description;
     const created=product.value.created;
     const added=product.value.added;
     if(btn.innerHTML =='Add'){


     this.product.addproduct(Id,name,price,description,created,added)
     .subscribe(data=>{
       this.temp=data;
      console.log(data);
      console.log(this.temp);
      if (this.temp['msg']=='success') {
        this.toastr.success('One product Has Been Added Successfully..!');
      }
      else {
                this.toastr.error('Unable to add')
      }
      this.populate();
     });
    }else if(btn.innerHTML=='Update'){
      console.log('update');
      this.product.updateproduct(this.selectedproduct._id,Id,name,price,description,created,added)
       .subscribe(data=>{
     console.log(data);
     console.log(this.temp);
     this.toastr.success('Updated Successfully..!');
     this.populate()
       });
    }
  }

  delproduct(id:any){
    var r=confirm("Do you want to delete this record?");
    if(r){
    console.log(id);
    this.product.deleteproduct(id)
    .subscribe(data => {
    console.log(data);
    console.log(this.temp);
    this.toastr.success('One product Has Been Delete Successfully..!');
    this.populate();
    });
  }

  }

  Search(){
    if(this.name == ""){
      this.ngOnInit();
    }else{
      this.productlist = this.productlist.filter((res:any) =>{
     return res.name.toLocaleLowerCase().match(this.name.toLocaleLowerCase());
    });
    }
  }

}
