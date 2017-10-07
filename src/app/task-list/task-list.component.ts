import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { TaskService } from './../task.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';

import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs/Rx';


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
 
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  dtOptions: DataTables.Settings = {};
  // The trigger needed to re-render the table
  dtTrigger: Subject<any> = new Subject();

  items : string ;
  users : string ;
  responseMessage : string;
  form ;
  value: Date;
  text: string;
  results;
  array_result: string[] = []


  selectedFilter:string;
   public filterTypes = [

  {value:'', display:'Select Action'},
  {value:'1', display:'Task Before Given Date'},
  {value:'2', display:'Task After Given Date'},

  ];

  constructor(private task_service : TaskService) {

    this.selectedFilter='';

 }///constructor Ends

 
 //////////////////////
 //Autocomplete Search
 ///////////////////// 
 search_task(event) {

        this.task_service.autocomplete_task(event.query).subscribe(data => {

            this.array_result.splice(0,this.array_result.length);
            
            for(let res of data['AuthResponse']){
              this.array_result.push(res.task_name);
            }
            this.results = this.array_result;
           
        }); 
    }
 

  //////////////////
  //Add Task
  //////////////////
  add_task(){ 

     
  	let task_name=this.form.value.task_name;
  	let description=this.form.value.description;
  	let task_end_date=$('input[name=date]').val();
  	let created_by=this.form.value.created_by;
    let id=$('#t_id').val();
     
    if(id == "")///add task
    {
    let form_data1=[{task_name, description, task_end_date, created_by}];
    let form_data=form_data1[0];
  	this.task_service.add_task(form_data).subscribe(data => {
     
     this.responseMessage=data['AuthResponse']; 
     this.form.reset();
     $('#msg_response').show(); 
	   $('.close').click();


     ///get all tasks 
      this.task_service.get_all_task().subscribe(data => {
        this.items = data['AuthResponse']; 
        this.reintialize_datatable();

         ///clear Selection
        $(".task_by_date:first").prop("selectedIndex", 0);
        $(".user_all_class:first").prop("selectedIndex", 0);
        $('.ui-inputtext').val('');
        $('.ui-autocomplete-input').val('');

      });

    
    });

  }///end add task
  else
  {///update task
    let form_data1=[{id,task_name, description, task_end_date, created_by}];
    let form_data=form_data1[0];
    
    this.task_service.update_task(form_data).subscribe(data => {
     
     this.responseMessage=data['AuthResponse']; 
     this.form.reset();
     $('#msg_response').show();
     $('.close').click();

      ///get all tasks 
      this.task_service.get_all_task().subscribe(data => {
      this.items = data['AuthResponse']; 
      this.reintialize_datatable();

       ///clear Selection
        $(".task_by_date:first").prop("selectedIndex", 0);
        $(".user_all_class:first").prop("selectedIndex", 0);
        $('.ui-inputtext').val('');
        $('.ui-autocomplete-input').val('');

      });

    
    });
    

  }
  	
  }


  ////////////////////
  //Get Specific Task
  ///////////////////
  get_specific_task(id){

         ///clear Selection
        $(".task_by_date:first").prop("selectedIndex", 0);
        $(".user_all_class:first").prop("selectedIndex", 0);
        $('.ui-inputtext').val('');
        $('.ui-autocomplete-input').val('');

    this.task_service.get_specific_task(id).subscribe(data => {

     if(data['error']==0)
       {
           let taskitem=data['AuthResponse'];
           $('#task_name').val(taskitem.task_name);
           $('#description').val(taskitem.description);
           let task_end_date=taskitem.task_end_date.split("T");
           $('.ui-inputtext').val(task_end_date[0]);
           $('#created_by').val(taskitem.created_by);
           $('#t_id').val(taskitem.id);

            ///initialize form validation for task Update
            this.form =  new FormGroup({

            task_name: new FormControl(taskitem.task_name , Validators.required),
            description: new FormControl(taskitem.description , Validators.required),
            date: new FormControl(task_end_date[0]),
            created_by: new FormControl(taskitem.created_by , Validators.required) 

            }); /// form validation ends

           $('.modal-title').text('Update Task');
           $('#add_task_btn').click();
       }
     else
     {
       console.log('Server Error');
     }

    });

  }

  /////////////////////
  //Get Tasks By Date
  ////////////////////
  get_tasks_by_date(selectedValue)
  {
    ///console.log('value is =>',selectedValue,"=>currentDate =>", current_date);
    //1 = before given date tasks, 2= after given date tasks

    let current_date=$("input[name=given_date]").val();
    if(current_date==''){
      alert('Date Required');
      $(".task_by_date:first").prop("selectedIndex", 0);
      $(".user_all_class:first").prop("selectedIndex", 0);
      $('.ui-inputtext').val('');
      $('.ui-autocomplete-input').val(''); 
       return false;
    }

    if(selectedValue==1)//tasks before given date
    {
    this.task_service.get_task_before_date(current_date).subscribe(data => {

     this.items = data['AuthResponse']; 
     this.reintialize_datatable();

     ///clear Selection
        $(".user_all_class:first").prop("selectedIndex", 0);
        $('.ui-autocomplete-input').val('');

    });
  }
  else if(selectedValue==2)///tasks after given date
  {

    this.task_service.get_task_after_date(current_date).subscribe(data => {
     
     this.items = data['AuthResponse'];
     this.reintialize_datatable(); 

     ///clear Selection
        $(".user_all_class:first").prop("selectedIndex", 0);
        $('.ui-autocomplete-input').val('');

    });

  }
  else
  {
    alert('Action Required');
  }
  
  }

  /////////////////////
  //Get Taks By Users
  /////////////////////
  get_tasks_by_user(selectedValue:string){

    if(selectedValue != '')
    {
      this.task_service.userTaskList(selectedValue).subscribe(data => {
        this.items = data['AuthResponse']; 
        this.reintialize_datatable();
        ///clear Selection
        $(".task_by_date:first").prop("selectedIndex", 0);
        $('.ui-inputtext').val('');
        $('.ui-autocomplete-input').val('');

      });
    }
    else
    {
      alert('User Value Required !.');
    }

  }

  /////////////////////////
 //Search Full Text 
 ////////////////////////
  search_full_text(){

    ///clear Selection
    $(".task_by_date:first").prop("selectedIndex", 0);
    $(".user_all_class:first").prop("selectedIndex", 0);
    $("input[name=given_date]").val('');
    
    let task_name=$('.ui-autocomplete-input').val();
    if(task_name != '')
    {
    this.task_service.fulltext_search(task_name).subscribe(data => {
      
      this.items = data['AuthResponse']; 
      this.reintialize_datatable();


    });
  }
  else
  {
    alert('Task Name Required.');
  }

  }

  //////////////
  //Delete Task
  //////////////
  delete_task(id)
  {
   
    if(confirm("Are you sure to delete this ? ")) {
      
      if(id !='')
      {
        let form_data1=[{id}];
       let form_data=form_data1[0];
       this.task_service.delete_task(form_data).subscribe(data => {

          this.responseMessage=data['AuthResponse']; 
          $('#msg_response').show();

          
          ///get all tasks 
          this.task_service.get_all_task().subscribe(data => {
           this.items = data['AuthResponse']; 
           this.reintialize_datatable();
              

           });
          
        }); 

      }

  }

  }

  ////////////////////////////////////////////
  //Reintialize datatable to reflect Changes
  ///////////////////////////////////////////
  reintialize_datatable()
  {
    /*********** Data table Destroy And Reinitialize to reflect changes ************/
              this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
              // Destroy the table first
              dtInstance.destroy();
              // Call the dtTrigger to rerender again
              this.dtTrigger.next();
              });  ////end datatables 

  }


  ngOnInit() {


  	this.dtOptions = {
      pagingType: 'full_numbers',
      "ordering": false,
      "searching": false
    };
    
    
    ///get all tasks 
    this.task_service.get_all_task().subscribe(data => {
     this.items = data['AuthResponse']; 
     this.reintialize_datatable();
     });

    ////Load All Users
    this.task_service.get_all_users().subscribe(data => {
     this.users = data['AuthResponse']; 
     });

   ///initialize form validation for task
   this.form =  new FormGroup({
   
   task_name: new FormControl("", Validators.required),
   description: new FormControl("", Validators.required),
   date: new FormControl(""),
   created_by: new FormControl("", Validators.required)

   }); /// form validation ends

  }

   ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

 

}
