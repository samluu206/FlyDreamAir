# FlyDreamAir ✈️

A modern flight booking application built with React and Vite.

## Tech Stack

- **React 18** - UI Library
- **TypeScript** - Type Safety
- **Vite** - Build Tool & Dev Server
- **Tailwind CSS v4** - Styling
- **React Hook Form** - Form Management
- **Zod** - Schema Validation
- **Radix UI** - UI Components
- **Lucide React** - Icons

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd flydreamair
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

## Available Scripts

### `npm run dev`

Runs the app in development mode with Vite's fast HMR (Hot Module Replacement).\
The page will automatically reload when you make changes.

### `npm run build`

Builds the app for production to the `dist` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include hashes.\
Your app is ready to be deployed!

### `npm run preview`

Serves the production build locally for testing before deployment.

### `npm run lint`

Runs ESLint to check for code quality issues and potential errors.

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components (Button, Input, etc.)
│   ├── BookingForm.tsx # Flight booking form
│   ├── FlightResults.tsx # Flight search results
│   └── FlightSearch.tsx # Flight search interface
├── styles/
│   └── globals.css     # Global styles with Tailwind CSS
├── App.tsx             # Main application component
└── main.tsx           # Application entry point
```

## Features

- 🔍 **Flight Search** - Search for flights with flexible options
- 📅 **Date Selection** - Interactive calendar for date picking
- ✈️ **Flight Results** - Display and filter flight options
- 📝 **Booking Form** - Complete flight booking process
- 🎨 **Modern UI** - Clean, responsive design with Tailwind CSS
- 🌙 **Dark Mode** - Built-in dark theme support

## Development

### Running in Development

```bash
npm run dev
```

This starts the Vite development server with:
- Fast HMR (Hot Module Replacement)
- TypeScript support
- ESLint integration
- Tailwind CSS processing

### Building for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Deployment

The `dist` folder after running `npm run build` can be deployed to any static hosting service:

- **Vercel**: Connect your repository for automatic deployments
- **Netlify**: Drag and drop the `dist` folder or connect via Git
- **GitHub Pages**: Use GitHub Actions to deploy the `dist` folder
- **AWS S3**: Upload the `dist` contents to an S3 bucket

## Learn More

- [Vite Documentation](https://vitejs.dev/guide/)
- [React Documentation](https://reactjs.org/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.