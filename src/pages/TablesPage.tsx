import React, { useState } from 'react'
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
    { id: 'small', name: '小桌', count: getTableTypeCount('small'), color: 'bg-red-400' },
    { id: 'large', name: '大桌', count: getTableTypeCount('large'), color: 'bg-gray-400' },
    { id: 'private', name: '包间', count: getTableTypeCount('private'), color: 'bg-gray-500' }
  ]

  // 获取状态对应的颜色和文字
  const getStatusConfig = (status: TableStatus['status']) => {
    switch (status) {
      case 'available':
        return {
          bgColor: 'bg-purple-500',
          textColor: 'text-white',
          statusText: '未开台',
          legendColor: 'bg-purple-500'
        }
      case 'occupied':
        return {
          bgColor: 'bg-blue-500',
          textColor: 'text-white',
          statusText: '已开台',
          legendColor: 'bg-blue-500'
        }
      case 'dining':
        return {
          bgColor: 'bg-green-500',
          textColor: 'text-white',
          statusText: '就餐中',
          legendColor: 'bg-green-500'
        }
      default:
        return {
          bgColor: 'bg-gray-500',
          textColor: 'text-white',
          statusText: '未知',
          legendColor: 'bg-gray-500'
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

  return (
    <div className="h-full w-full bg-gray-100 flex">
      {/* 左侧区域选择 - 极简风格 */}
      <div className="w-20 bg-white shadow-sm border-r border-gray-200 flex flex-col items-center py-8">
        {restaurantAreas.map((area) => (
          <button
            key={area.id}
            onClick={() => setSelectedArea(area.id)}
            className={`mb-8 text-lg font-medium transition-colors ${
              selectedArea === area.id
                ? 'text-orange-500'
                : 'text-gray-400 hover:text-gray-600'
            }`}
            style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
          >
            {area.name}
          </button>
        ))}
      </div>

      {/* 右侧主要内容区域 */}
      <div className="flex-1 flex flex-col">
        {/* 顶部桌台类型筛选 */}
        <div className="bg-white border-b border-gray-200 p-6">
          <div className="flex items-center gap-4">
            {tableTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
                  selectedType === type.id
                    ? `${type.color} text-white`
                    : 'bg-gray-300 text-gray-600 hover:bg-gray-400'
                }`}
              >
                {type.name}({type.count})
              </button>
            ))}
          </div>
        </div>

        {/* 桌台网格区域 */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {getFilteredTables().map((table) => {
              const config = getStatusConfig(table.status)
              return (
                <div
                  key={table.id}
                  onClick={() => handleTableClick(table)}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                >
                  {/* 桌台号码头部 */}
                  <div className={`${config.bgColor} ${config.textColor} p-4 text-center relative`}>
                    <div className="text-2xl font-bold">{table.number}</div>
                    {/* 右下角图标 */}
                    <div className="absolute bottom-2 right-2">
                      <div className="w-6 h-6 bg-white/20 rounded flex items-center justify-center">
                        <div className="w-3 h-3 bg-orange-400 rounded transform rotate-45"></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* 状态信息区域 */}
                  <div className="p-4 bg-white">
                    <div className="text-gray-800 font-medium text-center mb-2">
                      {config.statusText}
                    </div>
                    
                    {/* 用餐时长 */}
                    {table.duration && (
                      <div className="text-gray-500 text-sm text-center">
                        {table.duration}
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {/* 空状态 */}
          {getFilteredTables().length === 0 && (
            <div className="text-center py-20">
              <div className="text-gray-400 text-lg mb-2">暂无桌台数据</div>
            </div>
          )}
        </div>

        {/* 底部状态说明 */}
        <div className="bg-white border-t border-gray-200 p-6">
          <div className="flex items-center gap-6">
            <span className="text-gray-600 font-medium">状态:</span>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-purple-500 rounded"></div>
              <span className="text-sm text-gray-600">未开台</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded"></div>
              <span className="text-sm text-gray-600">已开台</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span className="text-sm text-gray-600">就餐中</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-orange-400 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">微</span>
              </div>
              <span className="text-sm text-gray-600">微信</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TablesPage