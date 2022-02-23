import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MainService } from '../main/main.service';

@Injectable({
  providedIn: 'root'
})
export class AllService {

  constructor(
    public http   : HttpClient,
    public api    : MainService,
  ) { }

  register(params?: any) {
    return this.api.post('register', params);
  }

  login(params?: any) {
    return this.api.post('login', params);
  }

  logout(params?: any) {
    return this.api.post('logout', params);
  }

  profileView(params?: any) {
    return this.api.post('profile/view', params);
  }

  profileUpdate(params?: any) {
    return this.api.post('profile/update', params);
  }

  // ticketNew(params?: any) {
  //   return this.api.post('ticket/new', params);
  // }

  ticketNew(params?: any) {
    return this.api.post('insert', params);
  }

  ticketAll(params?: any) {
    return this.api.post('ticket/all', params);
  }

  ticketView(params?: any) {
    return this.api.post('ticket/view', params);
  }

  ticketUpdate(params?: any) {
    return this.api.post('ticket/update', params);
  }

  ticketDelete(params?: any) {
    return this.api.post('ticket/delete', params);
  }

  changePassword(params?: any) {
    return this.api.post('profile/change-password', params);
  }

}
