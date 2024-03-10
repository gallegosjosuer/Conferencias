import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { baseUrl } from '../config';

@Injectable()
export class ConferenceService {
  constructor(private http: HttpClient) {}

  getConferences(page: Number, pageSize: Number) {
    return this.http.post(`${baseUrl}/conferences`, {
      page: page,
      pageSize: pageSize,
    });
  }

  validateSignUp(user: User) {
    return this.http.get(`${baseUrl}/conferences/username/${user.username}`);
  }

  signUp(user: User) {
    return this.http.post(`${baseUrl}/conferences/signup`, {
      username: user.username,
      password: user.password,
    });
  }
}
