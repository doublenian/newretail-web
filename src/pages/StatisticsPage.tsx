import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, TrendingUp, ShoppingBag, RotateCcw, Package, Calendar, DollarSign, CreditCard, Smartphone } from 'lucide-react'

interface StatCard {
  id: string
  title: string
  value: string
  unit: string
  icon: React.ReactNode
  color: string
}

interface PaymentMethod {
  id: string
  name: string
  amount: number
  refundAmount: number
  icon: React.ReactNode
  color: string
}

interface DishRanking {
  rank: number
  name: string
  quantity: number
  amount: number
}

interface TimePeriod {
  id: string
  name: string
  active: boolean
}

const StatisticsPage: React.FC = () => {
  const navigate = useNavigate()
  const [selectedPeriod, setSelectedPeriod] = useState('today')
  const [selectedRankingPeriod, setSelectedRankingPeriod] = useState('today')

  // 统计卡片数据
  const statCards: StatCard[] = [
    {
      id: 'revenue',
      title: '营业额',
      value: '415.31',
      unit: '元',
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 'orders',
      title: '订单总量',
      value: '9',
      unit: '单',
      icon: <ShoppingBag className="w-6 h-6" />,
      color: 'from-blue-500 to-purple-500'
    },
    {
      id: 'refunds',
      title: '退单额',
      value: '0',
      unit: '元',
      icon: <RotateCcw className="w-6 h-6" />,
      color: 'from-green-500 to-teal-500'
    },
    {
      id: 'dishes',
      title: '菜品数',
      value: '10',
      unit: '个',
      icon: <Package className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-500'
    }
  ]

  // 时间周期选项
  const timePeriods: TimePeriod[] = [
    { id: 'today', name: '今日', active: true },
    { id: 'yesterday', name: '昨日', active: false },
    { id: '7days', name: '7日内', active: false },
    { id: 'custom', name: '自定义', active: false }
  ]

  // 支付方式数据
  const paymentMethods: PaymentMethod[] = [
    {
      id: 'cash',
      name: '现金',
      amount: 285.00,
      refundAmount: 0,
      icon: <DollarSign className="w-5 h-5" />,
      color: 'bg-green-500'
    },
    {
      id: 'alipay',
      name: '支付宝',
      amount: 0,
      refundAmount: 0,
      icon: <CreditCard className="w-5 h-5" />,
      color: 'bg-blue-500'
    },
    {
      id: 'wechat',
      name: '微信',
      amount: 0,
      refundAmount: 0,
      icon: <Smartphone className="w-5 h-5" />,
      color: 'bg-green-600'
    },
    {
      id: 'other',
      name: '其他',
      amount: 80.00,
      refundAmount: 0,
      icon: <CreditCard className="w-5 h-5" />,
      color: 'bg-purple-500'
    },
    {
      id: 'balance',
      name: '余额',
      amount: 50.31,
      refundAmount: 0,
      icon: <DollarSign className="w-5 h-5" />,
      color: 'bg-indigo-500'
    },
    {
      id: 'douyin',
      name: '抖音',
      amount: 0,
      refundAmount: 0,
      icon: <Smartphone className="w-5 h-5" />,
      color: 'bg-red-500'
    }
  ]

  // 菜品排行榜数据
  const dishRankings: DishRanking[] = [
    { rank: 1, name: '双层芝士厚牛肉汉堡', quantity: 12, amount: 480.00 },
    { rank: 2, name: '火鸡面', quantity: 8, amount: 91.00 },
    { rank: 3, name: '纯牛奶', quantity: 5, amount: 57.00 },
    { rank: 4, name: '法式小蛋糕', quantity: 1, amount: 2.50 },
    { rank: 5, name: '火鸡面', quantity: 1, amount: 2.80 },
    { rank: 6, name: '招牌红烧肉', quantity: 3, amount: 264.00 },
    { rank: 7, name: '黑椒牛排', quantity: 2, amount: 336.00 },
    { rank: 8, name: '意式奶油面', quantity: 4, amount: 392.00 },
    { rank: 9, name: '蒜蓉小龙虾', quantity: 2, amount: 316.00 },
    { rank: 10, name: '水煮鱼', quantity: 1, amount: 138.00 }
  ]

  // 获取排名徽章样式
  const getRankBadgeStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-white'
      case 2:
        return 'bg-gradient-to-r from-gray-400 to-gray-500 text-white'
      case 3:
        return 'bg-gradient-to-r from-orange-400 to-orange-500 text-white'
      default:
        return 'bg-gray-200 text-gray-600'
    }
  }

  const goBack = () => {
    navigate(-1)
  }

  return (
    <div className="h-full w-full bg-gray-50 flex flex-col">
      {/* 顶部导航栏 */}
      <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={goBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>返回</span>
          </button>
          
          <div className="h-6 w-px bg-gray-300" />
          
          <h1 className="text-xl font-bold text-gray-800">数据统计</h1>
          
          <div className="ml-auto flex items-center gap-4">
            <span className="text-sm text-gray-500">实时更新</span>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* 主要内容区域 */}
      <div className="flex-1 p-6 overflow-y-auto">
        {/* 顶部统计卡片 */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          {statCards.map((card, index) => (
            <div
              key={card.id}
              className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all duration-300 relative overflow-hidden animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* 背景装饰 */}
              <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${card.color} opacity-10 rounded-full transform translate-x-6 -translate-y-6`} />
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${card.color} flex items-center justify-center text-white shadow-lg`}>
                    {card.icon}
                  </div>
                  <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-white" />
                  </div>
                </div>
                
                <div className="space-y-1">
                  <h3 className="text-gray-600 text-sm font-medium">{card.title}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-gray-800">{card.value}</span>
                    <span className="text-gray-500 text-sm">{card.unit}</span>
                  </div>
                </div>

                {/* 额外信息 */}
                <div className="mt-4 text-xs text-gray-500">
                  {card.id === 'revenue' && (
                    <div className="space-y-1">
                      <div>已优惠金额 1.00元</div>
                      <div>三方劳务金额 0元</div>
                    </div>
                  )}
                  {card.id === 'orders' && (
                    <div className="space-y-1">
                      <div>收银台订单量：7单</div>
                      <div>外卖订单数量：2单</div>
                      <div>桌台订单总量：0单</div>
                      <div>快餐订单数量：0单</div>
                    </div>
                  )}
                  {card.id === 'refunds' && (
                    <div>退单数量：0单</div>
                  )}
                  {card.id === 'dishes' && (
                    <div>菜品新增：0个</div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 下半部分：统计概况和菜品排行 */}
        <div className="grid grid-cols-3 gap-6">
          {/* 左侧统计概况 */}
          <div className="col-span-2 bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-6 bg-orange-500 rounded-full"></div>
              <h2 className="text-lg font-bold text-gray-800">统计概况</h2>
            </div>

            {/* 时间周期选择 */}
            <div className="flex gap-2 mb-6">
              {timePeriods.map((period) => (
                <button
                  key={period.id}
                  onClick={() => setSelectedPeriod(period.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    selectedPeriod === period.id
                      ? 'bg-green-500 text-white shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {period.name}
                </button>
              ))}
            </div>

            {/* 总收入显示 */}
            <div className="bg-blue-50 rounded-lg p-6 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-sm text-gray-600 mb-1">总收入</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-blue-600">415.31</span>
                    <span className="text-gray-500 text-sm">元</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 支付方式详情 */}
            <div className="grid grid-cols-3 gap-4">
              {paymentMethods.map((method, index) => (
                <div
                  key={method.id}
                  className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors animate-slide-up"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-8 h-8 ${method.color} rounded-lg flex items-center justify-center text-white`}>
                      {method.icon}
                    </div>
                    <span className="font-medium text-gray-800">{method.name}</span>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">金额：</span>
                      <span className="font-semibold text-gray-800">{method.amount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">退款金额：</span>
                      <span className="text-red-500">{method.refundAmount}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 右侧菜品排行榜 */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-6 bg-orange-500 rounded-full"></div>
              <h2 className="text-lg font-bold text-gray-800">菜品排行榜TOP 10</h2>
            </div>

            {/* 排行榜时间选择 */}
            <div className="flex gap-1 mb-6">
              {['today', 'yesterday', 'week', 'month'].map((period, index) => {
                const labels = ['今', '昨', '近30天', '本月']
                return (
                  <button
                    key={period}
                    onClick={() => setSelectedRankingPeriod(period)}
                    className={`px-3 py-1 rounded text-sm font-medium transition-all duration-200 ${
                      selectedRankingPeriod === period
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {labels[index]}
                  </button>
                )
              })}
            </div>

            {/* 表头 */}
            <div className="grid grid-cols-12 gap-2 text-xs font-medium text-gray-500 border-b border-gray-200 pb-3 mb-4">
              <div className="col-span-2">排名</div>
              <div className="col-span-5">商品名称</div>
              <div className="col-span-2 text-center">销量</div>
              <div className="col-span-3 text-right">销售额</div>
            </div>

            {/* 排行榜列表 */}
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {dishRankings.map((dish, index) => (
                <div
                  key={`${dish.rank}-${dish.name}-${index}`}
                  className="grid grid-cols-12 gap-2 items-center py-3 hover:bg-gray-50 rounded-lg transition-colors animate-slide-up"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="col-span-2">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${getRankBadgeStyle(dish.rank)}`}>
                      {dish.rank}
                    </div>
                  </div>
                  <div className="col-span-5">
                    <span className="text-sm font-medium text-gray-800 line-clamp-2">
                      {dish.name}
                    </span>
                  </div>
                  <div className="col-span-2 text-center">
                    <span className="text-sm text-gray-600">{dish.quantity}</span>
                  </div>
                  <div className="col-span-3 text-right">
                    <span className="text-sm font-semibold text-gray-800">
                      {dish.amount.toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StatisticsPage