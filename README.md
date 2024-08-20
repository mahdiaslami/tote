# Tote

Simple todo progressive web application (PWA). with the ability to categorize todos. it is a serverless application; your todos will save on local storage and todos disappear after clearing the browser cache.

# Development

- In somewhere i used `mousedown` and `touchstart` event instead of click. because,
I want to prevent changing focus from input to button. the changing focus cause
closing virtual keyboard in android.

- Icon pack: https://www.svgrepo.com/collection/solar-broken-line-icons/1
- Custom caret: https://phuoc.ng/collection/mirror-a-text-area/create-your-own-custom-cursor-in-a-text-area/

# Android

## Sign APK file

1. Generate a keystore file that contains a private key and a certificate using the keytool command. We'll use the RSA algorithm with a larger key size and SHA-256 for the digest algorithm for enhanced security. Replace myalias with your desired alias and mykeystore.keystore with your desired keystore file name:

```
keytool -genkeypair -v -keystore mykeystore.keystore -keyalg RSA -keysize 4096 -sigalg SHA256withRSA -validity 10000 -storepass your_keystore_password -keypass your_key_password -alias myalias
```

This command will prompt you for some information, such as your name and organization, and will generate a new keystore file called `mykeystore.keystore`.

`myalias` is just a placeholder name that you can replace with any name that you like. 

2. Sign your APK with the keystore file using the jarsigner tool. We'll use SHA-256 with RSA for the signature algorithm:

```
jarsigner -verbose -sigalg SHA256withRSA -digestalg SHA-256 -keystore mykeystore.keystore app-release-unsigned.apk myalias
```

This command will prompt you for the password that you used when you generated the keystore file. It will then sign the APK with the private key and certificate that are stored in the keystore file.

Replace mykeystore.keystore and myalias with your keystore file name and alias.

NOTICE: We use android build process to sign apk.

3. Verify that the APK is signed correctly with the updated signature algorithm using the jarsigner tool:

```
jarsigner -verify -verbose app-release-unsigned.apk
```

This command should output information about the signature of the APK, and should indicate that the signature is valid.

## Build Android Action

If you want to use GitHub Actions to build an Android app, follow these steps:

### Add Action

Copy the `.github/workflows/android.yml` file to your repository to set up the build workflow.

### Variables

Add the following variables to your repository by following these steps:

1. Go to **Settings**.
2. Then, go to **Secrets and Variables**.
3. In the action section, add the following variables:


```
KEYSTORE=// base64 format of keystore
KEYSTORE_PASSWORD=
SIGNING_KEY_ALIAS=
SIGNING_KEY_PASSWORD=
SIGNING_STORE_PASSWORD=
```

These variables are essential for configuring the Android build process and signing your app. Make sure to replace the placeholders with the actual values you need for your project.

### Config

#### `settings.gradle`

In the `settings.gradle` file, add the `rootProject.name` key. The value of this key is used for the name of the APK file after building.

```diff
// android/settings.gradle

+rootProject.name = 'tote'

 include ':app'
 include ':capacitor-cordova-android-plugins'
 project(':capacitor-cordova-android-plugins').projectDir = new File('./capacitor-cordova-android-plugins/')
```

#### `build.gradle`

In the `build.gradle` file, add the following configuration. The signingConfigs section is used for configuring the signing of the APK file. Additionally, there is a modification to set the name of the APK.

```diff
// android/app/build.gradle

@@ -16,10 +16,28 @@ android {
             ignoreAssetsPattern '!.svn:!.git:!.ds_store:!*.scc:.*:!CVS:!thumbs.db:!picasa.ini:!*~'
         }
     }
+
+    signingConfigs {
+        release {
+            storeFile = file("keystore/android_keystore.jks")
+            storePassword System.getenv("SIGNING_STORE_PASSWORD")
+            keyAlias System.getenv("SIGNING_KEY_ALIAS")
+            keyPassword System.getenv("SIGNING_KEY_PASSWORD")
+        }
+    }
+
     buildTypes {
         release {
             minifyEnabled false
             proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
+
+            applicationVariants.all { variant ->
+                variant.outputs.all {
+                    outputFileName = "${rootProject.name}.apk"
+                }
+            }
+
+            signingConfig signingConfigs.release
         }
     }
 }
```