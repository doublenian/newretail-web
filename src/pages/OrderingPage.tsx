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
  
  // 拖拽相关状态
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [position, setPosition] = useState({ x: 0, y: 0 })

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

  // 丰富的菜品数据
  const menuItems: MenuItem[] = [
    // 热销推荐
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
      name: '黑椒牛排',
      price: 168,
      image: 'https://images.pexels.com/photos/361184/asparagus-steak-veal-cutlet-veal-361184.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      category: 'hot-sale',
      description: '精选澳洲牛肉  剩余 3 份'
    },
    {
      id: 'item3',
      name: '意式奶油面',
      price: 98,
      image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      category: 'hot-sale',
      description: '正宗意式做法  剩余 6 份'
    },
    {
      id: 'item4',
      name: '烤三文鱼',
      price: 188,
      image: 'https://images.pexels.com/photos/262959/pexels-photo-262959.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      category: 'hot-sale',
      description: '挪威进口三文鱼  剩余 2 份'
    },

    // 老板推荐
    {
      id: 'boss1',
      name: '招牌红烧肉',
      price: 88,
      image: 'https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      category: 'boss-recommend',
      description: '老板亲自调味  招牌菜品',
      isRecommended: true
    },
    {
      id: 'boss2',
      name: '蒜蓉粉丝扇贝',
      price: 128,
      image: 'https://images.pexels.com/photos/725997/pexels-photo-725997.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      category: 'boss-recommend',
      description: '新鲜扇贝  蒜香浓郁'
    },
    {
      id: 'boss3',
      name: '秘制烤鸭',
      price: 188,
      image: 'https://images.pexels.com/photos/1268549/pexels-photo-1268549.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      category: 'boss-recommend',
      description: '北京烤鸭工艺  皮脆肉嫩'
    },
    {
      id: 'boss4',
      name: '老板私房菜',
      price: 158,
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      category: 'boss-recommend',
      description: '老板独创配方  限量供应'
    },

    // 冷菜
    {
      id: 'cold1',
      name: '口水鸡',
      price: 48,
      image: 'https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      category: 'cold-dish',
      description: '四川经典  麻辣鲜香'
    },
    {
      id: 'cold2',
      name: '蒜泥白肉',
      price: 58,
      image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      category: 'cold-dish',
      description: '肥瘦相间  蒜香浓郁'
    },
    {
      id: 'cold3',
      name: '凉拌黄瓜',
      price: 28,
      image: 'https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      category: 'cold-dish',
      description: '清爽开胃  解腻必备'
    },
    {
      id: 'cold4',
      name: '拍黄瓜',
      price: 25,
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      category: 'cold-dish',
      description: '蒜香味浓  爽脆可口'
    },

    // 热菜
    {
      id: 'hot1',
      name: '宫保鸡丁',
      price: 68,
      image: 'https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      category: 'hot-dish',
      description: '经典川菜  酸甜可口'
    },
    {
      id: 'hot2',
      name: '麻婆豆腐',
      price: 45,
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      category: 'hot-dish',
      description: '嫩滑豆腐  麻辣鲜香'
    },
    {
      id: 'hot3',
      name: '红烧排骨',
      price: 88,
      image: 'https://images.pexels.com/photos/725997/pexels-photo-725997.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      category: 'hot-dish',
      description: '软糯香甜  老少皆宜'
    },
    {
      id: 'hot4',
      name: '糖醋里脊',
      price: 78,
      image: 'https://images.pexels.com/photos/1268549/pexels-photo-1268549.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      category: 'hot-dish',
      description: '酸甜开胃  外酥内嫩'
    },

    // 香菜
    {
      id: 'fragrant1',
      name: '香菜牛肉丸',
      price: 58,
      image: 'https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      category: 'fragrant-dish',
      description: '香菜提味  牛肉Q弹'
    },
    {
      id: 'fragrant2',
      name: '香菜炒鸡蛋',
      price: 38,
      image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      category: 'fragrant-dish',
      description: '香菜浓郁  鸡蛋嫩滑'
    },
    {
      id: 'fragrant3',
      name: '香菜拌豆腐',
      price: 32,
      image: 'https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      category: 'fragrant-dish',
      description: '清香爽口  营养丰富'
    },

    // 经典套餐
    {
      id: 'set1',
      name: '商务套餐A',
      price: 128,
      image: 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      category: 'classic-set',
      description: '主菜+汤+米饭+小菜'
    },
    {
      id: 'set2',
      name: '家庭套餐',
      price: 288,
      image: 'https://images.pexels.com/photos/361184/asparagus-steak-veal-cutlet-veal-361184.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      category: 'classic-set',
      description: '3菜1汤  适合2-3人'
    },
    {
      id: 'set3',
      name: '情侣套餐',
      price: 188,
      image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      category: 'classic-set',
      description: '浪漫双人餐  含红酒'
    },

    // 特色烧烤
    {
      id: 'bbq1',
      name: '烤羊肉串',
      price: 6,
      image: 'https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      category: 'bbq',
      description: '新疆羊肉  香嫩多汁'
    },
    {
      id: 'bbq2',
      name: '烤鸡翅',
      price: 15,
      image: 'https://images.pexels.com/photos/725997/pexels-photo-725997.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      category: 'bbq',
      description: '秘制腌料  外焦里嫩'
    },
    {
      id: 'bbq3',
      name: '烤玉米',
      price: 12,
      image: 'https://images.pexels.com/photos/1268549/pexels-photo-1268549.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      category: 'bbq',
      description: '香甜玉米  刷特制酱'
    },
    {
      id: 'bbq4',
      name: '烤茄子',
      price: 18,
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      category: 'bbq',
      description: '蒜蓉茄子  香气扑鼻'
    },

    // 酒水饮料
    {
      id: 'drink1',
      name: '鲜榨橙汁',
      price: 28,
      image: 'https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      category: 'drinks',
      description: '现榨纯果汁  维C丰富'
    },
    {
      id: 'drink2',
      name: '柠檬蜂蜜茶',
      price: 32,
      image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      category: 'drinks',
      description: '酸甜清香  美容养颜'
    },
    {
      id: 'drink3',
      name: '特制奶茶',
      price: 35,
      image: 'https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      category: 'drinks',
      description: '丝滑香浓  回味无穷'
    },
    {
      id: 'drink4',
      name: '精酿啤酒',
      price: 45,
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      category: 'drinks',
      description: '德式工艺  口感醇厚'
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

  // 拖拽开始
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsDragging(true)
    const rect = e.currentTarget.getBoundingClientRect()
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    })
  }

  // 拖拽过程
  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return
    
    const newX = e.clientX - dragOffset.x
    const newY = e.clientY - dragOffset.y
    
    // 限制在窗口范围内
    const maxX = window.innerWidth - 200 // 购物车宽度大约200px
    const maxY = window.innerHeight - 56 // 购物车高度大约56px
    
    setPosition({
      x: Math.max(0, Math.min(newX, maxX)),
      y: Math.max(0, Math.min(newY, maxY))
    })
  }

  // 拖拽结束
  const handleMouseUp = () => {
    setIsDragging(false)
  }

  // 添加全局事件监听器
  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      document.body.style.userSelect = 'none' // 防止拖拽时选中文本
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
        document.body.style.userSelect = ''
      }
    }
  }, [isDragging, dragOffset])

  const goBack = () => {
    navigate(-1)
  }

  const goToCheckout = () => {
    if (isDragging) return // 拖拽时不触发下单
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
                    : 'text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-gray-300'
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

      {/* 可拖拽的悬浮购物车 */}
      {getTotalQuantity() > 0 && (
        <div 
          className={`fixed z-50 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
          style={{
            left: position.x || 'auto',
            top: position.y || 'auto',
            right: position.x ? 'auto' : '24px',
            bottom: position.y ? 'auto' : '24px',
            transform: isDragging ? 'scale(1.05)' : 'scale(1)',
            transition: isDragging ? 'none' : 'transform 0.2s ease'
          }}
          onMouseDown={handleMouseDown}
        >
          <div className={`flex items-stretch h-14 shadow-2xl rounded-full overflow-hidden ${
            isDragging ? 'shadow-3xl' : ''
          }`}>
            {/* 左侧购物车信息 - 深色背景 */}
            <div className="bg-gray-800 text-white flex items-center pl-6 pr-4 gap-3 select-none">
              <div className="relative">
                <ShoppingCart className="w-6 h-6 text-white" />
                <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold text-white">
                  {getTotalQuantity()}
                </div>
              </div>
              <div>
                <span className="text-lg font-bold">¥{getTotalPrice()}</span>
              </div>
            </div>
            
            {/* 右侧下单按钮 - 橙红色背景 */}
            <button
              onClick={goToCheckout}
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6 font-bold text-base transition-all duration-200 select-none"
              onMouseDown={(e) => e.stopPropagation()} // 防止按钮点击时触发拖拽
            >
              去下单
            </button>
          </div>
          
          {/* 拖拽提示 */}
          {isDragging && (
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
              拖拽到任意位置
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default OrderingPage