import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task';
import { Observable, catchError, of, tap } from 'rxjs';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatSelectModule,
    MatProgressSpinnerModule
  ]
})
export class TaskFormComponent implements OnInit {
  taskForm: FormGroup;
  isEditMode: boolean = false;
  isLoading: boolean = false;
  minDate: Date = new Date();

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private dialogRef: MatDialogRef<TaskFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task | undefined
  ) {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      deadline: [null, Validators.required],
      priority: [2, Validators.required], // Default to medium priority
      isCompleted: [false]
    });

    if (data) {
      this.isEditMode = true;
      this.taskForm.patchValue({
        title: data.title,
        description: data.description,
        deadline: new Date(data.deadline),
        priority: data.priority,
        isCompleted: data.isCompleted
      });
    }
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.taskForm.valid) {
      this.isLoading = true;
      const formValue = this.taskForm.value;
      const taskData = {
        title: formValue.title,
        description: formValue.description || '',
        deadline: new Date(formValue.deadline).toISOString(),
        priority: formValue.priority,
        isCompleted: formValue.isCompleted || false
      };

      let request$: Observable<Task | void>;
      if (this.isEditMode && this.data) {
        request$ = this.taskService.updateTask(this.data.id, taskData);
      } else {
        request$ = this.taskService.createTask(taskData);
      }

      request$.pipe(
        tap(() => {
          this.dialogRef.close(true);
          this.isLoading = false;
        }),
        catchError((error: Error) => {
          console.error('Error saving task:', error);
          this.isLoading = false;
          alert('Failed to save task. Please try again.');
          return of(null);
        })
      ).subscribe();
    } else {
      // Mark all fields as touched to trigger validation messages
      Object.keys(this.taskForm.controls).forEach(key => {
        const control = this.taskForm.get(key);
        control?.markAsTouched();
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  getErrorMessage(field: string): string {
    const control = this.taskForm.get(field);
    if (!control) return '';
    
    if (control.hasError('required')) {
      return `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
    }
    if (control.hasError('minlength')) {
      return `${field.charAt(0).toUpperCase() + field.slice(1)} must be at least 3 characters`;
    }
    return '';
  }
} 