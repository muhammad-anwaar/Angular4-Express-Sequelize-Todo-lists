import { Component, OnInit} from '@angular/core';
import { TaskService } from './../../task.service';
import {Router, ActivatedRoute, Params} from '@angular/router';


@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {
 
 task_detail : string ;

  constructor(private route: ActivatedRoute, private task_service : TaskService) { }



  ngOnInit() {

  this.route.params.subscribe(params => {
     let id = params['id'];
    
    /////////////////////
    //Get Task Details
    ////////////////////
    this.task_service.get_specific_task(id).subscribe(data => {

     if(data['error']==0)
       {
           this.task_detail=data['AuthResponse'];
          
       }
     else
     {
       console.log('Server Error');
     }

    });//end task details 

  });
  	
  }

}
