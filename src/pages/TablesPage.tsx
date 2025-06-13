import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Clock, Users, ArrowLeft, MapPin } from 'lucide-react'

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

const TablesPage: React.FC = () => {
  const navigate = useNavigate()
  const [selectedArea, setSelectedArea] = useState('floor2')
  const [selectedType, setSelectedType] = useState('small')

  // 模拟餐厅区域和桌台数据
  const restaurantAreas: RestaurantArea[] = [
    {
      id: 'floor2',
      name: '二楼',
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
    return currentArea.tables.filter(table => table.type === type).length
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
          bgColor: 'bg-blue-500',
          statusText: '已开台'
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

  // 过滤桌台
  const getFilteredTables = () => {
    const currentArea = restaurantAreas.find(area => area.id === selectedArea)
    if (!currentArea) return []
    
    return currentArea.tables.filter(table => table.type === selectedType)
  }

  const handleTableClick = (table: TableStatus) => {
    console.log('Selected table:', table)
  }

  const goBack = () => {
    navigate(-1)
  }

  return (
    <div className="h-full w-full bg-gray-100 flex">
      {/* 左侧区域选择 */}
      <div className="w-64 bg-gradient-to-b from-gray-800 to-gray-900 flex flex-col shadow-2xl">
        {/* 头部标题 */}
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-white text-xl font-bold flex items-center gap-3">
            <MapPin className="w-6 h-6 text-orange-400" />
            餐厅区域
          </h2>
          <p className="text-gray-400 text-sm mt-1">选择要管理的区域</p>
        </div>

        {/* 区域列表 */}
        <div className="flex-1 p-4 space-y-3">
          {restaurantAreas.map((area, index) => (
            <button
              key={area.id}
              onClick={() => setSelectedArea(area.id)}
              className={`group relative w-full text-left p-4 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                selectedArea === area.id
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/30'
                  : 'bg-gray-700/50 text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* 选中状态指示器 */}
              {selectedArea === area.id && (
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-white rounded-r-full" />
              )}
              
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-lg font-semibold block">{area.name}</span>
                  <span className={`text-sm ${
                    selectedArea === area.id ? 'text-white/80' : 'text-gray-400'
                  }`}>
                    {area.tables.length} 个桌台
                  </span>
                </div>
                
                {/* 桌台数量标识 */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  selectedArea === area.id
                    ? 'bg-white/20 text-white'
                    : 'bg-orange-500 text-white'
                }`}>
                  {area.tables.length}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 右侧内容区域 */}
      <div className="flex-1 flex flex-col">
        {/* 顶部桌台类型筛选 */}
        <div className="bg-white p-6 border-b border-gray-200 shadow-sm">
          <div className="flex gap-4">
            {tableTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                  selectedType === type.id
                    ? 'bg-gradient-to-r from-red-400 to-red-500 text-white shadow-lg shadow-red-400/30'
                    : 'bg-gray-400 text-white hover:bg-gray-500'
                }`}
              >
                {type.name}({type.count})
              </button>
            ))}
          </div>
        </div>

        {/* 桌台网格 */}
        <div className="flex-1 p-6 bg-gray-50">
          <div className="grid grid-cols-4 gap-6">
            {getFilteredTables().map((table, index) => {
              const config = getStatusConfig(table.status)
              return (
                <div 
                  key={table.id} 
                  className="w-full animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <button
                    onClick={() => handleTableClick(table)}
                    className="group w-full bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden transform hover:scale-105"
                  >
                    {/* 桌台号码头部 */}
                    <div className={`${config.bgColor} text-white p-4 text-center relative`}>
                      <div className="text-2xl font-bold">{table.number}</div>
                      {/* 装饰性渐变 */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                    </div>
                    
                    {/* 状态信息区域 */}
                    <div className="p-4 bg-gradient-to-b from-gray-50 to-white">
                      <div className="text-center mb-2">
                        <span className="text-gray-700 font-medium">{config.statusText}</span>
                      </div>
                      
                      {/* 详细信息 */}
                      {table.duration && (
                        <div className="text-center text-sm text-gray-600 mb-2 flex items-center justify-center gap-1">
                          <Clock className="w-3 h-3" />
                          {table.duration}
                        </div>
                      )}
                      
                      {table.customerCount && (
                        <div className="flex items-center justify-center gap-1 text-sm text-gray-600 mb-3">
                          <Users className="w-4 h-4" />
                          <span>{table.customerCount}人</span>
                        </div>
                      )}
                      
                      {/* 底部装饰图标 */}
                      <div className="flex justify-center">
                        <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-red-400 transform rotate-45 rounded-sm group-hover:rotate-90 transition-transform duration-300" />
                      </div>
                    </div>
                  </button>
                </div>
              )
            })}
          </div>
        </div>

        {/* 底部状态说明 */}
        <div className="bg-white p-6 border-t border-gray-200 shadow-lg">
          <div className="flex items-center gap-8">
            <span className="text-gray-700 font-medium">状态：</span>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-purple-500 rounded shadow-sm" />
              <span className="text-gray-600">未开台</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded shadow-sm" />
              <span className="text-gray-600">已开台</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded shadow-sm" />
              <span className="text-gray-600">就餐中</span>
            </div>
            <button className="ml-auto px-6 py-3 bg-gradient-to-r from-orange-400 to-red-400 text-white rounded-full font-medium hover:from-orange-500 hover:to-red-500 transition-all duration-300 transform hover:scale-105 shadow-lg">
              刷新
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TablesPage