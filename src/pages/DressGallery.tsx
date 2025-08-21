import React, { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, Heart, ShoppingCart, Star, Eye } from 'lucide-react'
import { Link } from 'react-router-dom'

interface Dress {
  id: string
  name: string
  image: string
  price: number
  originalPrice?: number
  category: string
  colors: string[]
  rating: number
  reviews: number
  isNew?: boolean
  isSale?: boolean
}

const DressGallery: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('all')
  const [sortBy, setSortBy] = useState<string>('featured')

  const dresses: Dress[] = [
    {
      id: '1',
      name: 'Elegant Evening Gown',
      image: '/api/placeholder/300/400',
      price: 299,
      originalPrice: 399,
      category: 'Evening',
      colors: ['Black', 'Red', 'Navy'],
      rating: 4.8,
      reviews: 127,
      isNew: true
    },
    {
      id: '2',
      name: 'Summer Floral Dress',
      image: '/api/placeholder/300/400',
      price: 89,
      category: 'Casual',
      colors: ['Blue', 'Pink', 'Yellow'],
      rating: 4.6,
      reviews: 89
    },
    {
      id: '3',
      name: 'Business Professional',
      image: '/api/placeholder/300/400',
      price: 159,
      category: 'Business',
      colors: ['Gray', 'Black', 'Navy'],
      rating: 4.7,
      reviews: 156
    },
    {
      id: '4',
      name: 'Cocktail Party Dress',
      image: '/api/placeholder/300/400',
      price: 129,
      originalPrice: 179,
      category: 'Party',
      colors: ['Red', 'Black', 'Gold'],
      rating: 4.5,
      reviews: 203,
      isSale: true
    },
    {
      id: '5',
      name: 'Boho Maxi Dress',
      image: '/api/placeholder/300/400',
      price: 79,
      category: 'Casual',
      colors: ['Green', 'Orange', 'Purple'],
      rating: 4.4,
      reviews: 67
    },
    {
      id: '6',
      name: 'Formal Wedding Guest',
      image: '/api/placeholder/300/400',
      price: 189,
      category: 'Formal',
      colors: ['Blush', 'Sage', 'Dusty Blue'],
      rating: 4.9,
      reviews: 234
    },
    {
      id: '7',
      name: 'Office Power Dress',
      image: '/api/placeholder/300/400',
      price: 139,
      category: 'Business',
      colors: ['Charcoal', 'Burgundy', 'Teal'],
      rating: 4.6,
      reviews: 98
    },
    {
      id: '8',
      name: 'Beach Cover Up',
      image: '/api/placeholder/300/400',
      price: 59,
      category: 'Casual',
      colors: ['White', 'Coral', 'Turquoise'],
      rating: 4.3,
      reviews: 45
    }
  ]

  const categories = ['all', 'Evening', 'Casual', 'Business', 'Party', 'Formal']
  const priceRanges = [
    { value: 'all', label: 'All Prices' },
    { value: '0-50', label: 'Under $50' },
    { value: '50-100', label: '$50 - $100' },
    { value: '100-200', label: '$100 - $200' },
    { value: '200+', label: 'Over $200' }
  ]

  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'newest', label: 'Newest' }
  ]

  const filteredAndSortedDresses = useMemo(() => {
    let filtered = dresses.filter(dress => {
      const matchesSearch = dress.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           dress.category.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === 'all' || dress.category === selectedCategory
      
      let matchesPrice = true
      if (selectedPriceRange !== 'all') {
        const [min, max] = selectedPriceRange.split('-').map(Number)
        if (max) {
          matchesPrice = dress.price >= min && dress.price <= max
        } else {
          matchesPrice = dress.price >= min
        }
      }
      
      return matchesSearch && matchesCategory && matchesPrice
    })

    // Sort dresses
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case 'newest':
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
        break
      default:
        // Featured - keep original order
        break
    }

    return filtered
  }, [searchTerm, selectedCategory, selectedPriceRange, sortBy])

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
            Dress Gallery
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our stunning collection of dresses for every occasion
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search dresses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>

            {/* Price Range Filter */}
            <select
              value={selectedPriceRange}
              onChange={(e) => setSelectedPriceRange(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {priceRanges.map(range => (
                <option key={range.value} value={range.value}>
                  {range.label}
                </option>
              ))}
            </select>

            {/* Sort By */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredAndSortedDresses.length} of {dresses.length} dresses
          </p>
        </div>

        {/* Dress Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAndSortedDresses.map((dress, index) => (
            <motion.div
              key={dress.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Dress Image */}
              <div className="relative">
                <div className="aspect-[3/4] bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">Dress Image</span>
                </div>
                
                {/* Badges */}
                <div className="absolute top-3 left-3 flex space-x-2">
                  {dress.isNew && (
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                      New
                    </span>
                  )}
                  {dress.isSale && (
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                      Sale
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="absolute top-3 right-3 flex flex-col space-y-2">
                  <button className="w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200">
                    <Heart className="w-4 h-4 text-gray-700" />
                  </button>
                  <button className="w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200">
                    <Eye className="w-4 h-4 text-gray-700" />
                  </button>
                </div>

                {/* Price */}
                <div className="absolute bottom-3 left-3">
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-primary-600">${dress.price}</span>
                      {dress.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">${dress.originalPrice}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Dress Info */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{dress.name}</h3>
                
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-600">{dress.category}</span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-700">{dress.rating}</span>
                    <span className="text-xs text-gray-500">({dress.reviews})</span>
                  </div>
                </div>

                {/* Colors */}
                <div className="mb-4">
                  <p className="text-xs text-gray-600 mb-2">Available Colors:</p>
                  <div className="flex space-x-2">
                    {dress.colors.slice(0, 3).map((color) => (
                      <div
                        key={color}
                        className="w-4 h-4 rounded-full border border-gray-300"
                        style={{ backgroundColor: color.toLowerCase() }}
                        title={color}
                      />
                    ))}
                    {dress.colors.length > 3 && (
                      <span className="text-xs text-gray-500">+{dress.colors.length - 3}</span>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <Link
                    to={`/try-on?dress=${dress.id}`}
                    className="flex-1 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors duration-200 text-center"
                  >
                    Try On
                  </Link>
                  <button className="flex-1 bg-secondary-600 hover:bg-secondary-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors duration-200">
                    <ShoppingCart className="w-4 h-4 inline mr-1" />
                    Add
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredAndSortedDresses.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No dresses found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search criteria or filters
            </p>
            <button
              onClick={() => {
                setSearchTerm('')
                setSelectedCategory('all')
                setSelectedPriceRange('all')
                setSortBy('featured')
              }}
              className="btn-primary"
            >
              Clear Filters
            </button>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default DressGallery