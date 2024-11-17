using System.ComponentModel.DataAnnotations;

namespace QrCodeToolApi.Models
{
    public class SignUpModel
    {
        [Required]
        [StringLength(100, MinimumLength = 3, ErrorMessage = "Name must be at least 3 characters long")]
        public required string Name { get; set; }
        [Required]
        [EmailAddress(ErrorMessage = "Invalid email address")]
        public required string Email { get; set; }
        [Required]
        [StringLength(100, MinimumLength = 8, ErrorMessage = "Password must be at least 8 characters long")]
        public required string Password { get; set; }
        [Required]
        [Compare("Password", ErrorMessage = "Passwords do not match")]
        public required string ConfirmPassword { get; set; }
    }
}