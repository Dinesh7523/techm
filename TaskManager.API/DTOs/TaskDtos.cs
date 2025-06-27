using System;
using System.ComponentModel.DataAnnotations;
using TaskManager.API.Models;

namespace TaskManager.API.DTOs
{
    public class CreateTaskDto
    {
        [Required]
        public required string Title { get; set; }
        
        public string? Description { get; set; }
        
        public DateTime? DueDate { get; set; }
        
        [Required]
        public TaskPriority Priority { get; set; }
        
        public int? AssignedUserId { get; set; }
    }

    public class UpdateTaskDto
    {
        [Required]
        public required string Title { get; set; }
        
        public string? Description { get; set; }
        
        public DateTime? DueDate { get; set; }
        
        [Required]
        public TaskState Status { get; set; }
        
        [Required]
        public TaskPriority Priority { get; set; }
        
        public int? AssignedUserId { get; set; }
    }

    public class TaskDto
    {
        public int Id { get; set; }
        public required string Title { get; set; }
        public string? Description { get; set; }
        public DateTime? DueDate { get; set; }
        public TaskState Status { get; set; }
        public TaskPriority Priority { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public int? AssignedUserId { get; set; }
        public string? AssignedUserName { get; set; }
    }
} 