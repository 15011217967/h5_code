@ECHO OFF

SET CWD="%cd%"
CD /D "%~dp0"

REM Check nodejs installation
WHERE npm >nul 2>nul
IF %ERRORLEVEL% NEQ 0 (
    ECHO Must install nodejs first, https://nodejs.org/zh-cn/download/
	CD /D "%CWD%"
    EXIT /B 1
)

WHERE gulp >nul 2>nul
IF %ERRORLEVEL% NEQ 0 (
    ECHO Will install gulp first
    CMD /c npm install --global gulp-cli
)

REM Install all packages
ECHO Update All Node Packages
CMD /c npm install

REM Get current timestamp
FOR /f %%i IN ('node -p "Math.floor(new Date() / 1000)"') DO SET ts=%%i

REM Gen Production Package
ECHO.
ECHO Gen Production Package
CMD /c gulp --gulpfile package.js package --time=%ts%

REM Gen Test Server Package
ECHO.
ECHO Gen Test Server Package
CMD /c gulp --gulpfile package.js package --time=%ts% --test

ECHO.
ECHO All Finish
ECHO.

CD /D "%CWD%"
PAUSE
