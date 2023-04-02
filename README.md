# Tote

Simple todo progressive web application (PWA). with the ability to categorize todos. it is a serverless application; your todos will save on local storage and todos disappear after clearing the browser cache.

# Android

## Sign APK file

1. Generate a keystore file that contains a private key and a certificate. You can do this using the `keytool` command that is included with the JDK. Here's an example command that generates a new keystore file:

```
keytool -genkeypair -alias myalias -keyalg RSA -keysize 2048 -validity 10000 -keystore mykeystore.keystore
```

This command will prompt you for some information, such as your name and organization, and will generate a new keystore file called `mykeystore.keystore`.

`myalias` is just a placeholder name that you can replace with any name that you like. 

2. Sign your APK with the keystore file. You can do this using the `jarsigner` tool that is included with the JDK. Here's an example command that signs an APK with the `mykeystore.keystore` file:

```
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore mykeystore.keystore app-release-unsigned.apk myalias
```

This command will prompt you for the password that you used when you generated the keystore file. It will then sign the APK with the private key and certificate that are stored in the keystore file.

3. Verify that the APK is signed correctly. You can do this using the `jarsigner` tool again. Here's an example command that verifies the signature of an APK:

```
jarsigner -verify -verbose app-release-unsigned.apk
```

This command should output information about the signature of the APK, and should indicate that the signature is valid.
