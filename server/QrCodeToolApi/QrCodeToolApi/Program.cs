using QrCodeToolApi.Services.Contracts;
using QrCodeToolApi.Services.Implementations;

internal class Program
{
    private static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        builder.Services.AddControllers();
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();
        builder.Services.AddScoped<IQrCodeService, QrCodeService>();

        var app = builder.Build();

        app.UseCors(options => options
           .SetIsOriginAllowed(x => _ = true)
           .AllowAnyMethod()
           .AllowAnyHeader()
           .AllowCredentials());

        app.UseSwagger();
        app.UseSwaggerUI();

        app.MapControllers();

        app.Urls.Add("http://*:7044");

        app.Run();
    }
}