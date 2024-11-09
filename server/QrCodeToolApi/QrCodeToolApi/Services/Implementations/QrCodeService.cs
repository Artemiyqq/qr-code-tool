using QRCoder;
using QrCodeToolApi.Enums;
using QrCodeToolApi.Services.Contracts;
using System.Text;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.PixelFormats;
using ZXing.ImageSharp;

namespace QrCodeToolApi.Services.Implementations
{
    public class QrCodeService : IQrCodeService
    {
        public byte[] GenerateFromString(string qrCodeValue, QrCodeFileType type = QrCodeFileType.Png)
        {
            QRCodeGenerator qrGenerator = new();
            using QRCodeData qrCodeData = qrGenerator.CreateQrCode(qrCodeValue, QRCodeGenerator.ECCLevel.Q);

            if (type == QrCodeFileType.Png)
            {
                using PngByteQRCode pngQrCode = new(qrCodeData);
                byte[] qrCodeImage = pngQrCode.GetGraphic(10);
                return qrCodeImage;
            }

            SvgQRCode svgQrCode = new(qrCodeData);
            string svgImage = svgQrCode.GetGraphic(10);
            byte[] byteArray = Encoding.UTF8.GetBytes(svgImage);
            return byteArray;
        }

        public string Scan(IFormFile file)
        {
            using var image = Image.Load<Rgba32>(file.OpenReadStream());
            var reader = new BarcodeReader<Rgba32>();

            var result = reader.Decode(image);

            return result?.Text ?? string.Empty;
        }
    }
}