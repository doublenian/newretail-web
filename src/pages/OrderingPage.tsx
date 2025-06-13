import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, ShoppingCart, Plus, Minus } from 'lucide-react'

interface MenuItem {
  id: string
  name: string
  price: number
  image: string
  category: string
  description?: string
  isRecommended?: boolean
  soldCount?: number
  rating?: number
}

interface CartItem extends MenuItem {
  quantity: number
}

interface MenuCategory {
  id: string
  name: string
  badge?: number
}

const OrderingPage: React.FC = () => {
  const navigate = useNavigate()
  const { tableNumber } = useParams()
  const [selectedCategory, setSelectedCategory] = useState('hot-sale')
  const [cart, setCart] = useState<CartItem[]>([])

  // 菜单分类
  const categories: MenuCategory[] = [
    { id: 'hot-sale', name: '热销推荐', badge: 1 },
    { id: 'boss-recommend', name: '老板推荐' },
    { id: 'cold-dish', name: '冷菜' },
    { id: 'hot-dish', name: '热菜' },
    { id: 'fragrant-dish', name: '香菜' },
    { id: 'classic-set', name: '经典套餐' },
    { id: 'bbq', name: '特色烧烤' },
    { id: 'drinks', name: '酒水饮料' }
  ]

  // 模拟菜品数据
  const menuItems: MenuItem[] = [
    {
      id: 'item1',
      name: '酥皮肉夹馍',
      price: 128,
      image: 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      category: 'hot-sale',
      description: '买3赠2  2份起售  剩余 4 份',
      isRecommended: true
    },
    {
      id: 'item2',
      name: '酥皮肉夹馍',
      price: 128,
      image: 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      category: 'hot-sale',
      description: '剩余 4 份'
    },
    {
      id: 'item3',
      name: '酥皮肉夹馍',
      price: 128,
      image: 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      category: 'hot-sale',
      description: '买3赠2  2份起售  剩余 4 份'
    },
    {
      id: 'item4',
      name: '酥皮肉夹馍',
      price: 128,
      image: 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      category: 'hot-sale',
      description: '剩余 4 份'
    },
    {
      id: 'item5',
      name: '酥皮肉夹馍',
      price: 128,
      image: 'https://images.pexels.com/photos/262959/pexels-photo-262959.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      category: 'hot-sale'
    },
    {
      id: 'item6',
      name: '酥皮肉夹馍',
      price: 128,
      image: 'https://images.pexels.com/photos/262959/pexels-photo-262959.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      category: 'hot-sale'
    },
    {
      id: 'item7',
      name: '酥皮肉夹馍',
      price: 128,
      image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      category: 'hot-sale'
    },
    {
      id: 'item8',
      name: '酥皮肉夹馍',
      price: 128,
      image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      category: 'hot-sale'
    }
  ]

  // 获取当前分类的菜品
  const getCurrentCategoryItems = () => {
    return menuItems.filter(item => item.category === selectedCategory)
  }

  // 添加到购物车
  const addToCart = (item: MenuItem) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id)
    if (existingItem) {
      setCart(cart.map(cartItem => 
        cartItem.id === item.id 
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ))
    } else {
      setCart([...cart, { ...item, quantity: 1 }])
    }
  }

  // 从购物车减少
  const removeFromCart = (itemId: string) => {
    const existingItem = cart.find(cartItem => cartItem.id === itemId)
    if (existingItem && existingItem.quantity > 1) {
      setCart(cart.map(cartItem => 
        cartItem.id === itemId 
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      ))
    } else {
      setCart(cart.filter(cartItem => cartItem.id !== itemId))
    }
  }

  // 获取商品在购物车中的数量
  const getItemQuantity = (itemId: string) => {
    const item = cart.find(cartItem => cartItem.id === itemId)
    return item ? item.quantity : 0
  }

  // 计算购物车总价
  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  // 计算购物车总数量
  const getTotalQuantity = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  const goBack = () => {
    navigate(-1)
  }

  const goToCheckout = () => {
    console.log('Go to checkout with cart:', cart)
  }

  return (
    <div className="h-full w-full bg-gray-50 flex flex-col">
      {/* 顶部导航栏 */}
      <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={goBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>返回</span>
          </button>
          
          <div className="flex items-center gap-6">
            <h1 className="text-xl font-bold text-gray-800">特色西餐</h1>
            <span className="text-sm text-gray-500">营业时间：10:00-23:00</span>
            <span className="text-sm text-gray-400">本餐厅收取15%服务费</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">餐厅五星级大厨：021-87627555</span>
          <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-bold">餐</span>
          </div>
          <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
        </div>
      </div>

      {/* 主要内容区域 */}
      <div className="flex-1 flex">
        {/* 左侧菜单分类 */}
        <div className="w-48 bg-white border-r border-gray-200 shadow-sm">
          <div className="p-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`w-full text-left p-3 rounded-lg mb-2 transition-all duration-200 relative ${
                  selectedCategory === category.id
                    ? 'bg-orange-50 text-orange-600 border border-orange-200'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{category.name}</span>
                  {category.badge && (
                    <div className="w-5 h-5 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                      {category.badge}
                    </div>
                  )}
                </div>
                {selectedCategory === category.id && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-orange-500 rounded-r"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* 右侧菜品展示区域 */}
        <div className="flex-1 flex flex-col">
          {/* 菜品网格 */}
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="grid grid-cols-4 gap-6">
              {getCurrentCategoryItems().map((item) => {
                const quantity = getItemQuantity(item.id)
                return (
                  <div key={item.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                    {/* 菜品图片 */}
                    <div className="relative">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-48 object-cover"
                      />
                      {item.isRecommended && (
                        <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                          推荐
                        </div>
                      )}
                    </div>
                    
                    {/* 菜品信息 */}
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-800 mb-2">{item.name}</h3>
                      
                      {item.description && (
                        <p className="text-xs text-gray-500 mb-3">{item.description}</p>
                      )}
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <span className="text-orange-600 font-bold text-lg">¥{item.price}</span>
                          <span className="text-gray-400 text-sm">/份</span>
                        </div>
                        
                        {/* 加减按钮 */}
                        <div className="flex items-center gap-2">
                          {quantity > 0 && (
                            <>
                              <button
                                onClick={() => removeFromCart(item.id)}
                                className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                              >
                                <Minus className="w-4 h-4 text-gray-600" />
                              </button>
                              <span className="w-8 text-center font-semibold text-gray-800">
                                {quantity}
                              </span>
                            </>
                          )}
                          <button
                            onClick={() => addToCart(item)}
                            className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors"
                          >
                            <Plus className="w-4 h-4 text-white" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* 底部购物车 */}
      {getTotalQuantity() > 0 && (
        <div className="bg-gray-800 text-white p-4 flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-4">
            <div className="relative">
              <ShoppingCart className="w-8 h-8 text-white" />
              <div className="absolute -top-2 -right-2 w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center text-xs font-bold">
                {getTotalQuantity()}
              </div>
            </div>
            <div>
              <span className="text-lg font-bold">¥{getTotalPrice()}</span>
            </div>
          </div>
          
          <button
            onClick={goToCheckout}
            className="bg-orange-500 hover:bg-orange-600 px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            去下单
          </button>
        </div>
      )}
    </div>
  )
}

export default OrderingPage