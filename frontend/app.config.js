import 'dotenv/config';

export default {
  expo: {
    name: "Cafe-Dash",
    slug: "Cafe-Dash",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./app/assets/images/logo.png",
    scheme: "myapp",
    userInterfaceStyle: "automatic",
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.cafe.dash",
      infoPlist: {
        ITSAppUsesNonExemptEncryption: false
      },
    },
    android: {
      package: "com.cafe.dash",
      adaptiveIcon: {
        foregroundImage: "./app/assets/images/logo.png",
        backgroundColor: "#ffffff"
      }
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./app/assets/images/logo.png"
    },
    plugins: [
        'expo-router',
        [
          'expo-splash-screen',
          {
            image: './app/assets/images/logo.png',
            imageWidth: 200,
            resizeMode: 'contain',
            backgroundColor: '#ffffff'
          }
        ],
        [
          'expo-build-properties',
          {
            android: {
              usesCleartextTraffic: true
            }
          }
        ]
    ],
    experiments: {
      typedRoutes: true
    },
    extra: {
      apiUrl: process.env.API_URL,
      eas: {
        projectId: process.env.EXPO_PROJECT_ID
      }
    }
  }
};
