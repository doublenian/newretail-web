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
    // 如果是未开台状态，跳转到点餐页面
    if (table.status === 'available') {
      navigate(`/ordering/${table.number}`)
    }
    // 其他状态可以添加相应的处理逻辑
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
            餐厅区域
          </h2>
        </div>

        {/* 区域列表 */}
        <div className="flex-1 p-3 space-y-2">
          {restaurantAreas.map((area, index) => (
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
                    {area.tables.length} 个桌台
                  </span>
                </div>
                
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
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
        <div className="bg-white p-4 border-b border-gray-200 shadow-sm">
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

        {/* 桌台网格 - 增加列数和减少间距 */}
        <div className="flex-1 p-4 bg-gray-50 overflow-y-auto">
          <div className="grid grid-cols-6 gap-3">
            {getFilteredTables().map((table, index) => {
              const config = getStatusConfig(table.status)
              return (
                <div 
                  key={table.id} 
                  className="w-full animate-slide-up"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <button
                    onClick={() => handleTableClick(table)}
                    className={`group w-full h-40 bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:scale-105 flex flex-col ${
                      table.status === 'available' ? 'cursor-pointer' : 'cursor-default'
                    }`}
                  >
                    {/* 桌台号码头部 - 更紧凑 */}
                    <div className={`${config.bgColor} text-white p-2 text-center relative flex-shrink-0`}>
                      <div className="text-xl font-bold">{table.number}</div>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                    </div>
                    
                    {/* 状态信息区域 - 更紧凑 */}
                    <div className="flex-1 p-2 bg-gradient-to-b from-gray-50 to-white flex flex-col justify-center">
                      {/* 状态标题 */}
                      <div className="text-center mb-2 flex-shrink-0">
                        <span className="text-gray-700 font-medium text-sm">{config.statusText}</span>
                        {table.status === 'available' && (
                          <div className="text-xs text-orange-600 mt-1">点击开台</div>
                        )}
                      </div>
                      
                      {/* 详细信息区域 - 紧凑布局 */}
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
                          {table.customerCount ? (
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
        </div>

        {/* 底部状态说明 - 更紧凑 */}
        <div className="bg-white p-3 border-t border-gray-200 shadow-lg">
          <div className="flex items-center gap-6">
            <span className="text-gray-700 font-medium text-sm">状态：</span>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-purple-500 rounded shadow-sm" />
              <span className="text-gray-600 text-sm">未开台(点击开台)</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-blue-500 rounded shadow-sm" />
              <span className="text-gray-600 text-sm">已开台</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-green-500 rounded shadow-sm" />
              <span className="text-gray-600 text-sm">就餐中</span>
            </div>
            <button className="ml-auto px-4 py-2 bg-gradient-to-r from-orange-400 to-red-400 text-white rounded-full font-medium hover:from-orange-500 hover:to-red-500 transition-all duration-300 transform hover:scale-105 shadow-lg text-sm">
              刷新
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TablesPage