export type PillarKey =
  | 'customer_thinking'
  | 'execution'
  | 'data_literacy'
  | 'ai_literacy'
  | 'learning_agility';

export interface QuestionOption {
  score: number;
  text: string;
}

export interface QuestionItem {
  id: string;
  key: PillarKey;
  shortLabel: string;
  pillarEn: string;
  pillarVi: string;
  bizImpact: string;
  question: string;
  options: QuestionOption[];
  adviceLow: string;
  adviceMid: string;
  adviceHigh: string;
}

export interface LevelInfo {
  min: number;
  max: number;
  title: string;
  badgeClass: string;
  desc: string;
}

export const SHIFT_DATA = [
  { before: 'Tạo được nội dung', after: 'Nội dung có mục tiêu & hiệu quả' },
  { before: 'Thành thạo công cụ', after: 'Phối hợp công cụ & AI giải quyết vấn đề' },
  { before: 'Hoàn thành đầu việc', after: 'Tạo & chứng minh giá trị doanh nghiệp' },
];

export const QUESTIONS: QuestionItem[] = [
  {
    id: 'q1',
    key: 'customer_thinking',
    shortLabel: 'Khách hàng',
    pillarEn: 'CUSTOMER THINKING',
    pillarVi: 'Hiểu khách hàng',
    bizImpact: 'REACH & CONVERT',
    question:
      'Khi cần làm nội dung quảng bá một sản phẩm, bạn đã từng tìm hiểu khách hàng mục tiêu đến mức nào?',
    options: [
      { score: 1, text: 'Chưa từng tìm hiểu khách hàng trước khi làm nội dung.' },
      { score: 2, text: 'Biết có thể khảo sát, phỏng vấn, đọc đánh giá khách hàng nhưng chưa thực hành.' },
      { score: 3, text: 'Đã khảo sát hoặc tìm hiểu khách hàng theo hướng dẫn của giảng viên/nhóm.' },
      { score: 4, text: 'Đã tự thu thập thông tin, phân tích nhu cầu và xác định khách hàng mục tiêu.' },
      { score: 5, text: 'Đã dùng những gì tìm hiểu được để điều chỉnh nội dung/cách tiếp cận và kiểm tra phản hồi.' },
    ],
    adviceLow:
      'Tập thói quen đọc review/bình luận thật của khách hàng, làm khảo sát ngắn 5–10 người và xác định rõ nỗi đau trước khi mở Canva/CapCut.',
    adviceMid:
      'Hãy thử tự phân tích dữ liệu khảo sát để rút ra insight riêng và kiểm chứng xem nội dung mới có cải thiện phản hồi không.',
    adviceHigh:
      'Bạn đã làm tốt khâu thấu hiểu và kiểm chứng phản hồi. Hãy đóng gói thành case study "Insight → Nội dung → Kết quả".',
  },
  {
    id: 'q2',
    key: 'execution',
    shortLabel: 'Thực thi',
    pillarEn: 'EXECUTION',
    pillarVi: 'Khả năng thực thi',
    bizImpact: 'CONVERT',
    question:
      'Với một bài đăng, video hoặc hoạt động truyền thông của lớp, CLB hay dự án, bạn đã trực tiếp làm được gì?',
    options: [
      { score: 1, text: 'Chưa từng thực hiện một sản phẩm hoặc hoạt động Marketing.' },
      { score: 2, text: 'Biết các bước làm nội dung hoặc triển khai chiến dịch nhưng chưa thực hiện.' },
      { score: 3, text: 'Đã tạo nội dung hoặc tham gia hoạt động theo mẫu và hướng dẫn.' },
      { score: 4, text: 'Đã tự lập kế hoạch, tạo sản phẩm và hoàn thành phần triển khai được giao.' },
      { score: 5, text: 'Đã triển khai, xem kết quả và điều chỉnh sản phẩm/hoạt động để cải thiện.' },
    ],
    adviceLow:
      'Bắt đầu ngay với 1 sản phẩm hoàn chỉnh (1 bài viết/video ngắn cho CLB hoặc dự án lớp) thay vì chỉ học lý thuyết công cụ.',
    adviceMid:
      'Chuyển từ làm theo mẫu sang tự lập kế hoạch nội dung hoàn chỉnh và chịu trách nhiệm đăng tải, theo dõi thực tế.',
    adviceHigh:
      'Khả năng thực thi của bạn rất vững. Hãy tập trung vào tốc độ triển khai và tối ưu chất lượng chuyển đổi (Convert).',
  },
  {
    id: 'q3',
    key: 'data_literacy',
    shortLabel: 'Dữ liệu',
    pillarEn: 'DATA LITERACY',
    pillarVi: 'Tư duy dữ liệu',
    bizImpact: 'OPTIMIZE',
    question:
      'Khi nhìn vào số lượt xem, tương tác, lượt nhấp hoặc số liệu của một chiến dịch, bạn đã từng làm gì?',
    options: [
      { score: 1, text: 'Chưa biết đọc hoặc giải thích các chỉ số Marketing cơ bản.' },
      { score: 2, text: 'Biết ý nghĩa một số chỉ số nhưng chưa phân tích dữ liệu thực tế.' },
      { score: 3, text: 'Đã tổng hợp số liệu hoặc lập báo cáo theo mẫu có sẵn.' },
      { score: 4, text: 'Đã tự so sánh các chỉ số và rút ra nhận xét về hiệu quả.' },
      { score: 5, text: 'Đã dựa vào số liệu để đề xuất/thực hiện thay đổi và theo dõi kết quả sau đó.' },
    ],
    adviceLow:
      'Học cách đọc 4 chỉ số cốt lõi (Reach, Engagement Rate, CTR, Conversion) và tập ghi chú ý nghĩa sau mỗi bài đăng.',
    adviceMid:
      'Đừng chỉ điền số vào báo cáo mẫu — hãy tập so sánh A/B giữa 2 nội dung để viết ra ít nhất 2 nhận xét vì sao hiệu quả khác nhau.',
    adviceHigh:
      'Tư duy dữ liệu của bạn đang đáp ứng tốt kỳ vọng doanh nghiệp (Optimize). Hãy rèn thêm kỹ năng trực quan hóa số liệu.',
  },
  {
    id: 'q4',
    key: 'ai_literacy',
    shortLabel: 'Dùng AI',
    pillarEn: 'AI LITERACY',
    pillarVi: 'Năng lực sử dụng AI',
    bizImpact: 'OPTIMIZE',
    question:
      'Khi dùng ChatGPT hoặc công cụ AI khác để hỗ trợ công việc Marketing, bạn đã thực hiện đến đâu?',
    options: [
      { score: 1, text: 'Chưa từng dùng AI cho một nhiệm vụ Marketing.' },
      { score: 2, text: 'Đã hỏi AI để tìm thông tin hoặc gợi ý ý tưởng.' },
      { score: 3, text: 'Đã dùng câu lệnh mẫu để tạo bài viết, hình ảnh, ý tưởng hoặc bài tập.' },
      { score: 4, text: 'Đã tự viết yêu cầu, điều chỉnh và kiểm tra nội dung AI tạo ra trước khi sử dụng.' },
      { score: 5, text: 'Đã kết hợp AI vào quy trình làm việc, kiểm tra chất lượng và cải thiện đầu ra qua các lần thực hiện.' },
    ],
    adviceLow:
      'Thử ngay việc dùng AI để phân tích chân dung khách hàng hoặc lên 3 góc tiếp cận nội dung cho 1 sản phẩm cụ thể.',
    adviceMid:
      'Chuyển từ câu lệnh mẫu sang tự thiết kế Prompt có bối cảnh + đối tượng + giọng văn, và luôn kiểm chứng lại thông tin AI tạo ra.',
    adviceHigh:
      'Bạn đã biết phối hợp AI vào quy trình làm việc. Hãy thử xây dựng chuỗi Prompt (workflow) cho riêng dự án của mình.',
  },
  {
    id: 'q5',
    key: 'learning_agility',
    shortLabel: 'Thích nghi',
    pillarEn: 'LEARNING AGILITY',
    pillarVi: 'Học hỏi và thích nghi',
    bizImpact: 'RETAIN',
    question:
      'Trong một bài tập nhóm, dự án hoặc hoạt động CLB, bạn đã từng phối hợp và xử lý góp ý như thế nào?',
    options: [
      { score: 1, text: 'Chưa từng tham gia thực hiện một nhiệm vụ nhóm tương tự.' },
      { score: 2, text: 'Đã tham gia hoạt động nhóm nhưng chưa trực tiếp đảm nhận phần việc cụ thể.' },
      { score: 3, text: 'Đã hoàn thành phần việc được giao với sự hướng dẫn hoặc hỗ trợ.' },
      { score: 4, text: 'Đã chủ động hoàn thành phần việc, trao đổi với thành viên khác để xử lý vấn đề.' },
      { score: 5, text: 'Đã chủ động xin phản hồi, điều chỉnh cách làm và chỉ ra được kết quả cải thiện.' },
    ],
    adviceLow:
      'Hãy chủ động nhận 1 phần việc rõ ràng trong CLB hoặc nhóm học tập và hoàn thành đúng hạn để tạo minh chứng đầu tiên.',
    adviceMid:
      'Tập thói quen chủ động hỏi giảng viên/mentor "Điểm nào em cần sửa để tốt hơn?" sau mỗi lần nộp sản phẩm.',
    adviceHigh:
      'Tinh thần học hỏi và thích nghi của bạn rất cao — đây là yếu tố giúp bạn tiến nhanh trong môi trường agency/doanh nghiệp.',
  },
];

export const LEVELS: LevelInfo[] = [
  {
    min: 5,
    max: 9,
    title: 'Người quan sát (Observer)',
    badgeClass: 'bg-black/60 text-white border border-white/40',
    desc: 'Bạn mới dừng ở mức biết khái niệm hoặc công cụ, chưa có nhiều trải nghiệm làm thật. Ưu tiên lớn nhất lúc này là bắt tay thực hiện sản phẩm đầu tiên.',
  },
  {
    min: 10,
    max: 14,
    title: 'Người thực hành theo mẫu (Guided Doer)',
    badgeClass: 'bg-[#0c4348] text-[#5ce1e6] border border-[#5ce1e6]/60',
    desc: 'Bạn đã tham gia thực hành theo hướng dẫn hoặc mẫu có sẵn. Bước tiếp theo là tự chủ lập kế hoạch và giải thích được lý do đằng sau mỗi lựa chọn.',
  },
  {
    min: 15,
    max: 19,
    title: 'Người thực thi chủ động (Active Executor)',
    badgeClass: 'bg-[#5ce1e6]/20 text-[#5ce1e6] border border-[#5ce1e6]',
    desc: 'Bạn đã tự làm được đầu việc, biết ứng dụng AI và đọc số liệu cơ bản. Để nổi bật khi phỏng vấn, hãy chứng minh hiệu quả bằng các con số tối ưu cụ thể.',
  },
  {
    min: 20,
    max: 25,
    title: 'Marketer sẵn sàng (Market-Ready Marketer)',
    badgeClass: 'bg-[#5ce1e6] text-black border border-white',
    desc: 'Bạn có tư duy khép kín từ hiểu khách hàng, thực thi, dùng AI đến đo lường và cải tiến. Hãy đóng gói các dự án đã làm thành Portfolio có số liệu thuyết phục.',
  },
];
