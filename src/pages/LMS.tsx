import { PlayCircle, CheckCircle2, ChevronLeft, MessageSquare, FileText, Menu, BookOpen, AlertCircle, Check, Send } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

export default function LMS() {
  const [activeTab, setActiveTab] = useState('notes');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentLesson, setCurrentLesson] = useState(1); // 1: Video, 2: Case Study
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const handleQuizSubmit = () => {
    if (selectedAnswer !== null) {
      setQuizSubmitted(true);
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <div className={`bg-white border-r border-slate-200 w-80 flex-shrink-0 flex flex-col transition-all duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full absolute z-20 h-full'}`}>
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <Link to="/courses/1" className="flex items-center gap-2 text-slate-600 hover:text-blue-600 font-medium transition-colors">
            <ChevronLeft size={20} /> Quay lại
          </Link>
          {sidebarOpen && (
            <button onClick={() => setSidebarOpen(false)} className="md:hidden text-slate-500 hover:text-slate-700">
              <ChevronLeft size={24} />
            </button>
          )}
        </div>
        <div className="p-5 border-b border-slate-200 bg-slate-50/50">
          <h2 className="font-bold text-slate-900 mb-3 text-lg">Nhập môn AI & Sự thật</h2>
          <div className="flex items-center gap-3 text-sm text-slate-600 font-medium">
            <div className="flex-1 bg-slate-200 rounded-full h-2 overflow-hidden">
              <div className="bg-blue-600 h-full rounded-full" style={{ width: '33%' }}></div>
            </div>
            <span>33%</span>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="p-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-2">Học phần 1: Nền tảng</h3>
            <div className="space-y-1.5">
              <button 
                onClick={() => setCurrentLesson(1)}
                className={`w-full flex items-start gap-3 p-3 rounded-xl text-left transition-colors ${currentLesson === 1 ? 'bg-blue-50 text-blue-700' : 'hover:bg-slate-100 text-slate-700'}`}
              >
                {currentLesson === 1 ? <PlayCircle size={20} className="shrink-0 mt-0.5 text-blue-600" /> : <CheckCircle2 size={20} className="shrink-0 mt-0.5 text-emerald-500" />}
                <div>
                  <div className={`font-medium text-sm ${currentLesson === 1 ? 'text-blue-700' : 'text-slate-700'}`}>1. AI là gì và không là gì?</div>
                  <div className={`text-xs mt-1 ${currentLesson === 1 ? 'text-blue-500' : 'text-slate-500'}`}>Video • 15:00</div>
                </div>
              </button>
              
              <button 
                onClick={() => setCurrentLesson(2)}
                className={`w-full flex items-start gap-3 p-3 rounded-xl text-left transition-colors ${currentLesson === 2 ? 'bg-blue-50 text-blue-700' : 'hover:bg-slate-100 text-slate-700'}`}
              >
                {currentLesson === 2 ? <BookOpen size={20} className="shrink-0 mt-0.5 text-blue-600" /> : <div className="w-5 h-5 rounded-full border-2 border-slate-300 shrink-0 mt-0.5"></div>}
                <div>
                  <div className={`font-medium text-sm ${currentLesson === 2 ? 'text-blue-700' : 'text-slate-700'}`}>2. Case Study: Sự cố thiên kiến</div>
                  <div className={`text-xs mt-1 ${currentLesson === 2 ? 'text-blue-500' : 'text-slate-500'}`}>Thực hành • 10 điểm EXP</div>
                </div>
              </button>
            </div>
          </div>
          <div className="p-4 border-t border-slate-100">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-2">Học phần 2: Ứng dụng</h3>
            <div className="space-y-1.5">
              <button className="w-full flex items-start gap-3 p-3 rounded-xl hover:bg-slate-100 text-slate-700 text-left opacity-60 cursor-not-allowed">
                <div className="w-5 h-5 rounded-full border-2 border-slate-300 shrink-0 mt-0.5"></div>
                <div>
                  <div className="font-medium text-sm">1. Bản quyền và Sở hữu trí tuệ</div>
                  <div className="text-xs text-slate-500 mt-1">Video • 25:00</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative bg-white">
        {/* Topbar */}
        <div className="h-16 bg-white border-b border-slate-200 flex items-center px-4 md:px-8 justify-between shrink-0 shadow-sm z-10">
          <div className="flex items-center gap-4">
            {!sidebarOpen && (
              <button onClick={() => setSidebarOpen(true)} className="text-slate-500 hover:text-blue-600 transition-colors p-1">
                <Menu size={24} />
              </button>
            )}
            <h1 className="font-bold text-slate-900 truncate text-lg">
              {currentLesson === 1 ? '1. AI là gì và không là gì?' : '2. Case Study: Sự cố thiên kiến trong tuyển dụng'}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 bg-orange-50 text-orange-600 px-3 py-1.5 rounded-lg text-sm font-bold border border-orange-100">
              +10 EXP
            </div>
            <button className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-blue-600 transition-colors shadow-sm">
              <span className="hidden sm:inline">Bài tiếp theo</span> <ChevronLeft size={16} className="rotate-180" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          
          {/* LESSON 1: VIDEO */}
          {currentLesson === 1 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col h-full">
              <div className="bg-slate-900 w-full aspect-video md:aspect-[21/9] lg:aspect-[24/9] relative flex items-center justify-center overflow-hidden">
                <img src="https://picsum.photos/seed/video-placeholder/1920/1080" alt="Video" className="w-full h-full object-cover opacity-40 mix-blend-overlay" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-slate-900/80 to-transparent">
                  <button className="w-20 h-20 bg-white/10 hover:bg-blue-600/90 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all shadow-2xl border border-white/20 group transform hover:scale-110">
                    <PlayCircle size={48} className="ml-1 group-hover:scale-110 transition-transform" />
                  </button>
                </div>
              </div>

              {/* Content Tabs */}
              <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex border-b border-slate-200 mb-8">
                  <button 
                    className={`px-8 py-4 font-semibold text-sm border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'notes' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
                    onClick={() => setActiveTab('notes')}
                  >
                    <FileText size={18} /> Ghi chú của tôi
                  </button>
                  <button 
                    className={`px-8 py-4 font-semibold text-sm border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'qa' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
                    onClick={() => setActiveTab('qa')}
                  >
                    <MessageSquare size={18} /> Thảo luận (12)
                  </button>
                </div>

                {activeTab === 'notes' && (
                  <div className="space-y-6">
                    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex gap-4 focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-300 transition-all">
                      <div className="w-16 h-8 bg-slate-100 rounded-lg text-xs font-mono font-bold flex items-center justify-center text-slate-600 shrink-0">04:20</div>
                      <textarea 
                        className="w-full bg-transparent border-none focus:ring-0 resize-none text-slate-700 placeholder:text-slate-400 p-0" 
                        placeholder="Thêm ghi chú tại mốc thời gian này..."
                        rows={2}
                      ></textarea>
                      <button className="bg-slate-900 hover:bg-blue-600 text-white px-5 py-2 rounded-xl text-sm font-medium self-end transition-colors shadow-sm">Lưu</button>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 flex gap-4 group hover:bg-white hover:shadow-sm transition-all">
                        <button className="w-16 h-8 bg-blue-100 text-blue-700 rounded-lg text-xs font-mono font-bold flex items-center justify-center shrink-0 transition-colors hover:bg-blue-200">01:15</button>
                        <p className="text-slate-700 text-sm pt-1 leading-relaxed">AI không phải là phép thuật, nó chỉ là toán học và xác suất thống kê dựa trên lượng dữ liệu khổng lồ. Việc hiểu điều này giúp ta không thần thánh hóa AI.</p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'qa' && (
                  <div className="space-y-8">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-full bg-slate-200 shrink-0 overflow-hidden border-2 border-white shadow-sm">
                        <img src="https://picsum.photos/seed/user/100/100" alt="User" referrerPolicy="no-referrer" />
                      </div>
                      <div className="flex-1">
                        <textarea 
                          className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm transition-all" 
                          placeholder="Đặt câu hỏi hoặc chia sẻ suy nghĩ của bạn..."
                          rows={3}
                        ></textarea>
                        <div className="flex justify-end mt-3">
                          <button className="bg-slate-900 text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-blue-600 transition-colors shadow-sm flex items-center gap-2">
                            <Send size={16} /> Gửi bình luận
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-6 pt-6 border-t border-slate-100">
                      <div className="flex gap-4">
                        <div className="w-12 h-12 rounded-full bg-slate-200 shrink-0 overflow-hidden border-2 border-white shadow-sm">
                          <img src="https://picsum.photos/seed/student1/100/100" alt="Student" referrerPolicy="no-referrer" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-bold text-sm text-slate-900">Trần Minh Tuấn</span>
                            <span className="text-xs text-slate-400 font-medium">2 ngày trước</span>
                          </div>
                          <p className="text-sm text-slate-700 mb-4 leading-relaxed">Thầy cho em hỏi, nếu AI chỉ là xác suất thì tại sao nó có thể sáng tạo ra những bức tranh chưa từng tồn tại?</p>
                          
                          <div className="flex gap-4 bg-blue-50/50 p-5 rounded-2xl border border-blue-100/50">
                            <div className="w-10 h-10 rounded-full bg-slate-200 shrink-0 overflow-hidden border-2 border-white shadow-sm">
                              <img src="https://picsum.photos/seed/instructor1/100/100" alt="Instructor" referrerPolicy="no-referrer" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-bold text-sm text-slate-900">TS. Nguyễn Văn A</span>
                                <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wide">Giảng viên</span>
                              </div>
                              <p className="text-sm text-slate-700 leading-relaxed">Chào Tuấn, câu hỏi rất hay. AI không "sáng tạo" theo cách con người làm. Nó học các đặc trưng (features) từ hàng triệu bức tranh, sau đó kết hợp các đặc trưng đó lại theo những cách mới dựa trên xác suất để tạo ra một kết quả trông có vẻ "mới" đối với chúng ta.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* LESSON 2: CASE STUDY */}
          {currentLesson === 2 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-bold uppercase tracking-wider mb-4">
                  <AlertCircle size={14} /> Tình huống thực tế
                </div>
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Sự cố AI phân biệt chủng tộc trong tuyển dụng</h2>
                <p className="text-slate-600 leading-relaxed text-lg">Đọc kỹ tình huống dưới đây và trả lời câu hỏi để hoàn thành bài học.</p>
              </div>

              {/* Scenario Context */}
              <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 md:p-8 mb-10 text-slate-800 leading-relaxed shadow-sm">
                <p className="mb-4">Năm 2018, một tập đoàn công nghệ khổng lồ đã phải bí mật hủy bỏ công cụ tuyển dụng bằng AI mà họ đã phát triển từ năm 2014. Hệ thống này được thiết kế để duyệt hồ sơ ứng viên (CV) và đánh giá họ từ 1 đến 5 sao.</p>
                <p className="mb-4">Tuy nhiên, các kỹ sư phát hiện ra rằng hệ thống này <strong>không đánh giá ứng viên một cách công bằng về giới tính</strong> đối với các vị trí phát triển phần mềm và các vị trí kỹ thuật khác.</p>
                <p>Nguyên nhân là do mô hình máy học của công ty đã được huấn luyện để quan sát các mẫu trong hồ sơ nộp cho công ty trong khoảng thời gian 10 năm. Hầu hết các hồ sơ đó đến từ nam giới, phản ánh sự thống trị của nam giới trong ngành công nghệ. Do đó, hệ thống đã tự học được rằng ứng viên nam được ưa chuộng hơn. Nó đã phạt các hồ sơ có chứa từ "phụ nữ" (ví dụ: "đội trưởng câu lạc bộ cờ vua nữ").</p>
              </div>

              {/* Quiz Section */}
              <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-md relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-blue-500"></div>
                <h3 className="text-xl font-bold text-slate-900 mb-6">Câu hỏi đánh giá</h3>
                <p className="font-medium text-slate-700 mb-6 text-lg">Theo bạn, bài học lớn nhất rút ra từ sự cố này về mặt Đạo đức AI là gì?</p>
                
                <div className="space-y-4 mb-8">
                  {[
                    { id: 1, text: "AI luôn luôn khách quan hơn con người vì nó dựa trên toán học." },
                    { id: 2, text: "Dữ liệu đầu vào (Training data) quyết định sự công bằng của AI. Dữ liệu có thiên kiến sẽ tạo ra AI có thiên kiến." },
                    { id: 3, text: "Không nên sử dụng AI trong lĩnh vực nhân sự vì nó quá nguy hiểm." },
                    { id: 4, text: "Chỉ cần lập trình viên là nữ giới thì AI sẽ không bị thiên kiến giới tính." }
                  ].map((option) => (
                    <button 
                      key={option.id}
                      onClick={() => !quizSubmitted && setSelectedAnswer(option.id)}
                      disabled={quizSubmitted}
                      className={`w-full text-left p-5 rounded-2xl border-2 transition-all flex items-start gap-4
                        ${selectedAnswer === option.id && !quizSubmitted ? 'border-blue-500 bg-blue-50' : ''}
                        ${selectedAnswer !== option.id && !quizSubmitted ? 'border-slate-200 hover:border-blue-300 hover:bg-slate-50' : ''}
                        ${quizSubmitted && option.id === 2 ? 'border-emerald-500 bg-emerald-50' : ''}
                        ${quizSubmitted && selectedAnswer === option.id && option.id !== 2 ? 'border-red-500 bg-red-50' : ''}
                        ${quizSubmitted && selectedAnswer !== option.id && option.id !== 2 ? 'border-slate-100 bg-slate-50 opacity-50' : ''}
                      `}
                    >
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5
                        ${selectedAnswer === option.id && !quizSubmitted ? 'border-blue-500' : ''}
                        ${selectedAnswer !== option.id && !quizSubmitted ? 'border-slate-300' : ''}
                        ${quizSubmitted && option.id === 2 ? 'border-emerald-500 bg-emerald-500 text-white' : ''}
                        ${quizSubmitted && selectedAnswer === option.id && option.id !== 2 ? 'border-red-500 bg-red-500 text-white' : ''}
                        ${quizSubmitted && selectedAnswer !== option.id && option.id !== 2 ? 'border-slate-200' : ''}
                      `}>
                        {selectedAnswer === option.id && !quizSubmitted && <div className="w-2.5 h-2.5 bg-blue-500 rounded-full"></div>}
                        {quizSubmitted && option.id === 2 && <Check size={14} />}
                      </div>
                      <span className={`font-medium ${quizSubmitted && option.id === 2 ? 'text-emerald-900' : 'text-slate-700'}`}>{option.text}</span>
                    </button>
                  ))}
                </div>

                {!quizSubmitted ? (
                  <div className="flex justify-end">
                    <button 
                      onClick={handleQuizSubmit}
                      disabled={selectedAnswer === null}
                      className={`px-8 py-3.5 rounded-xl font-bold text-white transition-all shadow-sm ${selectedAnswer !== null ? 'bg-slate-900 hover:bg-blue-600' : 'bg-slate-300 cursor-not-allowed'}`}
                    >
                      Kiểm tra đáp án
                    </button>
                  </div>
                ) : (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`p-6 rounded-2xl border ${selectedAnswer === 2 ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-red-50 border-red-200 text-red-800'}`}>
                    <h4 className="font-bold mb-2 text-lg flex items-center gap-2">
                      {selectedAnswer === 2 ? <><CheckCircle2 /> Chính xác! (+10 EXP)</> : 'Chưa chính xác!'}
                    </h4>
                    <p className="leading-relaxed">
                      {selectedAnswer === 2 
                        ? 'Tuyệt vời! AI học từ dữ liệu quá khứ. Nếu dữ liệu quá khứ chứa đựng sự bất bình đẳng (ví dụ: nam giới được tuyển nhiều hơn), AI sẽ coi đó là "quy luật" và tiếp tục áp dụng sự bất bình đẳng đó vào tương lai. Đây gọi là "Thiên kiến dữ liệu" (Data Bias).' 
                        : 'Đáp án đúng là: Dữ liệu đầu vào quyết định sự công bằng của AI. AI học từ dữ liệu quá khứ, nếu dữ liệu đó có thiên kiến, AI sẽ sao chép và khuếch đại thiên kiến đó.'}
                    </p>
                    {selectedAnswer === 2 && (
                      <button className="mt-6 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-colors shadow-sm">
                        Hoàn thành bài học
                      </button>
                    )}
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}

        </div>
      </div>
    </div>
  );
}
