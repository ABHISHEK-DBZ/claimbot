# ClaimBot APK Builder

Yeh script aapke ClaimBot website ko Android APK me convert karega.

## Prerequisites (Pehle ye install karna padega):

1. **Node.js** (Download from: https://nodejs.org/)
2. **Android Studio** (Download from: https://developer.android.com/studio)
3. **Java JDK 11+** (Android Studio ke saath aata hai)

## APK Banane ke Steps:

### Step 1: Dependencies Install kariye
```bash
npm install
```

### Step 2: Android platform add kariye
```bash
npx cap add android
```

### Step 3: Project sync kariye
```bash
npx cap sync
```

### Step 4: Android Studio me open kariye
```bash
npx cap open android
```

### Step 5: APK Build kariye
Android Studio me:
1. **Build** > **Generate Signed Bundle / APK**
2. **APK** select kariye
3. **Create new keystore** (pehli baar ke liye)
4. **release** build type choose kariye
5. **Finish** click kariye

## Ya Terminal se Direct APK banaye:

```bash
# Debug APK (testing ke liye)
cd android
./gradlew assembleDebug

# Release APK (final version ke liye)
./gradlew assembleRelease
```

## APK Location:
- Debug APK: `android/app/build/outputs/apk/debug/app-debug.apk`
- Release APK: `android/app/build/outputs/apk/release/app-release.apk`

## Quick Setup Commands:

```bash
# Sab kuch ek saath install karne ke liye:
npm install && npx cap add android && npx cap sync && npx cap open android
```

## Mobile me Install karne ke liye:
1. APK file ko phone me transfer kariye
2. **Unknown sources** allow kariye settings me
3. APK file click karke install kariye

## Features jo APK me honge:
- ✅ Offline working
- ✅ Home screen icon
- ✅ Full screen app experience
- ✅ Push notifications ready
- ✅ Fast loading
- ✅ Native Android feel

Happy Coding! 🚀
