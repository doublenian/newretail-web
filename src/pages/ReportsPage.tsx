import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, FileText, BarChart3, PieChart, TrendingUp, Download, Calendar, Filter, RefreshCw, ChevronLeft, ChevronRight } from 'lucide-react'

interface ReportCategory {
  id: string
  name: string
  reports: Report[]
}

interface Report {
  id: string
  name: string
  description?: string
}

interface TableData {
  id: string
  name: string
  quantity: number
  amount: number
  status: string
  category: string
  date: string
  paymentMethod: string
}

const ReportsPage: React.FC = () => {
  const navigate = useNavigate()
  const [selectedCategory, setSelectedCategory] = useState('financial')
  const [selectedReport, setSelectedReport] = useState<Report | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)

  // 模拟表格数据
  const mockTableData: TableData[] = Array.from({ length: 150 }, (_, index) => ({
    id: `${index + 1}`,
    name: `数据项目 ${index + 1}`,
    quantity: Math.floor(Math.random() * 1000) + 1,
    amount: Math.floor(Math.random() * 10000) + 100,
    status: ['正常', '异常', '待处理'][Math.floor(Math.random() * 3)],
    category: ['财务', '销售', '其他'][Math.floor(Math.random() * 3)],
    date: `2025-05-${String(Math.floor(Math.random() * 30) + 1).padStart(2, '0')}`,
    paymentMethod: ['现金', '支付宝', '微信', '银行卡'][Math.floor(Math.random() * 4)]
  }))

  // 报表分类数据
  const reportCategories: ReportCategory[] = [
    {
      id: 'financial',
      name: '财务报表',
      reports: [
        { id: 'restaurant-financial', name: '餐厅财务报表', description: '餐厅整体财务状况统计' },
        { id: 'hotel-financial', name: '酒店财务报表', description: '酒店财务收支明细' },
        { id: 'meal-period-summary', name: '餐段概要报表', description: '各餐段营收汇总' },
        { id: 'restaurant-meal-financial', name: '餐厅餐段财务报表', description: '餐厅各餐段财务详情' },
        { id: 'staff-financial', name: '员工财务报表', description: '员工相关财务统计' },
        { id: 'income-detail', name: '收入详列报表', description: '详细收入明细列表' },
        { id: 'payment-detail', name: '账单付款详列报表', description: '付款记录详细列表' },
        { id: 'settled-bill-detail', name: '已结账报表明细', description: '已结算账单明细' },
        { id: 'payment-method-detail', name: '结账方式明细报表', description: '各种支付方式统计' },
        { id: 'meal-period-payment-summary', name: '餐段结账方式汇总', description: '餐段支付方式汇总' },
        { id: 'dining-type-summary', name: '用餐性质汇总报表', description: '用餐类型统计汇总' },
        { id: 'cashier-report', name: '收银报表', description: '收银台操作统计' }
      ]
    },
    {
      id: 'sales',
      name: '销售报表',
      reports: [
        { id: 'dish-category-analysis', name: '菜品大类分析表', description: '菜品分类销售分析' },
        { id: 'dish-subcategory-analysis', name: '菜品小类分析表', description: '菜品子分类分析' },
        { id: 'top-dish-sales', name: '最高菜品销售报表', description: '热销菜品排行' },
        { id: 'top-beverage-sales', name: '最高酒水销售报表', description: '热销酒水排行' },
        { id: 'beverage-analysis', name: '酒水分析报表', description: '酒水销售详细分析' },
        { id: 'dish-sales-detail', name: '菜品销售明细报表', description: '菜品销售详细记录' },
        { id: 'dish-sales-summary', name: '菜品销售汇总报表', description: '菜品销售汇总统计' },
        { id: 'table-consumption', name: '餐桌消费报表', description: '各餐桌消费统计' },
        { id: 'sales-staff-stats', name: '销售人员统计报表', description: '销售人员业绩统计' },
        { id: 'sales-performance', name: '销售员业绩报表', description: '销售员详细业绩' }
      ]
    },
    {
      id: 'other',
      name: '其他报表',
      reports: [
        { id: 'staff-settled-bills', name: '员工已结账单报表', description: '员工已结算账单' },
        { id: 'staff-unsettled-bills', name: '员工未结账单报表', description: '员工未结算账单' },
        { id: 'restaurant-unsettled-bills', name: '餐厅未结账单报表', description: '餐厅未结算账单' },
        { id: 'restaurant-settled-bills', name: '餐厅已结账单报表', description: '餐厅已结算账单' },
        { id: 'dining-nature-summary', name: '用餐性质汇总报表', description: '用餐性质统计' },
        { id: 'oc-detail', name: 'OC 明细报表', description: 'OC操作明细记录' },
        { id: 'ent-detail', name: 'ENT 报表明细', description: 'ENT相关报表' },
        { id: 'bill-operation-log', name: '账单操作日志表', description: '账单操作记录' },
        { id: 'discount-report', name: '折扣报表', description: '折扣使用统计' },
        { id: 'unsettled-report', name: '未结账报表', description: '未结算账单统计' }
      ]
    }
  ]

  // 获取当前选中分类的报表
  const getCurrentCategoryReports = () => {
    const category = reportCategories.find(cat => cat.id === selectedCategory)
    return category?.reports || []
  }

  // 获取分类图标
  const getCategoryIcon = (categoryId: string) => {
    switch (categoryId) {
      case 'financial':
        return <TrendingUp className="w-5 h-5" />
      case 'sales':
        return <BarChart3 className="w-5 h-5" />
      case 'other':
        return <PieChart className="w-5 h-5" />
      default:
        return <FileText className="w-5 h-5" />
    }
  }

  // 分页逻辑
  const totalPages = Math.ceil(mockTableData.length / pageSize)
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const currentPageData = mockTableData.slice(startIndex, endIndex)

  // 获取状态样式
  const getStatusStyle = (status: string) => {
    switch (status) {
      case '正常':
        return 'bg-green-100 text-green-800'
      case '异常':
        return 'bg-red-100 text-red-800'
      case '待处理':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  // 生成报表
  const generateReport = async (report: Report) => {
    setIsGenerating(true)
    setSelectedReport(report)
    setCurrentPage(1) // 重置到第一页
    
    // 模拟报表生成过程
    setTimeout(() => {
      setIsGenerating(false)
      console.log('Generated report:', report.id)
    }, 1500)
  }

  // 页码跳转
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  // 页面大小改变
  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize)
    setCurrentPage(1) // 重置到第一页
  }

  const goBack = () => {
    navigate(-1)
  }

  return (
    <div className="h-full w-full bg-gray-50 flex">
      {/* 左侧报表类型区域 */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col shadow-sm">
        {/* 头部标题 */}
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
            <h1 className="text-xl font-bold text-gray-800">营业报表</h1>
          </div>
          
          <p className="text-gray-600 text-sm">选择报表类型查看详细数据分析</p>
        </div>

        {/* 报表分类选项卡 */}
        <div className="flex border-b border-gray-200">
          {reportCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-all duration-200 relative ${
                selectedCategory === category.id
                  ? 'text-orange-600 bg-orange-50'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              {category.name}
              {selectedCategory === category.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500"></div>
              )}
            </button>
          ))}
        </div>

        {/* 报表列表 */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-2">
            {getCurrentCategoryReports().map((report, index) => (
              <button
                key={report.id}
                onClick={() => generateReport(report)}
                className={`w-full text-left p-4 rounded-lg border transition-all duration-200 hover:shadow-md group animate-slide-up ${
                  selectedReport?.id === report.id
                    ? 'border-orange-300 bg-orange-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    selectedReport?.id === report.id
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-100 text-gray-600 group-hover:bg-gray-200'
                  }`}>
                    {getCategoryIcon(selectedCategory)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-800 mb-1 group-hover:text-orange-600 transition-colors">
                      {report.name}
                    </h3>
                    {report.description && (
                      <p className="text-xs text-gray-500 line-clamp-2">
                        {report.description}
                      </p>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 右侧报表显示区域 */}
      <div className="flex-1 flex flex-col">
        {/* 报表工具栏 */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {selectedReport ? (
                <>
                  <h2 className="text-lg font-semibold text-gray-800">{selectedReport.name}</h2>
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full">
                    实时数据
                  </span>
                </>
              ) : (
                <h2 className="text-lg font-semibold text-gray-800">请选择报表</h2>
              )}
            </div>
            
            {selectedReport && (
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">
                  <Calendar className="w-4 h-4" />
                  <span>时间筛选</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">
                  <Filter className="w-4 h-4" />
                  <span>筛选条件</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">
                  <RefreshCw className="w-4 h-4" />
                  <span>刷新数据</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:from-orange-600 hover:to-red-600 transition-all">
                  <Download className="w-4 h-4" />
                  <span>导出报表</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 报表内容区域 */}
        <div className="flex-1 bg-white overflow-hidden flex flex-col">
          {isGenerating ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin mx-auto mb-4"></div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">正在生成报表...</h3>
                <p className="text-gray-500">请稍候，正在处理数据并生成报表</p>
              </div>
            </div>
          ) : selectedReport ? (
            <>
              {/* 报表信息栏 */}
              <div className="p-4 bg-gray-50 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-800">{selectedReport.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      生成时间: {new Date().toLocaleString('zh-CN')} | 
                      共 {mockTableData.length} 条记录
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-600">每页显示:</span>
                    <select
                      value={pageSize}
                      onChange={(e) => handlePageSizeChange(Number(e.target.value))}
                      className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-orange-500"
                    >
                      <option value={10}>10 条</option>
                      <option value={20}>20 条</option>
                      <option value={50}>50 条</option>
                      <option value={100}>100 条</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* 表格容器 */}
              <div className="flex-1 overflow-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 sticky top-0 z-10">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">序号</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">项目名称</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">数量</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">金额</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">分类</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">日期</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">支付方式</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">状态</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {currentPageData.map((item, index) => (
                      <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {startIndex + index + 1}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {item.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {item.quantity.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                          ¥{item.amount.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {item.category}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {item.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {item.paymentMethod}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusStyle(item.status)}`}>
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* 分页控件 */}
              <div className="bg-white border-t border-gray-200 px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-700">
                    显示第 {startIndex + 1} 到 {Math.min(endIndex, mockTableData.length)} 条，共 {mockTableData.length} 条记录
                  </div>
                  
                  <div className="flex items-center gap-4">
                    {/* 上一页按钮 */}
                    <button
                      onClick={() => goToPage(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                        currentPage === 1
                          ? 'text-gray-400 cursor-not-allowed'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <ChevronLeft className="w-4 h-4" />
                      上一页
                    </button>

                    {/* 页码 */}
                    <div className="flex items-center gap-1">
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        let pageNum
                        if (totalPages <= 5) {
                          pageNum = i + 1
                        } else if (currentPage <= 3) {
                          pageNum = i + 1
                        } else if (currentPage >= totalPages - 2) {
                          pageNum = totalPages - 4 + i
                        } else {
                          pageNum = currentPage - 2 + i
                        }

                        return (
                          <button
                            key={pageNum}
                            onClick={() => goToPage(pageNum)}
                            className={`w-8 h-8 text-sm font-medium rounded-lg transition-colors ${
                              currentPage === pageNum
                                ? 'bg-orange-500 text-white'
                                : 'text-gray-700 hover:bg-gray-100'
                            }`}
                          >
                            {pageNum}
                          </button>
                        )
                      })}
                    </div>

                    {/* 下一页按钮 */}
                    <button
                      onClick={() => goToPage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                        currentPage === totalPages
                          ? 'text-gray-400 cursor-not-allowed'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      下一页
                      <ChevronRight className="w-4 h-4" />
                    </button>

                    {/* 跳转到指定页 */}
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <span>前往</span>
                      <input
                        type="number"
                        min="1"
                        max={totalPages}
                        value={currentPage}
                        onChange={(e) => {
                          const page = parseInt(e.target.value)
                          if (page >= 1 && page <= totalPages) {
                            goToPage(page)
                          }
                        }}
                        className="w-16 px-2 py-1 text-center border border-gray-300 rounded focus:outline-none focus:border-orange-500"
                      />
                      <span>页</span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FileText className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">请选择报表类型</h3>
                <p className="text-gray-500 mb-6">从左侧选择您需要查看的报表类型和具体报表</p>
                <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
                  {reportCategories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:border-orange-300 hover:shadow-md transition-all duration-200 group"
                    >
                      <div className="w-10 h-10 bg-gray-100 group-hover:bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-2 transition-colors">
                        {getCategoryIcon(category.id)}
                      </div>
                      <div className="text-sm font-medium text-gray-700 group-hover:text-orange-600 transition-colors">
                        {category.name}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ReportsPage