using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TaskManager.API.Models
{
    public enum TaskState
    {
        Todo,
        InProgress,
        Done
    }

    public enum TaskPriority
    {
        Low,
        Medium,
        High
    }

    public class TaskItem
    {
        public int Id { get; set; }
        
        [Required]
        [StringLength(200)]
        public required string Title { get; set; }
        
        public string? Description { get; set; }
        
        public DateTime? DueDate { get; set; }
        
        [Required]
        public TaskState Status { get; set; } = TaskState.Todo;
        
        [Required]
        public TaskPriority Priority { get; set; } = TaskPriority.Medium;
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        public DateTime? UpdatedAt { get; set; }

        [Required]
        public int UserId { get; set; }
        
        public int? AssignedUserId { get; set; }
        
        [ForeignKey("AssignedUserId")]
        public User? AssignedUser { get; set; }

        [ForeignKey("UserId")]
        public User? User { get; set; }

        public bool IsCompleted { get; set; }
    }
} 