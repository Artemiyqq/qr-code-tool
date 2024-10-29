using QrCodeGeneratorAPI.Enums;
using QrCodeGeneratorAPI.Services.Contracts;
using QRCoder;
using System.Text;

namespace QrCodeGeneratorAPI.Services.Implementations
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
    }
}