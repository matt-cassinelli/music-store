#_____________________________SETUP_____________________________#

function Get-CurrentFilePath {
  if ($PSScriptRoot) { 
    $PSScriptRoot
  }
  elseif ($psISE) {
    Split-Path -Path $psISE.CurrentFile.FullPath
  }
  elseif ($profile -match "VScode") {
    Split-Path $psEditor.GetEditorContext().CurrentFile.Path
  }
  else { 
    throw "Current path not detected"
  } 
}

function Test-DatabaseConnection {
  $stateString = (Invoke-Command {SQLLocalDB info MSSQLLocalDB})[10]
  if ( $stateString.Contains('Running') ) {
    return $true
  }
  elseif ( $stateString.Contains('Stopped') ) {
    return $false
  }
  else {
    throw "Please install SQLLocalDB and create an instance."
  }
}

function Disable-SslCertificateChecks {
  add-type @"
      using System.Net;
      using System.Security.Cryptography.X509Certificates;
      public class TrustAllCertsPolicy : ICertificatePolicy {
          public bool CheckValidationResult(
              ServicePoint srvPoint, X509Certificate certificate,
              WebRequest request, int certificateProblem) {
              return true;
          }
      }
"@
  [System.Net.ServicePointManager]::CertificatePolicy = New-Object TrustAllCertsPolicy
}

# Halt the script at any error.
$ErrorActionPreference = 'Stop'

# Check / start database server.
if ( (Test-DatabaseConnection) -eq $false ) {
  Invoke-Command {SQLLocalDB start}
  if ( (Test-DatabaseConnection) -eq $false ) {
    throw "Unable to start database"
  }
}

Set-Location (Get-CurrentFilePath)

# Delete database.
dotnet ef database drop

# Delete migrations folder.
if (Test-Path .\Migrations) {Remove-Item .\Migrations -Recurse}

# Create initial migration.
dotnet ef migrations add v1

# Execute migration / create database.
dotnet ef database update

# Start API in new window (for logging)
Start-Process powershell {dotnet run}

# Tell Invoke-WebRequest not to check certificates. Equivalant to "-k" in curl
Disable-SslCertificateChecks

# Avoid having to write these params with each Invoke-WebRequest.
$PSDefaultParameterValues.Add('Invoke-WebRequest:ContentType', 'application/json')
$PSDefaultParameterValues.Add('Invoke-WebRequest:DisableKeepAlive', $true)

$baseUri = 'https://localhost:5001'

#____________________________CREATE TAG____________________________#

$body = '{
  "name": "Grime",
  "rank": 70
}'

Invoke-WebRequest -Method 'POST' -Uri "$baseUri/tags" -Body $body

$body = '{
  "name": "Hiphop",
  "rank": 50
}'

Invoke-WebRequest -Method 'POST' -Uri "$baseUri/tags" -Body $body

$body = '{
  "name": "Garage",
  "rank": 60
}'

Invoke-WebRequest -Method 'POST' -Uri "$baseUri/tags" -Body $body

$body = '{
  "name": "Soul",
  "rank": 40
}'

$response = Invoke-WebRequest -Method 'POST' -Uri "$baseUri/tags" -Body $body

if ($response.StatusCode -ne 201) {throw}


#____________________________READ TAG____________________________#

$tempId = ($response.Content | ConvertFrom-Json).id

$response = Invoke-WebRequest -Method 'GET' -Uri "$baseUri/tags/$tempId"

if ($response.StatusCode -ne 200) {throw}

if (-not $response.Content) {throw}


#____________________________READ TAGS____________________________#

$response = Invoke-WebRequest -Method 'GET' -Uri "$baseUri/tags"

if ($response.StatusCode -ne 200) {throw}

if ( ($response.Content | ConvertFrom-Json).Count -ne 4 ) {throw}


#__________________________CREATE SOUND__________________________#

$body = '{
    "title": "Test Sound 1",
    "description": "Test description 1",
    "duration": 50,
    "price": 7.00,
    "preview": "/media/mp3/21-10-06.mp3",
    "imagethumb": "/media/img-thumb/blabla.jpg",
    "structure": "aba"
}'

$response = Invoke-WebRequest -Method 'POST' -Uri "$baseUri/sounds" -Body $body

if ($response.StatusCode -ne 201) {throw}

if (-not $response.Content) {throw}

$body = '{
  "title": "Test Sound 2",
  "description": "Test description 2",
  "duration": 88,
  "price": 5.00,
  "preview": "/media/mp3/21-10-06.mp3",
  "imgthumb": "/media/img-thumb/21-10-06.jpg",
  "structure": "abaca"
}'

$response = Invoke-WebRequest -Method 'POST' -Uri "$baseUri/sounds" -Body $body

if ($response.StatusCode -ne 201) {throw}

if (-not $response.Content) {throw}

$body = '{
  "title": "Test Sound 3",
  "description": "Test description 3",
  "duration": 54,
  "price": 10.00,
  "preview": "/media/mp3/21-10-12.mp3",
  "imgthumb": "/media/img-thumb/21-10-12.jpg",
  "structure": "ababa"
}'

$response = Invoke-WebRequest -Method 'POST' -Uri "$baseUri/sounds" -Body $body

if ($response.StatusCode -ne 201) {throw}

if (-not $response.Content) {throw}


#____________________________READ SOUND____________________________#

$tempId = ($response.Content | ConvertFrom-Json).id

$response = Invoke-WebRequest -Method 'GET' -Uri "$baseUri/sounds/$tempId"

if ($response.StatusCode -ne 200) {throw}

if (-not $response.Content) {throw}


#____________________________READ SOUNDS____________________________#

$response = Invoke-WebRequest -Method 'GET' -Uri "$baseUri/sounds"

if ($response.StatusCode -ne 200) {throw}

if ( ($response.Content | ConvertFrom-Json).Count -ne 3 ) {throw}


#___________________________UPDATE SOUND___________________________#

# Change price and add tags
$body = '{
  "id":"$tempId",
  "uploadedOn":"2022-06-07T00:53:20",
  "title":"Test Sound 3",
  "description":
  "Test description 3",
  "duration":54,
  "price":12.00,
  "preview":
  "/media/mp3/21-10-12.mp3",
  "imageThumb":null,
  "structure":"ababa",
  "rank":null,
  "tags":[
    {
      "id": 1
    },
    {
      "id": 2
    }
  ]
}'

$body = $ExecutionContext.InvokeCommand.ExpandString($body) # https://stackoverflow.com/questions/59819225/

$response = Invoke-WebRequest -Method 'PUT' -Uri "$baseUri/sounds/$tempId" -Body $body

if ($response.StatusCode -ne 204) {throw}


#______________________CREATE SOUND WITH TAGS______________________#

# TODO


#_____________________________READING_____________________________#

# https://gist.github.com/bryan-c-oconnell/4ae84d5253cf6f434750#file-restapitest-ps1
# https://spr.com/test-your-restful-api-using-powershell/
# https://pester-docs.netlify.app/