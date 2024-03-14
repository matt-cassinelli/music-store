function Disable-SslCertificateChecks {
Add-Type @"
using System.Net;
using System.Security.Cryptography.X509Certificates;
public class TrustAllCertsPolicy : ICertificatePolicy
{
    public bool CheckValidationResult(
        ServicePoint srvPoint,
        X509Certificate certificate,
        WebRequest request,
        int certificateProblem)
    {
        return true;
    }
}
"@
[System.Net.ServicePointManager]::CertificatePolicy = New-Object TrustAllCertsPolicy
}

# Tell Invoke-WebRequest not to check certificates. Equivalant to "-k" in curl
Disable-SslCertificateChecks

# Halt the script at any error.
$ErrorActionPreference = 'Stop'

# Avoid having to write these params with each Invoke-WebRequest.
$PSDefaultParameterValues.Add('Invoke-WebRequest:ContentType', 'application/json')
$PSDefaultParameterValues.Add('Invoke-WebRequest:DisableKeepAlive', $true)
$PSDefaultParameterValues.Add('Invoke-WebRequest:UseBasicParsing', $true)

$baseUri = 'https://localhost:52358/api'


#_______________________________ CREATE TAGS _______________________________#

$body = '{
  "name": "Ambient",
  "rank": 30
}'
$response = Invoke-WebRequest -Method 'POST' -Uri "$baseUri/tags" -Body $body
if ($response.StatusCode -ne 201) {throw}

$body = '{
  "name": "Cinematic",
  "rank": 50
}'
$response = Invoke-WebRequest -Method 'POST' -Uri "$baseUri/tags" -Body $body
if ($response.StatusCode -ne 201) {throw}

$body = '{
  "name": "Hiphop",
  "rank": 80
}'
$response = Invoke-WebRequest -Method 'POST' -Uri "$baseUri/tags" -Body $body
if ($response.StatusCode -ne 201) {throw}

$body = '{
  "name": "Upbeat",
  "rank": 40
}'
$response = Invoke-WebRequest -Method 'POST' -Uri "$baseUri/tags" -Body $body
if ($response.StatusCode -ne 201) {throw}

$body = '{
  "name": "Epic",
  "rank": 70
}'
$response = Invoke-WebRequest -Method 'POST' -Uri "$baseUri/tags" -Body $body
if ($response.StatusCode -ne 201) {throw}

$body = '{
  "name": "Calming",
  "rank": 35
}'
$response = Invoke-WebRequest -Method 'POST' -Uri "$baseUri/tags" -Body $body
if ($response.StatusCode -ne 201) {throw}

$body = '{
  "name": "Folk",
  "rank": 20
}'
$response = Invoke-WebRequest -Method 'POST' -Uri "$baseUri/tags" -Body $body
if ($response.StatusCode -ne 201) {throw}

$body = '{
  "name": "Uplifting",
  "rank": 75
}'
$response = Invoke-WebRequest -Method 'POST' -Uri "$baseUri/tags" -Body $body
if ($response.StatusCode -ne 201) {throw}

$body = '{
  "name": "Electronic",
  "rank": 23
}'
$response = Invoke-WebRequest -Method 'POST' -Uri "$baseUri/tags" -Body $body
if ($response.StatusCode -ne 201) {throw}


#_______________________________ READ TAG ________________________________#

$tempId = ($response.Content | ConvertFrom-Json).id
$response = Invoke-WebRequest -Method 'GET' -Uri "$baseUri/tags/$tempId"
if ($response.StatusCode -ne 200) {throw}
if (-not $response.Content) {throw}


#_______________________________ READ TAGS _______________________________#

$response = Invoke-WebRequest -Method 'GET' -Uri "$baseUri/tags"
if ($response.StatusCode -ne 200) {throw}
if ( ($response.Content | ConvertFrom-Json).Count -ne 9 ) {throw}


#______________________________ CREATE SOUNDS ______________________________#

$body = '{
    "title": "Ocean Waves",
    "description": "No tags",
    "preview": "/media/mp3/blabla.mp3"
}'
$response = Invoke-WebRequest -Method 'POST' -Uri "$baseUri/sounds" -Body $body
if ($response.StatusCode -ne 201) {throw}
if (-not $response.Content) {throw}

$body = '{
    "title": "Test Sound 1",
    "description": "No tags",
    "duration": 28,
    "price": 500,
    "preview": "/media/mp3/blabla.mp3",
    "imagethumb": "/media/img-thumb/21-10-06.jpg",
    "structure": "aba",
    "rank": 100
}'
$response = Invoke-WebRequest -Method 'POST' -Uri "$baseUri/sounds" -Body $body
if ($response.StatusCode -ne 201) {throw}
if (-not $response.Content) {throw}

$body = '{
    "title": "Test Sound 2",
    "description": "This sound has only tag 1",
    "duration": 50,
    "rank": 123,
    "tags": [
        1
    ]
}'
$response = Invoke-WebRequest -Method 'POST' -Uri "$baseUri/sounds" -Body $body
if ($response.StatusCode -ne 201) {throw}
if (-not $response.Content) {throw}

$body = '{
  "title": "Test Sound 3",
  "description": "Tags 1 and 2.",
  "duration": 88,
  "price": 700,
  "preview": "/media/mp3/21-10-06.mp3",
  "imagethumb": "/media/img-thumb/21-10-06.jpg",
  "structure": "aba",
  "rank": 140,
  "tags":[
    1,
    2
  ]
}'
$response = Invoke-WebRequest -Method 'POST' -Uri "$baseUri/sounds" -Body $body
if ($response.StatusCode -ne 201) {throw}
if (-not $response.Content) {throw}

$body = '{
  "title": "Test Sound 4",
  "description": "Tags 1, 2 & 3.",
  "duration": 43,
  "price": 500,
  "preview": "/media/mp3/21-10-06.mp3",
  "imagethumb": "/media/img-thumb/21-10-06.jpg",
  "structure": "a",
  "rank": 200,
  "tags":[
    1,
    2,
    3
  ]
}'
$response = Invoke-WebRequest -Method 'POST' -Uri "$baseUri/sounds" -Body $body
if ($response.StatusCode -ne 201) {throw}
if (-not $response.Content) {throw}

$body = '{
  "title": "Test Sound 5",
  "description": "Only tag 3.",
  "duration": 54,
  "price": 1000,
  "preview": "/media/mp3/21-10-12.mp3",
  "imagethumb": "/media/img-thumb/21-10-12.jpg",
  "structure": "abaca",
  "rank": 49,
  "tags":[
    3
  ]
}'
$response = Invoke-WebRequest -Method 'POST' -Uri "$baseUri/sounds" -Body $body
if ($response.StatusCode -ne 201) {throw}
if (-not $response.Content) {throw}


#_______________________________ READ SOUND _______________________________#

$tempId = ($response.Content | ConvertFrom-Json).id
$response = Invoke-WebRequest -Method 'GET' -Uri "$baseUri/sounds/$tempId"
if ($response.StatusCode -ne 200) {throw}
if (-not $response.Content) {throw}


#____________________________ READ ALL SOUNDS ____________________________#

$response = Invoke-WebRequest -Method 'GET' -Uri "$baseUri/sounds"
if ($response.StatusCode -ne 200) {throw}
if ( ($response.Content | ConvertFrom-Json).Count -ne 6 ) {throw}


#__________________________ READ SOUNDS BY TAGS __________________________#

$response = Invoke-WebRequest -Method 'GET' -Uri "$baseUri/sounds?tagId=1"
$response.Content | ConvertFrom-Json

$response = Invoke-WebRequest -Method 'GET' -Uri "$baseUri/sounds?tagId=2"
$response.Content | ConvertFrom-Json

$response = Invoke-WebRequest -Method 'GET' -Uri "$baseUri/sounds?tagId=3"
$response.Content | ConvertFrom-Json

$response = Invoke-WebRequest -Method 'GET' -Uri "$baseUri/sounds?tagId=1&tagId=2"
$response.Content | ConvertFrom-Json
# [todo] Assert


#______________________________ UPDATE SOUND ______________________________#

$body = '{
  "id":"$tempId",
  "title": "Test Sound 5 Updated",
  "description": "Only tag 7.",
  "duration": 54,
  "price": 1234,
  "preview": "/media/mp3/21-10-12.mp3",
  "imagethumb": "/media/img-thumb/21-10-12.jpg",
  "structure": "abaca",
  "rank": 49,
  "tags":[
    7
  ]
}'

$body = $ExecutionContext.InvokeCommand.ExpandString($body) # https://stackoverflow.com/questions/59819225/

$response = Invoke-WebRequest -Method 'PUT' -Uri "$baseUri/sounds/$tempId" -Body $body

if ($response.StatusCode -ne 204) {throw}

if ( ((Invoke-WebRequest -Method 'GET' -Uri "$baseUri/sounds/$tempId").Content | ConvertFrom-Json).title -ne "Test Sound 5 Updated" ) {throw}
