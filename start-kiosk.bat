@echo off
setlocal
cd /d "%~dp0"
set "FILE=%~dp0index.html"
set "FILE=%FILE:\=/%"
set "URL=file:///%FILE%"
set "URL=%URL: =%20%"

set "CHROME=%ProgramFiles%\Google\Chrome\Application\chrome.exe"
set "EDGE=%ProgramFiles%\Microsoft\Edge\Application\msedge.exe"
if not exist "%EDGE%" set "EDGE=%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe"

if exist "%CHROME%" (
  start "" "%CHROME%" --kiosk --no-first-run --disable-session-crashed-bubble "%URL%"
  exit /b 0
)
if exist "%EDGE%" (
  start "" "%EDGE%" --kiosk --no-first-run "%URL%"
  exit /b 0
)
start "" "%URL%"
