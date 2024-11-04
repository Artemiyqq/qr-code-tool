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
    }
}