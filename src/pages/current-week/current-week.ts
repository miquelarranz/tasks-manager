import { Component } from '@angular/core';
import { AlertController, ActionSheetController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'current-week',
  templateUrl: 'current-week.html'
})

export class CurrentWeekPage {

  public days: Array<{title: string, tasks: FirebaseListObservable<any[]>, width: string}>;
  public availableDays: Array<string>;

  constructor(public db: AngularFireDatabase, public alertCtrl: AlertController, public actionSheetCtrl: ActionSheetController) {
  	this.days = [
 			{title: 'Monday', tasks: db.list('/tasks', {query: {orderByChild: 'day', equalTo: 'Monday'}}), width: 'col-lg-3'},
 			{title: 'Tuesday', tasks: db.list('/tasks', {query: {orderByChild: 'day', equalTo: 'Tuesday'}}), width: 'col-lg-3'},
 			{title: 'Wednesday', tasks: db.list('/tasks', {query: {orderByChild: 'day', equalTo: 'Wednesday'}}), width: 'col-lg-3'},
 			{title: 'Thursday', tasks: db.list('/tasks', {query: {orderByChild: 'day', equalTo: 'Thursday'}}), width: 'col-lg-3'},
 			{title: 'Friday', tasks: db.list('/tasks', {query: {orderByChild: 'day', equalTo: 'Friday'}}), width: 'col-lg-4'},
 			{title: 'Saturday', tasks: db.list('/tasks', {query: {orderByChild: 'day', equalTo: 'Saturday'}}), width: 'col-lg-4'},
 			{title: 'Sunday', tasks: db.list('/tasks', {query: {orderByChild: 'day', equalTo: 'Sunday'}}), width: 'col-lg-4'}
  	]

  	this.availableDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  }

  openTaskActions(taskId, taskDescription, taskDay, taskDone) {
  	let taskActions = this.actionSheetCtrl.create({
      
      title: 'Task Actions',
      cssClass: 'task-actions',
      buttons: [
        {
          text: 'Done/Undone',
          icon: 'checkmark',
          handler: () => this.toggleTask(taskId, taskDay, taskDone)
        },{
          text: 'Edit',
          icon: 'build',
          handler: () => this.editTask(taskId, taskDescription, taskDay)
        },{
          text: 'Delete',
          role: 'destructive',
          icon: 'trash',
          handler: () => this.deleteTask(taskId, taskDay)
        },
        {
          text: 'Cancel',
          role: 'cancel', 
          icon: 'close'
        }
      ]
    });
    taskActions.present();
  }

  addTask(day) {
  	let addTaskAlert = this.alertCtrl.create({
	    title: 'Add a Task',
	    inputs: [
	      {
	        name: 'description',
	        placeholder: 'I have to check my email...'
	      },
	      {
	        name: 'day',
	        value: (day) ? day : 'Monday',
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
	        	if (this.availableDays.indexOf(data.day) < 0) {
							this.alertCtrl.create({
					      title: 'Error!',
					      subTitle: 'The day must be a valid day (Monday, Tuesday, Wednesday, Thursday, Friday, Saturday or Sunday)',
					      buttons: ['OK']
					    }).present();

					    return false;
	        	}
	        	else {
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
	      }
	    ]
	  });

	  addTaskAlert.present();
  }

  toggleTask(taskId, taskDay, taskDone) {
		for (let day of this.days) {
			if (day.title === taskDay) day.tasks.update(taskId, {done: ((taskDone) ? false : true)});
		}
  }

  editTask(taskId, taskDescription, taskDay) {
  	let editTaskAlert = this.alertCtrl.create({
	    title: 'Edit the description',
	    inputs: [
	      {
	        name: 'description',
	        value: taskDescription,
	        placeholder: 'I have to check my email...'
	      }
	    ],
	    buttons: [
	      {
	        text: 'Cancel'
	      },
	      {
	        text: 'Edit',
	        handler: data => {
	        	for (let day of this.days) {
							if (day.title === taskDay) day.tasks.update(taskId, {description: data.description});
						}
	        }
	      }
	    ]
	  });

	  editTaskAlert.present();
  }

  deleteTask(taskId, taskDay) {
  	for (let day of this.days) {
			if (day.title === taskDay) day.tasks.remove(taskId);
		}
  }
}
