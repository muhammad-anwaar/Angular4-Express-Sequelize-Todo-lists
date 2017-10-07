'use strict';

const request =  require('supertest');
const expect = require('chai').expect;
const app=require('../../app');

////////////////////////
//Add Task Test
///////////////////////
describe('POST /getAllUsers', function(){
  it('Add Task Test', function(done){
    request(app)
    .post('/AddTask')
    .send({task_name : 'Unit Test Task', task_end_date : '2017-09-21', description: 'Task Test Description' , created_by : 'anwaar'})
    .set('Accept', 'application/json')
    .expect("Content-type",/json/)
    .expect(200)
    .end(function(err,res){
      expect(res.body.AuthResponse).to.equal('task saved successfully.');
      done();
    });

  });
});

////////////////////////
//Update Task Test
///////////////////////
describe('PUT /updateTask', function(){
  it('Update Task Test', function(done){
    request(app)
    .put('/updateTask')
    .send({id : 45 , task_name : 'Unit Test Task Updated', task_end_date : '2017-09-22', description: 'Task Test Description updated' , created_by : 'anwaar'})
    .set('Accept', 'application/json')
    .expect("Content-type",/json/)
    .expect(200)
    .end(function(err,res){
      expect(res.body.AuthResponse).to.equal('Task Updated successfully.');
      done();
    });

  });
});

/////////////////////
///Get All Tasks Test
////////////////////
describe('GET /allTaskList', function() {
  it('respond with All Task Array json Test', function(done) {
    request(app)
      .get('/allTaskList')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response =>{
      	expect(response.body.AuthResponse).to.be.a('array');
      	done();
      });
  });
});

///////////////////////
//Task By ID Test
/////////////////////
describe('GET /getTaksByID', function(){
  it('Response With Single Task Test', function(done){
    request(app)
    .get('/getAllUsers')
    .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(function(res) {
        res.body.id = '22';
      })
      .expect(200, done);
  });
});

//////////////////////////////
//task test before given date
////////////////////////////
describe('/getTaskBeforeDate', function(){
  it('Get Task List Before Given Date Test', function(done){
    request(app)
    .get('/getTaskBeforeDate')
    .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect(function(res) {
        res.body.given_date = '2017-09-20';
      })
      .expect(200, done);
  });
});

///////////////////////////////
//Tasks Test After Given Date
///////////////////////////////
describe('/getTaksListAfterDate', function(){
  it('Get Tasks List After Given Date Test', function(done){
    request(app)
    .get('/getTaksListAfterDate')
    .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect(function(res) {
        res.body.given_date = '2017-09-21';
      })
      .expect(200, done);
  });
});

////////////////////////////////
///Get Specific User Task List
/////////////////////////////
describe('/userTaskList', function(){
  it('Specific User Task List Test', function(done){
    request(app)
    .get('/userTaskList')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .expect(function(res) {
       res.body.username = 'anwaar';
    })
    .expect(200, done);
  });
});

////////////////////////
//Delete Task Test
///////////////////////
describe('POST /deleteTask', function(){
  it('Delete Task Test', function(done){
    request(app)
    .post('/deleteTask')
    .send({id : '44'})
    .set('Accept', 'application/json')
    .expect("Content-type",/json/)
    .expect(200, done);

  });
});


//////////////////////
///Auto complete Test
/////////////////////
describe('/autocompleteTask', function(){
  it('Auto Complete Search Box Test', function(done){
    request(app)
    .get('/autocompleteTask')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .expect(function(res) {
       res.body.search_name = 'task';
     })
    .expect(200, done);
  });
});

//////////////////////////
///Full Text Search Test
/////////////////////////
describe('/fullTextSearchTask', function(){
  it('Full Text Search Test', function(done){
    request(app)
    .get('/fullTextSearchTask')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .expect(function(res) {
       res.body.task_name = 'task';
     })
    .expect(200, done);
  });
});

////////////////////////
//Get All Users Test
///////////////////////
describe('GET /getAllUsers', function(){
  it('Response With All Users Array Test', function(done){
    request(app)
    .get('/getAllUsers')
    .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response =>{
        expect(response.body.AuthResponse).to.be.a('array');
        done();
      });
  });
});

