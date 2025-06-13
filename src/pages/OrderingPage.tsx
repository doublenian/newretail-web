import React, { useState, useEffect } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { ArrowLeft, ShoppingCart, Plus, Minus, X } from 'lucide-react'

interface MenuVariant {
  id: string
  name: string
  price?: number // 如果有额外价格
}

interface MenuVariantCategory {
  id: string
  name: string
  required: boolean
  minSelect: number
  maxSelect: number
  options: MenuVariant[]
}

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
  hasVariants?: boolean // 是否有规格选择
  variants?: MenuVariantCategory[] // 规格分类
}

interface CartItem extends MenuItem {
  quantity: number
  selectedVariants?: { [categoryId: string]: string[] } // 选中的规格
  variantDescription?: string // 规格描述文本
  finalPrice?: number // 最终价格（包含规格价格）
}

interface MenuCategory {
  id: string
  name: string
  badge?: number
}

interface OrderingPageState {
  existingCart?: CartItem[]
}

const OrderingPage: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { tableNumber } = useParams()
  const [selectedCategory, setSelectedCategory] = useState('hot-sale')
  
  // 从导航状态中获取已有购物车数据
  const orderingState = location.state as OrderingPageState | null
  const [cart, setCart] = useState<CartItem[]>(orderingState?.existingCart || [])
  
  const [showCartModal, setShowCartModal] = useState(false)
  const [showVariantModal, setShowVariantModal] = useState(false)
  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItem | null>(null)
  const [selectedVariants, setSelectedVariants] = useState<{ [categoryId: string]: string[] }>({})
  const [variantQuantity, setVariantQuantity] = useState(1) // 规格选择时的数量
  
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
    // 热销推荐 - 增加更多菜品
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
      description: '精选澳洲牛肉  剩余 3 份',
      isRecommended: true,
      hasVariants: true,
      variants: [
        {
          id: 'doneness',
          name: '熟度',
          required: true,
          minSelect: 1,
          maxSelect: 1,
          options: [
            { id: 'rare', name: '三分熟' },
            { id: 'medium-rare', name: '五分熟' },
            { id: 'medium', name: '七分熟' },
            { id: 'well-done', name: '全熟' }
          ]
        },
        {
          id: 'sauce',
          name: '酱汁',
          required: true,
          minSelect: 1,
          maxSelect: 1,
          options: [
            { id: 'black-pepper', name: '黑椒汁' },
            { id: 'mushroom', name: '蘑菇汁' },
            { id: 'red-wine', name: '红酒汁' }
          ]
        }
      ]
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
    {
      id: 'item5',
      name: '蒜蓉小龙虾',
      price: 158,
      image: 'https://images.pexels.com/photos/1410235/pexels-photo-1410235.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      category: 'hot-sale',
      description: '夏日必备  麻辣鲜香  剩余 5 份',
      isRecommended: true,
      hasVariants: true,
      variants: [
        {
          id: 'spice-level',
          name: '辣度',
          required: true,
          minSelect: 1,
          maxSelect: 1,
          options: [
            { id: 'mild', name: '微辣' },
            { id: 'medium', name: '中辣' },
            { id: 'hot', name: '重辣' },
            { id: 'extra-hot', name: '变态辣' }
          ]
        },
        {
          id: 'size',
          name: '份量',
          required: true,
          minSelect: 1,
          maxSelect: 1,
          options: [
            { id: 'small', name: '小份', price: 0 },
            { id: 'large', name: '大份', price: 30 }
          ]
        }
      ]
    },
    {
      id: 'item6',
      name: '水煮鱼',
      price: 138,
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      category: 'hot-sale',
      description: '麻辣鲜香  嫩滑鱼肉  剩余 3 份'
    },
    {
      id: 'item7',
      name: '招牌烤鸭',
      price: 188,
      image: 'https://images.pexels.com/photos/1268549/pexels-photo-1268549.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      category: 'hot-sale',
      description: '传统工艺  皮脆肉嫩  剩余 2 份',
      isRecommended: true
    },
    {
      id: 'item8',
      name: '麻婆豆腐',
      price: 68,
      image: 'https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      category: 'hot-sale',
      description: '经典川菜  下饭神器  剩余 8 份'
    },
    {
      id: 'item9',
      name: '糖醋排骨',
      price: 98,
      image: 'https://images.pexels.com/photos/725997/pexels-photo-725997.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      category: 'hot-sale',
      description: '酸甜开胃  老少皆宜  剩余 4 份'
    },
    {
      id: 'item10',
      name: '蒜蓉扇贝',
      price: 128,
      image: 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      category: 'hot-sale',
      description: '新鲜扇贝  蒜香浓郁  剩余 6 份'
    },
    {
      id: 'item11',
      name: '红烧肉',
      price: 88,
      image: 'https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      category: 'hot-sale',
      description: '肥瘦相间  入口即化  剩余 5 份'
    },
    {
      id: 'item12',
      name: '宫保鸡丁',
      price: 78,
      image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      category: 'hot-sale',
      description: '经典家常菜  剩余 7 份'
    },

    // 经典套餐 - 添加有规格的套餐
    {
      id: 'set1',
      name: '商务套餐A',
      price: 128,
      image: 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      category: 'classic-set',
      description: '主菜+汤+米饭+小菜',
      hasVariants: true,
      variants: [
        {
          id: 'salad',
          name: '色拉',
          required: false,
          minSelect: 0,
          maxSelect: 1,
          options: [
            { id: 'caesar', name: '大明虾沙拉' },
            { id: 'chicken', name: '烟熏鸭胸沙拉' },
            { id: 'thai-beef', name: '泰式牛肉沙拉' },
            { id: 'thai-beef2', name: '泰式牛肉沙拉' }
          ]
        },
        {
          id: 'main-dish',
          name: '主菜',
          required: true,
          minSelect: 1,
          maxSelect: 1,
          options: [
            { id: 'crab-bun', name: '咖喱面包蟹' },
            { id: 'beef-steak', name: '炭烤牛板腱' },
            { id: 'thai-beef-salad', name: '泰式牛肉沙拉' }
          ]
        },
        {
          id: 'staple',
          name: '主食',
          required: true,
          minSelect: 1,
          maxSelect: 1,
          options: [
            { id: 'cream-pasta', name: '奶油蘑菇意面' },
            { id: 'meat-pasta', name: '意大利肉酱面' },
            { id: 'seafood-rice', name: '番茄海鲜烩饭' },
            { id: 'meat-pasta2', name: '意大利肉酱面' }
          ]
        },
        {
          id: 'soup',
          name: '汤品',
          required: true,
          minSelect: 1,
          maxSelect: 1,
          options: [
            { id: 'mushroom-soup', name: '奶油菌菇汤' },
            { id: 'luo-song', name: '罗宋汤' },
            { id: 'pumpkin-soup', name: '松子奶油南瓜汤' },
            { id: 'bone-soup', name: '排骨汤' }
          ]
        },
        {
          id: 'dessert',
          name: '甜品',
          required: true,
          minSelect: 1,
          maxSelect: 1,
          options: [
            { id: 'pudding', name: '焦糖布丁' },
            { id: 'tiramisu', name: '提拉米苏' },
            { id: 'cake', name: '黑森林' }
          ]
        }
      ]
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
  const addToCart = (item: MenuItem, variants?: { [categoryId: string]: string[] }, quantity: number = 1) => {
    // 计算最终价格
    let finalPrice = item.price
    let variantDescription = ''
    
    if (variants && item.variants) {
      const descriptions: string[] = []
      for (const categoryId in variants) {
        const category = item.variants.find(v => v.id === categoryId)
        if (category) {
          const selectedOptions = variants[categoryId]
          for (const optionId of selectedOptions) {
            const option = category.options.find(o => o.id === optionId)
            if (option) {
              descriptions.push(option.name)
              if (option.price) {
                finalPrice += option.price
              }
            }
          }
        }
      }
      variantDescription = descriptions.join(', ')
    }

    // 生成唯一的cart item ID（包含规格信息）
    const cartItemId = variants ? `${item.id}_${JSON.stringify(variants)}` : item.id
    
    const existingItem = cart.find(cartItem => 
      cartItem.id === item.id && 
      JSON.stringify(cartItem.selectedVariants) === JSON.stringify(variants)
    )
    
    if (existingItem) {
      setCart(cart.map(cartItem => 
        cartItem.id === item.id && 
        JSON.stringify(cartItem.selectedVariants) === JSON.stringify(variants)
          ? { ...cartItem, quantity: cartItem.quantity + quantity }
          : cartItem
      ))
    } else {
      setCart([...cart, { 
        ...item, 
        quantity: quantity, 
        selectedVariants: variants,
        variantDescription,
        finalPrice
      }])
    }
  }

  // 从购物车减少
  const removeFromCart = (itemId: string, variants?: { [categoryId: string]: string[] }) => {
    const existingItem = cart.find(cartItem => 
      cartItem.id === itemId && 
      JSON.stringify(cartItem.selectedVariants) === JSON.stringify(variants)
    )
    
    if (existingItem && existingItem.quantity > 1) {
      setCart(cart.map(cartItem => 
        cartItem.id === itemId && 
        JSON.stringify(cartItem.selectedVariants) === JSON.stringify(variants)
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      ))
    } else {
      setCart(cart.filter(cartItem => 
        !(cartItem.id === itemId && 
          JSON.stringify(cartItem.selectedVariants) === JSON.stringify(variants))
      ))
    }
  }

  // 获取商品在购物车中的数量
  const getItemQuantity = (itemId: string, variants?: { [categoryId: string]: string[] }) => {
    const item = cart.find(cartItem => 
      cartItem.id === itemId && 
      JSON.stringify(cartItem.selectedVariants) === JSON.stringify(variants)
    )
    return item ? item.quantity : 0
  }

  // 计算购物车总价
  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + ((item.finalPrice || item.price) * item.quantity), 0)
  }

  // 计算购物车总数量
  const getTotalQuantity = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  // 处理菜品点击（加号按钮）
  const handleMenuItemAdd = (item: MenuItem) => {
    if (item.hasVariants && item.variants) {
      // 有规格的菜品，显示规格选择弹框
      setSelectedMenuItem(item)
      setSelectedVariants({})
      setVariantQuantity(1) // 重置数量为1
      setShowVariantModal(true)
    } else {
      // 无规格的菜品，直接添加到购物车
      addToCart(item)
    }
  }

  // 处理规格选择
  const handleVariantSelect = (categoryId: string, optionId: string) => {
    const category = selectedMenuItem?.variants?.find(v => v.id === categoryId)
    if (!category) return

    const currentSelections = selectedVariants[categoryId] || []
    
    if (category.maxSelect === 1) {
      // 单选
      setSelectedVariants({
        ...selectedVariants,
        [categoryId]: [optionId]
      })
    } else {
      // 多选
      if (currentSelections.includes(optionId)) {
        // 取消选择
        const newSelections = currentSelections.filter(id => id !== optionId)
        if (newSelections.length === 0) {
          const { [categoryId]: removed, ...rest } = selectedVariants
          setSelectedVariants(rest)
        } else {
          setSelectedVariants({
            ...selectedVariants,
            [categoryId]: newSelections
          })
        }
      } else {
        // 添加选择
        if (currentSelections.length < category.maxSelect) {
          setSelectedVariants({
            ...selectedVariants,
            [categoryId]: [...currentSelections, optionId]
          })
        }
      }
    }
  }

  // 检查规格选择是否完整
  const isVariantSelectionComplete = () => {
    if (!selectedMenuItem?.variants) return false
    
    for (const category of selectedMenuItem.variants) {
      if (category.required) {
        const selections = selectedVariants[category.id] || []
        if (selections.length < category.minSelect) {
          return false
        }
      }
    }
    return true
  }

  // 确认规格选择，添加到购物车
  const confirmVariantSelection = () => {
    if (selectedMenuItem && isVariantSelectionComplete()) {
      addToCart(selectedMenuItem, selectedVariants, variantQuantity)
      setShowVariantModal(false)
      setSelectedMenuItem(null)
      setSelectedVariants({})
      setVariantQuantity(1)
    }
  }

  // 计算当前选择的单价
  const getCurrentVariantPrice = () => {
    if (!selectedMenuItem) return 0
    
    let price = selectedMenuItem.price
    if (selectedMenuItem.variants) {
      for (const categoryId in selectedVariants) {
        const category = selectedMenuItem.variants.find(v => v.id === categoryId)
        if (category) {
          const selections = selectedVariants[categoryId]
          for (const optionId of selections) {
            const option = category.options.find(o => o.id === optionId)
            if (option?.price) {
              price += option.price
            }
          }
        }
      }
    }
    return price
  }

  // 计算当前选择的总价
  const getCurrentVariantTotalPrice = () => {
    return getCurrentVariantPrice() * variantQuantity
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
  useEffect(() => {
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

  // 点击购物车显示弹框
  const handleCartClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!isDragging) {
      setShowCartModal(true)
    }
  }

  // 清空购物车
  const clearCart = () => {
    setCart([])
    setShowCartModal(false)
  }

  // 去下单 - 跳转到订单详情页
  const goToCheckout = () => {
    if (isDragging) return // 拖拽时不触发下单
    console.log('Go to checkout with cart:', cart)
    
    // 跳转到订单详情页，传递购物车数据
    navigate(`/order-details/${tableNumber}`, {
      state: {
        cart: cart,
        tableNumber: tableNumber
      }
    })
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
                        onError={(e) => {
                          // 图片加载失败时的备用图片
                          e.currentTarget.src = 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
                        }}
                      />
                      {item.isRecommended && (
                        <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                          推荐
                        </div>
                      )}
                      {item.hasVariants && (
                        <div className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded text-xs font-bold">
                          多规格
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
                          {quantity > 0 && !item.hasVariants && (
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
                            onClick={() => handleMenuItemAdd(item)}
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
            {/* 左侧购物车信息 - 深色背景，可点击 */}
            <div 
              className="bg-gray-800 text-white flex items-center pl-6 pr-4 gap-3 select-none cursor-pointer hover:bg-gray-700 transition-colors"
              onClick={handleCartClick}
              onMouseDown={(e) => e.stopPropagation()} // 防止点击时触发拖拽
            >
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

      {/* 购物车弹框 */}
      {showCartModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full mx-4 max-h-[80vh] flex flex-col shadow-2xl relative">
            {/* 右上角关闭按钮 */}
            <button
              onClick={() => setShowCartModal(false)}
              className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>

            {/* 弹框头部 */}
            <div className="flex items-center gap-3 p-6 border-b border-gray-200 pr-16">
              <ShoppingCart className="w-6 h-6 text-orange-500" />
              <h2 className="text-xl font-bold text-gray-800">购物车</h2>
              <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded-full text-sm font-medium">
                {getTotalQuantity()}件商品
              </span>
            </div>

            {/* 购物车商品列表 */}
            <div className="flex-1 overflow-y-auto p-6">
              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">购物车为空</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item, index) => (
                    <div key={`${item.id}_${index}`} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                      {/* 菜品图片 */}
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
                        }}
                      />
                      
                      {/* 菜品信息 */}
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 mb-1">{item.name}</h3>
                        {item.variantDescription && (
                          <p className="text-xs text-gray-500 mb-1">{item.variantDescription}</p>
                        )}
                        <p className="text-orange-600 font-bold">¥{item.finalPrice || item.price}</p>
                      </div>
                      
                      {/* 数量控制 */}
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => removeFromCart(item.id, item.selectedVariants)}
                          className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors border"
                        >
                          <Minus className="w-4 h-4 text-gray-600" />
                        </button>
                        <span className="w-8 text-center font-semibold text-gray-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => addToCart(item, item.selectedVariants)}
                          className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors"
                        >
                          <Plus className="w-4 h-4 text-white" />
                        </button>
                      </div>
                      
                      {/* 小计 */}
                      <div className="text-right w-20">
                        <p className="font-bold text-gray-800">¥{(item.finalPrice || item.price) * item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 底部操作区域 */}
            {cart.length > 0 && (
              <div className="border-t border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-semibold text-gray-800">合计:</span>
                  <span className="text-2xl font-bold text-orange-600">¥{getTotalPrice()}</span>
                </div>
                
                <div className="flex gap-3">
                  <button
                    onClick={clearCart}
                    className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                  >
                    清空购物车
                  </button>
                  <button
                    onClick={() => {
                      setShowCartModal(false)
                      goToCheckout()
                    }}
                    className="flex-1 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-bold hover:from-orange-600 hover:to-red-600 transition-all"
                  >
                    立即下单
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 规格选择弹框 */}
      {showVariantModal && selectedMenuItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl max-w-6xl w-full mx-4 max-h-[90vh] flex shadow-2xl relative">
            {/* 右上角关闭按钮 */}
            <button
              onClick={() => setShowVariantModal(false)}
              className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>

            {/* 左侧规格选择区域 */}
            <div className="flex-1 flex flex-col">
              {/* 弹框头部 */}
              <div className="p-6 border-b border-gray-200 pr-16">
                <h2 className="text-xl font-bold text-gray-800">套餐规格选择</h2>
              </div>

              {/* 规格选择区域 */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="space-y-6">
                  {selectedMenuItem.variants?.map((category) => (
                    <div key={category.id}>
                      <div className="flex items-center gap-2 mb-3">
                        <h3 className="text-lg font-semibold text-gray-800">{category.name}：</h3>
                        <span className="text-sm text-gray-500">
                          {category.required ? '必选' : '可选'}
                          {category.maxSelect === 1 ? '1样' : `最多${category.maxSelect}样`}
                          {category.minSelect > 0 && category.minSelect !== category.maxSelect && `，最少${category.minSelect}样`}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-4 gap-3">
                        {category.options.map((option) => {
                          const isSelected = selectedVariants[category.id]?.includes(option.id) || false
                          return (
                            <button
                              key={option.id}
                              onClick={() => handleVariantSelect(category.id, option.id)}
                              className={`relative p-3 rounded-lg border-2 text-left transition-all duration-200 ${
                                isSelected
                                  ? 'border-orange-500 bg-orange-50 text-orange-700'
                                  : 'border-gray-200 hover:border-gray-300 bg-white'
                              }`}
                            >
                              <div className="font-medium">{option.name}</div>
                              {option.price && option.price > 0 && (
                                <div className="text-sm text-orange-600 mt-1">+¥{option.price}</div>
                              )}
                              {/* 选中标记 */}
                              {isSelected && (
                                <div className="absolute top-1 right-1">
                                  <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center">
                                    <span className="text-white text-xs">✓</span>
                                  </div>
                                </div>
                              )}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 右侧菜品信息和确认区域 */}
            <div className="w-80 border-l border-gray-200 flex flex-col">
              {/* 菜品信息区域 - 可滚动 */}
              <div className="flex-1 overflow-y-auto p-6">
                <img 
                  src={selectedMenuItem.image} 
                  alt={selectedMenuItem.name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
                  }}
                />
                
                <h3 className="text-xl font-bold text-gray-800 mb-2">{selectedMenuItem.name}</h3>
                
                {/* 已选择的规格 */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-600 mb-2">已选择：</h4>
                  <div className="space-y-1">
                    {Object.keys(selectedVariants).length === 0 ? (
                      <p className="text-gray-400 text-sm">暂未选择</p>
                    ) : (
                      Object.entries(selectedVariants).map(([categoryId, optionIds]) => {
                        const category = selectedMenuItem.variants?.find(v => v.id === categoryId)
                        if (!category) return null
                        
                        return optionIds.map(optionId => {
                          const option = category.options.find(o => o.id === optionId)
                          if (!option) return null
                          
                          return (
                            <div key={`${categoryId}_${optionId}`} className="text-sm text-gray-700">
                              {option.name}
                              {option.price && option.price > 0 && (
                                <span className="text-orange-600 ml-1">+¥{option.price}</span>
                              )}
                            </div>
                          )
                        })
                      })
                    )}
                  </div>
                </div>

                {/* 数量选择 */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-600 mb-3">数量：</h4>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setVariantQuantity(Math.max(1, variantQuantity - 1))}
                      className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                    >
                      <Minus className="w-5 h-5 text-gray-600" />
                    </button>
                    <span className="w-12 text-center font-bold text-xl text-gray-800">
                      {variantQuantity}
                    </span>
                    <button
                      onClick={() => setVariantQuantity(variantQuantity + 1)}
                      className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors"
                    >
                      <Plus className="w-5 h-5 text-white" />
                    </button>
                  </div>
                </div>

                {/* 价格显示 */}
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">单价：</span>
                    <div className="text-right">
                      <div className="text-lg font-bold text-gray-800">¥{getCurrentVariantPrice()}</div>
                      {getCurrentVariantPrice() !== selectedMenuItem.price && (
                        <div className="text-xs text-gray-500">原价 ¥{selectedMenuItem.price}</div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-base font-semibold text-gray-800">总价：</span>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-orange-600">¥{getCurrentVariantTotalPrice()}</div>
                      <div className="text-xs text-gray-500">{variantQuantity} × ¥{getCurrentVariantPrice()}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 确认按钮 - 固定在底部 */}
              <div className="flex-shrink-0 p-6 border-t border-gray-200 bg-white">
                <button
                  onClick={confirmVariantSelection}
                  disabled={!isVariantSelectionComplete()}
                  className={`w-full py-3 rounded-lg font-bold text-lg transition-all ${
                    isVariantSelectionComplete()
                      ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  选好了
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default OrderingPage