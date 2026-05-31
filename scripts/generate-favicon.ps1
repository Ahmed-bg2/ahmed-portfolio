Add-Type -AssemblyName System.Drawing
$ErrorActionPreference = "Stop"

$publicPath = Join-Path (Get-Location) "public"

function New-IconBitmap {
  param([int]$Size)

  $bitmap = New-Object System.Drawing.Bitmap $Size, $Size
  $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
  $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $graphics.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::ClearTypeGridFit
  $graphics.Clear([System.Drawing.Color]::Transparent)

  $rect = New-Object System.Drawing.RectangleF 0, 0, $Size, $Size
  $path = New-Object System.Drawing.Drawing2D.GraphicsPath
  $radius = [Math]::Max(4, [Math]::Round($Size * 0.28))
  $diameter = $radius * 2
  $path.AddArc($rect.X, $rect.Y, $diameter, $diameter, 180, 90)
  $path.AddArc($rect.Right - $diameter, $rect.Y, $diameter, $diameter, 270, 90)
  $path.AddArc($rect.Right - $diameter, $rect.Bottom - $diameter, $diameter, $diameter, 0, 90)
  $path.AddArc($rect.X, $rect.Bottom - $diameter, $diameter, $diameter, 90, 90)
  $path.CloseFigure()

  $bgBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush $rect, ([System.Drawing.Color]::FromArgb(255, 7, 20, 38)), ([System.Drawing.Color]::FromArgb(255, 3, 5, 17)), 135
  $graphics.FillPath($bgBrush, $path)

  $glowBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(44, 34, 211, 238))
  $graphics.FillEllipse($glowBrush, $Size * 0.56, $Size * 0.06, $Size * 0.42, $Size * 0.42)

  $ringPen = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(235, 103, 232, 249)), ([Math]::Max(1.4, $Size * 0.052))
  $ringPen.LineJoin = [System.Drawing.Drawing2D.LineJoin]::Round
  $inset = [Math]::Max(1.6, $Size * 0.07)
  $ringRect = New-Object System.Drawing.RectangleF $inset, $inset, ($Size - ($inset * 2)), ($Size - ($inset * 2))
  $ringPath = New-Object System.Drawing.Drawing2D.GraphicsPath
  $ringRadius = [Math]::Max(3, [Math]::Round($Size * 0.22))
  $ringDiameter = $ringRadius * 2
  $ringPath.AddArc($ringRect.X, $ringRect.Y, $ringDiameter, $ringDiameter, 180, 90)
  $ringPath.AddArc($ringRect.Right - $ringDiameter, $ringRect.Y, $ringDiameter, $ringDiameter, 270, 90)
  $ringPath.AddArc($ringRect.Right - $ringDiameter, $ringRect.Bottom - $ringDiameter, $ringDiameter, $ringDiameter, 0, 90)
  $ringPath.AddArc($ringRect.X, $ringRect.Bottom - $ringDiameter, $ringDiameter, $ringDiameter, 90, 90)
  $ringPath.CloseFigure()
  $graphics.DrawPath($ringPen, $ringPath)

  $fontSize = if ($Size -le 16) { $Size * 0.5 } else { $Size * 0.42 }
  $font = [System.Drawing.Font]::new(
    "Arial",
    [single]$fontSize,
    [System.Drawing.FontStyle]::Bold,
    [System.Drawing.GraphicsUnit]::Pixel
  )
  $format = New-Object System.Drawing.StringFormat
  $format.Alignment = [System.Drawing.StringAlignment]::Center
  $format.LineAlignment = [System.Drawing.StringAlignment]::Center
  $textRect = New-Object System.Drawing.RectangleF 0, ($Size * 0.03), $Size, ($Size * 0.9)
  $textBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 240, 249, 255))
  $graphics.DrawString("AB", $font, $textBrush, $textRect, $format)

  $graphics.Dispose()
  return $bitmap
}

function Save-Png {
  param([int]$Size, [string]$Name)

  $bitmap = New-IconBitmap -Size $Size
  $bitmap.Save((Join-Path $publicPath $Name), [System.Drawing.Imaging.ImageFormat]::Png)
  $bitmap.Dispose()
}

function Get-PngBytes {
  param([int]$Size)

  $bitmap = New-IconBitmap -Size $Size
  $stream = New-Object System.IO.MemoryStream
  $bitmap.Save($stream, [System.Drawing.Imaging.ImageFormat]::Png)
  $bitmap.Dispose()
  return ,$stream.ToArray()
}

Save-Png -Size 16 -Name "favicon-16x16.png"
Save-Png -Size 32 -Name "favicon-32x32.png"
Save-Png -Size 48 -Name "favicon-48x48.png"
Save-Png -Size 180 -Name "apple-touch-icon.png"
Save-Png -Size 192 -Name "android-chrome-192x192.png"
Save-Png -Size 512 -Name "android-chrome-512x512.png"

$icoEntries = @(
  @{ Size = 16; Bytes = Get-PngBytes -Size 16 },
  @{ Size = 32; Bytes = Get-PngBytes -Size 32 },
  @{ Size = 48; Bytes = Get-PngBytes -Size 48 }
)

$icoPath = Join-Path $publicPath "favicon.ico"
$writer = New-Object System.IO.BinaryWriter ([System.IO.File]::Create($icoPath))
$writer.Write([UInt16]0)
$writer.Write([UInt16]1)
$writer.Write([UInt16]$icoEntries.Count)

$offset = 6 + ($icoEntries.Count * 16)
foreach ($entry in $icoEntries) {
  $writer.Write([byte]$entry.Size)
  $writer.Write([byte]$entry.Size)
  $writer.Write([byte]0)
  $writer.Write([byte]0)
  $writer.Write([UInt16]1)
  $writer.Write([UInt16]32)
  $writer.Write([UInt32]$entry.Bytes.Length)
  $writer.Write([UInt32]$offset)
  $offset += $entry.Bytes.Length
}

foreach ($entry in $icoEntries) {
  $writer.Write($entry.Bytes)
}

$writer.Dispose()
