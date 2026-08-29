# Deployment Guide

## Development Server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Production Build

```bash
ng build --configuration production
```

## Docker Deployment

### Dockerfile

```dockerfile
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist/angular-dashboard /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Docker Build & Run

```bash
# Build
docker build -t angular-dashboard:latest .

# Run
docker run -p 80:80 angular-dashboard:latest
```

## Cloud Deployment

### Vercel

```bash
npm install -g vercel
vercel
```

### Netlify

```bash
npm run build
npm install -g netlify-cli
netlify deploy --prod --dir=dist/angular-dashboard
```

### GitHub Pages

```bash
ng build --base-href=/angular-configurable-dashboard/
```

Then push the `dist` folder to the `gh-pages` branch.

## Environment Configuration

Create environment-specific files:

- `src/environments/environment.ts` (development)
- `src/environments/environment.prod.ts` (production)

```typescript
// environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000'
};

// environment.prod.ts
export const environment = {
  production: true,
  apiUrl: 'https://api.example.com'
};
```

## Performance Optimization

1. Enable AOT compilation (default in modern Angular)
2. Use lazy loading for feature modules
3. Implement OnPush change detection
4. Optimize bundle size with `ng build --stats-json`
5. Use service workers for PWA capabilities
