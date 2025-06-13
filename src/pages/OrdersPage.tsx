import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Search, Printer, Clock, User, CreditCard, MapPin, Smartphone } from 'lucide-react'

interface OrderItem {
  id: string
  name: string
  price: number
  quantity: number
  amount: number
}

interface Order {
  id: string
  tableNumber: string
  orderNumber: string
  paymentTime: string
  paidAmount: number
  paymentMethod: string
  consumptionType: string
  status: 'pending' | 'completed' | 'cancelled'
  customerName: string
  customerPhone: string
  orderSource: string
  pickupNumber: string
  diningMethod: string
  orderAmount: number
  discount: number
  actualPaid: number
  notes: string
  items: OrderItem[]
}

interface OrderType {
  id: string
  name: string
  count: number
}

interface OrderStatus {
  id: string
  name: string
  count: number
}

const OrdersPage: React.FC = () => {
  const navigate = useNavigate()
  const [selectedOrderType, setSelectedOrderType] = useState('cashier')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  // 订单类型
  const orderTypes: OrderType[] = [
    { id: 'cashier', name: '收银订单', count: 15 },
    { id: 'table', name: '桌台订单', count: 8 },
    { id: 'takeaway', name: '外卖订单', count: 12 },
    { id: 'fastfood', name: '快餐订单', count: 6 }
  ]

  // 订单状态
  const orderStatuses: OrderStatus[] = [
    { id: 'pending', name: '待完成', count: 3 },
    { id: 'completed', name: '已完成', count: 35 },
    { id: 'cancelled', name: '已取消', count: 2 },
    { id: 'all', name: '全部', count: 40 }
  ]

  // 模拟订单数据
  const mockOrders: Order[] = [
    {
      id: 'A009',
      tableNumber: 'A009',
      orderNumber: '20250514000000272694',
      paymentTime: '2025-05-14 15:13:42',
      paidAmount: 40.00,
      paymentMethod: '余额支付',
      consumptionType: '余额支付',
      status: 'completed',
      customerName: '用户',
      customerPhone: '13888888888',
      orderSource: '收银台',
      pickupNumber: 'A009',
      diningMethod: '店内堂食',
      orderAmount: 40.00,
      discount: 0.00,
      actualPaid: 40.00,
      notes: '',
      items: [
        { id: '1', name: '双层芝士厚牛肉汉堡', price: 40.00, quantity: 1, amount: 40.00 }
      ]
    },
    {
      id: 'A008',
      tableNumber: 'A008',
      orderNumber: '20250514000000416331',
      paymentTime: '2025-05-14 10:54:38',
      paidAmount: 40.00,
      paymentMethod: '线下支付(自有微信支付)',
      consumptionType: '线下支付(自有微信支付)',
      status: 'completed',
      customerName: '张先生',
      customerPhone: '13966666666',
      orderSource: '收银台',
      pickupNumber: 'A008',
      diningMethod: '店内堂食',
      orderAmount: 40.00,
      discount: 0.00,
      actualPaid: 40.00,
      notes: '少盐',
      items: [
        { id: '1', name: '招牌红烧肉', price: 25.00, quantity: 1, amount: 25.00 },
        { id: '2', name: '米饭', price: 15.00, quantity: 1, amount: 15.00 }
      ]
    },
    {
      id: 'A006',
      tableNumber: 'A006',
      orderNumber: '20250514000000007739',
      paymentTime: '2025-05-14 10:52:35',
      paidAmount: 82.00,
      paymentMethod: '线下支付(现金支付)',
      consumptionType: '线下支付(现金支付)',
      status: 'completed',
      customerName: '李女士',
      customerPhone: '13777777777',
      orderSource: '收银台',
      pickupNumber: 'A006',
      diningMethod: '店内堂食',
      orderAmount: 82.00,
      discount: 0.00,
      actualPaid: 82.00,
      notes: '',
      items: [
        { id: '1', name: '黑椒牛排', price: 68.00, quantity: 1, amount: 68.00 },
        { id: '2', name: '蔬菜沙拉', price: 14.00, quantity: 1, amount: 14.00 }
      ]
    },
    {
      id: 'A004',
      tableNumber: 'A004',
      orderNumber: '20250514000000001973',
      paymentTime: '2025-05-14 01:57:50',
      paidAmount: 40.00,
      paymentMethod: '线下支付(POS刷卡支付)',
      consumptionType: '线下支付(POS刷卡支付)',
      status: 'completed',
      customerName: '王先生',
      customerPhone: '13555555555',
      orderSource: '收银台',
      pickupNumber: 'A004',
      diningMethod: '店内堂食',
      orderAmount: 40.00,
      discount: 0.00,
      actualPaid: 40.00,
      notes: '不要辣',
      items: [
        { id: '1', name: '宫保鸡丁', price: 28.00, quantity: 1, amount: 28.00 },
        { id: '2', name: '白米饭', price: 12.00, quantity: 1, amount: 12.00 }
      ]
    },
    {
      id: 'A003',
      tableNumber: 'A003',
      orderNumber: '20250514000000004003',
      paymentTime: '2025-05-14 01:57:36',
      paidAmount: 11.00,
      paymentMethod: '线下支付(现金支付)',
      consumptionType: '线下支付(现金支付)',
      status: 'completed',
      customerName: '赵女士',
      customerPhone: '13444444444',
      orderSource: '收银台',
      pickupNumber: 'A003',
      diningMethod: '店内堂食',
      orderAmount: 11.00,
      discount: 0.00,
      actualPaid: 11.00,
      notes: '',
      items: [
        { id: '1', name: '小菜', price: 11.00, quantity: 1, amount: 11.00 }
      ]
    },
    {
      id: 'A002',
      tableNumber: 'A002',
      orderNumber: '20250514000000008159',
      paymentTime: '2025-05-14 01:29:43',
      paidAmount: 10.00,
      paymentMethod: '线下支付(现金支付)',
      consumptionType: '线下支付(现金支付)',
      status: 'completed',
      customerName: '钱先生',
      customerPhone: '13333333333',
      orderSource: '收银台',
      pickupNumber: 'A002',
      diningMethod: '店内堂食',
      orderAmount: 10.00,
      discount: 0.00,
      actualPaid: 10.00,
      notes: '',
      items: [
        { id: '1', name: '豆浆', price: 10.00, quantity: 1, amount: 10.00 }
      ]
    },
    {
      id: 'A001',
      tableNumber: 'A001',
      orderNumber: '20250514000000004041',
      paymentTime: '2025-05-14 01:27:23',
      paidAmount: 182.00,
      paymentMethod: '线下支付(现金支付)',
      consumptionType: '线下支付(现金支付)',
      status: 'completed',
      customerName: '孙女士',
      customerPhone: '13222222222',
      orderSource: '收银台',
      pickupNumber: 'A001',
      diningMethod: '店内堂食',
      orderAmount: 182.00,
      discount: 0.00,
      actualPaid: 182.00,
      notes: '多加醋',
      items: [
        { id: '1', name: '招牌烤鸭', price: 88.00, quantity: 1, amount: 88.00 },
        { id: '2', name: '水煮鱼', price: 68.00, quantity: 1, amount: 68.00 },
        { id: '3', name: '米饭', price: 13.00, quantity: 2, amount: 26.00 }
      ]
    }
  ]

  // 过滤订单
  const getFilteredOrders = () => {
    let filtered = mockOrders

    // 按状态过滤
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(order => order.status === selectedStatus)
    }

    // 按搜索词过滤
    if (searchTerm) {
      filtered = filtered.filter(order => 
        order.tableNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.orderNumber.includes(searchTerm) ||
        order.customerName.includes(searchTerm) ||
        order.customerPhone.includes(searchTerm)
      )
    }

    return filtered
  }

  // 获取状态显示配置
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'pending':
        return { 
          text: '待完成', 
          bgColor: 'bg-yellow-100 text-yellow-700 border-yellow-200' 
        }
      case 'completed':
        return { 
          text: '已完成', 
          bgColor: 'bg-green-100 text-green-700 border-green-200' 
        }
      case 'cancelled':
        return { 
          text: '已取消', 
          bgColor: 'bg-red-100 text-red-700 border-red-200' 
        }
      default:
        return { 
          text: '未知', 
          bgColor: 'bg-gray-100 text-gray-700 border-gray-200' 
        }
    }
  }

  const goBack = () => {
    navigate(-1)
  }

  // 打印小票
  const printReceipt = () => {
    if (selectedOrder) {
      console.log('打印订单:', selectedOrder.id)
      // 这里添加实际的打印逻辑
      alert(`正在打印 ${selectedOrder.tableNumber} 的订单小票...`)
    }
  }

  // 默认选择第一个订单
  React.useEffect(() => {
    const filtered = getFilteredOrders()
    if (filtered.length > 0 && !selectedOrder) {
      setSelectedOrder(filtered[0])
    }
  }, [selectedStatus, searchTerm])

  return (
    <div className="h-full w-full bg-gray-50 flex">
      {/* 左侧订单列表区域 */}
      <div className="flex-1 flex flex-col bg-white">
        {/* 顶部工具栏 */}
        <div className="border-b border-gray-200 p-4">
          {/* 标题和返回按钮 */}
          <div className="flex items-center gap-4 mb-4">
            <button 
              onClick={goBack}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>返回</span>
            </button>
            <div className="h-6 w-px bg-gray-300" />
            <h1 className="text-xl font-bold text-gray-800">订单管理</h1>
          </div>

          {/* 搜索框 */}
          <div className="mb-4">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="搜索订单号、桌台号、客户信息..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 transition-colors"
              />
            </div>
          </div>

          {/* 订单类型选项卡 */}
          <div className="flex gap-1 mb-4">
            {orderTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedOrderType(type.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  selectedOrderType === type.id
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {type.name}
              </button>
            ))}
          </div>

          {/* 订单状态筛选 */}
          <div className="flex gap-1">
            {orderStatuses.map((status) => (
              <button
                key={status.id}
                onClick={() => setSelectedStatus(status.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  selectedStatus === status.id
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {status.name}
              </button>
            ))}
          </div>
        </div>

        {/* 订单表格 */}
        <div className="flex-1 overflow-auto">
          <table className="w-full">
            <thead className="bg-gray-50 sticky top-0">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">名称</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">订单号</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">支付时间</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">实付金额</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">消费方式</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {getFilteredOrders().map((order) => {
                const statusConfig = getStatusConfig(order.status)
                return (
                  <tr
                    key={order.id}
                    onClick={() => setSelectedOrder(order)}
                    className={`cursor-pointer hover:bg-gray-50 transition-colors ${
                      selectedOrder?.id === order.id ? 'bg-orange-50 border-l-4 border-orange-500' : ''
                    }`}
                  >
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-lg font-bold text-orange-600">
                        {order.tableNumber}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {order.orderNumber}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {order.paymentTime}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-gray-900">
                        {order.paidAmount.toFixed(2)}
                      </div>
                      <div className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded inline-block mt-1">
                        已付款
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {order.consumptionType}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-lg border ${statusConfig.bgColor}`}>
                        {statusConfig.text}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>

          {/* 分页信息 */}
          <div className="bg-white px-4 py-3 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                共 {getFilteredOrders().length} 条
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-700">前往</span>
                <input
                  type="number"
                  min="1"
                  defaultValue="1"
                  className="w-12 px-2 py-1 text-sm border border-gray-300 rounded text-center focus:outline-none focus:border-orange-500"
                />
                <span className="text-sm text-gray-700">页</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 右侧订单详情区域 */}
      <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
        {selectedOrder ? (
          <>
            {/* 顾客信息 */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                  <User className="w-5 h-5 text-orange-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">顾客信息</h3>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">用户昵称：</span>
                  <span className="text-sm text-gray-800">{selectedOrder.customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">手机号：</span>
                  <span className="text-sm text-gray-800">{selectedOrder.customerPhone}</span>
                </div>
              </div>
            </div>

            {/* 订单信息 */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">订单信息</h3>
              </div>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">订单来源：</span>
                  <span className="text-gray-800">{selectedOrder.orderSource}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">取单号：</span>
                  <span className="text-gray-800">{selectedOrder.pickupNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">就餐方式：</span>
                  <span className="text-gray-800">{selectedOrder.diningMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">订单号：</span>
                  <span className="text-gray-800 text-xs">{selectedOrder.orderNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">订单金额：</span>
                  <span className="text-gray-800">{selectedOrder.orderAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">订单优惠：</span>
                  <span className="text-gray-800">{selectedOrder.discount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">实付金额：</span>
                  <span className="text-gray-800 font-semibold">{selectedOrder.actualPaid.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">支付方式：</span>
                  <span className="text-gray-800">{selectedOrder.paymentMethod}</span>
                </div>
                {selectedOrder.notes && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">备注：</span>
                    <span className="text-gray-800">{selectedOrder.notes}</span>
                  </div>
                )}
              </div>
            </div>

            {/* 商品列表 */}
            <div className="flex-1 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">商品明细</h3>
              
              {/* 表头 */}
              <div className="grid grid-cols-12 gap-2 text-xs font-medium text-gray-500 border-b border-gray-200 pb-2 mb-4">
                <div className="col-span-5">商品名称</div>
                <div className="col-span-2 text-center">单价</div>
                <div className="col-span-2 text-center">数量</div>
                <div className="col-span-3 text-right">金额</div>
              </div>
              
              {/* 商品列表 */}
              <div className="space-y-3">
                {selectedOrder.items.map((item) => (
                  <div key={item.id} className="grid grid-cols-12 gap-2 text-sm">
                    <div className="col-span-5 text-gray-800 font-medium">
                      {item.name}
                    </div>
                    <div className="col-span-2 text-center text-gray-600">
                      {item.price.toFixed(2)}
                    </div>
                    <div className="col-span-2 text-center text-gray-600">
                      {item.quantity}
                    </div>
                    <div className="col-span-3 text-right text-gray-800 font-semibold">
                      {item.amount.toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 操作按钮 */}
            <div className="p-6 border-t border-gray-200">
              <button
                onClick={printReceipt}
                className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-200"
              >
                <Printer className="w-5 h-5" />
                打印小票
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-600 mb-2">请选择订单</h3>
              <p className="text-gray-500">选择左侧订单查看详细信息</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default OrdersPage