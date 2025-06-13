import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  ArrowLeft, 
  Store, 
  Settings, 
  Printer, 
  CreditCard, 
  Users, 
  Clock, 
  Phone, 
  MapPin, 
  Globe, 
  Wifi, 
  Volume2,
  Save,
  RefreshCw,
  Eye,
  EyeOff,
  Plus,
  Trash2,
  Edit3,
  Check,
  X
} from 'lucide-react'

interface ConfigCategory {
  id: string
  name: string
  icon: React.ReactNode
  description: string
}

interface RestaurantConfig {
  name: string
  address: string
  phone: string
  businessHours: {
    open: string
    close: string
  }
  serviceCharge: number
  description: string
  wifi: {
    enabled: boolean
    ssid: string
    password: string
  }
}

interface SystemConfig {
  autoSave: boolean
  soundEnabled: boolean
  theme: 'light' | 'dark' | 'auto'
  language: 'zh-CN' | 'en-US'
  tableLockTimeout: number
  orderReminder: boolean
}

interface PrinterConfig {
  enabled: boolean
  name: string
  ip: string
  port: number
  paperWidth: number
  template: string
}

interface PaymentMethod {
  id: string
  name: string
  enabled: boolean
  config: any
}

const SettingsPage: React.FC = () => {
  const navigate = useNavigate()
  const [selectedCategory, setSelectedCategory] = useState('restaurant')
  const [hasChanges, setHasChanges] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  // 餐厅配置
  const [restaurantConfig, setRestaurantConfig] = useState<RestaurantConfig>({
    name: '武汉光谷禧朗酒店',
    address: '湖北省武汉市洪山区光谷大道123号',
    phone: '027-87627555',
    businessHours: {
      open: '10:00',
      close: '23:00'
    },
    serviceCharge: 15,
    description: '专业的西餐厅，提供高品质的用餐体验',
    wifi: {
      enabled: true,
      ssid: 'XiLang_WiFi',
      password: 'xl123456'
    }
  })

  // 系统配置
  const [systemConfig, setSystemConfig] = useState<SystemConfig>({
    autoSave: true,
    soundEnabled: true,
    theme: 'light',
    language: 'zh-CN',
    tableLockTimeout: 30,
    orderReminder: true
  })

  // 打印机配置
  const [printerConfig, setPrinterConfig] = useState<PrinterConfig>({
    enabled: true,
    name: '厨房打印机',
    ip: '192.168.1.100',
    port: 9100,
    paperWidth: 80,
    template: 'default'
  })

  // 支付方式配置
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: 'cash',
      name: '现金支付',
      enabled: true,
      config: {}
    },
    {
      id: 'alipay',
      name: '支付宝',
      enabled: true,
      config: {
        appId: 'your_app_id',
        privateKey: '****'
      }
    },
    {
      id: 'wechat',
      name: '微信支付',
      enabled: true,
      config: {
        appId: 'your_wechat_app_id',
        mchId: 'your_mch_id',
        apiKey: '****'
      }
    },
    {
      id: 'card',
      name: 'POS刷卡',
      enabled: false,
      config: {}
    }
  ])

  // 配置分类
  const configCategories: ConfigCategory[] = [
    {
      id: 'restaurant',
      name: '餐厅配置',
      icon: <Store className="w-5 h-5" />,
      description: '餐厅基本信息、营业时间等设置'
    },
    {
      id: 'system',
      name: '系统设置',
      icon: <Settings className="w-5 h-5" />,
      description: '系统偏好、界面设置等'
    },
    {
      id: 'printer',
      name: '打印配置',
      icon: <Printer className="w-5 h-5" />,
      description: '打印机设置、小票模板配置'
    },
    {
      id: 'payment',
      name: '支付配置',
      icon: <CreditCard className="w-5 h-5" />,
      description: '支付方式、第三方支付配置'
    },
    {
      id: 'staff',
      name: '员工管理',
      icon: <Users className="w-5 h-5" />,
      description: '员工账号、权限管理'
    }
  ]

  // 保存配置
  const saveConfig = () => {
    console.log('保存配置:', {
      restaurant: restaurantConfig,
      system: systemConfig,
      printer: printerConfig,
      payment: paymentMethods
    })
    setHasChanges(false)
    // 这里添加实际的保存逻辑
    alert('配置已保存！')
  }

  // 重置配置
  const resetConfig = () => {
    if (confirm('确定要重置当前分类的配置吗？此操作不可撤销。')) {
      // 重置逻辑
      setHasChanges(false)
      alert('配置已重置！')
    }
  }

  // 测试打印机连接
  const testPrinter = () => {
    console.log('测试打印机连接:', printerConfig)
    alert('正在测试打印机连接...')
  }

  // 切换支付方式状态
  const togglePaymentMethod = (id: string) => {
    setPaymentMethods(methods => 
      methods.map(method => 
        method.id === id 
          ? { ...method, enabled: !method.enabled }
          : method
      )
    )
    setHasChanges(true)
  }

  const goBack = () => {
    if (hasChanges) {
      if (confirm('您有未保存的更改，确定要离开吗？')) {
        navigate(-1)
      }
    } else {
      navigate(-1)
    }
  }

  // 渲染餐厅配置
  const renderRestaurantConfig = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        {/* 基本信息 */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
              <Store className="w-5 h-5 text-orange-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">基本信息</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">餐厅名称</label>
              <input
                type="text"
                value={restaurantConfig.name}
                onChange={(e) => {
                  setRestaurantConfig({...restaurantConfig, name: e.target.value})
                  setHasChanges(true)
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">联系电话</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="tel"
                  value={restaurantConfig.phone}
                  onChange={(e) => {
                    setRestaurantConfig({...restaurantConfig, phone: e.target.value})
                    setHasChanges(true)
                  }}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">餐厅地址</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                <textarea
                  value={restaurantConfig.address}
                  onChange={(e) => {
                    setRestaurantConfig({...restaurantConfig, address: e.target.value})
                    setHasChanges(true)
                  }}
                  rows={3}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 resize-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 营业设置 */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">营业设置</h3>
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">营业开始时间</label>
                <input
                  type="time"
                  value={restaurantConfig.businessHours.open}
                  onChange={(e) => {
                    setRestaurantConfig({
                      ...restaurantConfig,
                      businessHours: {...restaurantConfig.businessHours, open: e.target.value}
                    })
                    setHasChanges(true)
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">营业结束时间</label>
                <input
                  type="time"
                  value={restaurantConfig.businessHours.close}
                  onChange={(e) => {
                    setRestaurantConfig({
                      ...restaurantConfig,
                      businessHours: {...restaurantConfig.businessHours, close: e.target.value}
                    })
                    setHasChanges(true)
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">服务费比例 (%)</label>
              <input
                type="number"
                min="0"
                max="100"
                step="0.1"
                value={restaurantConfig.serviceCharge}
                onChange={(e) => {
                  setRestaurantConfig({...restaurantConfig, serviceCharge: parseFloat(e.target.value)})
                  setHasChanges(true)
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">餐厅简介</label>
              <textarea
                value={restaurantConfig.description}
                onChange={(e) => {
                  setRestaurantConfig({...restaurantConfig, description: e.target.value})
                  setHasChanges(true)
                }}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 resize-none"
                placeholder="介绍您的餐厅特色..."
              />
            </div>
          </div>
        </div>
      </div>

      {/* WiFi设置 */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
            <Wifi className="w-5 h-5 text-green-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">WiFi设置</h3>
        </div>
        
        <div className="grid grid-cols-3 gap-6">
          <div className="flex items-center">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={restaurantConfig.wifi.enabled}
                onChange={(e) => {
                  setRestaurantConfig({
                    ...restaurantConfig,
                    wifi: {...restaurantConfig.wifi, enabled: e.target.checked}
                  })
                  setHasChanges(true)
                }}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
              <span className="ml-3 text-sm font-medium text-gray-700">启用WiFi</span>
            </label>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">网络名称 (SSID)</label>
            <input
              type="text"
              value={restaurantConfig.wifi.ssid}
              onChange={(e) => {
                setRestaurantConfig({
                  ...restaurantConfig,
                  wifi: {...restaurantConfig.wifi, ssid: e.target.value}
                })
                setHasChanges(true)
              }}
              disabled={!restaurantConfig.wifi.enabled}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 disabled:bg-gray-100 disabled:text-gray-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">WiFi密码</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={restaurantConfig.wifi.password}
                onChange={(e) => {
                  setRestaurantConfig({
                    ...restaurantConfig,
                    wifi: {...restaurantConfig.wifi, password: e.target.value}
                  })
                  setHasChanges(true)
                }}
                disabled={!restaurantConfig.wifi.enabled}
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 disabled:bg-gray-100 disabled:text-gray-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  // 渲染系统设置
  const renderSystemConfig = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        {/* 界面设置 */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <Settings className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">界面设置</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">主题设置</label>
              <select
                value={systemConfig.theme}
                onChange={(e) => {
                  setSystemConfig({...systemConfig, theme: e.target.value as any})
                  setHasChanges(true)
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
              >
                <option value="light">浅色主题</option>
                <option value="dark">深色主题</option>
                <option value="auto">跟随系统</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">语言设置</label>
              <select
                value={systemConfig.language}
                onChange={(e) => {
                  setSystemConfig({...systemConfig, language: e.target.value as any})
                  setHasChanges(true)
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
              >
                <option value="zh-CN">简体中文</option>
                <option value="en-US">English</option>
              </select>
            </div>
          </div>
        </div>

        {/* 功能设置 */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <Volume2 className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">功能设置</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-medium text-gray-700">自动保存</span>
                <p className="text-xs text-gray-500">自动保存订单和配置更改</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={systemConfig.autoSave}
                  onChange={(e) => {
                    setSystemConfig({...systemConfig, autoSave: e.target.checked})
                    setHasChanges(true)
                  }}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-medium text-gray-700">声音提醒</span>
                <p className="text-xs text-gray-500">新订单和操作提醒音</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={systemConfig.soundEnabled}
                  onChange={(e) => {
                    setSystemConfig({...systemConfig, soundEnabled: e.target.checked})
                    setHasChanges(true)
                  }}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-medium text-gray-700">订单提醒</span>
                <p className="text-xs text-gray-500">长时间未处理订单提醒</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={systemConfig.orderReminder}
                  onChange={(e) => {
                    setSystemConfig({...systemConfig, orderReminder: e.target.checked})
                    setHasChanges(true)
                  }}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
              </label>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">桌台锁定超时 (分钟)</label>
              <input
                type="number"
                min="1"
                max="120"
                value={systemConfig.tableLockTimeout}
                onChange={(e) => {
                  setSystemConfig({...systemConfig, tableLockTimeout: parseInt(e.target.value)})
                  setHasChanges(true)
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
              />
              <p className="text-xs text-gray-500 mt-1">桌台无操作多久后自动解锁</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  // 渲染打印配置
  const renderPrinterConfig = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
              <Printer className="w-5 h-5 text-indigo-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">打印机设置</h3>
          </div>
          
          <button
            onClick={testPrinter}
            className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors text-sm"
          >
            测试连接
          </button>
        </div>
        
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={printerConfig.enabled}
                  onChange={(e) => {
                    setPrinterConfig({...printerConfig, enabled: e.target.checked})
                    setHasChanges(true)
                  }}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-500"></div>
                <span className="ml-3 text-sm font-medium text-gray-700">启用打印功能</span>
              </label>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">打印机名称</label>
              <input
                type="text"
                value={printerConfig.name}
                onChange={(e) => {
                  setPrinterConfig({...printerConfig, name: e.target.value})
                  setHasChanges(true)
                }}
                disabled={!printerConfig.enabled}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 disabled:bg-gray-100 disabled:text-gray-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">打印机IP地址</label>
              <input
                type="text"
                value={printerConfig.ip}
                onChange={(e) => {
                  setPrinterConfig({...printerConfig, ip: e.target.value})
                  setHasChanges(true)
                }}
                disabled={!printerConfig.enabled}
                placeholder="192.168.1.100"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 disabled:bg-gray-100 disabled:text-gray-500"
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">端口号</label>
              <input
                type="number"
                value={printerConfig.port}
                onChange={(e) => {
                  setPrinterConfig({...printerConfig, port: parseInt(e.target.value)})
                  setHasChanges(true)
                }}
                disabled={!printerConfig.enabled}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 disabled:bg-gray-100 disabled:text-gray-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">纸张宽度 (mm)</label>
              <select
                value={printerConfig.paperWidth}
                onChange={(e) => {
                  setPrinterConfig({...printerConfig, paperWidth: parseInt(e.target.value)})
                  setHasChanges(true)
                }}
                disabled={!printerConfig.enabled}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 disabled:bg-gray-100 disabled:text-gray-500"
              >
                <option value={58}>58mm</option>
                <option value={80}>80mm</option>
                <option value={110}>110mm</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">小票模板</label>
              <select
                value={printerConfig.template}
                onChange={(e) => {
                  setPrinterConfig({...printerConfig, template: e.target.value})
                  setHasChanges(true)
                }}
                disabled={!printerConfig.enabled}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 disabled:bg-gray-100 disabled:text-gray-500"
              >
                <option value="default">默认模板</option>
                <option value="simple">简洁模板</option>
                <option value="detailed">详细模板</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  // 渲染支付配置
  const renderPaymentConfig = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
            <CreditCard className="w-5 h-5 text-green-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">支付方式配置</h3>
        </div>
        
        <div className="space-y-4">
          {paymentMethods.map((method) => (
            <div key={method.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    method.enabled ? 'bg-green-100' : 'bg-gray-100'
                  }`}>
                    <CreditCard className={`w-5 h-5 ${
                      method.enabled ? 'text-green-600' : 'text-gray-400'
                    }`} />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">{method.name}</h4>
                    <p className="text-sm text-gray-500">
                      {method.enabled ? '已启用' : '已禁用'}
                    </p>
                  </div>
                </div>
                
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={method.enabled}
                    onChange={() => togglePaymentMethod(method.id)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                </label>
              </div>
              
              {method.enabled && Object.keys(method.config).length > 0 && (
                <div className="border-t border-gray-200 pt-4">
                  <h5 className="text-sm font-medium text-gray-700 mb-3">配置参数</h5>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(method.config).map(([key, value]) => (
                      <div key={key}>
                        <label className="block text-xs text-gray-600 mb-1 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                        </label>
                        <input
                          type={key.includes('Key') || key.includes('password') ? 'password' : 'text'}
                          value={value as string}
                          onChange={(e) => {
                            const updatedMethods = paymentMethods.map(m => 
                              m.id === method.id 
                                ? { ...m, config: { ...m.config, [key]: e.target.value } }
                                : m
                            )
                            setPaymentMethods(updatedMethods)
                            setHasChanges(true)
                          }}
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                          placeholder={`输入${key}`}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  // 渲染员工管理
  const renderStaffManagement = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">员工账号管理</h3>
          </div>
          
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
            <Plus className="w-4 h-4" />
            添加员工
          </button>
        </div>
        
        {/* 员工列表 */}
        <div className="space-y-4">
          {[
            { id: 1, name: '张经理', role: '店长', status: 'active', phone: '13888888888' },
            { id: 2, name: '李收银', role: '收银员', status: 'active', phone: '13777777777' },
            { id: 3, name: '王服务', role: '服务员', status: 'inactive', phone: '13666666666' },
            { id: 4, name: '赵厨师', role: '厨师', status: 'active', phone: '13555555555' }
          ].map((staff) => (
            <div key={staff.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">{staff.name}</h4>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>{staff.role}</span>
                    <span>{staff.phone}</span>
                    <span className={`px-2 py-1 rounded text-xs ${
                      staff.status === 'active' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {staff.status === 'active' ? '正常' : '禁用'}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                  <Edit3 className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  // 渲染当前配置内容
  const renderCurrentConfig = () => {
    switch (selectedCategory) {
      case 'restaurant':
        return renderRestaurantConfig()
      case 'system':
        return renderSystemConfig()
      case 'printer':
        return renderPrinterConfig()
      case 'payment':
        return renderPaymentConfig()
      case 'staff':
        return renderStaffManagement()
      default:
        return null
    }
  }

  return (
    <div className="h-full w-full bg-gray-50 flex">
      {/* 左侧配置分类 */}
      <div className="w-80 bg-white border-r border-gray-200 shadow-sm flex flex-col">
        {/* 头部 */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-4 mb-4">
            <button 
              onClick={goBack}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>返回</span>
            </button>
            <div className="h-6 w-px bg-gray-300" />
            <h1 className="text-xl font-bold text-gray-800">系统配置</h1>
          </div>
          <p className="text-gray-600 text-sm">管理餐厅和系统各项设置</p>
        </div>

        {/* 配置分类列表 */}
        <div className="flex-1 p-4">
          <div className="space-y-2">
            {configCategories.map((category, index) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`w-full text-left p-4 rounded-lg border transition-all duration-200 group animate-slide-up ${
                  selectedCategory === category.id
                    ? 'border-orange-300 bg-orange-50 shadow-md'
                    : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-100 text-gray-600 group-hover:bg-gray-200'
                  }`}>
                    {category.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-semibold mb-1 transition-colors ${
                      selectedCategory === category.id
                        ? 'text-orange-600'
                        : 'text-gray-800 group-hover:text-gray-900'
                    }`}>
                      {category.name}
                    </h3>
                    <p className="text-xs text-gray-500 line-clamp-2">
                      {category.description}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 右侧配置内容 */}
      <div className="flex-1 flex flex-col">
        {/* 顶部工具栏 */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                {configCategories.find(cat => cat.id === selectedCategory)?.name}
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                {configCategories.find(cat => cat.id === selectedCategory)?.description}
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              {hasChanges && (
                <span className="text-sm text-orange-600 bg-orange-100 px-3 py-1 rounded-full">
                  有未保存的更改
                </span>
              )}
              
              <button
                onClick={resetConfig}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                <span>重置</span>
              </button>
              
              <button
                onClick={saveConfig}
                disabled={!hasChanges}
                className={`flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition-all ${
                  hasChanges
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 shadow-md'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                <Save className="w-4 h-4" />
                <span>保存配置</span>
              </button>
            </div>
          </div>
        </div>

        {/* 配置内容区域 */}
        <div className="flex-1 p-6 overflow-y-auto">
          {renderCurrentConfig()}
        </div>
      </div>
    </div>
  )
}

export default SettingsPage