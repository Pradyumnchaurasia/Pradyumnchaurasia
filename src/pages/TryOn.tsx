import React, { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Camera, Upload, Download, RotateCcw, Settings, Heart, Share2, ShoppingCart } from 'lucide-react'

interface Dress {
  id: string
  name: string
  image: string
  price: number
  category: string
  colors: string[]
}

const TryOn: React.FC = () => {
  const [isCameraActive, setIsCameraActive] = useState(false)
  const [selectedDress, setSelectedDress] = useState<Dress | null>(null)
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [showGallery, setShowGallery] = useState(false)
  const [selectedColor, setSelectedColor] = useState<string>('')
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const dresses: Dress[] = [
    {
      id: '1',
      name: 'Elegant Evening Gown',
      image: '/api/placeholder/300/400',
      price: 299,
      category: 'Evening',
      colors: ['Black', 'Red', 'Navy']
    },
    {
      id: '2',
      name: 'Summer Floral Dress',
      image: '/api/placeholder/300/400',
      price: 89,
      category: 'Casual',
      colors: ['Blue', 'Pink', 'Yellow']
    },
    {
      id: '3',
      name: 'Business Professional',
      image: '/api/placeholder/300/400',
      price: 159,
      category: 'Business',
      colors: ['Gray', 'Black', 'Navy']
    },
    {
      id: '4',
      name: 'Cocktail Party Dress',
      image: '/api/placeholder/300/400',
      price: 129,
      category: 'Party',
      colors: ['Red', 'Black', 'Gold']
    }
  ]

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'user',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      })
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setIsCameraActive(true)
      }
    } catch (error) {
      console.error('Error accessing camera:', error)
      alert('Unable to access camera. Please check permissions.')
    }
  }, [])

  const stopCamera = useCallback(() => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      stream.getTracks().forEach(track => track.stop())
      setIsCameraActive(false)
    }
  }, [])

  const captureImage = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current
      const context = canvas.getContext('2d')
      
      if (context) {
        canvas.width = videoRef.current.videoWidth
        canvas.height = videoRef.current.videoHeight
        context.drawImage(videoRef.current, 0, 0)
        
        const imageData = canvas.toDataURL('image/jpeg')
        setCapturedImage(imageData)
        stopCamera()
      }
    }
  }, [stopCamera])

  const processTryOn = useCallback(async () => {
    if (!capturedImage || !selectedDress) return
    
    setIsProcessing(true)
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    setIsProcessing(false)
    // In a real app, this would call an AI service to overlay the dress
  }, [capturedImage, selectedDress])

  const resetTryOn = useCallback(() => {
    setCapturedImage(null)
    setSelectedDress(null)
    setSelectedColor('')
    setIsProcessing(false)
  }, [])

  const handleDressSelect = useCallback((dress: Dress) => {
    setSelectedDress(dress)
    setSelectedColor(dress.colors[0])
    setShowGallery(false)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-blue-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Virtual Dress Try-On
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Take a photo and see how our dresses look on you with AI-powered virtual fitting
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Camera Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl shadow-xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-900">Camera</h2>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setShowGallery(!showGallery)}
                    className="p-2 text-gray-600 hover:text-primary-600 transition-colors duration-200"
                  >
                    <Settings className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Camera View */}
              <div className="relative bg-gray-100 rounded-xl overflow-hidden mb-6">
                {!isCameraActive && !capturedImage && (
                  <div className="aspect-video flex items-center justify-center">
                    <div className="text-center">
                      <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-4">Click start to begin your virtual try-on</p>
                      <button
                        onClick={startCamera}
                        className="btn-primary"
                      >
                        Start Camera
                      </button>
                    </div>
                  </div>
                )}

                {isCameraActive && (
                  <div className="relative">
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      className="w-full aspect-video object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="border-2 border-white border-dashed rounded-lg p-8 text-center bg-black/20">
                        <p className="text-white font-semibold">Position yourself in the frame</p>
                      </div>
                    </div>
                  </div>
                )}

                {capturedImage && (
                  <div className="relative">
                    <img
                      src={capturedImage}
                      alt="Captured photo"
                      className="w-full aspect-video object-cover"
                    />
                    <div className="absolute top-4 right-4">
                      <button
                        onClick={resetTryOn}
                        className="bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-200"
                      >
                        <RotateCcw className="w-5 h-5 text-gray-700" />
                      </button>
                    </div>
                  </div>
                )}

                <canvas ref={canvasRef} className="hidden" />
              </div>

              {/* Camera Controls */}
              {isCameraActive && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-center space-x-4"
                >
                  <button
                    onClick={captureImage}
                    className="bg-primary-600 hover:bg-primary-700 text-white p-4 rounded-full shadow-lg transition-all duration-200 transform hover:scale-110"
                  >
                    <Camera className="w-6 h-6" />
                  </button>
                </motion.div>
              )}

              {/* Try-On Button */}
              {capturedImage && selectedDress && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center"
                >
                  <button
                    onClick={processTryOn}
                    disabled={isProcessing}
                    className="btn-primary w-full py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? (
                      <div className="flex items-center justify-center">
                        <div className="loading-spinner mr-3"></div>
                        Processing Try-On...
                      </div>
                    ) : (
                      'Try On Dress'
                    )}
                  </button>
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* Dress Selection */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl shadow-xl p-6"
            >
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Select a Dress</h2>

              {/* Dress Gallery */}
              <div className="space-y-4">
                {dresses.map((dress) => (
                  <motion.div
                    key={dress.id}
                    whileHover={{ scale: 1.02 }}
                    className={`cursor-pointer rounded-lg p-4 border-2 transition-all duration-200 ${
                      selectedDress?.id === dress.id
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-primary-300'
                    }`}
                    onClick={() => handleDressSelect(dress)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                        <span className="text-xs text-gray-500">Dress</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{dress.name}</h3>
                        <p className="text-sm text-gray-600">{dress.category}</p>
                        <p className="text-lg font-bold text-primary-600">${dress.price}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Selected Dress Details */}
              {selectedDress && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 bg-primary-50 rounded-lg"
                >
                  <h3 className="font-semibold text-gray-900 mb-3">Selected: {selectedDress.name}</h3>
                  
                  {/* Color Selection */}
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-2">Choose Color:</p>
                    <div className="flex space-x-2">
                      {selectedDress.colors.map((color) => (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
                            selectedColor === color
                              ? 'bg-primary-600 text-white'
                              : 'bg-white text-gray-700 hover:bg-primary-100'
                          }`}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <button className="flex-1 bg-white hover:bg-gray-50 text-primary-600 font-medium py-2 px-4 rounded-lg border border-primary-300 transition-colors duration-200">
                      <Heart className="w-4 h-4 inline mr-2" />
                      Save
                    </button>
                    <button className="flex-1 bg-white hover:bg-gray-50 text-primary-600 font-medium py-2 px-4 rounded-lg border border-primary-300 transition-colors duration-200">
                      <Share2 className="w-4 h-4 inline mr-2" />
                      Share
                    </button>
                  </div>

                  <button className="w-full mt-3 bg-secondary-600 hover:bg-secondary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200">
                    <ShoppingCart className="w-4 h-4 inline mr-2" />
                    Add to Cart
                  </button>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 bg-white rounded-2xl shadow-lg p-6"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-4">How to Use Virtual Try-On</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-primary-600 font-bold">1</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Take a Photo</h4>
              <p className="text-gray-600 text-sm">Position yourself in good lighting and take a clear photo</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-primary-600 font-bold">2</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Choose a Dress</h4>
              <p className="text-gray-600 text-sm">Select from our collection of beautiful dresses</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-primary-600 font-bold">3</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">See the Result</h4>
              <p className="text-gray-600 text-sm">Our AI will show you how the dress looks on you</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default TryOn