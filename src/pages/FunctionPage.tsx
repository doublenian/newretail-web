import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface FunctionItem {
  id: string
  name: string
  description: string
  backgroundImage: string
}

const FunctionPage: React.FC = () => {
  const navigate = useNavigate()

  // 7个功能模块（新增打印功能）
  const functions: FunctionItem[] = [
    {
      id: 'tables',
      name: '桌台',
      description: '桌台管理',
      backgroundImage: 'https://images.pexels.com/photos/3201921/pexels-photo-3201921.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
    },
    {
      id: 'cashier',
      name: '收银',
      description: '收银结算',
      backgroundImage: 'https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
    },
    {
      id: 'orders',
      name: '订单',
      description: '订单管理',
      backgroundImage: 'https://images.pexels.com/photos/4253312/pexels-photo-4253312.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
    },
    {
      id: 'statistics',
      name: '统计',
      description: '数据统计',
      backgroundImage: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
    },
    {
      id: 'reports',
      name: '报表',
      description: '营业报表',
      backgroundImage: 'https://images.pexels.com/photos/669619/pexels-photo-669619.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
    },
    {
      id: 'settings',
      name: '配置',
      description: '系统配置',
      backgroundImage: 'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
    },
    {
      id: 'print',
      name: '打印',
      description: '打印管理',
      backgroundImage: 'https://images.pexels.com/photos/4386370/pexels-photo-4386370.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
    }
  ]

  const handleFunctionClick = (functionId: string) => {
    console.log(`Selected function: ${functionId}`)
    if (functionId === 'tables') {
      navigate('/tables')
    } else if (functionId === 'cashier') {
      // 跳转到桌台页面，但只显示就餐中的桌台
      navigate('/tables', { 
        state: { 
          filterMode: 'dining', 
          title: '收银结算 - 选择桌台' 
        } 
      })
    } else if (functionId === 'orders') {
      // 跳转到订单管理页面
      navigate('/orders')
    } else if (functionId === 'statistics') {
      // 跳转到统计页面
      navigate('/statistics')
    } else if (functionId === 'reports') {
      // 跳转到报表页面
      navigate('/reports')
    } else if (functionId === 'settings') {
      // 跳转到系统配置页面
      navigate('/settings')
    }
    // 这里可以添加导航到其他功能页面的逻辑
  }

  const scrollLeft = () => {
    const container = document.getElementById('functions-container')
    if (container) {
      container.scrollBy({ left: -900, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    const container = document.getElementById('functions-container')
    if (container) {
      container.scrollBy({ left: 900, behavior: 'smooth' })
    }
  }

  // 将功能分组，每组6个（2行3列）
  const chunkedFunctions: FunctionItem[][] = []
  for (let i = 0; i < functions.length; i += 6) {
    chunkedFunctions.push(functions.slice(i, i + 6))
  }

  return (
    <div className="h-full w-full bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 bg-black/60" />
      
      {/* 主要内容 */}
      <div className="relative z-20 h-full flex flex-col justify-center p-8">
        {/* 标题区域 */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold text-white mb-4">
            功能选择
          </h1>
          <p className="text-white/80 text-lg">
            请选择您需要的功能模块
          </p>
        </div>

        {/* 功能模块容器 */}
        <div className="flex-1 flex items-center justify-center relative px-16">
          {/* 左滚动按钮 */}
          {chunkedFunctions.length > 1 && (
            <button
              onClick={scrollLeft}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 transition-all duration-300 flex items-center justify-center"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {/* 功能模块滚动容器 */}
          <div className="w-full max-w-6xl mx-auto px-8">
            <div
              id="functions-container"
              className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory gap-12"
            >
              {chunkedFunctions.map((chunk, chunkIndex) => (
                <div
                  key={chunkIndex}
                  className="flex-shrink-0 snap-center w-full grid grid-cols-3 grid-rows-2 gap-6"
                >
                  {chunk.map((func, index) => (
                    <div
                      key={func.id}
                      className="animate-slide-up p-2"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <button
                        onClick={() => handleFunctionClick(func.id)}
                        className="group relative w-full h-48 rounded-2xl shadow-2xl hover:scale-105 transform transition-all duration-300 cursor-pointer"
                      >
                        {/* 背景图片容器 */}
                        <div className="absolute inset-0 rounded-2xl overflow-hidden">
                          {/* 背景图片 */}
                          <div
                            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                            style={{ backgroundImage: `url(${func.backgroundImage})` }}
                          />
                          
                          {/* 遮罩层 */}
                          <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-all duration-300" />
                        </div>
                        
                        {/* 内容 */}
                        <div className="relative z-10 h-full flex flex-col justify-center items-center p-6">
                          <h3 className="text-4xl font-bold text-white mb-3 group-hover:scale-110 transition-transform duration-300">
                            {func.name}
                          </h3>
                          <p className="text-lg text-white/90 group-hover:text-white transition-colors duration-300">
                            {func.description}
                          </p>
                        </div>
                        
                        {/* 悬停效果边框 */}
                        <div className="absolute inset-0 border-2 border-transparent group-hover:border-orange-500/60 rounded-2xl transition-all duration-300" />
                      </button>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* 右滚动按钮 */}
          {chunkedFunctions.length > 1 && (
            <button
              onClick={scrollRight}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 transition-all duration-300 flex items-center justify-center"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}
        </div>

        {/* 底部提示 */}
        <div className="text-center mt-8 animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <p className="text-white/60 text-sm">
            点击功能模块进入相应操作界面{chunkedFunctions.length > 1 && '，可左右滑动查看更多功能'}
          </p>
        </div>
      </div>

      {/* 装饰性元素 */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-50" />
    </div>
  )
}

export default FunctionPage