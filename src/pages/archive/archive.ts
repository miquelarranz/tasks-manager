import { Component } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'archive',
  templateUrl: 'archive.html'
})

export class ArchivePage {

	public archive: FirebaseListObservable<any[]>;

  constructor(public db: AngularFireDatabase) {
  	this.archive = db.list('/archive');
  }
}
