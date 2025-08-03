@echo off
echo ===============================================
echo ClaimBot APK Builder Script
echo ===============================================
echo.

echo Step 1: Installing Node.js dependencies...
call npm install
if %ERRORLEVEL% neq 0 (
    echo Error: npm install failed!
    pause
    exit /b 1
)

echo.
echo Step 2: Adding Android platform...
call npx cap add android
if %ERRORLEVEL% neq 0 (
    echo Note: Android platform might already exist
)

echo.
echo Step 3: Syncing project...
call npx cap sync
if %ERRORLEVEL% neq 0 (
    echo Error: Sync failed!
    pause
    exit /b 1
)

echo.
echo Step 4: Opening Android Studio...
echo Note: Make sure Android Studio is installed
call npx cap open android

echo.
echo ===============================================
echo SUCCESS! Android Studio should open now.
echo.
echo Next steps:
echo 1. In Android Studio, go to Build ^> Generate Signed Bundle / APK
echo 2. Select APK
echo 3. Create new keystore (first time)
echo 4. Choose release build
echo 5. Click Finish
echo.
echo Your APK will be saved in:
echo android\app\build\outputs\apk\release\app-release.apk
echo ===============================================
pause
