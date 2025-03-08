using Amazon;
using Amazon.BedrockRuntime;
using Amazon.BedrockRuntime.Model;
using Amazon.Runtime;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddHttpClient();
builder.Services.AddControllers();
builder.Services.AddCors(options =>
{
  options.AddPolicy("AllowAll", policy =>
  {
    policy.AllowAnyOrigin()
          .AllowAnyMethod()
          .AllowAnyHeader();
  });
});
builder.Services.AddSingleton<AmazonBedrockRuntimeClient>(sp =>
{
    var configuration = sp.GetRequiredService<IConfiguration>();
    var awsAccessKey = configuration["AWS:AccessKey"];
    var awsSecretKey = configuration["AWS:SecretKey"];
    var region = configuration["AWS:Region"] ?? "us-west-2";
    
    if (!string.IsNullOrEmpty(awsAccessKey) && !string.IsNullOrEmpty(awsSecretKey))
    {
        var credentials = new BasicAWSCredentials(awsAccessKey, awsSecretKey);
        return new AmazonBedrockRuntimeClient(credentials, RegionEndpoint.GetBySystemName(region));
    }
    else
    {
        return new AmazonBedrockRuntimeClient(RegionEndpoint.GetBySystemName(region));
    }
});


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAll");
app.UseHttpsRedirection();
app.UseRouting();
app.MapControllers();


app.Run();
