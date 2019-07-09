import { Injectable } from '@angular/core';
import { RouterModule, Router, CanActivate } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import {HttpClient,HttpHeaders,HttpParams, HttpRequest, HttpEvent} from "@angular/common/http";
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';

const  Auth_Token ='Basic YWRtaW5AYmZpdC5jb206MThhYmI3YzVkNDk3Y2UyZTUwMGY3ZjFjZTU3ZmI1MGVjNWY2N2VlMjY3YmE0Y2I3ZWIwMWY1YmYxNmVlMWYzYw==';

const httpOptions = {
    headers: new HttpHeaders({
      'Authorization': Auth_Token,
    })
};


@Injectable({
  providedIn: 'root'
})
export class ServerCallsService {
  showUserMenu:boolean=false;
  public loginState :boolean = true;
  // public baseUrl : string = 'http://www.bfitapp.cybertronindia.com/api/';
  public baseUrl : string = 'http://bfitapp.sgfclients.com/api/';
  public loginChange: Subject<boolean> = new Subject<boolean>();

  
  // public httpOptions = {
  //   headers: new HttpHeaders({
  //     'Authorization': this.Auth_Token,
  //   })
  // };

  constructor(public sanitizer : DomSanitizer,public router: Router,public http : HttpClient) { 
    this.loginChange.subscribe((value) => {
            this.loginState = value;
    });
  }


  canActivate() : boolean{
      if(!this.checkLogin()){
        return false;
      }
      return true;
  }
    
  public setLocalStorage(item,value){
    localStorage.setItem(item, value);
  }

  public getLocalStorage(item,defaultvalue:any = ''){
   return localStorage.getItem(item) ? localStorage.getItem(item) : defaultvalue;
  }
  

  public checkLogin(){
    console.log("checkking login");
    return true;
  }


  showMenu(){
  	this.showUserMenu = (this.showUserMenu)?false:true;
  }
  
  cleanURL(l,type ='res'){
		if(type == 'style'){
      return this.sanitizer.bypassSecurityTrustStyle(l);
    }else{
      return this.sanitizer.bypassSecurityTrustResourceUrl(l);
    }
  }


  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  public postCall(url, data){
      console.log(httpOptions);
     return this.http.post(url,data,httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  // public postCall(url, data){
  //    return this.http.post(url,data,this.httpOptions).pipe(
  //     map(this.extractData),
  //     catchError(this.handleError)
  //   );
  // }
  
  // public formpostCall(url, data){
  //    return this.http.post(url,data).pipe(
  //     map(this.extractData),
  //     catchError(this.handleError)
  //     );
  // }

  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const err = error || '';
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
