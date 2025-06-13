import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Clock, Users } from 'lucide-react'

interface TableStatus {
  id: string
  number: string
  status: 'available' | 'occupied' | 'dining'
  type: 'small' | 'large' | 'private'
  duration?: string
  customerCount?: number
}

const TablesPage: React.FC = () => {
  const navigate = useNavigate()
  const [selectedType, setSelectedType] = useState('small')

  // 模拟所有桌台数据
  const allTables: TableStatus[] = [
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
    },
    {
      id: 't007',
      number: '007',
      status: 'occupied',
      type: 'private',
      customerCount: 3
    },
    {
      id: 't008',
      number: '008',
      status: 'dining',
      type: 'small',
      duration: '2小时10分15秒',
      customerCount: 2
    },
    {
      id: 't009',
      number: '009',
      status: 'available',
      type: 'large',
    },
    {
      id: 't010',
      number: '010',
      status: 'occupied',
      type: 'small',
      customerCount: 4
    },
    {
      id: 't011',
      number: '011',
      status: 'dining',
      type: 'private',
      duration: '3小时45分20秒',
      customerCount: 8
    },
    {
      id: 't012',
      number: '012',
      status: 'available',
      type: 'small',
    }
  ]

  // 桌台类型统计
  const getTableTypeCount = (type: string) => {
    return allTables.filter(table => table.type === type).length
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
    return allTables.filter(table => table.type === selectedType)
  }

  const handleTableClick = (table: TableStatus) => {
    console.log('Selected table:', table)
  }

  return (
    <div className="h-full w-full bg-gray-50 flex flex-col">
      {/* 顶部桌台类型筛选 */}
      <div className="bg-white p-6 border-b border-gray-200 shadow-sm">
        <div className="flex gap-4 justify-center">
          {tableTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setSelectedType(type.id)}
              className={`px-8 py-4 rounded-full font-medium text-lg transition-all duration-300 transform hover:scale-105 ${
                selectedType === type.id
                  ? 'bg-gradient-to-r from-orange-400 to-red-500 text-white shadow-lg shadow-orange-400/30'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {type.name}({type.count})
            </button>
          ))}
        </div>
      </div>

      {/* 桌台网格 - 占据剩余空间 */}
      <div className="flex-1 p-8">
        <div className="grid grid-cols-6 gap-6 max-w-7xl mx-auto">
          {getFilteredTables().map((table, index) => {
            const config = getStatusConfig(table.status)
            return (
              <div 
                key={table.id} 
                className="animate-slide-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <button
                  onClick={() => handleTableClick(table)}
                  className="group w-full bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden transform hover:scale-105"
                >
                  {/* 桌台号码头部 - 固定高度 */}
                  <div className={`${config.bgColor} text-white py-3 text-center relative`}>
                    <div className="text-xl font-bold">{table.number}</div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  </div>
                  
                  {/* 状态信息区域 - 固定高度 */}
                  <div className="p-4 bg-gradient-to-b from-gray-50 to-white h-32 flex flex-col justify-between">
                    <div className="text-center">
                      <span className="text-gray-700 font-medium text-sm">{config.statusText}</span>
                    </div>
                    
                    {/* 详细信息 */}
                    <div className="space-y-1">
                      {table.duration && (
                        <div className="text-center text-xs text-gray-600 flex items-center justify-center gap-1">
                          <Clock className="w-3 h-3" />
                          {table.duration}
                        </div>
                      )}
                      
                      {table.customerCount && (
                        <div className="flex items-center justify-center gap-1 text-sm text-gray-600">
                          <Users className="w-4 h-4" />
                          <span>{table.customerCount}人</span>
                        </div>
                      )}
                    </div>
                    
                    {/* 底部装饰图标 */}
                    <div className="flex justify-center mt-2">
                      <div className="w-6 h-6 bg-gradient-to-r from-orange-400 to-red-400 transform rotate-45 rounded-sm group-hover:rotate-90 transition-transform duration-300" />
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
        <div className="flex items-center justify-center gap-8">
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
          <button className="px-6 py-3 bg-gradient-to-r from-orange-400 to-red-400 text-white rounded-full font-medium hover:from-orange-500 hover:to-red-500 transition-all duration-300 transform hover:scale-105 shadow-lg">
            刷新
          </button>
        </div>
      </div>
    </div>
  )
}

export default TablesPage