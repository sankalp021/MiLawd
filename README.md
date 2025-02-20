# MiLawd

MiLawd is a Next.js application that helps legal professionals analyze and visualize relationships between legal cases. It provides an interactive graph visualization of case relationships and similarity scores.

## Live Demo

View the working website here: [https://mi-lawd.vercel.app/](https://mi-lawd.vercel.app/)


## Project Structure

```
src/
├── app/              # Next.js app directory
├── components/       # React components
│   ├── Card.tsx     # Case card component
│   ├── CaseDisplay.tsx  # Main display logic
│   ├── Graph.tsx    # D3 graph visualization
│   ├── Navbar.tsx   # Navigation component
│   └── SearchBar.tsx # Search functionality
└── data/            # Data models and mock data
    └── dummyCases.ts # Sample case data
```

## Installation & Development

1. Clone the repository:
   ```bash
   git clone https://github.com/sankalp021/MiLawd.git
   ```
2. Navigate to the project folder:
   ```bash
   cd milawd
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

Start the development server with:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build & Deployment

To build the project for production:
```bash
npm run build
```
Then start the production server with:
```bash
npm run start
```

## Technology Stack

- **Framework**: Next.js 14 with React 18
- **Styling**: Tailwind CSS
- **Visualization**: D3.js
- **Language**: TypeScript
- **State Management**: React Hooks
- **Deployment**: Vercel

## Performance Features

- Optimized graph rendering with D3
- Responsive images and layouts
- Client-side search functionality
- Smooth animations and transitions

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


## Acknowledgments

- D3.js community for visualization tools
- Tailwind CSS for styling utilities
- Next.js team for the framework
- Vercel for hosting


