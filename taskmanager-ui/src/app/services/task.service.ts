import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Task } from '../models/task';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = `${environment.apiUrl}/tasks`;

  constructor(private http: HttpClient) { }

  getTasks(
    priority?: number,
    deadline?: Date,
    isCompleted?: boolean,
    searchTitle?: string
  ): Observable<Task[]> {
    let params = new HttpParams();
    
    if (priority !== undefined) {
      params = params.set('priority', priority.toString());
    }
    if (deadline) {
      params = params.set('deadline', deadline.toISOString());
    }
    if (isCompleted !== undefined) {
      params = params.set('isCompleted', isCompleted.toString());
    }
    if (searchTitle) {
      params = params.set('searchTitle', searchTitle);
    }

    return this.http.get<Task[]>(this.apiUrl, { params }).pipe(
      catchError(error => {
        console.error('Error fetching tasks:', error);
        return throwError(() => error);
      })
    );
  }

  getTask(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        console.error(`Error fetching task ${id}:`, error);
        return throwError(() => error);
      })
    );
  }

  createTask(task: Omit<Task, 'id' | 'userId'>): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task).pipe(
      catchError(error => {
        console.error('Error creating task:', error);
        return throwError(() => error);
      })
    );
  }

  updateTask(id: number, task: Omit<Task, 'id' | 'userId'>): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, task).pipe(
      catchError(error => {
        console.error(`Error updating task ${id}:`, error);
        return throwError(() => error);
      })
    );
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        console.error(`Error deleting task ${id}:`, error);
        return throwError(() => error);
      })
    );
  }
} 