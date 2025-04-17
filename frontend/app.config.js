import 'dotenv/config';

export default ({ config }) => ({
    ...config, // needs revision
    name: 'Cafe-Dash',
    slug: 'Cafe-Dash',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './app/assets/images/logo.png',
    scheme: 'myapp',
    userInterfaceStyle: 'automatic',
    newArchEnabled: true,
    ios: {
        supportsTablet: true,
    },
    web: {
        bundler: 'metro',
        output: 'static',
        favicon: './app/assets/images/logo.png',
    },
    plugins: [
        'expo-router',
        [
            'expo-splash-screen',
            {
                image: './app/assets/images/logo.png',
                imageWidth: 200,
                resizeMode: 'contain',
                backgroundColor: '#ffffff',
            },
        ],
    ],
    experiments: {
        typedRoutes: true,
    },
    extra: {
        router: {
            origin: false,
        },
        apiUrl: process.env.API_URL,
        serviceKey: process.env.SERVICE_KEY,
        templateKey: process.env.TEMPLATE_KEY,
        publicKey: process.env.PUBLIC_KEY,
        expoProjectId: process.env.EXPO_PROJECT_ID,
        // other env variables...
    },
});