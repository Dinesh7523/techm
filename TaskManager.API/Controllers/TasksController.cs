using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using TaskManager.API.Data;
using TaskManager.API.Models;
using TaskManager.API.Models.DTOs;
using Task = TaskManager.API.Models.Task;

namespace TaskManager.API.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class TasksController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public TasksController(ApplicationDbContext context)
    {
        _context = context;
    }

    private int GetUserId()
    {
        return int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<TaskResponseDto>>> GetTasks(
        [FromQuery] int? priority,
        [FromQuery] DateTime? deadline,
        [FromQuery] bool? isCompleted,
        [FromQuery] string? searchTitle)
    {
        var userId = GetUserId();
        var query = _context.Tasks.Where(t => t.UserId == userId);

        if (priority.HasValue)
            query = query.Where(t => t.Priority == priority.Value);

        if (deadline.HasValue)
            query = query.Where(t => t.Deadline.Date == deadline.Value.Date);

        if (isCompleted.HasValue)
            query = query.Where(t => t.IsCompleted == isCompleted.Value);

        if (!string.IsNullOrEmpty(searchTitle))
            query = query.Where(t => t.Title.Contains(searchTitle));

        var tasks = await query.Select(t => new TaskResponseDto
        {
            Id = t.Id,
            Title = t.Title,
            Description = t.Description,
            Deadline = t.Deadline,
            Priority = t.Priority,
            IsCompleted = t.IsCompleted,
            UserId = t.UserId
        }).ToListAsync();

        return Ok(tasks);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<TaskResponseDto>> GetTask(int id)
    {
        var userId = GetUserId();
        var task = await _context.Tasks
            .Where(t => t.UserId == userId && t.Id == id)
            .FirstOrDefaultAsync();

        if (task == null)
            return NotFound();

        return new TaskResponseDto
        {
            Id = task.Id,
            Title = task.Title,
            Description = task.Description,
            Deadline = task.Deadline,
            Priority = task.Priority,
            IsCompleted = task.IsCompleted,
            UserId = task.UserId
        };
    }

    [HttpPost]
    public async Task<ActionResult<TaskResponseDto>> CreateTask(CreateTaskDto createTaskDto)
    {
        var userId = GetUserId();
        var task = new Task
        {
            Title = createTaskDto.Title,
            Description = createTaskDto.Description,
            Deadline = createTaskDto.Deadline,
            Priority = createTaskDto.Priority,
            UserId = userId,
            IsCompleted = false
        };

        _context.Tasks.Add(task);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetTask), new { id = task.Id }, new TaskResponseDto
        {
            Id = task.Id,
            Title = task.Title,
            Description = task.Description,
            Deadline = task.Deadline,
            Priority = task.Priority,
            IsCompleted = task.IsCompleted,
            UserId = task.UserId
        });
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateTask(int id, UpdateTaskDto updateTaskDto)
    {
        var userId = GetUserId();
        var task = await _context.Tasks
            .Where(t => t.UserId == userId && t.Id == id)
            .FirstOrDefaultAsync();

        if (task == null)
            return NotFound();

        task.Title = updateTaskDto.Title;
        task.Description = updateTaskDto.Description;
        task.Deadline = updateTaskDto.Deadline;
        task.Priority = updateTaskDto.Priority;
        task.IsCompleted = updateTaskDto.IsCompleted;

        await _context.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTask(int id)
    {
        var userId = GetUserId();
        var task = await _context.Tasks
            .Where(t => t.UserId == userId && t.Id == id)
            .FirstOrDefaultAsync();

        if (task == null)
            return NotFound();

        _context.Tasks.Remove(task);
        await _context.SaveChangesAsync();
        return NoContent();
    }
} 