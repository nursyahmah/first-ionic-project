import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    // { title: 'Inbox', url: '/folder/Inbox', icon: 'mail' },
    // { title: 'Outbox', url: '/folder/Outbox', icon: 'paper-plane' },
    // { title: 'Favorites', url: '/folder/Favorites', icon: 'heart' },
    // { title: 'Archived', url: '/folder/Archived', icon: 'archive' },
    // { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
    // { title: 'Spam', url: '/folder/Spam', icon: 'warning' },
    { title: 'Profile', url: '/profile-view', icon: 'person' },
    { title: 'Ticket List', url: '/ticket-list', icon: 'list' },
  ];
  // public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(
    private storage: Storage,
    private router:Router
  ) {
    this.initializeStorage();
  }
  initializeStorage() {
    this.storage.create().then((resp:any) => {
      console.log(resp);
      this.checkSession();
    }, (error:any) =>  {
      console.log(error);
    })
  }

  checkSession() {
    this.storage.get('api_key').then((resp) => {
      console.log(resp);
      if(resp !== null) {
        this.router.navigate(['/folder']);
      }
    })
  }
}
