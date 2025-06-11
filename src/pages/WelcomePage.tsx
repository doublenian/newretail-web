import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const WelcomePage: React.FC = () => {
  const navigate = useNavigate()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // 页面加载动画
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 300)

    return () => clearTimeout(timer)
  }, [])

  const handleContinue = () => {
    navigate('/category')
  }

  return (
    <div className="h-full w-full bg-hotel-welcome bg-cover bg-center bg-no-repeat relative">
      {/* 背景遮罩 */}
      <div className="absolute inset-0 bg-black/50" />
      
      {/* 状态栏 */}
      <div className="absolute top-0 left-0 right-0 z-10 flex justify-between items-center p-4 text-white text-sm">
        <span>下午 5:32 4月18日周一</span>
        <div className="flex items-center gap-2">
          <span>90%</span>
          <div className="w-6 h-3 border border-white rounded-sm">
            <div className="w-5/6 h-full bg-white rounded-sm" />
          </div>
        </div>
      </div>

      {/* 酒店名称 */}
      <div className="absolute top-16 left-8 z-20">
        <h2 className="text-white text-xl font-medium">武汉光谷禧朗酒店</h2>
      </div>

      {/* 主要内容 */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center p-8">
        <div className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* WELCOME 文字 */}
          <div className="mb-8">
            <h1 className="text-7xl font-bold text-orange-500 tracking-wider mb-4 animate-slide-up">
              WELCOME
            </h1>
            <p className="text-orange-400 text-2xl font-medium">
              欢迎来到禧朗酒店
            </p>
          </div>

          {/* 继续按钮 */}
          <div className="mt-16">
            <button
              onClick={handleContinue}
              className="floating glass-dark rounded-full w-48 h-48 flex flex-col items-center justify-center text-white hover:bg-white/20 transition-all duration-300 cursor-pointer group"
            >
              <div className="text-center">
                <div className="text-lg font-medium mb-2 group-hover:scale-110 transition-transform duration-300">
                  点击屏幕
                </div>
                <div className="text-lg font-medium group-hover:scale-110 transition-transform duration-300">
                  继续点餐
                </div>
              </div>
              
              {/* 脉冲动画环 */}
              <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-pulse-slow" />
              <div className="absolute inset-2 rounded-full border border-white/20 animate-pulse-slow" style={{ animationDelay: '1s' }} />
            </button>
          </div>
        </div>
      </div>

      {/* 装饰性元素 */}
      <div className="absolute bottom-8 left-8 right-8 z-10">
        <div className="flex justify-center">
          <div className="w-1 h-16 bg-gradient-to-t from-orange-500 to-transparent rounded-full" />
        </div>
      </div>
    </div>
  )
}

export default WelcomePage