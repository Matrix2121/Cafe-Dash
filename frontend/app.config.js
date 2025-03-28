import 'dotenv/config';

export default ({ config }) => ({
    ...config,
    extra: {
        apiUrl: process.env.API_URL,
        serviceKey: process.env.SERVICE_KEY,
        templateKey: process.env.TEMPLATE_KEY,
        publicKey: process.env.PUBLIC_KEY,
        // other env variables...
    },
});