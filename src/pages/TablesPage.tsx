import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Clock, Users, ArrowLeft } from 'lucide-react'

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
      <div className="w-48 bg-white flex flex-col">
        {/* 返回按钮 */}
        <div className="p-4 border-b border-gray-200">
          <button
            onClick={goBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>返回</span>
          </button>
        </div>

        {/* 区域列表 */}
        <div className="flex-1">
          {restaurantAreas.map((area) => (
            <button
              key={area.id}
              onClick={() => setSelectedArea(area.id)}
              className={`w-full text-left p-4 border-b border-gray-200 transition-colors ${
                selectedArea === area.id
                  ? 'bg-orange-500 text-white border-l-4 border-l-orange-600'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span className="text-lg font-medium">{area.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 右侧内容区域 */}
      <div className="flex-1 flex flex-col">
        {/* 顶部桌台类型筛选 */}
        <div className="bg-white p-6 border-b border-gray-200">
          <div className="flex gap-4">
            {tableTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  selectedType === type.id
                    ? 'bg-red-400 text-white'
                    : 'bg-gray-400 text-white hover:bg-gray-500'
                }`}
              >
                {type.name}({type.count})
              </button>
            ))}
          </div>
        </div>

        {/* 桌台网格 */}
        <div className="flex-1 p-6">
          <div className="grid grid-cols-4 gap-6">
            {getFilteredTables().map((table) => {
              const config = getStatusConfig(table.status)
              return (
                <div key={table.id} className="w-full">
                  <button
                    onClick={() => handleTableClick(table)}
                    className="w-full bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer overflow-hidden"
                  >
                    {/* 桌台号码头部 */}
                    <div className={`${config.bgColor} text-white p-4 text-center`}>
                      <div className="text-2xl font-bold">{table.number}</div>
                    </div>
                    
                    {/* 状态信息区域 */}
                    <div className="p-4 bg-gray-50">
                      <div className="text-center mb-2">
                        <span className="text-gray-700 font-medium">{config.statusText}</span>
                      </div>
                      
                      {/* 详细信息 */}
                      {table.duration && (
                        <div className="text-center text-sm text-gray-600 mb-2">
                          {table.duration}
                        </div>
                      )}
                      
                      {table.customerCount && (
                        <div className="flex items-center justify-center gap-1 text-sm text-gray-600">
                          <Users className="w-4 h-4" />
                          <span>{table.customerCount}人</span>
                        </div>
                      )}
                      
                      {/* 底部装饰图标 */}
                      <div className="flex justify-center mt-3">
                        <div className="w-8 h-8 bg-orange-400 transform rotate-45 rounded-sm"></div>
                      </div>
                    </div>
                  </button>
                </div>
              )
            })}
          </div>
        </div>

        {/* 底部状态说明 */}
        <div className="bg-white p-6 border-t border-gray-200">
          <div className="flex items-center gap-8">
            <span className="text-gray-700 font-medium">状态：</span>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-purple-500 rounded"></div>
              <span className="text-gray-600">未开台</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded"></div>
              <span className="text-gray-600">已开台</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span className="text-gray-600">就餐中</span>
            </div>
            <button className="ml-auto px-6 py-2 bg-orange-400 text-white rounded-full font-medium hover:bg-orange-500 transition-colors">
              刷新
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TablesPage