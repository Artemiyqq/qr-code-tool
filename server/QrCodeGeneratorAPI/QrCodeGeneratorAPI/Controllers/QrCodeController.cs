using Microsoft.AspNetCore.Mvc;

namespace QrCodeGeneratorAPI.Controllers
{
    public class QrCodeController : ControllerBase
    {
        [HttpGet("get-by-id")]
        public async Task<IActionResult> Get()
        {
            return Ok(new { message = "Endpoint was successfully called" });
        }
    }
}
