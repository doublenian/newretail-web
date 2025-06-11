import React from 'react'

interface RestaurantItem {
  id: string
  name: string
  color: string
}

const CategoryPage: React.FC = () => {
  // 可配置的餐厅列表
  const restaurants: RestaurantItem[] = [
    {
      id: 'chinese-restaurant',
      name: '中餐厅',
      color: 'from-red-500 to-orange-500'
    },
    {
      id: 'western-restaurant',
      name: '西餐厅',
      color: 'from-blue-500 to-purple-500'
    },
    {
      id: 'hotel-restaurant',
      name: '酒店餐厅',
      color: 'from-green-500 to-teal-500'
    }
  ]

  const handleRestaurantClick = (restaurantId: string) => {
    console.log(`Selected restaurant: ${restaurantId}`)
    // 这里可以添加导航到具体餐厅菜单页面的逻辑
  }

  return (
    <div className="h-full w-full bg-hotel-table bg-cover bg-center bg-no-repeat relative">
      {/* 背景遮罩 */}
      <div className="absolute inset-0 bg-black/50" />
      
      {/* 主要内容 */}
      <div className="relative z-20 h-full flex items-center justify-center p-8">
        <div className="w-full max-w-4xl">
          {/* 标题区域 */}
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-4xl font-bold text-white mb-4">
              请选择餐厅
            </h1>
            <p className="text-white/80 text-lg">
              为您提供多样化的用餐选择
            </p>
          </div>

          {/* 餐厅列表 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {restaurants.map((restaurant, index) => (
              <div
                key={restaurant.id}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <button
                  onClick={() => handleRestaurantClick(restaurant.id)}
                  className="group w-full h-32 glass-effect rounded-2xl p-6 hover:scale-105 transform transition-all duration-300 hover:shadow-2xl cursor-pointer"
                >
                  <div className="flex flex-col items-center justify-center h-full">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      {restaurant.name}
                    </h3>
                  </div>
                  
                  {/* 悬停效果 */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent to-transparent group-hover:${restaurant.color.replace('from-', 'from-').replace('to-', 'to-')} group-hover:opacity-10 transition-all duration-300`} />
                </button>
              </div>
            ))}
          </div>

          {/* 底部提示 */}
          <div className="text-center mt-16 animate-fade-in" style={{ animationDelay: '0.8s' }}>
            <p className="text-white/60 text-sm">
              点击上方按钮选择您需要用餐的餐厅
            </p>
          </div>
        </div>
      </div>

      {/* 装饰性元素 */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-50" />
    </div>
  )
}

export default CategoryPage