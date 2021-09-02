import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Prod } from './prod';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }
  //geting all product
  getproduct(){
    let token = localStorage.getItem("token");
    return this.http.get('https://prodapp.glitch.me/api/product?token='+token);
  }
  //adding data
  addproduct(Id:string,name:string,price:number,description:string,created:string,added:string){
       return this.http.post('https://prodapp.glitch.me/api/product',{'Id':Id,'name':name,'price':price,'description':description,'created':created,'added':added});
  }
  deleteproduct(id:any){
    return this.http.delete('https://prodapp.glitch.me/api/product/'+id);
  }
  updateproduct(id:any,Id:string,name:string,price:string,description:string,created:string,added:string){
    return this.http.put('https://prodapp.glitch.me/api/product/'+id,{'Id':Id,'name':name,'price':price,'description':description,'created':created,'added':added});
  }
  url: string = "https://prodapp.glitch.me/api/product";
  getprod() {
    return this.http.get<Prod[]>(this.url);
  }
}
