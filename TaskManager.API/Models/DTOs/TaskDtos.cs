using System.ComponentModel.DataAnnotations;

namespace TaskManager.API.Models.DTOs;

public class CreateTaskDto
{
    [Required]
    [StringLength(200)]
    public string Title { get; set; } = string.Empty;

    public string? Description { get; set; }

    [Required]
    public DateTime Deadline { get; set; }

    [Required]
    [Range(1, 3)]
    public int Priority { get; set; }
}

public class UpdateTaskDto
{
    [Required]
    [StringLength(200)]
    public string Title { get; set; } = string.Empty;

    public string? Description { get; set; }

    [Required]
    public DateTime Deadline { get; set; }

    [Required]
    [Range(1, 3)]
    public int Priority { get; set; }

    [Required]
    public bool IsCompleted { get; set; }
}

public class TaskResponseDto
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public DateTime Deadline { get; set; }
    public int Priority { get; set; }
    public bool IsCompleted { get; set; }
    public int UserId { get; set; }
} 