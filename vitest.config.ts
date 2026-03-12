import { defineConfig } from 'vitest/config';
import swc from 'unplugin-swc';

export default defineConfig({
  plugins: [
    swc.vite({
      jsc: {
        target: 'es2024',
        transform: {
          legacyDecorator: true,
          decoratorMetadata: true,
        },
      },
      sourceMaps: true,
    }),
  ],
  test: {
    environment: 'node',
    include: ['src/**/*.spec.ts'],
    globals: true,
    setupFiles: ['reflect-metadata'],
    coverage: {
      reporter: ['clover', 'json', 'lcov', 'text'],
      include: ['src/**/*.ts'],
    },
    disableConsoleIntercept: true,
    clearMocks: true,
    isolate: false,
    testTimeout: 60_000,
  },
});
