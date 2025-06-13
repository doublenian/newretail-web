import React, { useState } from 'react'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import { ArrowLeft, Plus, Clock, Users, Receipt, Edit3 } from 'lucide-react'

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

interface OrderDetailsPageState {
  cart: CartItem[]
  tableNumber: string
}

const OrderDetailsPage: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { tableNumber } = useParams()
  
  // 从导航状态中获取购物车数据
  const orderData = location.state as OrderDetailsPageState | null
  const [cart, setCart] = useState<CartItem[]>(orderData?.cart || [])
  const [customerCount, setCustomerCount] = useState(2) // 默认2人
  const [showCustomerModal, setShowCustomerModal] = useState(false)
  
  // 生成账单号（时间戳 + 随机数）
  const billNumber = React.useMemo(() => {
    const date = new Date()
    const timeStr = date.getFullYear().toString().slice(2) + 
                   (date.getMonth() + 1).toString().padStart(2, '0') + 
                   date.getDate().toString().padStart(2, '0') + 
                   date.getHours().toString().padStart(2, '0') + 
                   date.getMinutes().toString().padStart(2, '0')
    const randomStr = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
    return `XL${timeStr}${randomStr}`
  }, [])

  // 计算总价
  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + ((item.finalPrice || item.price) * item.quantity), 0)
  }

  // 计算总数量
  const getTotalQuantity = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  // 返回点餐页面继续添加
  const goBackToOrdering = () => {
    navigate(`/ordering/${tableNumber}`, {
      state: { existingCart: cart }
    })
  }

  // 返回桌台页面
  const goBackToTables = () => {
    navigate('/tables')
  }

  // 提交订单
  const submitOrder = () => {
    // 这里可以添加提交订单的逻辑
    console.log('Submitting order:', {
      billNumber,
      tableNumber,
      customerCount,
      cart,
      totalPrice: getTotalPrice(),
      totalQuantity: getTotalQuantity()
    })
    
    // 模拟提交成功，可以跳转到成功页面或返回桌台页面
    alert(`订单提交成功！\n账单号：${billNumber}\n桌台：${tableNumber}\n总金额：¥${getTotalPrice()}`)
    navigate('/tables')
  }

  // 如果没有购物车数据，显示空状态
  if (!cart || cart.length === 0) {
    return (
      <div className="h-full w-full bg-gray-50 flex flex-col items-center justify-center">
        <div className="text-center">
          <Receipt className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-600 mb-2">暂无订单信息</h2>
          <p className="text-gray-500 mb-6">请先选择菜品后再来查看订单详情</p>
          <button
            onClick={() => navigate(`/ordering/${tableNumber}`)}
            className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-medium hover:from-orange-600 hover:to-red-600 transition-all"
          >
            去点餐
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full w-full bg-gray-50 flex flex-col relative">
      {/* 顶部导航栏 */}
      <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={goBackToTables}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>返回桌台</span>
            </button>
            
            <div className="h-6 w-px bg-gray-300" />
            
            <h1 className="text-xl font-bold text-gray-800">订单详情</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">武汉光谷禧朗酒店</span>
            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">餐</span>
            </div>
          </div>
        </div>
      </div>

      {/* 主要内容区域 */}
      <div className="flex-1 flex">
        {/* 左侧订单信息 */}
        <div className="flex-1 p-6">
          {/* 订单基本信息卡片 */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">订单信息</h2>
            
            <div className="grid grid-cols-2 gap-6">
              {/* 桌台信息 */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Receipt className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">桌台号</p>
                  <p className="text-xl font-bold text-gray-800">{tableNumber}</p>
                </div>
              </div>

              {/* 人数信息 */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500">用餐人数</p>
                  <div className="flex items-center gap-2">
                    <p className="text-xl font-bold text-gray-800">{customerCount}人</p>
                    <button
                      onClick={() => setShowCustomerModal(true)}
                      className="text-orange-500 hover:text-orange-600 transition-colors"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* 账单号 */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">账单号</p>
                  <p className="text-xl font-bold text-gray-800">{billNumber}</p>
                </div>
              </div>

              {/* 下单时间 */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">下单时间</p>
                  <p className="text-xl font-bold text-gray-800">
                    {new Date().toLocaleTimeString('zh-CN', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 菜品列表 */}
          <div className="bg-white rounded-lg shadow-sm p-6 pb-24">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">已点菜品</h2>
              <button
                onClick={goBackToOrdering}
                className="flex items-center gap-2 px-4 py-2 bg-orange-50 text-orange-600 rounded-lg hover:bg-orange-100 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>继续点餐</span>
              </button>
            </div>

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
                      <p className="text-sm text-gray-500 mb-1">{item.variantDescription}</p>
                    )}
                    <div className="flex items-center gap-4">
                      <p className="text-orange-600 font-bold">¥{item.finalPrice || item.price}</p>
                      <span className="text-sm text-gray-500">× {item.quantity}</span>
                    </div>
                  </div>
                  
                  {/* 小计 */}
                  <div className="text-right">
                    <p className="font-bold text-gray-800">¥{(item.finalPrice || item.price) * item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 右侧订单汇总 */}
        <div className="w-80 bg-white border-l border-gray-200 p-6">
          <div className="sticky top-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">订单汇总</h2>
            
            {/* 统计信息 */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">菜品数量</span>
                <span className="font-medium">{getTotalQuantity()}件</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">菜品小计</span>
                <span className="font-medium">¥{getTotalPrice()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">服务费 (15%)</span>
                <span className="font-medium">¥{Math.round(getTotalPrice() * 0.15)}</span>
              </div>
              <hr className="my-3" />
              <div className="flex justify-between text-lg font-bold">
                <span className="text-gray-800">合计金额</span>
                <span className="text-orange-600">¥{getTotalPrice() + Math.round(getTotalPrice() * 0.15)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 固定在右下角的操作按钮 */}
      <div className="fixed bottom-6 right-6 flex gap-3 z-40">
        <button
          onClick={goBackToOrdering}
          className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors shadow-lg"
        >
          继续点餐
        </button>
        <button
          onClick={submitOrder}
          className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-bold hover:from-orange-600 hover:to-red-600 transition-all shadow-lg"
        >
          确认下单
        </button>
      </div>

      {/* 人数修改弹框 */}
      {showCustomerModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">修改用餐人数</h3>
            
            <div className="flex items-center justify-center gap-4 mb-6">
              <button
                onClick={() => setCustomerCount(Math.max(1, customerCount - 1))}
                className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <span className="text-xl font-bold text-gray-600">-</span>
              </button>
              <span className="w-16 text-center text-2xl font-bold text-gray-800">
                {customerCount}
              </span>
              <button
                onClick={() => setCustomerCount(customerCount + 1)}
                className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors"
              >
                <span className="text-xl font-bold text-white">+</span>
              </button>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => setShowCustomerModal(false)}
                className="flex-1 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                取消
              </button>
              <button
                onClick={() => setShowCustomerModal(false)}
                className="flex-1 py-2 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors"
              >
                确定
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default OrderDetailsPage