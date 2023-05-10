import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default ({ mode }) => {
    process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

    return defineConfig({
        plugins: [react()],
        server: {
            proxy: {
                "/data-service/api": {
                    target: "http://localhost:8080",
                    rewrite: (path) => path.replace("/data-service", ""),
                },
            },
        },
    });
};
