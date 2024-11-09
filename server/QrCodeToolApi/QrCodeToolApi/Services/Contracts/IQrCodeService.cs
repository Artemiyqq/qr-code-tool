using QrCodeToolApi.Enums;

namespace QrCodeToolApi.Services.Contracts
{
    /// <summary>
    /// Service for generating QR codes.
    /// </summary>
    public interface IQrCodeService
    {
        /// <summary>
        /// Generates a QR code from a given string value.
        /// </summary>
        /// <param name="qrCodeValue">The value to encode in the QR code.</param>
        /// <param name="type">The file type for the generated QR code (e.g., PNG, SVG).</param>
        /// <returns>A byte array representing the generated QR code image.</returns>
        byte[] GenerateFromString(string qrCodeValue, QrCodeFileType type);

        /// <summary>
        /// Scans a QR code image from a given file.
        /// </summary>
        /// <param name="file">The file containing the QR code image.</param>
        /// <returns>The text value encoded in the QR code.</returns>
        string Scan(IFormFile file);
    }
}

