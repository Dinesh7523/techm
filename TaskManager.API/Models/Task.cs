using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TaskManager.API.Models;

public class Task
{
    [Key]
    public int Id { get; set; }

    [Required]
    [StringLength(200)]
    public string Title { get; set; } = string.Empty;

    public string? Description { get; set; }

    [Required]
    public DateTime Deadline { get; set; }

    [Required]
    [Range(1, 3)]
    public int Priority { get; set; }  // 1 = High, 2 = Medium, 3 = Low

    [Required]
    public bool IsCompleted { get; set; } = false;

    // Foreign key for User
    [Required]
    public int UserId { get; set; }

    [ForeignKey("UserId")]
    public User? User { get; set; }
} 