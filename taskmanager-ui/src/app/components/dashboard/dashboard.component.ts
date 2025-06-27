import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task';
import { TaskFormComponent } from '../task-form/task-form.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'delete-confirmation-dialog',
  template: `
    <h2 mat-dialog-title>Confirm Delete</h2>
    <mat-dialog-content>
      Are you sure you want to delete this task?
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button [mat-dialog-close]="false">Cancel</button>
      <button mat-raised-button color="warn" [mat-dialog-close]="true">Delete</button>
    </mat-dialog-actions>
  `,
  standalone: true,
  imports: [MatDialogModule, MatButtonModule]
})
export class DeleteConfirmationDialog {}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatNativeDateModule,
    MatSelectModule,
    MatToolbarModule,
    MatDialogModule,
    MatTooltipModule,
    MatMenuModule
  ]
})
export class DashboardComponent implements OnInit {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  searchTitle: string = '';
  selectedPriority: number | null = null;
  selectedStatus: boolean | null = null;
  selectedDate: Date | null = null;

  constructor(
    private taskService: TaskService,
    private dialog: MatDialog,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks(
      this.selectedPriority || undefined,
      this.selectedDate ? new Date(this.selectedDate) : undefined,
      this.selectedStatus ?? undefined,
      this.searchTitle || undefined
    ).subscribe({
      next: (tasks) => {
        this.tasks = this.sortTasks(tasks);
        this.filteredTasks = this.tasks;
      },
      error: (error: Error) => {
        console.error('Error loading tasks:', error);
      }
    });
  }

  sortTasks(tasks: Task[]): Task[] {
    return tasks.sort((a, b) => {
      if (a.isCompleted !== b.isCompleted) {
        return a.isCompleted ? 1 : -1;
      }
      if (a.priority !== b.priority) {
        return a.priority - b.priority;
      }
      return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
    });
  }

  openTaskForm(task?: Task): void {
    const dialogRef = this.dialog.open(TaskFormComponent, {
      width: '500px',
      data: task ? { ...task } : undefined
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadTasks();
      }
    });
  }

  deleteTask(id: number): void {
    const dialogRef = this.dialog.open(DeleteConfirmationDialog, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.taskService.deleteTask(id).subscribe({
          next: () => {
            this.loadTasks();
          },
          error: (error: Error) => {
            console.error('Error deleting task:', error);
            alert('Failed to delete task. Please try again.');
          }
        });
      }
    });
  }

  toggleTaskStatus(task: Task): void {
    const updatedTask = {
      title: task.title,
      description: task.description,
      deadline: new Date(task.deadline).toISOString(),
      priority: task.priority,
      isCompleted: !task.isCompleted
    };

    this.taskService.updateTask(task.id, updatedTask).subscribe({
      next: () => {
        this.loadTasks();
      },
      error: (error: Error) => {
        console.error('Error updating task status:', error);
      }
    });
  }

  applyFilters(): void {
    this.loadTasks();
  }

  clearFilters(): void {
    this.searchTitle = '';
    this.selectedPriority = null;
    this.selectedStatus = null;
    this.selectedDate = null;
    this.loadTasks();
  }

  getPriorityLabel(priority: number): string {
    switch (priority) {
      case 1: return 'High';
      case 2: return 'Medium';
      case 3: return 'Low';
      default: return 'Unknown';
    }
  }

  getPriorityColor(priority: number): string {
    switch (priority) {
      case 1: return '#f44336';
      case 2: return '#ff9800';
      case 3: return '#4caf50';
      default: return '#9e9e9e';
    }
  }

  isOverdue(task: Task): boolean {
    if (task.isCompleted) return false;
    const deadline = new Date(task.deadline);
    const now = new Date();
    return deadline < now;
  }

  logout(): void {
    const dialogRef = this.dialog.open(LogoutConfirmationDialog, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.authService.logout();
        this.router.navigate(['/login']);
      }
    });
  }
}

@Component({
  selector: 'logout-confirmation-dialog',
  template: `
    <h2 mat-dialog-title>Confirm Logout</h2>
    <mat-dialog-content>
      Are you sure you want to logout?
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button [mat-dialog-close]="false">Cancel</button>
      <button mat-raised-button color="warn" [mat-dialog-close]="true">Logout</button>
    </mat-dialog-actions>
  `,
  standalone: true,
  imports: [MatDialogModule, MatButtonModule]
})
export class LogoutConfirmationDialog {} 