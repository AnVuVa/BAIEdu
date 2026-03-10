import { Search, Copy, CheckCircle2, ExternalLink, Filter, Newspaper, Sparkles, BookOpen } from 'lucide-react';
import { useState, useMemo } from 'react';
import { motion } from 'motion/react';

export default function Library() {
  const [activeTab, setActiveTab] = useState('prompts');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('Tất cả');
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const handleCopy = (id: number, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const categories = ['Tất cả', 'Học tập', 'Sáng tạo', 'Viết lách', 'Nghiên cứu', 'Lập trình'];

  const prompts = [
    {
      id: 1,
      title: 'Tóm tắt tài liệu nghiên cứu',
      category: 'Nghiên cứu',
      content: 'Hãy đóng vai trò là một trợ lý nghiên cứu học thuật. Tôi sẽ cung cấp cho bạn một văn bản. Nhiệm vụ của bạn là tóm tắt các ý chính, phương pháp nghiên cứu và kết luận của văn bản đó trong khoảng 300 từ. Hãy giữ giọng văn khách quan và trích dẫn nguồn nếu có.',
    },
    {
      id: 2,
      title: 'Brainstorm ý tưởng tiểu luận',
      category: 'Sáng tạo',
      content: 'Tôi đang cần viết một bài tiểu luận về chủ đề [Chủ đề của bạn]. Hãy giúp tôi liệt kê 5 hướng tiếp cận khác nhau cho chủ đề này. Với mỗi hướng, hãy cung cấp 3 luận điểm chính và 1 câu hỏi nghiên cứu tiềm năng. Không viết sẵn bài cho tôi, chỉ gợi ý dàn ý.',
    },
    {
      id: 3,
      title: 'Kiểm tra ngữ pháp và văn phong',
      category: 'Viết lách',
      content: 'Hãy kiểm tra đoạn văn bản sau đây của tôi. Chỉ ra các lỗi ngữ pháp, chính tả và đề xuất cách diễn đạt tự nhiên hơn, học thuật hơn. Vui lòng giải thích lý do tại sao bạn đề xuất thay đổi đó để tôi có thể học hỏi. Đây là đoạn văn: [Đoạn văn của bạn]',
    },
    {
      id: 4,
      title: 'Giải thích code phức tạp',
      category: 'Lập trình',
      content: 'Hãy giải thích đoạn code [ngôn ngữ] dưới đây cho một người mới bắt đầu học lập trình. Phân tích từng dòng quan trọng, giải thích mục đích của các hàm/biến và đưa ra một ví dụ thực tế tương tự để dễ hình dung.',
    },
    {
      id: 5,
      title: 'Lập kế hoạch ôn thi',
      category: 'Học tập',
      content: 'Tôi có một kỳ thi môn [Tên môn] vào [Số ngày] ngày nữa. Khối lượng kiến thức bao gồm [Liệt kê các chương/chủ đề]. Hãy giúp tôi lập một thời gian biểu ôn tập chi tiết theo phương pháp Pomodoro, phân bổ thời gian hợp lý cho từng chủ đề và bao gồm cả thời gian làm bài thi thử.',
    }
  ];

  const newsArticles = [
    {
      id: 1,
      title: 'EU chính thức thông qua Đạo luật Trí tuệ Nhân tạo (AI Act)',
      date: '15/03/2026',
      source: 'Tech & Law Journal',
      summary: 'Đạo luật toàn diện đầu tiên trên thế giới về AI đã được thông qua, phân loại các hệ thống AI theo mức độ rủi ro và đặt ra các quy định nghiêm ngặt về minh bạch dữ liệu và bản quyền.',
      tags: ['Pháp lý', 'EU', 'Minh bạch']
    },
    {
      id: 2,
      title: 'Tranh cãi bản quyền: Các họa sĩ thắng kiện nền tảng AI tạo ảnh',
      date: '10/03/2026',
      source: 'Creative Rights News',
      summary: 'Một phán quyết mang tính bước ngoặt yêu cầu các công ty phát triển AI phải bồi thường và gỡ bỏ các tác phẩm nghệ thuật được sử dụng để huấn luyện mô hình mà không có sự cho phép của tác giả.',
      tags: ['Bản quyền', 'Nghệ thuật', 'Kiện tụng']
    },
    {
      id: 3,
      title: 'Phát hiện công cụ Deepfake mới có khả năng vượt qua xác thực sinh trắc học',
      date: '05/03/2026',
      source: 'CyberSecurity Weekly',
      summary: 'Các chuyên gia bảo mật cảnh báo về một thế hệ Deepfake mới có thể đánh lừa các hệ thống nhận diện khuôn mặt và giọng nói của ngân hàng, đặt ra thách thức lớn cho an ninh mạng.',
      tags: ['Deepfake', 'Bảo mật', 'Rủi ro']
    }
  ];

  const filteredPrompts = useMemo(() => {
    return prompts.filter(prompt => {
      const matchesSearch = prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            prompt.content.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'Tất cả' || prompt.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Thư viện Học liệu & Prompt</h1>
          <p className="text-slate-600">Khám phá thư viện câu lệnh (prompt) chuẩn mực và cập nhật các tin tức mới nhất về đạo đức, pháp lý AI.</p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center border-b border-slate-200 mb-8">
          <button 
            className={`flex items-center gap-2 px-8 py-4 font-semibold text-lg border-b-2 transition-colors ${activeTab === 'prompts' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
            onClick={() => setActiveTab('prompts')}
          >
            <Sparkles size={20} /> Prompt Hub
          </button>
          <button 
            className={`flex items-center gap-2 px-8 py-4 font-semibold text-lg border-b-2 transition-colors ${activeTab === 'news' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
            onClick={() => setActiveTab('news')}
          >
            <Newspaper size={20} /> Bản tin AI
          </button>
        </div>

        {/* Content: Prompt Hub */}
        {activeTab === 'prompts' && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Search and Filter */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm mb-8 flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm kiếm prompt..." 
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
              </div>
              <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                <Filter size={20} className="text-slate-400 shrink-0 hidden md:block ml-2" />
                {categories.map(cat => (
                  <button 
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeCategory === cat ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Prompt Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPrompts.length > 0 ? (
                filteredPrompts.map(prompt => (
                  <div key={prompt.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col group">
                    <div className="p-6 flex-1">
                      <div className="flex items-center justify-between mb-4">
                        <span className="bg-orange-50 text-orange-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">{prompt.category}</span>
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-3">{prompt.title}</h3>
                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-sm text-slate-700 font-mono leading-relaxed h-40 overflow-y-auto custom-scrollbar">
                        {prompt.content}
                      </div>
                    </div>
                    <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-between items-center">
                      <span className="text-xs text-slate-400 font-medium">Đã xác minh đạo đức</span>
                      <button 
                        onClick={() => handleCopy(prompt.id, prompt.content)}
                        className={`flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg transition-colors ${copiedId === prompt.id ? 'bg-emerald-100 text-emerald-700' : 'bg-white border border-slate-200 text-slate-600 hover:text-blue-600 hover:border-blue-200'}`}
                      >
                        {copiedId === prompt.id ? (
                          <><CheckCircle2 size={16} /> Đã chép</>
                        ) : (
                          <><Copy size={16} /> Sao chép</>
                        )}
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-12 text-slate-500">
                  <BookOpen size={48} className="mx-auto mb-4 opacity-20" />
                  <p>Không tìm thấy prompt nào phù hợp với tìm kiếm của bạn.</p>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Content: News Feed */}
        {activeTab === 'news' && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-8 flex gap-3 items-start">
              <div className="bg-orange-100 text-orange-600 p-2 rounded-lg shrink-0">
                <Newspaper size={20} />
              </div>
              <div>
                <h4 className="font-bold text-orange-800 mb-1">Dữ liệu DEMO (Thử nghiệm)</h4>
                <p className="text-sm text-orange-700 leading-relaxed">
                  Các bản tin dưới đây hiện là dữ liệu mô phỏng nhằm mục đích trình diễn giao diện. Trong tương lai, Admin và Moderator có thể cập nhật, chỉnh sửa và quản lý nội dung thực tế tại khu vực này.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {newsArticles.map(article => (
                <div key={article.id} className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 text-sm text-slate-500 mb-3">
                      <span className="font-semibold text-blue-600">{article.source}</span>
                      <span>•</span>
                      <span>{article.date}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-3 hover:text-blue-600 transition-colors cursor-pointer">{article.title}</h3>
                    <p className="text-slate-600 mb-6 leading-relaxed">{article.summary}</p>
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex flex-wrap gap-2">
                        {article.tags.map((tag, idx) => (
                          <span key={idx} className="text-xs bg-slate-100 text-slate-600 px-3 py-1 rounded-full font-medium">{tag}</span>
                        ))}
                      </div>
                      <button className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors">
                        Đọc tiếp <ExternalLink size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
