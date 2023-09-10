# Tote

Simple todo progressive web application (PWA). with the ability to categorize todos. it is a serverless application; your todos will save on local storage and todos disappear after clearing the browser cache.

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

3. Verify that the APK is signed correctly with the updated signature algorithm using the jarsigner tool:

```
jarsigner -verify -verbose app-release-unsigned.apk
```

This command should output information about the signature of the APK, and should indicate that the signature is valid.
