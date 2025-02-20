import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
    server: {
        host: "0.0.0.0",
    },
    plugins: [
        react(),
        VitePWA({
            includeAssets: [
                "/image/pwa-192x192.png",
                "/image/pwa-512x512.png",
                "image/screenshot-wide.png",
                "image/screenshot-wide.png",
            ],
            injectRegister: "auto",
            registerType: "autoUpdate",
            manifest: {
                name: "PasswordGenerator",
                short_name: "PASSGen",
                theme_color: "#000000",
                description: "Password Generator",
                display: "standalone",
                icons: [
                    {
                        src: "/image/pwa-192x192.png",
                        sizes: "192x192",
                        type: "image/png",
                    },
                    {
                        src: "/image/pwa-512x512.png",
                        sizes: "512x512",
                        type: "image/png",
                    },
                ],
                screenshots: [
                    {
                        src: "/image/screenshot-wide.png",
                        sizes: "494x780",
                        type: "image/png",
                        form_factor: "wide",
                    },
                    {
                        src: "/image/screenshot-wide.png",
                        sizes: "494x780",
                        type: "image/png",
                        form_factor: "narrow",
                    },
                ],
            },
        }),
    ],
});
