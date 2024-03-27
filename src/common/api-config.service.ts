import 'dotenv/config';

export class ApiConfigService {

    get isDevelopment(): boolean {
        return this.nodeEnv === 'development';
    };

    get isProduction(): boolean {
        return this.nodeEnv === 'production';
    };

    getString(key: string, defaultValue?: string) {
        const value = process.env[key] || defaultValue;

        if (!value) {
            console.warn(`"${key}" environment variable is not set`);
            return '';
        }

        return value.toString().replace(/\\n/g, '\n');
    };

    get nodeEnv(): string {
        return this.getString('NODE_ENV', 'development');
    };
};
