import React, { useState } from 'react'
import { Clock, Users, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

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
  const [selectedType, setSelectedType] = useState('all')

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
    },
    {
      id: 'garden',
      name: '花园',
      tables: [
        {
          id: 't201',
          number: '201',
          status: 'available',
          type: 'large',
        },
        {
          id: 't202',
          number: '202',
          status: 'dining',
          type: 'private',
          duration: '3小时45分20秒',
          customerCount: 10
        }
      ]
    }
  ]

  // 桌台类型统计
  const getTableTypeCount = (type: string) => {
    const allTables = restaurantAreas.flatMap(area => area.tables)
    if (type === 'all') return allTables.length
    return allTables.filter(table => table.type === type).length
  }

  const tableTypes = [
    { id: 'all', name: '全部', count: getTableTypeCount('all') },
    { id: 'small', name: '小桌', count: getTableTypeCount('small') },
    { id: 'large', name: '大桌', count: getTableTypeCount('large') },
    { id: 'private', name: '包间', count: getTableTypeCount('private') }
  ]

  // 获取状态对应的颜色和文字
  const getStatusConfig = (status: TableStatus['status']) => {
    switch (status) {
      case 'available':
        return {
          bgColor: 'bg-gradient-to-br from-blue-500 to-blue-600',
          textColor: 'text-white',
          statusText: '未开台',
          borderColor: 'border-blue-500'
        }
      case 'occupied':
        return {
          bgColor: 'bg-gradient-to-br from-orange-500 to-orange-600',
          textColor: 'text-white',
          statusText: '已开台',
          borderColor: 'border-orange-500'
        }
      case 'dining':
        return {
          bgColor: 'bg-gradient-to-br from-green-500 to-green-600',
          textColor: 'text-white',
          statusText: '就餐中',
          borderColor: 'border-green-500'
        }
      default:
        return {
          bgColor: 'bg-gray-500',
          textColor: 'text-white',
          statusText: '未知',
          borderColor: 'border-gray-500'
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
    // 这里可以添加桌台详情或操作的逻辑
  }

  const goBack = () => {
    navigate(-1)
  }

  return (
    <div className="h-full w-full bg-gradient-to-br from-gray-50 to-gray-100 flex">
      {/* 左侧区域选择 */}
      <div className="w-64 bg-white shadow-xl border-r border-gray-200 flex flex-col">
        {/* 头部 */}
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-orange-500 to-red-500">
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={goBack}
              className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors text-white"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-bold text-white">桌台管理</h1>
          </div>
        </div>

        {/* 区域列表 */}
        <div className="flex-1 p-4">
          <h3 className="text-sm font-medium text-gray-600 mb-3 uppercase tracking-wide">餐厅区域</h3>
          <div className="space-y-2">
            {restaurantAreas.map((area) => (
              <button
                key={area.id}
                onClick={() => setSelectedArea(area.id)}
                className={`w-full text-left p-4 rounded-xl transition-all duration-200 ${
                  selectedArea === area.id
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg transform scale-105'
                    : 'bg-gray-50 hover:bg-gray-100 text-gray-700 hover:shadow-md'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-lg">{area.name}</span>
                  <span className={`text-sm px-2 py-1 rounded-full ${
                    selectedArea === area.id 
                      ? 'bg-white/20 text-white' 
                      : 'bg-orange-100 text-orange-600'
                  }`}>
                    {area.tables.length}桌
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 状态说明 */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <h4 className="text-sm font-medium text-gray-600 mb-3">状态说明</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded bg-blue-500"></div>
              <span className="text-sm text-gray-600">未开台</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded bg-orange-500"></div>
              <span className="text-sm text-gray-600">已开台</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded bg-green-500"></div>
              <span className="text-sm text-gray-600">就餐中</span>
            </div>
          </div>
        </div>
      </div>

      {/* 右侧桌台显示 */}
      <div className="flex-1 flex flex-col">
        {/* 顶部桌台类型筛选 */}
        <div className="bg-white shadow-sm border-b border-gray-200 p-6">
          <div className="flex items-center gap-4">
            {tableTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={`px-6 py-3 rounded-full transition-all duration-200 font-medium ${
                  selectedType === type.id
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg transform scale-105'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                {type.name}({type.count})
              </button>
            ))}
          </div>
        </div>

        {/* 桌台网格 */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
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
                    className={`group relative w-full aspect-square ${config.bgColor} rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer overflow-hidden`}
                  >
                    {/* 桌台号码 */}
                    <div className="absolute top-4 left-0 right-0 text-center">
                      <div className={`text-3xl font-bold ${config.textColor}`}>
                        {table.number}
                      </div>
                    </div>

                    {/* 状态信息 */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className={`text-sm font-medium ${config.textColor} mb-1`}>
                        {config.statusText}
                      </div>
                      
                      {/* 用餐时长 */}
                      {table.duration && (
                        <div className={`flex items-center justify-center gap-1 text-xs ${config.textColor} bg-black/20 rounded-full px-2 py-1 mb-1`}>
                          <Clock className="w-3 h-3" />
                          <span>{table.duration}</span>
                        </div>
                      )}
                      
                      {/* 人数信息 */}
                      {table.customerCount && (
                        <div className={`flex items-center justify-center gap-1 text-xs ${config.textColor} bg-black/20 rounded-full px-2 py-1`}>
                          <Users className="w-3 h-3" />
                          <span>{table.customerCount}人</span>
                        </div>
                      )}
                    </div>

                    {/* 悬停效果 */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 rounded-2xl" />
                    
                    {/* 边框效果 */}
                    <div className={`absolute inset-0 border-2 border-transparent group-hover:${config.borderColor} rounded-2xl transition-all duration-300`} />
                  </button>
                </div>
              )
            })}
          </div>

          {/* 空状态 */}
          {getFilteredTables().length === 0 && (
            <div className="text-center py-20">
              <div className="text-gray-400 text-lg mb-2">暂无桌台数据</div>
              <div className="text-gray-500 text-sm">请选择其他区域或类型</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TablesPage