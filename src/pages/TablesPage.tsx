import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Clock, Users, ArrowLeft, MapPin, X, Plus, Minus } from 'lucide-react'

interface TableStatus {
  id: string
  number: string
  status: 'available' | 'occupied' | 'dining'
  type: 'small' | 'large' | 'private'
  duration?: string
  customerCount?: number
}

interface RestaurantArea {
  id: string
  name: string
  tables: TableStatus[]
}

interface CartItem {
  id: string
  name: string
  price: number
  image: string
  category: string
  description?: string
  quantity: number
  selectedVariants?: { [categoryId: string]: string[] }
  variantDescription?: string
  finalPrice?: number
}

interface TablesPageState {
  filterMode?: 'dining' | 'all'
  title?: string
}

const TablesPage: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  
  // 获取从路由传递的状态
  const pageState = location.state as TablesPageState | null
  const filterMode = pageState?.filterMode || 'all'
  const pageTitle = pageState?.title || '桌台管理'
  
  const [selectedArea, setSelectedArea] = useState('floor2')
  const [selectedType, setSelectedType] = useState('small')
  
  // 开台弹框相关状态
  const [showOpenTableModal, setShowOpenTableModal] = useState(false)
  const [selectedTable, setSelectedTable] = useState<TableStatus | null>(null)
  const [customerCount, setCustomerCount] = useState(2) // 默认2人

  // 模拟订单数据 - 根据桌台号生成不同的订单
  const getMockOrderData = (tableNumber: string): CartItem[] => {
    const baseOrders: { [key: string]: CartItem[] } = {
      '002': [
        {
          id: 'item1',
          name: '酥皮肉夹馍',
          price: 128,
          finalPrice: 128,
          image: 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
          category: 'hot-sale',
          description: '买3赠2  2份起售',
          quantity: 2,
          variantDescription: ''
        },
        {
          id: 'item2',
          name: '黑椒牛排',
          price: 168,
          finalPrice: 168,
          image: 'https://images.pexels.com/photos/361184/asparagus-steak-veal-cutlet-veal-361184.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
          category: 'hot-sale',
          description: '精选澳洲牛肉',
          quantity: 1,
          selectedVariants: {
            'doneness': ['medium-rare'],
            'sauce': ['black-pepper']
          },
          variantDescription: '五分熟, 黑椒汁'
        },
        {
          id: 'drink1',
          name: '鲜榨橙汁',
          price: 28,
          finalPrice: 28,
          image: 'https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
          category: 'drinks',
          description: '现榨纯果汁  维C丰富',
          quantity: 2,
          variantDescription: ''
        }
      ],
      '005': [
        {
          id: 'set1',
          name: '商务套餐A',
          price: 128,
          finalPrice: 128,
          image: 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
          category: 'classic-set',
          description: '主菜+汤+米饭+小菜',
          quantity: 1,
          selectedVariants: {
            'salad': ['caesar'],
            'main-dish': ['beef-steak'],
            'staple': ['cream-pasta'],
            'soup': ['mushroom-soup'],
            'dessert': ['tiramisu']
          },
          variantDescription: '大明虾沙拉, 炭烤牛板腱, 奶油蘑菇意面, 奶油菌菇汤, 提拉米苏'
        },
        {
          id: 'item5',
          name: '蒜蓉小龙虾',
          price: 158,
          finalPrice: 188,
          image: 'https://images.pexels.com/photos/1410235/pexels-photo-1410235.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
          category: 'hot-sale',
          description: '夏日必备  麻辣鲜香',
          quantity: 1,
          selectedVariants: {
            'spice-level': ['medium'],
            'size': ['large']
          },
          variantDescription: '中辣, 大份'
        },
        {
          id: 'drink2',
          name: '柠檬蜂蜜茶',
          price: 32,
          finalPrice: 32,
          image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
          category: 'drinks',
          description: '酸甜清香  美容养颜',
          quantity: 2,
          variantDescription: ''
        }
      ],
      '007': [
        {
          id: 'boss1',
          name: '招牌红烧肉',
          price: 88,
          finalPrice: 88,
          image: 'https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
          category: 'boss-recommend',
          description: '老板亲自调味  招牌菜品',
          quantity: 1,
          variantDescription: ''
        },
        {
          id: 'hot1',
          name: '宫保鸡丁',
          price: 68,
          finalPrice: 68,
          image: 'https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
          category: 'hot-dish',
          description: '经典川菜  酸甜可口',
          quantity: 1,
          variantDescription: ''
        },
        {
          id: 'bbq1',
          name: '烤羊肉串',
          price: 6,
          finalPrice: 6,
          image: 'https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
          category: 'bbq',
          description: '新疆羊肉  香嫩多汁',
          quantity: 10,
          variantDescription: ''
        },
        {
          id: 'drink4',
          name: '精酿啤酒',
          price: 45,
          finalPrice: 45,
          image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
          category: 'drinks',
          description: '德式工艺  口感醇厚',
          quantity: 3,
          variantDescription: ''
        }
      ],
      '010': [
        {
          id: 'item6',
          name: '水煮鱼',
          price: 138,
          finalPrice: 138,
          image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
          category: 'hot-sale',
          description: '麻辣鲜香  嫩滑鱼肉',
          quantity: 1,
          variantDescription: ''
        },
        {
          id: 'item7',
          name: '招牌烤鸭',
          price: 188,
          finalPrice: 188,
          image: 'https://images.pexels.com/photos/1268549/pexels-photo-1268549.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
          category: 'hot-sale',
          description: '传统工艺  皮脆肉嫩',
          quantity: 1,
          variantDescription: ''
        },
        {
          id: 'item8',
          name: '麻婆豆腐',
          price: 68,
          finalPrice: 68,
          image: 'https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
          category: 'hot-sale',
          description: '经典川菜  下饭神器',
          quantity: 2,
          variantDescription: ''
        },
        {
          id: 'cold1',
          name: '口水鸡',
          price: 48,
          finalPrice: 48,
          image: 'https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
          category: 'cold-dish',
          description: '四川经典  麻辣鲜香',
          quantity: 1,
          variantDescription: ''
        },
        {
          id: 'drink3',
          name: '特制奶茶',
          price: 35,
          finalPrice: 35,
          image: 'https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
          category: 'drinks',
          description: '丝滑香浓  回味无穷',
          quantity: 3,
          variantDescription: ''
        }
      ],
      '013': [
        {
          id: 'set2',
          name: '家庭套餐',
          price: 288,
          finalPrice: 288,
          image: 'https://images.pexels.com/photos/361184/asparagus-steak-veal-cutlet-veal-361184.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
          category: 'classic-set',
          description: '3菜1汤  适合2-3人',
          quantity: 1,
          variantDescription: ''
        },
        {
          id: 'boss2',
          name: '蒜蓉粉丝扇贝',
          price: 128,
          finalPrice: 128,
          image: 'https://images.pexels.com/photos/725997/pexels-photo-725997.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
          category: 'boss-recommend',
          description: '新鲜扇贝  蒜香浓郁',
          quantity: 2,
          variantDescription: ''
        },
        {
          id: 'hot3',
          name: '红烧排骨',
          price: 88,
          finalPrice: 88,
          image: 'https://images.pexels.com/photos/725997/pexels-photo-725997.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
          category: 'hot-dish',
          description: '软糯香甜  老少皆宜',
          quantity: 1,
          variantDescription: ''
        },
        {
          id: 'bbq2',
          name: '烤鸡翅',
          price: 15,
          finalPrice: 15,
          image: 'https://images.pexels.com/photos/725997/pexels-photo-725997.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
          category: 'bbq',
          description: '秘制腌料  外焦里嫩',
          quantity: 6,
          variantDescription: ''
        }
      ],
      '017': [
        {
          id: 'boss3',
          name: '秘制烤鸭',
          price: 188,
          finalPrice: 188,
          image: 'https://images.pexels.com/photos/1268549/pexels-photo-1268549.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
          category: 'boss-recommend',
          description: '北京烤鸭工艺  皮脆肉嫩',
          quantity: 1,
          variantDescription: ''
        },
        {
          id: 'item3',
          name: '意式奶油面',
          price: 98,
          finalPrice: 98,
          image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
          category: 'hot-sale',
          description: '正宗意式做法',
          quantity: 2,
          variantDescription: ''
        },
        {
          id: 'fragrant1',
          name: '香菜牛肉丸',
          price: 58,
          finalPrice: 58,
          image: 'https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
          category: 'fragrant-dish',
          description: '香菜提味  牛肉Q弹',
          quantity: 1,
          variantDescription: ''
        },
        {
          id: 'cold2',
          name: '蒜泥白肉',
          price: 58,
          finalPrice: 58,
          image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
          category: 'cold-dish',
          description: '肥瘦相间  蒜香浓郁',
          quantity: 1,
          variantDescription: ''
        },
        {
          id: 'bbq3',
          name: '烤玉米',
          price: 12,
          finalPrice: 12,
          image: 'https://images.pexels.com/photos/1268549/pexels-photo-1268549.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
          category: 'bbq',
          description: '香甜玉米  刷特制酱',
          quantity: 4,
          variantDescription: ''
        },
        {
          id: 'set3',
          name: '情侣套餐',
          price: 188,
          finalPrice: 188,
          image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
          category: 'classic-set',
          description: '浪漫双人餐  含红酒',
          quantity: 1,
          variantDescription: ''
        }
      ],
      '020': [
        {
          id: 'item9',
          name: '糖醋排骨',
          price: 98,
          finalPrice: 98,
          image: 'https://images.pexels.com/photos/725997/pexels-photo-725997.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
          category: 'hot-sale',
          description: '酸甜开胃  老少皆宜',
          quantity: 1,
          variantDescription: ''
        },
        {
          id: 'item10',
          name: '蒜蓉扇贝',
          price: 128,
          finalPrice: 128,
          image: 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
          category: 'hot-sale',
          description: '新鲜扇贝  蒜香浓郁',
          quantity: 2,
          variantDescription: ''
        },
        {
          id: 'hot2',
          name: '麻婆豆腐',
          price: 45,
          finalPrice: 45,
          image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
          category: 'hot-dish',
          description: '嫩滑豆腐  麻辣鲜香',
          quantity: 1,
          variantDescription: ''
        },
        {
          id: 'fragrant2',
          name: '香菜炒鸡蛋',
          price: 38,
          finalPrice: 38,
          image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
          category: 'fragrant-dish',
          description: '香菜浓郁  鸡蛋嫩滑',
          quantity: 1,
          variantDescription: ''
        },
        {
          id: 'cold3',
          name: '凉拌黄瓜',
          price: 28,
          finalPrice: 28,
          image: 'https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
          category: 'cold-dish',
          description: '清爽开胃  解腻必备',
          quantity: 2,
          variantDescription: ''
        },
        {
          id: 'bbq4',
          name: '烤茄子',
          price: 18,
          finalPrice: 18,
          image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
          category: 'bbq',
          description: '蒜蓉茄子  香气扑鼻',
          quantity: 3,
          variantDescription: ''
        }
      ]
    }

    // 如果没有预设的订单数据，返回默认订单
    return baseOrders[tableNumber] || [
      {
        id: 'default1',
        name: '招牌红烧肉',
        price: 88,
        finalPrice: 88,
        image: 'https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
        category: 'boss-recommend',
        description: '老板亲自调味  招牌菜品',
        quantity: 1,
        variantDescription: ''
      },
      {
        id: 'default2',
        name: '鲜榨橙汁',
        price: 28,
        finalPrice: 28,
        image: 'https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
        category: 'drinks',
        description: '现榨纯果汁  维C丰富',
        quantity: 2,
        variantDescription: ''
      }
    ]
  }

  // 模拟更多餐厅区域和桌台数据
  const restaurantAreas: RestaurantArea[] = [
    {
      id: 'floor2',
      name: '二楼',
      tables: [
        {
          id: 't001',
          number: '001',
          status: 'available',
          type: 'small',
        },
        {
          id: 't002',
          number: '002',
          status: 'dining',
          type: 'small',
          duration: '2小时15分',
          customerCount: 4
        },
        {
          id: 't003',
          number: '003',
          status: 'occupied',
          type: 'small',
          customerCount: 2
        },
        {
          id: 't004',
          number: '004',
          status: 'available',
          type: 'small',
        },
        {
          id: 't005',
          number: '005',
          status: 'dining',
          type: 'small',
          duration: '1小时30分',
          customerCount: 3
        },
        {
          id: 't006',
          number: '006',
          status: 'available',
          type: 'small',
        },
        {
          id: 't007',
          number: '007',
          status: 'dining',
          type: 'small',
          duration: '45分钟',
          customerCount: 2
        },
        {
          id: 't008',
          number: '008',
          status: 'occupied',
          type: 'small',
          customerCount: 4
        },
        {
          id: 't009',
          number: '009',
          status: 'available',
          type: 'small',
        },
        {
          id: 't010',
          number: '010',
          status: 'dining',
          type: 'small',
          duration: '3小时05分',
          customerCount: 6
        },
        {
          id: 't011',
          number: '011',
          status: 'available',
          type: 'small',
        },
        {
          id: 't012',
          number: '012',
          status: 'occupied',
          type: 'small',
          customerCount: 3
        },
        {
          id: 't013',
          number: '013',
          status: 'dining',
          type: 'large',
          duration: '1小时20分',
          customerCount: 8
        },
        {
          id: 't014',
          number: '014',
          status: 'available',
          type: 'large',
        },
        {
          id: 't015',
          number: '015',
          status: 'occupied',
          type: 'large',
          customerCount: 6
        },
        {
          id: 't016',
          number: '016',
          status: 'available',
          type: 'private',
        },
        {
          id: 't017',
          number: '017',
          status: 'dining',
          type: 'private',
          duration: '2小时40分',
          customerCount: 10
        },
        {
          id: 't018',
          number: '018',
          status: 'occupied',
          type: 'private',
          customerCount: 8
        },
        {
          id: 't019',
          number: '019',
          status: 'available',
          type: 'private',
        },
        {
          id: 't020',
          number: '020',
          status: 'dining',
          type: 'private',
          duration: '1小时55分',
          customerCount: 12
        }
      ]
    },
    {
      id: 'hall',
      name: '大堂',
      tables: [
        {
          id: 't101',
          number: '101',
          status: 'dining',
          type: 'small',
          duration: '30分钟',
          customerCount: 2
        },
        {
          id: 't102',
          number: '102',
          status: 'available',
          type: 'small',
        },
        {
          id: 't103',
          number: '103',
          status: 'occupied',
          type: 'small',
          customerCount: 4
        },
        {
          id: 't104',
          number: '104',
          status: 'dining',
          type: 'small',
          duration: '1小时10分',
          customerCount: 3
        },
        {
          id: 't105',
          number: '105',
          status: 'available',
          type: 'small',
        },
        {
          id: 't106',
          number: '106',
          status: 'occupied',
          type: 'small',
          customerCount: 2
        },
        {
          id: 't107',
          number: '107',
          status: 'dining',
          type: 'large',
          duration: '2小时25分',
          customerCount: 8
        },
        {
          id: 't108',
          number: '108',
          status: 'available',
          type: 'large',
        },
        {
          id: 't109',
          number: '109',
          status: 'occupied',
          type: 'large',
          customerCount: 6
        },
        {
          id: 't110',
          number: '110',
          status: 'available',
          type: 'private',
        },
        {
          id: 't111',
          number: '111',
          status: 'dining',
          type: 'private',
          duration: '1小时45分',
          customerCount: 8
        },
        {
          id: 't112',
          number: '112',
          status: 'occupied',
          type: 'private',
          customerCount: 10
        }
      ]
    },
    {
      id: 'floor3',
      name: '三楼',
      tables: [
        {
          id: 't201',
          number: '201',
          status: 'available',
          type: 'small',
        },
        {
          id: 't202',
          number: '202',
          status: 'dining',
          type: 'small',
          duration: '25分钟',
          customerCount: 2
        },
        {
          id: 't203',
          number: '203',
          status: 'available',
          type: 'small',
        },
        {
          id: 't204',
          number: '204',
          status: 'occupied',
          type: 'small',
          customerCount: 3
        },
        {
          id: 't205',
          number: '205',
          status: 'dining',
          type: 'large',
          duration: '3小时15分',
          customerCount: 10
        },
        {
          id: 't206',
          number: '206',
          status: 'available',
          type: 'large',
        },
        {
          id: 't207',
          number: '207',
          status: 'occupied',
          type: 'large',
          customerCount: 8
        },
        {
          id: 't208',
          number: '208',
          status: 'available',
          type: 'private',
        },
        {
          id: 't209',
          number: '209',
          status: 'dining',
          type: 'private',
          duration: '1小时35分',
          customerCount: 12
        },
        {
          id: 't210',
          number: '210',
          status: 'occupied',
          type: 'private',
          customerCount: 6
        }
      ]
    }
  ]

  // 桌台类型统计 - 根据过滤模式调整
  const getTableTypeCount = (type: string) => {
    const currentArea = restaurantAreas.find(area => area.id === selectedArea)
    if (!currentArea) return 0
    
    let tables = currentArea.tables.filter(table => table.type === type)
    
    // 如果是收银模式，只统计就餐中的桌台
    if (filterMode === 'dining') {
      tables = tables.filter(table => table.status === 'dining')
    }
    
    return tables.length
  }

  const tableTypes = [
    { 
      id: 'small', 
      name: '小桌', 
      count: getTableTypeCount('small')
    },
    { 
      id: 'large', 
      name: '大桌', 
      count: getTableTypeCount('large')
    },
    { 
      id: 'private', 
      name: '包间', 
      count: getTableTypeCount('private')
    }
  ]

  // 获取状态对应的颜色和文字
  const getStatusConfig = (status: TableStatus['status']) => {
    switch (status) {
      case 'available':
        return {
          bgColor: 'bg-purple-500',
          statusText: '未开台'
        }
      case 'occupied':
        return {
          bgColor: 'bg-red-500',
          statusText: '维修中'
        }
      case 'dining':
        return {
          bgColor: 'bg-green-500',
          statusText: '就餐中'
        }
      default:
        return {
          bgColor: 'bg-gray-500',
          statusText: '未知'
        }
    }
  }

  // 过滤桌台 - 添加收银模式过滤
  const getFilteredTables = () => {
    const currentArea = restaurantAreas.find(area => area.id === selectedArea)
    if (!currentArea) return []
    
    let tables = currentArea.tables.filter(table => table.type === selectedType)
    
    // 如果是收银模式，只显示就餐中的桌台
    if (filterMode === 'dining') {
      tables = tables.filter(table => table.status === 'dining')
    }
    
    return tables
  }

  const handleTableClick = (table: TableStatus) => {
    console.log('Selected table:', table)
    
    // 收银模式下，维修中的桌台不可点击
    if (table.status === 'occupied') {
      return
    }
    
    if (filterMode === 'dining') {
      // 收银模式下，直接跳转到订单详情页面
      const mockCart = getMockOrderData(table.number)
      navigate(`/order-details/${table.number}`, {
        state: {
          cart: mockCart,
          tableNumber: table.number
        }
      })
    } else {
      // 普通桌台管理模式
      if (table.status === 'available') {
        // 如果是未开台状态，显示开台弹框
        setSelectedTable(table)
        setCustomerCount(2) // 重置为默认人数
        setShowOpenTableModal(true)
      } else if (table.status === 'dining') {
        // 如果是就餐中状态，跳转到订单详情页面，传递模拟订单数据
        const mockCart = getMockOrderData(table.number)
        navigate(`/order-details/${table.number}`, {
          state: {
            cart: mockCart,
            tableNumber: table.number
          }
        })
      }
    }
  }

  // 确认开台
  const confirmOpenTable = () => {
    if (selectedTable) {
      console.log('Opening table:', selectedTable.number, 'for', customerCount, 'customers')
      // 跳转到点餐页面
      navigate(`/ordering/${selectedTable.number}`)
      // 关闭弹框
      setShowOpenTableModal(false)
      setSelectedTable(null)
    }
  }

  // 取消开台
  const cancelOpenTable = () => {
    setShowOpenTableModal(false)
    setSelectedTable(null)
    setCustomerCount(2)
  }

  const goBack = () => {
    navigate(-1)
  }

  return (
    <div className="h-full w-full bg-gray-100 flex">
      {/* 左侧区域选择 */}
      <div className="w-48 bg-gradient-to-b from-gray-800 to-gray-900 flex flex-col shadow-2xl">
        {/* 头部标题 */}
        <div className="p-4 border-b border-gray-700">
          <h2 className="text-white text-lg font-bold flex items-center gap-2">
            <MapPin className="w-5 h-5 text-orange-400" />
            {filterMode === 'dining' ? '收银桌台' : '餐厅区域'}
          </h2>
          {filterMode === 'dining' && (
            <p className="text-gray-400 text-sm mt-1">仅显示就餐中桌台</p>
          )}
        </div>

        {/* 区域列表 */}
        <div className="flex-1 p-3 space-y-2">
          {restaurantAreas.map((area, index) => {
            // 计算该区域中符合条件的桌台数量
            const areaTableCount = filterMode === 'dining' 
              ? area.tables.filter(table => table.status === 'dining').length
              : area.tables.length
              
            return (
              <button
                key={area.id}
                onClick={() => setSelectedArea(area.id)}
                className={`group relative w-full text-left p-3 rounded-lg transition-all duration-300 ${
                  selectedArea === area.id
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                    : 'bg-gray-700/50 text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-base font-semibold block">{area.name}</span>
                    <span className={`text-xs ${
                      selectedArea === area.id ? 'text-white/80' : 'text-gray-400'
                    }`}>
                      {filterMode === 'dining' ? `${areaTableCount} 个就餐中` : `${areaTableCount} 个桌台`}
                    </span>
                  </div>
                  
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    selectedArea === area.id
                      ? 'bg-white/20 text-white'
                      : 'bg-orange-500 text-white'
                  }`}>
                    {areaTableCount}
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* 右侧内容区域 */}
      <div className="flex-1 flex flex-col">
        {/* 顶部标题和桌台类型筛选 */}
        <div className="bg-white p-4 border-b border-gray-200 shadow-sm">
          {/* 页面标题 */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <button 
                onClick={goBack}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>返回</span>
              </button>
              <div className="h-6 w-px bg-gray-300" />
              <h1 className="text-xl font-bold text-gray-800">{pageTitle}</h1>
            </div>
            
            {filterMode === 'dining' && (
              <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                收银模式
              </div>
            )}
          </div>
          
          {/* 桌台类型筛选 */}
          <div className="flex gap-3">
            {tableTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                  selectedType === type.id
                    ? 'bg-gradient-to-r from-red-400 to-red-500 text-white shadow-lg'
                    : 'bg-gray-400 text-white hover:bg-gray-500'
                }`}
              >
                {type.name}({type.count})
              </button>
            ))}
          </div>
        </div>

        {/* 桌台网格 */}
        <div className="flex-1 p-4 bg-gray-50 overflow-y-auto">
          {getFilteredTables().length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-gray-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-600 mb-2">
                  {filterMode === 'dining' ? '暂无就餐中的桌台' : '暂无桌台'}
                </h3>
                <p className="text-gray-500">
                  {filterMode === 'dining' 
                    ? '当前区域没有正在就餐的桌台' 
                    : '当前区域暂时没有这种类型的桌台'
                  }
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-6 gap-3">
              {getFilteredTables().map((table, index) => {
                const config = getStatusConfig(table.status)
                const isDisabled = table.status === 'occupied' // 维修中的桌台不可点击
                
                return (
                  <div 
                    key={table.id} 
                    className="w-full animate-slide-up"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <button
                      onClick={() => handleTableClick(table)}
                      disabled={isDisabled}
                      className={`group w-full h-40 bg-white rounded-lg shadow-md transition-all duration-300 overflow-hidden flex flex-col ${
                        isDisabled 
                          ? 'cursor-not-allowed opacity-75' 
                          : 'hover:shadow-xl cursor-pointer transform hover:scale-105'
                      }`}
                    >
                      {/* 桌台号码头部 */}
                      <div className={`${config.bgColor} text-white p-2 text-center relative flex-shrink-0`}>
                        <div className="text-xl font-bold">{table.number}</div>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                      </div>
                      
                      {/* 状态信息区域 */}
                      <div className="flex-1 p-2 bg-gradient-to-b from-gray-50 to-white flex flex-col justify-center">
                        {/* 状态标题 */}
                        <div className="text-center mb-2 flex-shrink-0">
                          <span className="text-gray-700 font-medium text-sm">{config.statusText}</span>
                          {filterMode === 'dining' && table.status === 'dining' && (
                            <div className="text-xs text-green-600 mt-1">点击收银结算</div>
                          )}
                          {filterMode !== 'dining' && (
                            <>
                              {table.status === 'available' && (
                                <div className="text-xs text-orange-600 mt-1">点击开台</div>
                              )}
                              {table.status === 'dining' && (
                                <div className="text-xs text-green-600 mt-1">点击查看订单</div>
                              )}
                              {table.status === 'occupied' && (
                                <div className="text-xs text-red-600 mt-1">暂时停用</div>
                              )}
                            </>
                          )}
                        </div>
                        
                        {/* 详细信息区域 */}
                        <div className="flex-1 flex flex-col justify-center items-center space-y-1">
                          {/* 时长信息 */}
                          <div className="h-4 flex items-center justify-center">
                            {table.duration ? (
                              <div className="text-xs text-gray-600 flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {table.duration}
                              </div>
                            ) : (
                              <div className="h-3"></div>
                            )}
                          </div>
                          
                          {/* 人数信息 */}
                          <div className="h-4 flex items-center justify-center">
                            {table.customerCount && table.status !== 'occupied' ? (
                              <div className="text-xs text-gray-600 flex items-center gap-1">
                                <Users className="w-3 h-3" />
                                <span>{table.customerCount}人</span>
                              </div>
                            ) : (
                              <div className="h-3"></div>
                            )}
                          </div>
                        </div>
                      </div>
                    </button>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* 底部状态说明 */}
        <div className="bg-white p-3 border-t border-gray-200 shadow-lg">
          <div className="flex items-center gap-6">
            <span className="text-gray-700 font-medium text-sm">状态：</span>
            {filterMode === 'dining' ? (
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-green-500 rounded shadow-sm" />
                <span className="text-gray-600 text-sm">就餐中(点击收银结算)</span>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-purple-500 rounded shadow-sm" />
                  <span className="text-gray-600 text-sm">未开台(点击开台)</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-red-500 rounded shadow-sm" />
                  <span className="text-gray-600 text-sm">维修中(暂时停用)</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-green-500 rounded shadow-sm" />
                  <span className="text-gray-600 text-sm">就餐中(点击查看订单)</span>
                </div>
              </>
            )}
            <button className="ml-auto px-4 py-2 bg-gradient-to-r from-orange-400 to-red-400 text-white rounded-full font-medium hover:from-orange-500 hover:to-red-500 transition-all duration-300 transform hover:scale-105 shadow-lg text-sm">
              刷新
            </button>
          </div>
        </div>
      </div>

      {/* 开台弹框 - 只在非收银模式下显示 */}
      {showOpenTableModal && selectedTable && filterMode !== 'dining' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full mx-4 shadow-2xl relative">
            {/* 右上角关闭按钮 */}
            <button
              onClick={cancelOpenTable}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>

            {/* 弹框内容 */}
            <div className="pr-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">开台确认</h3>
              
              {/* 桌台信息 */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">
                    {selectedTable.number}号桌
                  </div>
                  <div className="text-sm text-gray-600">
                    {selectedTable.type === 'small' && '小桌(2-4人)'}
                    {selectedTable.type === 'large' && '大桌(6-8人)'}
                    {selectedTable.type === 'private' && '包间(8-12人)'}
                  </div>
                </div>
              </div>
              
              {/* 人数选择 */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-3">用餐人数：</h4>
                <div className="flex items-center justify-center gap-4">
                  <button
                    onClick={() => setCustomerCount(Math.max(1, customerCount - 1))}
                    className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                  >
                    <Minus className="w-5 h-5 text-gray-600" />
                  </button>
                  <div className="w-20 text-center">
                    <span className="text-3xl font-bold text-gray-800">
                      {customerCount}
                    </span>
                    <div className="text-sm text-gray-500">人</div>
                  </div>
                  <button
                    onClick={() => setCustomerCount(customerCount + 1)}
                    className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors"
                  >
                    <Plus className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>
              
              {/* 操作按钮 */}
              <div className="flex gap-3">
                <button
                  onClick={cancelOpenTable}
                  className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                >
                  取消
                </button>
                <button
                  onClick={confirmOpenTable}
                  className="flex-1 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-bold hover:from-orange-600 hover:to-red-600 transition-all"
                >
                  确认开台
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TablesPage