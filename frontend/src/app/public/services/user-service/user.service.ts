import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, throwError } from 'rxjs';
import { UserI } from 'src/app/model/user.interface';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private snackbar: MatSnackBar) { }

  findByUsername(username: string): Observable<UserI[]> {
    return this.http.get<UserI[]>(`api/users/find-by-username?username=${username}`);
  }

  create(user: UserI): Observable<UserI> {
    return this.http.post<UserI>('api/users', user).pipe(
      tap((createdUser: UserI) => this.snackbar.open(`User ${createdUser.username} created successfully`, 'Close', {
        duration: 2000, horizontalPosition: 'right', verticalPosition: 'top'
      })),
      catchError(e => {
        this.snackbar.open(`User could not be created, due to: ${e.error.message}`, 'Close', {
          duration: 5000, horizontalPosition: 'right', verticalPosition: 'top'
        })
        return throwError(e);
      })
    )
  }
}
