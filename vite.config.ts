import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    // Set the base URL conditionally based on the mode (development or production)
    base: mode === 'production' ? '/helvetictoc/' : '/',  // Change 'repository-name' to your GitHub repo name
  };
});
