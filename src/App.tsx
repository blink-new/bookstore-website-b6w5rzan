import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './components/ui/card'
import { Button } from './components/ui/button'
import { Input } from './components/ui/input'
import { Badge } from './components/ui/badge'
import { Separator } from './components/ui/separator'
import { Star, ShoppingCart, Search, Book, User, Heart } from 'lucide-react'

// Sample book data
const books = [
  {
    id: 1,
    title: "The Midnight Library",
    author: "Matt Haig",
    price: 24.99,
    originalPrice: 29.99,
    genre: "Fiction",
    rating: 4.8,
    reviews: 1247,
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=400&q=80",
    description: "A magical and thought-provoking novel about all the choices that go into a life well lived.",
    featured: true,
    bestseller: true
  },
  {
    id: 2,
    title: "Atomic Habits",
    author: "James Clear",
    price: 18.99,
    originalPrice: 22.99,
    genre: "Self-Help",
    rating: 4.9,
    reviews: 2156,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    description: "The life-changing million copy bestseller that will help you build better habits.",
    featured: true,
    bestseller: false
  },
  {
    id: 3,
    title: "The Seven Husbands of Evelyn Hugo",
    author: "Taylor Jenkins Reid",
    price: 16.99,
    originalPrice: 19.99,
    genre: "Romance",
    rating: 4.7,
    reviews: 987,
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=400&q=80",
    description: "A captivating novel about a reclusive Hollywood icon who finally tells her story.",
    featured: false,
    bestseller: true
  },
  {
    id: 4,
    title: "Educated",
    author: "Tara Westover",
    price: 21.99,
    originalPrice: 26.99,
    genre: "Memoir",
    rating: 4.6,
    reviews: 1543,
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=400&q=80",
    description: "A powerful memoir about education, transformation, and the price of knowledge.",
    featured: false,
    bestseller: false
  },
  {
    id: 5,
    title: "The Silent Patient",
    author: "Alex Michaelides", 
    price: 19.99,
    originalPrice: 24.99,
    genre: "Thriller",
    rating: 4.5,
    reviews: 823,
    image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=400&q=80",
    description: "A gripping psychological thriller that will keep you guessing until the final page.",
    featured: true,
    bestseller: false
  },
  {
    id: 6,
    title: "Becoming",
    author: "Michelle Obama",
    price: 22.99,
    originalPrice: 27.99,
    genre: "Biography",
    rating: 4.8,
    reviews: 1876,
    image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=400&q=80",
    description: "An intimate, powerful memoir by the former First Lady of the United States.",
    featured: false,
    bestseller: true
  }
]

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedGenre, setSelectedGenre] = useState('All')
  const [cartItems, setCartItems] = useState<number[]>([])
  const [wishlist, setWishlist] = useState<number[]>([])

  const genres = ['All', 'Fiction', 'Self-Help', 'Romance', 'Memoir', 'Thriller', 'Biography']
  
  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesGenre = selectedGenre === 'All' || book.genre === selectedGenre
    return matchesSearch && matchesGenre
  })

  const featuredBooks = books.filter(book => book.featured)

  const addToCart = (bookId: number) => {
    setCartItems(prev => [...prev, bookId])
  }

  const toggleWishlist = (bookId: number) => {
    setWishlist(prev => 
      prev.includes(bookId) 
        ? prev.filter(id => id !== bookId)
        : [...prev, bookId]
    )
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
      />
    ))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-amber-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Book className="w-8 h-8 text-amber-600" />
              <h1 className="text-2xl font-bold text-gray-900">BookHaven</h1>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-700 hover:text-amber-600 transition-colors">Home</a>
              <a href="#" className="text-gray-700 hover:text-amber-600 transition-colors">Books</a>
              <a href="#" className="text-gray-700 hover:text-amber-600 transition-colors">Authors</a>
              <a href="#" className="text-gray-700 hover:text-amber-600 transition-colors">About</a>
            </nav>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="relative">
                <Heart className="w-5 h-5" />
                {wishlist.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 w-5 h-5 p-0 text-xs bg-red-500">
                    {wishlist.length}
                  </Badge>
                )}
              </Button>
              <Button variant="ghost" size="sm" className="relative">
                <ShoppingCart className="w-5 h-5" />
                {cartItems.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 w-5 h-5 p-0 text-xs bg-amber-600">
                    {cartItems.length}
                  </Badge>
                )}
              </Button>
              <Button variant="ghost" size="sm">
                <User className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Discover Your Next
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600"> Adventure</span>
            </h2>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
              Explore our curated collection of books that inspire, educate, and entertain. 
              From bestsellers to hidden gems, find your perfect read.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-16">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search for books, authors, or genres..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 h-12 text-lg border-2 border-amber-200 focus:border-amber-400 rounded-full"
                />
              </div>
            </div>
          </div>

          {/* Featured Books Carousel */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {featuredBooks.map((book) => (
              <Card key={book.id} className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-amber-200">
                <CardHeader className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img 
                      src={book.image} 
                      alt={book.title}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      {book.bestseller && (
                        <Badge className="bg-red-500 text-white">Bestseller</Badge>
                      )}
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="absolute top-4 right-4 bg-white/80 hover:bg-white"
                      onClick={() => toggleWishlist(book.id)}
                    >
                      <Heart className={`w-4 h-4 ${wishlist.includes(book.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <CardTitle className="text-xl mb-2 group-hover:text-amber-600 transition-colors">
                    {book.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600 mb-3">
                    by {book.author}
                  </CardDescription>
                  <p className="text-sm text-gray-600 mb-4">{book.description}</p>
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="flex">{renderStars(book.rating)}</div>
                    <span className="text-sm text-gray-500">({book.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-amber-600">${book.price}</span>
                      <span className="text-sm text-gray-500 line-through">${book.originalPrice}</span>
                    </div>
                    <Badge variant="secondary">{book.genre}</Badge>
                  </div>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Button 
                    className="w-full bg-amber-600 hover:bg-amber-700 text-white"
                    onClick={() => addToCart(book.id)}
                  >
                    Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Separator className="my-8" />

      {/* All Books Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">All Books</h3>
            
            {/* Genre Filter */}
            <div className="flex flex-wrap gap-2">
              {genres.map((genre) => (
                <Button
                  key={genre}
                  variant={selectedGenre === genre ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedGenre(genre)}
                  className={selectedGenre === genre ? "bg-amber-600 hover:bg-amber-700" : "border-amber-200 hover:bg-amber-50"}
                >
                  {genre}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredBooks.map((book) => (
              <Card key={book.id} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white/80 backdrop-blur-sm border-amber-200">
                <CardHeader className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img 
                      src={book.image} 
                      alt={book.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 left-2">
                      {book.bestseller && (
                        <Badge className="bg-red-500 text-white text-xs">Bestseller</Badge>
                      )}
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="absolute top-2 right-2 bg-white/80 hover:bg-white p-1"
                      onClick={() => toggleWishlist(book.id)}
                    >
                      <Heart className={`w-3 h-3 ${wishlist.includes(book.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <CardTitle className="text-lg mb-1 group-hover:text-amber-600 transition-colors line-clamp-2">
                    {book.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600 mb-2 text-sm">
                    by {book.author}
                  </CardDescription>
                  <div className="flex items-center space-x-1 mb-3">
                    <div className="flex">{renderStars(book.rating)}</div>
                    <span className="text-xs text-gray-500">({book.reviews})</span>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-1">
                      <span className="text-lg font-bold text-amber-600">${book.price}</span>
                      <span className="text-xs text-gray-500 line-through">${book.originalPrice}</span>
                    </div>
                    <Badge variant="secondary" className="text-xs">{book.genre}</Badge>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button 
                    size="sm"
                    className="w-full bg-amber-600 hover:bg-amber-700 text-white"
                    onClick={() => addToCart(book.id)}
                  >
                    Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Book className="w-6 h-6 text-amber-400" />
                <h4 className="text-xl font-bold">BookHaven</h4>
              </div>
              <p className="text-gray-400">
                Your premier destination for books that inspire, educate, and entertain.
              </p>
            </div>
            
            <div>
              <h5 className="font-semibold mb-4">Quick Links</h5>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Books</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Authors</a></li>
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-semibold mb-4">Genres</h5>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Fiction</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Non-Fiction</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Biography</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Self-Help</a></li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-semibold mb-4">Contact</h5>
              <ul className="space-y-2 text-gray-400">
                <li>support@bookhaven.com</li>
                <li>1-800-BOOKS-99</li>
                <li>123 Literary Lane, Book City</li>
              </ul>
            </div>
          </div>
          
          <Separator className="my-8 bg-gray-700" />
          
          <div className="text-center text-gray-400">
            <p>&copy; 2024 BookHaven. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App