'use strict';

/**
 * Module dependencies.
 */
var db = require('../../config/sequelize');
var moment = require('moment-timezone');

///////////////////////
///Get All Task Lists
////////////////////////
exports.get_taks_list = function(req, res) { 


	var data = {
		'error': '',
		'AuthResponse': ''
	};


	db.tasks.findAll({
		order: 'createdAt DESC'
	}).then(response => {
		// All Tasks

		data = {
			'error': '0',
			'AuthResponse': response
		};

		res.json(data);

	}).catch(function(err) {

		console.log(err);
		data = {
			'error': '400',
			'AuthResponse': err
		};
		res.json(data);

	});



	return res;
};

///////////////////////////////
////Get Task by ID
//////////////////////////////

exports.get_taks_by_id = function(req, res) {

	var id = req.query.id;

	var data = {
		'error': '',
		'AuthResponse': ''
	};

	if (!id) {

		 data = {
			'error': '500',
			'AuthResponse': 'Task ID Required.'
		};
		res.json(id);
		return res;
		return false;

	}

	db.tasks.findOne({
		where: {
			id: id
		}
	}).then(response => {
		// All Tasks

		data = {
			'error': '0',
			'AuthResponse': response
		};

		res.json(data);

	}).catch(function(err) {

		console.log(err);
		data = {
			'error': '500',
			'AuthResponse': err
		};
		res.json(data);

	});



	return res;
};

////////////////////////////////
///Get Task Before Given Date
////////////////////////////////

exports.get_taks_list_before_date = function(req, res) {

	var given_date = req.query.given_date;

	var data = {
		'error': '',
		'AuthResponse': ''
	};

	if (!given_date) {

		 data = {
			'error': '500',
			'AuthResponse': 'Given date Required.'
		};
		res.json(data);
		return res;
		return false;

	}

	db.tasks.findAll({
		where: {
			task_end_date: {
				$lte: given_date, // task end date <= 
			}
		}
	}).then(response => {
		// All Tasks

		data = {
			'error': '0',
			'AuthResponse': response
		};

		res.json(data);

	}).catch(function(err) {

		console.log(err);
		data = {
			'error': '500',
			'AuthResponse': err
		};
		res.json(data);

	});



	return res;
};


///////////////////////////////
//Get Task After Given Date
////////////////////////////////

exports.get_taks_list_after_date = function(req, res) {

	var given_date = req.query.given_date;

	var data = {
		'error': '',
		'AuthResponse': ''
	};

	if (!given_date) {

		 data = {
			'error': '500',
			'AuthResponse': 'Given date Required.'
		};
		res.json(data);
		return res;
		return false;

	}

	db.tasks.findAll({
		where: {
			task_end_date: {
				$gte: given_date, // task end date <= 
			}
		}
	}).then(response => {
		// All Tasks

		data = {
			'error': '0',
			'AuthResponse': response
		};

		res.json(data);

	}).catch(function(err) {

		console.log(err);
		data = {
			'error': '500',
			'AuthResponse': err
		};
		res.json(data);

	});



	return res;
};

///////////////////////////////
//AutoComplete Task Search 
////////////////////////////////

exports.autocomplete_task = function(req, res) {

	var search_name = req.query.search_name;

	var data = {
		'error': '',
		'AuthResponse': ''
	};

	if (!search_name) {

		 data = {
			'error': '500',
			'AuthResponse': 'Search Name Required.'
		};
		res.json(data);
		return res;
		return false;

	}

	db.tasks.findAll({
		where: {
			task_name: {
				like: '%' + search_name + '%', // task end date <= 
			}
		}
	}).then(response => {
		data = {
			'error': '0',
			'AuthResponse': response
		};

		res.json(data);

	}).catch(function(err) {

		console.log(err);
		data = {
			'error': '500',
			'AuthResponse': err
		};
		res.json(data);

	});



	return res;
};

///////////////////////////////
//Full Text Search Of Task
//////////////////////////////
exports.full_text_search_task = function(req, res) {

	var task_name = req.query.task_name;

	var data = {
		'error': '',
		'AuthResponse': ''
	};

	if (!task_name) {

		 data = {
			'error': '500',
			'AuthResponse': 'Search Name Required.'
		};
		res.json(data);
		return res;
		return false;

	}

	db.tasks.findAll({
		where: ['MATCH (task_name, description) AGAINST(?)', [task_name + " IN BOOLEAN MODE"]]
	}).then(response => {
		data = {
			'error': '0',
			'AuthResponse': response
		};

		res.json(data);

	}).catch(function(err) {

		console.log(err);
		data = {
			'error': '500',
			'AuthResponse': err
		};
		res.json(data);

	});



	return res;
};

///////////////////////////////
///Get All Users
//////////////////////////////

exports.get_all_users = function(req, res) {


	var data = {
		'error': '',
		'AuthResponse': ''
	};

	db.tasks.findAll({
		group: 'created_by'
	}).then(response => {
		// All Users

		data = {
			'error': '0',
			'AuthResponse': response
		};

		res.json(data);

	}).catch(function(err) {

		console.log(err);
		data = {
			'error': '500',
			'AuthResponse': err
		};
		res.json(data);

	});



	return res;
};


//////////////////////////////
///Get Task by specific user
//////////////////////////////

exports.get_user_task_list = function(req, res) {

	var username = req.query.username;

	var data = {
		'error': '',
		'AuthResponse': ''
	};

	if (!username) {

		 data = {
			'error': '500',
			'AuthResponse': 'Given date Required.'
		};
		res.json(data);
		return res;
		return false;

	}


	db.tasks.findAll({
		where: {
			created_by: {
				like: username, // task end date <= 
			}
		}
	}).then(response => {
		// response of result

		data = {
			'error': '0',
			'AuthResponse': response
		};

		res.json(data);

	}).catch(function(err) {

		console.log(err);
		data = {
			'error': '500',
			'AuthResponse': err
		};
		res.json(data);

	});



	return res;
};

//////////////////
//Add Task
//////////////////

exports.addTask = function(req, res) {
	var task_name = req.body.task_name;
	var task_end_date = req.body.task_end_date;
	var description = req.body.description;
	var created_by = req.body.created_by;

	var data = {
		'error': '',
		'AuthResponse': ''
	};


	if (!task_name || !task_end_date || !description || !created_by) {

		 data = {
			'error': '400',
			'AuthResponse': 'All Fields Are Required.'
		};
		res.json(data);
		return res;
		return false;

	}



	db.tasks.create({
		task_name: task_name,
		task_end_date: task_end_date,
		description: description,
		created_by: created_by
	}).then(function(taskRes) {

		//console.log(taskRes.dataValues.id);
		var data = {
			'error': '0',
			'InsertID': taskRes.dataValues.id,
			'AuthResponse': 'task saved successfully.'
		};

		res.json(data);

	}).catch(function(err) {

		console.log(err);
		var data = {
			'error': '400',
			'AuthResponse': err
		};
		res.json(data);

	});

	return res;

};

/////////////////
//Update Task
////////////////

exports.updateTask = function(req, res) {

	var id = req.body.id;
	var task_name = req.body.task_name;
	var task_end_date = req.body.task_end_date;
	var description = req.body.description;
	var created_by = req.body.created_by;

	var data = {
		'error': '',
		'AuthResponse': ''
	};


	if (!id || !task_name || !task_end_date || !description || !created_by) {

		 data = {
			'error': '400',
			'AuthResponse': 'All Fields Are Required.'
		};
		res.json(data);
		return res;
		return false;

	}



	db.tasks.update({
		task_name: task_name,
		task_end_date: task_end_date,
		description: description,
		created_by: created_by
	}, {
		where: {
			id: id
		}
	}).then(function(taskRes) {

		//console.log(taskRes);
		var data = {
			'error': '0',
			'AuthResponse': 'Task Updated successfully.'
		};

		res.json(data);

	}).catch(function(err) {

		console.log(err);
		var data = {
			'error': '400',
			'AuthResponse': err
		};
		res.json(data);

	});

	return res;
};

//////////////////
//Delete Task
/////////////////

exports.deleteTask = function(req, res) {
	var id = req.body.id;

	var data = {
		'error': '',
		'AuthResponse': ''
	};


	if (!id) {

		 data = {
			'error': '400',
			'AuthResponse': 'ID Required.'
		};
		res.json(data);
		return res;
		return false;

	}

   ////find if record is present 
	db.tasks.findOne({
		where: {
			id: id
		}
	}).then(response => {
		// Perform delete 
     if(response !=null && response !='')
     {
    db.tasks.destroy({
		where: {
			id: id
		}
	}).then(function(rowDeleted) {
		if (rowDeleted === 1) {
			var data = {
				'error': '0',
				'AuthResponse': 'Task deleted successfully.'
			};
			res.json(data);

		}
	}, function(err) {
		console.log(err);
	});///Delete Ends
	
	}
	else
	{
		var data = {
				'error': '0',
				'AuthResponse': 'Record Already Deleted.'
			};
			res.json(data);

	}

	}).catch(function(err) {

		console.log(err);
		data = {
			'error': '500',
			'AuthResponse': err
		};
		res.json(data);

	});

	

	return res;
};