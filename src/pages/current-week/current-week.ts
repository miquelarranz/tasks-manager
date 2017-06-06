import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'current-week',
  templateUrl: 'current-week.html'
})

export class CurrentWeekPage {

  public days: Array<{title: string, tasks: FirebaseListObservable<any[]>, width: string}>;

  constructor(public db: AngularFireDatabase, public alertCtrl: AlertController) {
  	this.days = [
 			{title: 'Monday', tasks: db.list('/tasks', {query: {orderByChild: 'day', equalTo: 'Monday'}}), width: 'col-lg-3'},
 			{title: 'Tuesday', tasks: db.list('/tasks', {query: {orderByChild: 'day', equalTo: 'Tuesday'}}), width: 'col-lg-3'},
 			{title: 'Wednesday', tasks: db.list('/tasks', {query: {orderByChild: 'day', equalTo: 'Wednesday'}}), width: 'col-lg-3'},
 			{title: 'Thursday', tasks: db.list('/tasks', {query: {orderByChild: 'day', equalTo: 'Thursday'}}), width: 'col-lg-3'},
 			{title: 'Friday', tasks: db.list('/tasks', {query: {orderByChild: 'day', equalTo: 'Friday'}}), width: 'col-lg-4'},
 			{title: 'Saturday', tasks: db.list('/tasks', {query: {orderByChild: 'day', equalTo: 'Saturday'}}), width: 'col-lg-4'},
 			{title: 'Sunday', tasks: db.list('/tasks', {query: {orderByChild: 'day', equalTo: 'Sunday'}}), width: 'col-lg-4'}
  	]
  }

  addTask() {
  	let addTaskAlert = this.alertCtrl.create({
	    title: 'Add a Task',
	    inputs: [
	      {
	        name: 'description',
	        placeholder: 'I have to check my email...'
	      },
	      {
	        name: 'day',
	        value: 'Monday',
	        placeholder: 'Monday' 
	      }
	    ],
	    buttons: [
	      {
	        text: 'Cancel'
	      },
	      {
	        text: 'Save',
	        handler: data => {
	        	for (let day of this.days) {
							if (data.day === day.title) {
			          day.tasks.push({
			            description: data.description,
			            day: data.day
			          });
							}
						}
	        }
	      }
	    ]
	  });

	  addTaskAlert.present();
  }
}
