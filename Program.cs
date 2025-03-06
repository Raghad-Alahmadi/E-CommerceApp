var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

//for angular
// Enable CORS to allow requests from Angular (running on localhost:4200)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularApp", policy =>
        policy.WithOrigins("http://localhost:4200") // Angular's default port
              .AllowAnyMethod()
              .AllowAnyHeader());
});

var app = builder.Build();
app.UseCors("AllowAngularApp");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

var summaries = new[]
{
    "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
};

app.MapGet("/weatherforecast", () =>
{
    var forecast =  Enumerable.Range(1, 5).Select(index =>
        new WeatherForecast
        (
            DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            Random.Shared.Next(-20, 55),
            summaries[Random.Shared.Next(summaries.Length)]
        ))
        .ToArray();
    return forecast;
})
.WithName("GetWeatherForecast");

// New products endpoint
var products = new[]
{
    new { Name = "Laptop", Description = "A high-performance laptop", Price = 999.99, Image = "https://m.media-amazon.com/images/I/61LdecwlWYL.jpg" },
    new { Name = "Smartphone", Description = "A latest model smartphone", Price = 699.99, Image = "shttps://m.media-amazon.com/images/I/619f09kK7tL._AC_UF1000,1000_QL80_.jpg" },
    new { Name = "Tablet", Description = "A lightweight tablet", Price = 399.99, Image = "https://m.media-amazon.com/images/I/61kwL1sJywL.jpg" },
    new { Name = "Smartwatch", Description = "A smartwatch with various features", Price = 199.99, Image = "https://m.media-amazon.com/images/I/61yEHZXdi6L.jpg" },
    new { Name = "Headphones", Description = "Noise-cancelling headphones", Price = 149.99, Image = "https://m.media-amazon.com/images/I/71St1R5DFGL._AC_UF1000,1000_QL80_.jpg" }
};

app.MapGet("/api/products", () =>
{
    return products;
})
.WithName("GetProducts");

app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}