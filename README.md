# DressUp - Virtual Dress Try-On Website

A modern web application that allows users to virtually try on dresses using their device's camera, similar to how Lenskart allows users to try on frames.

## Features

### 🎥 Camera Integration
- Real-time camera access using WebRTC
- Supports front-facing camera for selfie mode
- High-quality video streaming with 640x480 resolution
- Camera controls (start/stop/capture)

### 👗 Virtual Dress Try-On
- Multiple dress options:
  - Elegant Black Dress
  - Summer Floral Dress
  - Royal Blue Dress
  - Red Cocktail Dress
- Real-time dress overlay on video stream
- Smooth transitions between dress changes

### ⚙️ Customization Controls
- **Size Adjustment**: Scale the dress from 50% to 150%
- **Vertical Position**: Move dress up/down by ±50px
- **Transparency**: Adjust opacity from 30% to 100%
- Real-time preview of all adjustments

### 📸 Photo Capture
- Capture photos with dress overlay applied
- Automatic download of captured images
- Photo gallery showing all captured images
- Flash effect for visual feedback
- Keyboard shortcut support (Spacebar to capture)

### 🎨 Modern UI/UX
- Beautiful gradient backgrounds
- Responsive design for all devices
- Smooth animations and transitions
- Hover effects and visual feedback
- Loading states and error handling

## Technology Stack

- **HTML5**: Structure and Canvas API for image processing
- **CSS3**: Modern styling with gradients, animations, and responsive design
- **JavaScript (ES6+)**: Core functionality and camera integration
- **WebRTC**: Camera access via getUserMedia API
- **Canvas API**: Image composition and photo capture

## Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 11+
- Edge 79+

**Note**: Requires HTTPS for camera access in production environments.

## Getting Started

### Prerequisites
- Modern web browser with camera support
- Camera permissions enabled
- HTTPS connection (for production use)

### Installation
1. Clone or download the project files
2. Ensure all files are in the same directory:
   - `index.html`
   - `styles.css`
   - `script.js`
   - `README.md`

### Running the Application
1. **For local development**:
   - Open `index.html` directly in your browser
   - Or use a local server like Python's `python -m http.server`

2. **For production**:
   - Deploy to any web server with HTTPS support
   - Ensure camera permissions are properly configured

## Usage Instructions

### Getting Started
1. Open the website in your browser
2. Click "Start Camera" to begin
3. Allow camera permissions when prompted
4. Select a dress from the available options

### Trying On Dresses
1. **Select a Dress**: Click on any dress card to try it on
2. **Adjust Fit**: Use the controls to:
   - Change dress size with the size slider
   - Move dress position up/down
   - Adjust transparency for better blending
3. **Capture Photos**: Click "Capture Photo" or press Spacebar

### Keyboard Shortcuts
- **Spacebar**: Capture photo
- **Escape**: Stop camera

## File Structure
```
/workspace/
├── index.html          # Main HTML structure
├── styles.css          # All styling and responsive design
├── script.js           # Core JavaScript functionality
└── README.md          # This documentation
```

## Key Features Explained

### Camera Integration
The app uses the modern WebRTC `getUserMedia` API to access the device camera:
- Automatically requests front-facing camera
- Handles permissions and error states
- Provides visual feedback during camera initialization

### Dress Overlay System
- CSS-based dress overlays using SVG graphics
- Real-time positioning and scaling
- Smooth transitions between dress changes
- Opacity control for realistic blending

### Photo Capture
- Combines video frame with dress overlay
- Uses HTML5 Canvas for image composition
- Automatic download of captured images
- Visual flash effect for capture feedback

### Responsive Design
- Mobile-first approach
- Adapts to different screen sizes
- Touch-friendly controls
- Optimized for both desktop and mobile use

## Customization

### Adding New Dresses
1. Create a new SVG dress design
2. Add it to the `styles.css` file as a new class
3. Add a corresponding dress card in `index.html`
4. Update the `dressColors` object in `script.js`

### Modifying Controls
- Adjust slider ranges in HTML
- Update corresponding JavaScript event handlers
- Modify CSS for visual styling

### Styling Changes
- Update CSS custom properties for colors
- Modify gradient backgrounds
- Adjust animations and transitions

## Performance Considerations

- Optimized for 640x480 video resolution
- Efficient Canvas operations for photo capture
- Smooth CSS transitions instead of JavaScript animations
- Minimal DOM manipulation for better performance

## Privacy & Security

- All processing happens locally in the browser
- No video or photo data is sent to external servers
- Camera access requires user permission
- Works offline once loaded

## Future Enhancements

Potential improvements for advanced versions:
- AI-powered body detection for better dress positioning
- Machine learning for automatic size adjustment
- More sophisticated dress designs and textures
- Social sharing capabilities
- Virtual wardrobe management
- 3D dress models and realistic physics

## Troubleshooting

### Camera Not Working
- Ensure browser supports WebRTC
- Check camera permissions in browser settings
- Try refreshing the page
- Use HTTPS for production environments

### Dress Overlay Issues
- Check browser compatibility
- Ensure CSS files are loaded properly
- Try different dress options

### Performance Issues
- Close other browser tabs using camera
- Ensure good lighting conditions
- Try reducing browser zoom level

## License

This project is open source and available under the MIT License.

## Support

For issues or questions, please check the browser console for error messages and ensure all requirements are met.