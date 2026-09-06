Add-Type -AssemblyName System.Drawing

$srcPath = "d:\Microservice\PCForge\frontend\public\images\user-upi-qr.png"
$destPath = "d:\Microservice\PCForge\frontend\public\images\cropped-qr.png"

$src = [System.Drawing.Image]::FromFile($srcPath)

# Image width & height
$w = $src.Width
$h = $src.Height

# QR matrix coordinates inside screenshot
$cropX = [int]($w * 0.18)
$cropY = [int]($h * 0.20)
$cropW = [int]($w * 0.64)
$cropH = [int]($w * 0.64)

$cropRect = New-Object System.Drawing.Rectangle($cropX, $cropY, $cropW, $cropH)
$bmp = New-Object System.Drawing.Bitmap($cropW, $cropH)
$g = [System.Drawing.Graphics]::FromImage($bmp)

$destRect = New-Object System.Drawing.Rectangle(0, 0, $cropW, $cropH)
$g.DrawImage($src, $destRect, $cropRect, [System.Drawing.GraphicsUnit]::Pixel)

$g.Dispose()
$src.Dispose()

$bmp.Save($destPath, [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Dispose()

Write-Host "QR Code successfully cropped into $destPath"
