using System.ComponentModel.DataAnnotations;

namespace QrCodeToolApi.Models
{
    public class SignInModel
    {
        [Required]
        [EmailAddress(ErrorMessage = "Invalid email address")]
        public required string Email { get; set; }
        [Required]
        [StringLength(100, MinimumLength = 8, ErrorMessage = "Password must be at least 8 characters long")]
        public required string Password { get; set; }
    }
}