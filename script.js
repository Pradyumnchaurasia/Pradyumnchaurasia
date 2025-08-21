class DressUpApp {
    constructor() {
        this.video = document.getElementById('video');
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.dressOverlay = document.getElementById('dress-overlay');
        
        this.stream = null;
        this.currentDress = 'elegant-black';
        this.dressSettings = {
            size: 1.0,
            positionY: 0,
            opacity: 0.8
        };
        
        this.capturedPhotos = [];
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.updateDressOverlay();
        this.checkCameraSupport();
    }
    
    checkCameraSupport() {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            this.showError('Camera not supported in this browser. Please use a modern browser with camera support.');
            return false;
        }
        return true;
    }
    
    setupEventListeners() {
        // Camera controls
        document.getElementById('start-camera').addEventListener('click', () => this.startCamera());
        document.getElementById('stop-camera').addEventListener('click', () => this.stopCamera());
        document.getElementById('capture').addEventListener('click', () => this.capturePhoto());
        
        // Dress selection
        document.querySelectorAll('.dress-card').forEach(card => {
            card.addEventListener('click', (e) => this.selectDress(e.currentTarget.dataset.dress));
        });
        
        // Adjustment controls
        document.getElementById('dress-size').addEventListener('input', (e) => {
            this.dressSettings.size = parseFloat(e.target.value);
            document.getElementById('size-value').textContent = e.target.value;
            this.updateDressOverlay();
        });
        
        document.getElementById('dress-position-y').addEventListener('input', (e) => {
            this.dressSettings.positionY = parseInt(e.target.value);
            document.getElementById('position-y-value').textContent = e.target.value;
            this.updateDressOverlay();
        });
        
        document.getElementById('dress-opacity').addEventListener('input', (e) => {
            this.dressSettings.opacity = parseFloat(e.target.value);
            document.getElementById('opacity-value').textContent = e.target.value;
            this.updateDressOverlay();
        });
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space') {
                e.preventDefault();
                this.capturePhoto();
            } else if (e.code === 'Escape') {
                this.stopCamera();
            }
        });
    }
    
    async startCamera() {
        try {
            this.showLoading('Starting camera...');
            
            const constraints = {
                video: {
                    width: { ideal: 640 },
                    height: { ideal: 480 },
                    facingMode: 'user'
                },
                audio: false
            };
            
            this.stream = await navigator.mediaDevices.getUserMedia(constraints);
            this.video.srcObject = this.stream;
            
            this.video.onloadedmetadata = () => {
                this.canvas.width = this.video.videoWidth;
                this.canvas.height = this.video.videoHeight;
                this.hideLoading();
            };
            
            // Update button states
            document.getElementById('start-camera').disabled = true;
            document.getElementById('stop-camera').disabled = false;
            document.getElementById('capture').disabled = false;
            
        } catch (error) {
            console.error('Error starting camera:', error);
            this.showError('Could not access camera. Please check permissions and try again.');
            this.hideLoading();
        }
    }
    
    stopCamera() {
        if (this.stream) {
            this.stream.getTracks().forEach(track => track.stop());
            this.stream = null;
            this.video.srcObject = null;
        }
        
        // Update button states
        document.getElementById('start-camera').disabled = false;
        document.getElementById('stop-camera').disabled = true;
        document.getElementById('capture').disabled = true;
        
        this.hideLoading();
    }
    
    selectDress(dressType) {
        // Remove active class from all cards
        document.querySelectorAll('.dress-card').forEach(card => {
            card.classList.remove('active');
        });
        
        // Add active class to selected card
        document.querySelector(`[data-dress="${dressType}"]`).classList.add('active');
        
        // Update current dress with animation
        this.dressOverlay.classList.add('dress-changing');
        
        setTimeout(() => {
            this.currentDress = dressType;
            this.updateDressOverlay();
            this.dressOverlay.classList.remove('dress-changing');
        }, 250);
    }
    
    updateDressOverlay() {
        // Remove all dress classes
        this.dressOverlay.className = 'dress-overlay';
        
        // Add current dress class
        this.dressOverlay.classList.add(this.currentDress);
        
        // Apply settings
        const transform = `translateY(${this.dressSettings.positionY}px) scale(${this.dressSettings.size})`;
        this.dressOverlay.style.transform = transform;
        this.dressOverlay.style.opacity = this.dressSettings.opacity;
    }
    
    capturePhoto() {
        if (!this.stream) {
            this.showError('Please start the camera first.');
            return;
        }
        
        try {
            // Draw video frame to canvas
            this.ctx.drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height);
            
            // Create a composite canvas with dress overlay
            const compositeCanvas = document.createElement('canvas');
            const compositeCtx = compositeCanvas.getContext('2d');
            compositeCanvas.width = this.canvas.width;
            compositeCanvas.height = this.canvas.height;
            
            // Draw video frame
            compositeCtx.drawImage(this.video, 0, 0, compositeCanvas.width, compositeCanvas.height);
            
            // Draw dress overlay (simplified version)
            this.drawDressOverlay(compositeCtx, compositeCanvas.width, compositeCanvas.height);
            
            // Convert to data URL
            const dataURL = compositeCanvas.toDataURL('image/png');
            
            // Save photo
            this.savePhoto(dataURL);
            
            // Visual feedback
            this.showCaptureFlash();
            
        } catch (error) {
            console.error('Error capturing photo:', error);
            this.showError('Failed to capture photo. Please try again.');
        }
    }
    
    drawDressOverlay(ctx, width, height) {
        // This is a simplified dress overlay drawing
        // In a real implementation, you'd use more sophisticated graphics
        
        ctx.save();
        
        // Apply transformations
        ctx.translate(width / 2, height / 2 + this.dressSettings.positionY);
        ctx.scale(this.dressSettings.size, this.dressSettings.size);
        ctx.globalAlpha = this.dressSettings.opacity;
        
        // Draw dress shape based on current dress type
        this.drawDressShape(ctx);
        
        ctx.restore();
    }
    
    drawDressShape(ctx) {
        const dressColors = {
            'elegant-black': '#000000',
            'summer-floral': '#FFC9DA',
            'royal-blue': '#3B82F6',
            'red-cocktail': '#FF5757'
        };
        
        const color = dressColors[this.currentDress] || '#000000';
        
        ctx.fillStyle = color;
        ctx.beginPath();
        
        // Simple dress shape
        ctx.moveTo(-60, -80);
        ctx.lineTo(60, -80);
        ctx.lineTo(80, 120);
        ctx.lineTo(-80, 120);
        ctx.closePath();
        ctx.fill();
        
        // Add some details for floral dress
        if (this.currentDress === 'summer-floral') {
            ctx.fillStyle = '#FF6BB5';
            ctx.beginPath();
            ctx.arc(-20, -40, 6, 0, Math.PI * 2);
            ctx.arc(30, 0, 5, 0, Math.PI * 2);
            ctx.arc(-10, 40, 7, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    savePhoto(dataURL) {
        const photo = {
            id: Date.now(),
            dataURL: dataURL,
            dress: this.currentDress,
            timestamp: new Date().toLocaleString()
        };
        
        this.capturedPhotos.push(photo);
        this.displayCapturedPhotos();
        
        // Auto-download the photo
        const link = document.createElement('a');
        link.download = `dress-tryout-${photo.id}.png`;
        link.href = dataURL;
        link.click();
    }
    
    displayCapturedPhotos() {
        const photosSection = document.getElementById('captured-photos');
        const photosGrid = document.getElementById('photos-grid');
        
        if (this.capturedPhotos.length === 0) {
            photosSection.style.display = 'none';
            return;
        }
        
        photosSection.style.display = 'block';
        photosGrid.innerHTML = '';
        
        this.capturedPhotos.forEach(photo => {
            const photoItem = document.createElement('div');
            photoItem.className = 'photo-item';
            photoItem.innerHTML = `
                <img src="${photo.dataURL}" alt="Captured photo with ${photo.dress} dress">
                <div style="padding: 10px; text-align: center; font-size: 0.8rem; color: #666;">
                    ${photo.timestamp}
                </div>
            `;
            photosGrid.appendChild(photoItem);
        });
    }
    
    showCaptureFlash() {
        const flash = document.createElement('div');
        flash.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: white;
            opacity: 0.8;
            pointer-events: none;
            z-index: 9999;
        `;
        document.body.appendChild(flash);
        
        setTimeout(() => {
            flash.style.opacity = '0';
            flash.style.transition = 'opacity 0.3s ease';
            setTimeout(() => document.body.removeChild(flash), 300);
        }, 100);
    }
    
    showLoading(message = 'Loading...') {
        const existing = document.querySelector('.loading-overlay');
        if (existing) return;
        
        const loading = document.createElement('div');
        loading.className = 'loading-overlay';
        loading.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0,0,0,0.7);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 1.2rem;
            z-index: 9999;
        `;
        loading.innerHTML = `
            <div style="text-align: center;">
                <div style="margin-bottom: 15px;">📸</div>
                <div>${message}</div>
            </div>
        `;
        document.body.appendChild(loading);
    }
    
    hideLoading() {
        const loading = document.querySelector('.loading-overlay');
        if (loading) {
            document.body.removeChild(loading);
        }
    }
    
    showError(message) {
        // Remove existing error
        const existing = document.querySelector('.error');
        if (existing) existing.remove();
        
        const error = document.createElement('div');
        error.className = 'error';
        error.textContent = message;
        
        const cameraSection = document.querySelector('.camera-section');
        cameraSection.insertBefore(error, cameraSection.firstChild);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (error.parentNode) {
                error.parentNode.removeChild(error);
            }
        }, 5000);
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new DressUpApp();
});

// Add some fun interactions
document.addEventListener('DOMContentLoaded', () => {
    // Add hover effects to dress cards
    const dressCards = document.querySelectorAll('.dress-card');
    dressCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
    
    // Add particle effect for captures (optional enhancement)
    function createParticles() {
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.style.cssText = `
                    position: fixed;
                    width: 6px;
                    height: 6px;
                    background: linear-gradient(45deg, #667eea, #764ba2);
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 1000;
                    left: ${Math.random() * window.innerWidth}px;
                    top: ${Math.random() * window.innerHeight}px;
                    animation: particle-float 2s ease-out forwards;
                `;
                document.body.appendChild(particle);
                
                setTimeout(() => {
                    if (particle.parentNode) {
                        particle.parentNode.removeChild(particle);
                    }
                }, 2000);
            }, i * 50);
        }
    }
    
    // Add CSS animation for particles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes particle-float {
            0% {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
            100% {
                opacity: 0;
                transform: translateY(-100px) scale(0);
            }
        }
    `;
    document.head.appendChild(style);
});