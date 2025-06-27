using System.ComponentModel.DataAnnotations;

namespace TaskManager.API.DTOs
{
    public class LoginDto
    {
        [Required]
        public required string Username { get; set; }
        
        [Required]
        public required string Password { get; set; }
    }

    public class RegisterDto
    {
        [Required]
        [MinLength(3)]
        public required string Username { get; set; }
        
        [Required]
        [EmailAddress]
        public required string Email { get; set; }
        
        [Required]
        [MinLength(6)]
        public required string Password { get; set; }
        
        [Required]
        [Compare("Password")]
        public required string ConfirmPassword { get; set; }
    }

    public class AuthResponseDto
    {
        public required string Token { get; set; }
        public required string Username { get; set; }
        public required string Email { get; set; }
    }
} 