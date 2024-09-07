import { defineConfig } from "cypress";

const PORT = 3000;

export default defineConfig({
  defaultCommandTimeout: 5000,
	viewportWidth: 1200,
	viewportHeight: 800,
	e2e: {
		baseUrl: `http://localhost:${PORT}`,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
	},
});
