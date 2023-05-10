import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default ({ mode }) => {
    process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

    return defineConfig({
        plugins: [react()],
        server: {
            proxy: {
                "/calendar-service/api": {
                    target: "http://localhost:8081",
                    rewrite: (path) => path.replace("/calendar-service", ""),
                },
                "/events-service/api": {
                    target: "http://localhost:8083",
                    rewrite: (path) => path.replace("/events-service", ""),
                },
                "/invitations-service/api": {
                    target: "http://localhost:8085",
                    rewrite: (path) => path.replace("/invitations-service", ""),
                },
            },
        },
    });
};
