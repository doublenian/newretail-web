import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Clock, Users, ArrowLeft, Coffee, Utensils } from 'lucide-react'

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
  icon: React.ReactNode
}

const TablesPage: React.FC = () => {
  const navigate = useNavigate()
  const [selectedArea, setSelectedArea] = useState('floor2')
  const [selectedType, setSelectedType] = useState('all')

  // 模拟餐厅区域和桌台数据
  const restaurantAreas: RestaurantArea[] = [
    {
      id: 'floor2',
      name: '二楼',
      icon: <Utensils className="w-5 h-5" />,
      tables: [
        {
          id: 't001',
          number: '001',
          status: 'available',
          type: 'large',
        },
        {
          id: 't002',
          number: '002',
          status: 'dining',
          type: 'small',
          duration: '4小时22分47秒',
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
          type: 'private',
        },
        {
          id: 't005',
          number: '005',
          status: 'dining',
          type: 'large',
          duration: '1小时15分30秒',
          customerCount: 6
        },
        {
          id: 't006',
          number: '006',
          status: 'available',
          type: 'small',
        }
      ]
    },
    {
      id: 'hall',
      name: '大堂',
      icon: <Coffee className="w-5 h-5" />,
      tables: [
        {
          id: 't101',
          number: '101',
          status: 'dining',
          type: 'large',
          duration: '2小时30分15秒',
          customerCount: 8
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
          type: 'private',
          customerCount: 4
        }
      ]
    }
  ]

  // 桌台类型统计
  const getTableTypeCount = (type: string) => {
    const currentArea = restaurantAreas.find(area => area.id === selectedArea)
    if (!currentArea) return 0
    if (type === 'all') return currentArea.tables.length
    return currentArea.tables.filter(table => table.type === type).length
  }

  const tableTypes = [
    { 
      id: 'all', 
      name: '全部', 
      count: getTableTypeCount('all'), 
      gradient: 'from-indigo-500 to-purple-600',
      hoverGradient: 'from-indigo-600 to-purple-700'
    },
    { 
      id: 'small', 
      name: '小桌', 
      count: getTableTypeCount('small'), 
      gradient: 'from-emerald-500 to-teal-600',
      hoverGradient: 'from-emerald-600 to-teal-700'
    },
    { 
      id: 'large', 
      name: '大桌', 
      count: getTableTypeCount('large'), 
      gradient: 'from-blue-500 to-cyan-600',
      hoverGradient: 'from-blue-600 to-cyan-700'
    },
    { 
      id: 'private', 
      name: '包间', 
      count: getTableTypeCount('private'), 
      gradient: 'from-rose-500 to-pink-600',
      hoverGradient: 'from-rose-600 to-pink-700'
    }
  ]

  // 获取状态对应的颜色和文字
  const getStatusConfig = (status: TableStatus['status']) => {
    switch (status) {
      case 'available':
        return {
          gradient: 'from-blue-500 to-blue-600',
          textColor: 'text-white',
          statusText: '未开台',
          statusBg: 'bg-blue-100',
          statusTextColor: 'text-blue-700',
          ringColor: 'ring-blue-200',
          shadowColor: 'shadow-blue-200/50'
        }
      case 'occupied':
        return {
          gradient: 'from-amber-500 to-orange-600',
          textColor: 'text-white',
          statusText: '已开台',
          statusBg: 'bg-amber-100',
          statusTextColor: 'text-amber-700',
          ringColor: 'ring-amber-200',
          shadowColor: 'shadow-amber-200/50'
        }
      case 'dining':
        return {
          gradient: 'from-emerald-500 to-green-600',
          textColor: 'text-white',
          statusText: '就餐中',
          statusBg: 'bg-emerald-100',
          statusTextColor: 'text-emerald-700',
          ringColor: 'ring-emerald-200',
          shadowColor: 'shadow-emerald-200/50'
        }
      default:
        return {
          gradient: 'from-gray-500 to-gray-600',
          textColor: 'text-white',
          statusText: '未知',
          statusBg: 'bg-gray-100',
          statusTextColor: 'text-gray-700',
          ringColor: 'ring-gray-200',
          shadowColor: 'shadow-gray-200/50'
        }
    }
  }

  // 过滤桌台
  const getFilteredTables = () => {
    const currentArea = restaurantAreas.find(area => area.id === selectedArea)
    if (!currentArea) return []
    
    if (selectedType === 'all') return currentArea.tables
    return currentArea.tables.filter(table => table.type === selectedType)
  }

  const handleTableClick = (table: TableStatus) => {
    console.log('Selected table:', table)
  }

  const goBack = () => {
    navigate(-1)
  }

  return (
    <div className="h-full w-full bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200">
      {/* 顶部导航栏 */}
      <div className="bg-white shadow-lg border-b border-gray-200">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={goBack}
              className="p-2 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">桌台管理</h1>
              <p className="text-gray-500 text-sm">管理餐厅桌台状态</p>
            </div>
          </div>
          
          {/* 实时状态统计 */}
          <div className="flex items-center gap-4">
            <div className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow-md">
              <div className="text-sm font-medium">可用桌台</div>
              <div className="text-xl font-bold">{getFilteredTables().filter(t => t.status === 'available').length}</div>
            </div>
            <div className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-lg shadow-md">
              <div className="text-sm font-medium">就餐中</div>
              <div className="text-xl font-bold">{getFilteredTables().filter(t => t.status === 'dining').length}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-full">
        {/* 左侧区域选择 - 精美设计 */}
        <div className="w-72 bg-white shadow-xl border-r border-gray-200 flex flex-col">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">餐厅区域</h3>
            <div className="space-y-3">
              {restaurantAreas.map((area) => (
                <button
                  key={area.id}
                  onClick={() => setSelectedArea(area.id)}
                  className={`w-full flex items-center justify-between p-4 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                    selectedArea === area.id
                      ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-200/50'
                      : 'bg-gray-50 hover:bg-gray-100 text-gray-700 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {area.icon}
                    <span className="font-medium">{area.name}</span>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                    selectedArea === area.id 
                      ? 'bg-white/20 text-white' 
                      : 'bg-orange-100 text-orange-600'
                  }`}>
                    {area.tables.length}桌
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* 桌台类型筛选 */}
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">桌台类型</h3>
            <div className="space-y-3">
              {tableTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                    selectedType === type.id
                      ? `bg-gradient-to-r ${type.gradient} text-white shadow-lg`
                      : 'bg-gray-50 hover:bg-gray-100 text-gray-700 hover:shadow-md'
                  }`}
                >
                  <span className="font-medium">{type.name}</span>
                  <span className={`px-2 py-1 rounded-full text-sm font-medium ${
                    selectedType === type.id 
                      ? 'bg-white/20 text-white' 
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {type.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* 状态说明 */}
          <div className="p-6 bg-gray-50">
            <h4 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">状态说明</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 shadow-md"></div>
                <span className="text-sm text-gray-600">未开台</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 shadow-md"></div>
                <span className="text-sm text-gray-600">已开台</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 shadow-md"></div>
                <span className="text-sm text-gray-600">就餐中</span>
              </div>
            </div>
          </div>
        </div>

        {/* 右侧桌台显示 */}
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
            {getFilteredTables().map((table, index) => {
              const config = getStatusConfig(table.status)
              return (
                <div
                  key={table.id}
                  className="animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <button
                    onClick={() => handleTableClick(table)}
                    className={`group relative w-full bg-white rounded-2xl shadow-lg hover:shadow-2xl ${config.shadowColor} transition-all duration-300 transform hover:scale-105 cursor-pointer overflow-hidden border-2 border-transparent hover:${config.ringColor}`}
                  >
                    {/* 桌台号码头部 */}
                    <div className={`bg-gradient-to-r ${config.gradient} ${config.textColor} p-6 text-center relative`}>
                      <div className="text-3xl font-bold mb-1">{table.number}</div>
                      <div className="text-sm opacity-90">桌台</div>
                      
                      {/* 装饰性元素 */}
                      <div className="absolute top-2 right-2 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                        <div className="w-4 h-4 bg-white/60 rounded-sm transform rotate-45"></div>
                      </div>
                    </div>
                    
                    {/* 状态信息区域 */}
                    <div className="p-6 bg-white">
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${config.statusBg} ${config.statusTextColor} mb-3`}>
                        {config.statusText}
                      </div>
                      
                      {/* 详细信息 */}
                      <div className="space-y-2">
                        {table.duration && (
                          <div className="flex items-center justify-center gap-2 text-gray-600">
                            <Clock className="w-4 h-4" />
                            <span className="text-sm">{table.duration}</span>
                          </div>
                        )}
                        
                        {table.customerCount && (
                          <div className="flex items-center justify-center gap-2 text-gray-600">
                            <Users className="w-4 h-4" />
                            <span className="text-sm">{table.customerCount}人</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* 悬停效果 */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" />
                  </button>
                </div>
              )
            })}
          </div>

          {/* 空状态 */}
          {getFilteredTables().length === 0 && (
            <div className="text-center py-20">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center">
                <Utensils className="w-12 h-12 text-gray-400" />
              </div>
              <div className="text-gray-500 text-xl font-medium mb-2">暂无桌台数据</div>
              <div className="text-gray-400">请选择其他区域或类型查看桌台信息</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TablesPage