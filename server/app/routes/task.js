'use strict';

module.exports = function(app) {
	// Task route
	var task = require('../../app/controllers/task');


	app.post('/AddTask', task.addTask); ///Add Task
	app.put('/updateTask', task.updateTask); //update Task
	app.post('/deleteTask', task.deleteTask); //delete Task

	app.get('/allTaskList', task.get_taks_list); //list all tasks 
	app.get('/getTaksByID', task.get_taks_by_id); // get task by ID
	app.get('/getTaskBeforeDate', task.get_taks_list_before_date); // task list before given date
	app.get('/getTaksListAfterDate', task.get_taks_list_after_date); //task list after given date
	app.get('/getAllUsers', task.get_all_users); //get all Users
	app.get('/userTaskList', task.get_user_task_list); //specific user task list
	app.get('/autocompleteTask', task.autocomplete_task); //autocomplete search
	app.get('/fullTextSearchTask', task.full_text_search_task); // full text search of task


};