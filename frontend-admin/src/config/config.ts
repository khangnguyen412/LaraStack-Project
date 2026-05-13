export class Config {
    static readonly API_URL = import.meta.env.VITE_API_URL ?? '';
    static readonly APP_NAME = import.meta.env.VITE_APP_NAME ?? 'My App';
    static readonly DEVELOPMENT_MODE = import.meta.env.VITE_DEVELOPMENT_MODE === 'true';
    static readonly STRIPE_KEY = import.meta.env.VITE_STRIPE_KEY ?? '';
    static readonly LOGO_ICON = "@/assets/images/" + import.meta.env.VITE_LOGO_ICON || '';

    get API_URL() {
        return Config.API_URL;
    }
    get APP_NAME() {
        return Config.APP_NAME;
    }
    get DEVELOPMENT_MODE() {
        return Config.DEVELOPMENT_MODE;
    }
    get STRIPE_KEY() {
        return Config.STRIPE_KEY;
    }
    get LOGO_ICON() {
        return Config.LOGO_ICON;
    }

    static validateRequired() {
        const required = ['VITE_API_URL', 'VITE_STRIPE_KEY'] as const;
        const missing = required.filter(key => !import.meta.env[key]);
        if (missing.length) {
            throw new Error(`Missing required env variables: ${missing.join(', ')}`);
        }
    }
}