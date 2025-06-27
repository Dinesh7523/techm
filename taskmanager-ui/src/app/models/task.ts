export interface Task {
    id: number;
    title: string;
    description: string;
    deadline: string;
    priority: number;
    isCompleted: boolean;
    userId: number;
}

export interface CreateTaskRequest {
    title: string;
    description: string;
    deadline: string;
    priority: number;
}

export interface UpdateTaskRequest {
    title: string;
    description: string;
    deadline: string;
    priority: number;
    isCompleted: boolean;
} 