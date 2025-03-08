using System;
using System.IO;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Amazon;
using Amazon.BedrockRuntime;
using Amazon.BedrockRuntime.Model;
using Amazon.Runtime;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

[Route("api/bedrock")]
[ApiController]
public class BedrockController : ControllerBase
{
  private readonly AmazonBedrockRuntimeClient _bedrockClient;
  private const string ModelId = "amazon.titan-text-express-v1";

  public BedrockController(IConfiguration configuration)
  {
    // Initialize AWS client using IConfiguration
    var awsAccessKey = configuration["AWS:AccessKey"];
    var awsSecretKey = configuration["AWS:SecretKey"];
    var region = configuration["AWS:Region"] ?? "us-west-2";

    if (!string.IsNullOrEmpty(awsAccessKey) && !string.IsNullOrEmpty(awsSecretKey))
    {
      var credentials = new BasicAWSCredentials(awsAccessKey, awsSecretKey);
      _bedrockClient = new AmazonBedrockRuntimeClient(credentials, RegionEndpoint.GetBySystemName(region));
    }
    else
    {
      _bedrockClient = new AmazonBedrockRuntimeClient(RegionEndpoint.GetBySystemName(region));
    }
  }

  [HttpPost("invoke")]
  public async Task<IActionResult> InvokeModel([FromBody] BedrockRequest request)
  {
    if (string.IsNullOrEmpty(request.InputText))
    {
      return BadRequest("Input text cannot be empty.");
    }

    try
    {
      string requestBody = $@"
            {{
                ""inputText"": ""{request.InputText}"",
                ""textGenerationConfig"": {{
                    ""maxTokenCount"": 8192,
                    ""stopSequences"": [],
                    ""temperature"": 0,
                    ""topP"": 1
                }}
            }}";

      var invokeRequest = new InvokeModelRequest
      {
        ModelId = ModelId,
        ContentType = "application/json",
        Accept = "application/json",
        Body = new MemoryStream(Encoding.UTF8.GetBytes(requestBody))
      };

      var response = await _bedrockClient.InvokeModelAsync(invokeRequest);

      using var reader = new StreamReader(response.Body);
      string responseText = await reader.ReadToEndAsync();
      var responseJson = JsonSerializer.Deserialize<JsonElement>(responseText);
      return Ok(new { Response = responseJson });
    }
    catch (AmazonServiceException awsEx)
    {
      return StatusCode(500, $"AWS Service Error: {awsEx.Message}");
    }
    catch (Exception ex)
    {
      return StatusCode(500, $"Error invoking model: {ex.Message}");
    }
  }
}

// DTO (Data Transfer Object) for API Request
public class BedrockRequest
{
  public required string InputText { get; set; }
}
