# Deploy Notes

This zip keeps the same frontend images, page design, and user flow.
Only deployment-safe changes were made:

- frontend API URLs changed from localhost to same-site `/api/...`
- Express uses Render `PORT`
- MongoDB connection uses `MONGODB_URI` env variable
- JWT uses `JWT_SECRET` env variable
- Express serves the Vite `dist` folder after build

## Render settings

Build Command:
```
npm install && npm run build
```

Start Command:
```
npm start
```

Environment Variables:
```
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=any_long_secret_key
```

After deployment test:
```
https://your-app-name.onrender.com/api/health
```
