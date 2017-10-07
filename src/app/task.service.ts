import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders,  HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import {Observable}              from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
//import 'rxjs/Rx';  // use this line if you want to be lazy, otherwise:
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';  // debug
import 'rxjs/add/operator/catch';

@Injectable()
export class TaskService {
url: string;

  constructor(private http: HttpClient){
    this.url = 'http://localhost:3000';
  }

   //////////////////
  ////get All Tasks
  ///////////////////
  get_all_task(){

  	return this.http.get(this.url+'/allTaskList');
  }
  
  //////////////////////
  ///get specific Task
  //////////////////////
  get_specific_task(id){

           return this.http.get(this.url+'/getTaksByID?id='+id+'');
  }

  ///////////////////////////////
  //Get Tasks Before Given Date
  //////////////////////////////
  get_task_before_date(given_date)
  {
    return this.http.get(this.url+'/getTaskBeforeDate?given_date='+given_date+'');
  }

  /////////////////////////////
  //Get Taks After Given Date
  /////////////////////////////

  get_task_after_date(given_date)
  {
    return this.http.get(this.url+'/getTaksListAfterDate?given_date='+given_date+'');
  }

  /////////////////
  //Get All Users
  ////////////////
  get_all_users()
  {
    return this.http.get(this.url+'/getAllUsers');

  }

  ///////////////////////
  //Get User Task List
  //////////////////////
  userTaskList(username)
  {
    return this.http.get(this.url+'/userTaskList?username='+username+'');
  }

  ////////////////////////
  //Auto complete Search
  ///////////////////////

  autocomplete_task(search_name)
  {
    return this.http.get(this.url+'/autocompleteTask?search_name='+search_name+'');
  }

  ////////////////////
  //Full text Search
  ///////////////////
  fulltext_search(task_name)
  {
    return this.http.get(this.url+'/fullTextSearchTask?task_name='+task_name+'');
  }

   //////////////
  ////Add Task
  ///////////////
  add_task(form_data){ 
   
   return this.http.post(this.url+'/AddTask', $.param(form_data), {
    headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8'),
  });

  }

   ////////////////
  ////update Task
  /////////////////
 update_task(form_data)
 {
 
  return this.http.put(this.url+'/updateTask', $.param(form_data),  {  
    headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
  });
 

 }

 ///////////////
 //Delete Task
 ///////////////
delete_task(form_data)
{

 return this.http.post(this.url+'/deleteTask', $.param(form_data),  {  
    headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
  }); 

}

}
