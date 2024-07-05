import { User } from './../models/User';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  private urlApi = "https://jsonplaceholder.typicode.com/users";

  login(email: string, lat: string){
    return this.http.get<User[]>(this.urlApi)
    .pipe(
      map((users: User[]) => {
        const user = users.find(u => u.email === email && u.address.geo.lat === lat);
        return user ? true : false;
      })
    );
  }
}
