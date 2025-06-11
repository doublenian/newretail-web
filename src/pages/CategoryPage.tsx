import React from 'react'
import { ChefHat, Utensils, Building2 } from 'lucide-react'

interface CategoryItem {
  id: string
  name: string
  icon: React.ReactNode
  description: string
  color: string
}

const CategoryPage: React.FC = () => {
  const categories: CategoryItem[] = [
    {
      id: 'chinese',
      name: '中餐',
      icon: <ChefHat className="w-8 h-8" />,
      description: '传统中式菜肴',
      color: 'from-red-500 to-orange-500'
    },
    {
      id: 'western',
      name: '西餐',
      icon: <Utensils className="w-8 h-8" />,
      description: '精致西式料理',
      color: 'from-blue-500 to-purple-500'
    },
    {
      id: 'hotel',
      name: '酒店',
      icon: <Building2 className="w-8 h-8" />,
      description: '酒店特色服务',
      color: 'from-green-500 to-teal-500'
    }
  ]

  const handleCategoryClick = (categoryId: string) => {
    console.log(`Selected category: ${categoryId}`)
    // 这里可以添加导航到具体菜单页面的逻辑
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
              请选择菜单类别
            </h1>
            <p className="text-white/80 text-lg">
              为您提供多样化的用餐选择
            </p>
          </div>

          {/* 分类按钮 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {categories.map((category, index) => (
              <div
                key={category.id}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <button
                  onClick={() => handleCategoryClick(category.id)}
                  className="group w-full h-32 glass-effect rounded-2xl p-6 hover:scale-105 transform transition-all duration-300 hover:shadow-2xl cursor-pointer"
                >
                  <div className="flex flex-col items-center justify-center h-full">
                    <div className={`mb-3 p-3 rounded-full bg-gradient-to-r ${category.color} text-white group-hover:scale-110 transition-transform duration-300`}>
                      {category.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-1">
                      {category.name}
                    </h3>
                    <p className="text-gray-600 text-sm text-center">
                      {category.description}
                    </p>
                  </div>
                  
                  {/* 悬停效果 */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-500/0 to-orange-500/0 group-hover:from-orange-500/10 group-hover:to-red-500/10 transition-all duration-300" />
                </button>
              </div>
            ))}
          </div>

          {/* 底部提示 */}
          <div className="text-center mt-16 animate-fade-in" style={{ animationDelay: '0.8s' }}>
            <p className="text-white/60 text-sm">
              点击上方按钮选择您需要的菜单类别
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