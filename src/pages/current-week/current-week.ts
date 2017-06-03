import { Component } from '@angular/core';


@Component({
  selector: 'current-week',
  templateUrl: 'current-week.html'
})

export class CurrentWeekPage {

  days: Array<{title: string, tasks: Array<{description: string}>, width: string}>;

  constructor() {

  	this.days = [
 			{title: 'Monday', tasks: [{description: 'This is a test'}], width: 'col-lg-3'},
 			{title: 'Tuesday', tasks: [{description: 'This is a test'}], width: 'col-lg-3'},
 			{title: 'Wednesday', tasks: [{description: 'This is a test'}], width: 'col-lg-3'},
 			{title: 'Thursday', tasks: [{description: 'This is a test'}], width: 'col-lg-3'},
 			{title: 'Friday', tasks: [{description: 'This is a test'}], width: 'col-lg-4'},
 			{title: 'Saturday', tasks: [{description: 'This is a test'}], width: 'col-lg-4'},
 			{title: 'Sunday', tasks: [{description: 'This is a test'}], width: 'col-lg-4'}
  	]
  }
}
