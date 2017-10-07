'use strict';

module.exports = function(sequelize, DataTypes) {

	var tasks = sequelize.define('tasks',
	{   id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        },
		task_name: DataTypes.STRING,
		task_end_date: DataTypes.STRING, 
		description: DataTypes.STRING,
		created_by: DataTypes.STRING
	},
	{
			classMethods: {
				///custom method if have any
			}
	}
	);

	return tasks;
};
