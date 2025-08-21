# Virtual Dress Try-On Website

A modern, AI-powered virtual dress try-on website built with React, TypeScript, and Tailwind CSS. This application allows users to virtually try on dresses using their camera, similar to how Lenskart allows users to try on frames.

## ✨ Features

- **Virtual Try-On**: Take a photo and see how dresses look on you
- **Camera Integration**: Built-in camera functionality for photo capture
- **Dress Gallery**: Browse through a curated collection of dresses
- **AI-Powered Fitting**: Simulated AI processing for realistic try-on experience
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI/UX**: Beautiful animations and smooth interactions
- **Search & Filter**: Find dresses by category, price, and more
- **Color Selection**: Choose from available dress colors
- **Social Features**: Save favorites and share looks

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager
- Modern web browser with camera access

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd virtual-dress-tryon
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Routing**: React Router DOM

## 📱 Usage

### Virtual Try-On
1. Navigate to the "Try On" page
2. Click "Start Camera" to activate your device camera
3. Position yourself in the frame
4. Take a photo by clicking the camera button
5. Select a dress from the available options
6. Choose your preferred color
7. Click "Try On Dress" to see the result

### Dress Gallery
1. Browse through the dress collection
2. Use filters to narrow down options by category, price, etc.
3. Search for specific dresses
4. Click "Try On" to go directly to the virtual try-on experience
5. Add dresses to your cart or save favorites

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
VITE_APP_TITLE=Virtual Dress Try-On
VITE_API_URL=your-api-endpoint
```

### Customization
- **Colors**: Modify the color scheme in `tailwind.config.js`
- **Dresses**: Update the dress data in the components
- **Styling**: Customize components in the `src/components` directory

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.tsx      # Navigation header
│   └── Footer.tsx      # Site footer
├── pages/              # Page components
│   ├── Home.tsx        # Landing page
│   ├── TryOn.tsx       # Virtual try-on page
│   └── DressGallery.tsx # Dress browsing page
├── main.tsx            # Application entry point
├── App.tsx             # Main app component
└── index.css           # Global styles
```

## 🎨 Customization

### Adding New Dresses
Edit the `dresses` array in `DressGallery.tsx`:

```typescript
const dresses: Dress[] = [
  {
    id: 'new-id',
    name: 'New Dress Name',
    image: '/path/to/image',
    price: 199,
    category: 'Category',
    colors: ['Red', 'Blue'],
    rating: 4.5,
    reviews: 100
  }
  // ... more dresses
]
```

### Modifying Styles
Update the Tailwind configuration in `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Your custom primary colors
      }
    }
  }
}
```

## 🚀 Deployment

### Build for Production
```bash
npm run build
# or
yarn build
```

### Deploy to Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts

### Deploy to Netlify
1. Build the project: `npm run build`
2. Drag the `dist` folder to Netlify
3. Configure your domain

## 🔒 Privacy & Security

- Camera access is only requested when needed
- Photos are processed locally and not stored on servers
- No personal data is collected or transmitted

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by Lenskart's virtual try-on technology
- Built with modern web technologies for optimal user experience
- Designed with accessibility and usability in mind

## 📞 Support

For support or questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

---

**Note**: This is a demonstration application. The AI try-on functionality is simulated for showcase purposes. In a production environment, you would integrate with actual AI services for dress fitting.
