using Microsoft.EntityFrameworkCore;
using QrCodeToolApi.Data;
using QrCodeToolApi.Services.Contracts;
using QrCodeToolApi.Services.Implementations;

internal class Program
{
    private static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        builder.Services.AddControllers();

        builder.Services.AddDbContext<QrCodeToolDbContext>(options =>
        {
            options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
        });

        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        builder.Services.AddScoped<IQrCodeService, QrCodeService>();

        var app = builder.Build();

        using (var scope = app.Services.CreateScope())
        {
            var context  = scope.ServiceProvider.GetRequiredService<QrCodeToolDbContext>();

            if (context .Database.GetPendingMigrations().Any())
            {
                context .Database.Migrate();
            }
        }

        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseCors(options => options
           .SetIsOriginAllowed(x => _ = true)
           .AllowAnyMethod()
           .AllowAnyHeader()
           .AllowCredentials());

        app.UseHttpsRedirection();

        app.UseAuthentication();
        app.UseAuthorization();

        app.MapControllers();

        app.Run();
    }
}