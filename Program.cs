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
    new { Id = 1, Name = "Laptop", Description = "A high-performance laptop", Price = 999.99, Quantity = 10, Image = "https://m.media-amazon.com/images/I/61LdecwlWYL.jpg" },
    new { Id = 2, Name = "Smartphone", Description = "A latest model smartphone", Price = 699.99, Quantity = 20, Image = "https://m.media-amazon.com/images/I/619f09kK7tL._AC_UF1000,1000_QL80_.jpg" },
    new { Id = 3, Name = "Tablet", Description = "A lightweight tablet", Price = 399.99, Quantity = 15, Image = "https://m.media-amazon.com/images/I/61kwL1sJywL.jpg" },
    new { Id = 4, Name = "Smartwatch", Description = "A smartwatch with various features", Price = 199.99, Quantity = 25, Image = "https://m.media-amazon.com/images/I/61yEHZXdi6L.jpg" },
    new { Id = 5, Name = "Headphones", Description = "Noise-cancelling headphones", Price = 149.99, Quantity = 30, Image = "https://m.media-amazon.com/images/I/71St1R5DFGL._AC_UF1000,1000_QL80_.jpg" },
    new { Id = 6, Name = "Camera", Description = "A high-resolution digital camera", Price = 499.99, Quantity = 12, Image = "https://www.jbhifi.com.au/cdn/shop/products/652310-Product-0-I-638204870412595312.jpg?v=1710454763" },
    new { Id = 7, Name = "Printer", Description = "A wireless color printer", Price = 199.99, Quantity = 8, Image = "https://media.extra.com/s/aurora/100375321_800/HP-Color-LaserJet-Pro-3303sdw-Tank-Printer%2C-Print%2C-Wi-Fi%2C-USB%2C-White?locale=en-GB,en-*,*" },
    new { Id = 8, Name = "Monitor", Description = "A 27-inch 4K monitor", Price = 299.99, Quantity = 5, Image = "https://goldentech.com.sa/media/catalog/product/cache/3b63c6023d7836f7abeed5960b50eab1/p/h/philips_computer_monitor_271v8b_0.jpg" },
    new { Id = 9, Name = "Keyboard", Description = "A mechanical keyboard", Price = 89.99, Quantity = 50, Image = "https://m.media-amazon.com/images/I/71T1WQSxp9L.jpg" },
    new { Id = 10, Name = "Mouse", Description = "A wireless ergonomic mouse", Price = 49.99, Quantity = 40, Image = "https://m.media-amazon.com/images/I/61RYwHoeHjL.jpg" },
    new { Id = 11, Name = "Speaker", Description = "A Bluetooth portable speaker", Price = 129.99, Quantity = 25, Image = "https://m.media-amazon.com/images/I/718yxonHN8L.jpg" }
};

app.MapGet("/api/products", () =>
{
    return products;
})
.WithName("GetProducts");

app.MapGet("/api/products/{id}", (int id) =>
{
    var product = products.FirstOrDefault(p => p.Id == id);
    if (product == null)
    {
        return Results.NotFound();
    }
    return Results.Ok(product);
})
.WithName("GetProductById");

app.Run();
record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}