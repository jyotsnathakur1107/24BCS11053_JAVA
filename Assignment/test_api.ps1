$headers = @{ "Content-Type" = "application/json" }

Write-Host "`n=== 1. POST /api/students (Create Student 1) ==="
$body1 = '{"name":"John Doe","email":"john.doe@example.com","course":"Computer Science","age":21}'
$r1 = Invoke-RestMethod -Uri "http://localhost:8080/api/students" -Method Post -Headers $headers -Body $body1
$r1 | ConvertTo-Json

Write-Host "`n=== 2. POST /api/students (Create Student 2) ==="
$body2 = '{"name":"Jane Smith","email":"jane.smith@example.com","course":"Data Science","age":22}'
$r2 = Invoke-RestMethod -Uri "http://localhost:8080/api/students" -Method Post -Headers $headers -Body $body2
$r2 | ConvertTo-Json

Write-Host "`n=== 3. GET /api/students (Get All Students) ==="
$r3 = Invoke-RestMethod -Uri "http://localhost:8080/api/students" -Method Get
$r3 | ConvertTo-Json

Write-Host "`n=== 4. GET /api/students/1 (Get Student by ID) ==="
$r4 = Invoke-RestMethod -Uri "http://localhost:8080/api/students/1" -Method Get
$r4 | ConvertTo-Json

Write-Host "`n=== 5. PUT /api/students/1 (Update Student Details) ==="
$bodyUpdate = '{"name":"Johnathan Doe","email":"johnathan.doe@example.com","course":"Computer Science","age":22}'
$r5 = Invoke-RestMethod -Uri "http://localhost:8080/api/students/1" -Method Put -Headers $headers -Body $bodyUpdate
$r5 | ConvertTo-Json

Write-Host "`n=== 6. GET /api/students/course/Data%20Science (Get Students by Course) ==="
$r6 = Invoke-RestMethod -Uri "http://localhost:8080/api/students/course/Data%20Science" -Method Get
$r6 | ConvertTo-Json

Write-Host "`n=== 7. DELETE /api/students/1 (Delete Student) ==="
$r7 = Invoke-RestMethod -Uri "http://localhost:8080/api/students/1" -Method Delete
$r7 | ConvertTo-Json

Write-Host "`n=== 8. GET /api/students/1 (Verify Deleted - Expect 404) ==="
try {
    Invoke-RestMethod -Uri "http://localhost:8080/api/students/1" -Method Get
} catch {
    Write-Host "Caught expected HTTP 404:"
    $stream = $_.Exception.Response.GetResponseStream()
    $reader = New-Object System.IO.StreamReader($stream)
    Write-Host $reader.ReadToEnd()
}

Write-Host "`n=== 9. POST /api/students (Validation Error - Expect 400) ==="
try {
    $invalidBody = '{"name":"","email":"invalid-email","course":"","age":-5}'
    Invoke-RestMethod -Uri "http://localhost:8080/api/students" -Method Post -Headers $headers -Body $invalidBody
} catch {
    Write-Host "Caught expected HTTP 400:"
    $stream = $_.Exception.Response.GetResponseStream()
    $reader = New-Object System.IO.StreamReader($stream)
    Write-Host $reader.ReadToEnd()
}

