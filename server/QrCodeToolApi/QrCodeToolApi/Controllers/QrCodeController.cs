using Microsoft.AspNetCore.Mvc;
using QrCodeToolApi.Enums;
using QrCodeToolApi.Services.Contracts;
using System.Net.Mime;

namespace QrCodeToolApi.Controllers
{
    [ApiController]
    [Route("api/text-qr-code")]
    public class TextQrCodeController(IQrCodeService qrCodeService) : ControllerBase
    {
        private readonly IQrCodeService _qrCodeService = qrCodeService;

        [HttpGet("generate-png")]
        public async Task<IActionResult> GeneratePng([FromQuery] string text)
        {
            if (string.IsNullOrEmpty(text)) return BadRequest(new { error = "Text is required" });

            var qrCodeImage = await Task.Run(() => _qrCodeService.GenerateFromString(text, QrCodeFileType.Png));

            if (qrCodeImage == null)
            {
                return StatusCode(500, new { error = "Server error: failed to generate QR code" });
            }

            return File(qrCodeImage, MediaTypeNames.Image.Png, "qr-code.png");
        }

        [HttpGet("generate-svg")]
        public async Task<IActionResult> GenerateSvg([FromQuery] string text)
        {
            if (string.IsNullOrEmpty(text)) return BadRequest(new { error = "Text is required" });

            var qrCodeImage = await Task.Run(() => _qrCodeService.GenerateFromString(text, QrCodeFileType.Svg));

            if (qrCodeImage == null)
            {
                return StatusCode(500, new { error = "Server error: failed to generate QR code" });
            }

            return File(qrCodeImage, MediaTypeNames.Image.Svg, "qr-code.svg");
        }

        [HttpPost("scan")]
        public async Task<IActionResult> Scan(IFormFile file)
        {
            if (file == null || file.Length == 0) return BadRequest(new { error = "File is required" });

            string fileExtension = Path.GetExtension(file.FileName).ToLower();
            if (fileExtension != ".png" && fileExtension != ".jpg")
            {
                return BadRequest(new { error = "Only PNG and JPG files are allowed" });
            }

            var qrCodeText = await Task.Run(() => _qrCodeService.Scan(file));

            if (string.IsNullOrEmpty(qrCodeText))
            {
                return StatusCode(500, new { error = "Server error: failed to scan QR code" });
            }

            return Ok(new { text = qrCodeText });
        }
    }
}