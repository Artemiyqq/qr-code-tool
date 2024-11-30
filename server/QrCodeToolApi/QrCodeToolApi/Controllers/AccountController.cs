using Microsoft.AspNetCore.Mvc;
using QrCodeToolApi.Services.Contracts;
using QrCodeToolApi.Models;
using QrCodeToolApi.Exceptions;

namespace QrCodeToolApi.Controllers
{
    [Route("api/account")]
    [ApiController]
    public class AccountController(IAccountSerivce accountService) : ControllerBase
    {
        private readonly IAccountSerivce _accountService = accountService;

        [HttpPost]
        [Route("sign-in")]
        public async Task<IActionResult> SignIn(SignInModel signInData)
        {
            if (!ModelState.IsValid) return BadRequest(new { message = "Invalid data" });

            try {
                int accountId = await _accountService.SignIn(signInData);
                return Ok(accountId);
            } catch (AuthenticationException ex) {
                return Unauthorized(new { message = ex.Message });
            }
        }

        [HttpPost]
        [Route("sign-up")]
        public async Task<IActionResult> SignUp(SignUpModel signUpData)
        {
            if (!ModelState.IsValid) return BadRequest(new { message = "Invalid data" });

            try {
                await _accountService.SignUp(signUpData);
                return Created();
            }
            catch (ValidationException ex) {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet]
        [Route("get-name/{accountId}")]
        public async Task<IActionResult> GetName(string accountId)
        {
            try {
                string accountName = await _accountService.GetName(accountId);
                return Ok(accountName);
            }
            catch (NotFoundException ex) {
                return NotFound(new { message = ex.Message });
            }
        }
    }
}