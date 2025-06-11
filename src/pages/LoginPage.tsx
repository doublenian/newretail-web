import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { User, Lock, Eye, EyeOff } from 'lucide-react'

const LoginPage: React.FC = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('zlmhii')
  const [password, setPassword] = useState('')
  const [rememberPassword, setRememberPassword] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // 模拟登录延迟
    setTimeout(() => {
      setIsLoading(false)
      navigate('/welcome')
    }, 1500)
  }

  return (
    <div className="h-full w-full bg-hotel-dining bg-cover bg-center bg-no-repeat relative">
      {/* 背景遮罩 */}
      <div className="absolute inset-0 bg-black/40" />
      
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

      {/* 登录表单 */}
      <div className="relative z-20 h-full flex items-center justify-center p-8">
        <div className="w-full max-w-md animate-fade-in">
          <form onSubmit={handleLogin} className="glass-effect rounded-2xl p-8 shadow-2xl">
            <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              登录
            </h1>

            {/* 用户名输入 */}
            <div className="mb-6">
              <div className="relative">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="custom-input w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:bg-white text-gray-800 placeholder-gray-400"
                  placeholder="请输入用户名"
                  required
                />
              </div>
            </div>

            {/* 密码输入 */}
            <div className="mb-6">
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="custom-input w-full pl-12 pr-12 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:bg-white text-gray-800 placeholder-gray-400"
                  placeholder="请输入密码"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* 记住密码 */}
            <div className="mb-8">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberPassword}
                  onChange={(e) => setRememberPassword(e.target.checked)}
                  className="w-5 h-5 text-orange-500 bg-white border-gray-300 rounded focus:ring-orange-500 focus:ring-2"
                />
                <span className="ml-3 text-gray-700">记住密码</span>
              </label>
            </div>

            {/* 登录按钮 */}
            <button
              type="submit"
              disabled={isLoading}
              className="btn-hover w-full py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-semibold text-lg disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>登录中...</span>
                </div>
              ) : (
                '登 录'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginPage