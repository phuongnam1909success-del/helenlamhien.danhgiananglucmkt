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

export interface PracticeStep {
  do: string;
  first: string;
  proof: string;
  check: string;
  club: string;
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
  steps: PracticeStep[];
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
    pillarEn: 'Customer Thinking',
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
    steps: [
      {
        do: 'Chọn 1 sản phẩm quen thuộc; đọc 12 đánh giá công khai, phân loại thành 3 nhu cầu hoặc vấn đề thường gặp.',
        first: 'Mở 3 đánh giá đầu tiên và ghi lại nguyên văn 1 nhu cầu.',
        proof: 'Bảng 12 đánh giá, 3 nhóm nhu cầu và nguồn.',
        check: 'Mỗi kết luận có ít nhất 2 dẫn chứng.',
        club: 'Ghép cặp với 1 thành viên CLB, so sánh cách phân loại.',
      },
      {
        do: 'Phỏng vấn 5 người phù hợp về lý do lựa chọn một sản phẩm bằng 5 câu hỏi mở.',
        first: 'Viết 5 câu hỏi tránh dẫn dắt người trả lời.',
        proof: 'Bảng tóm tắt 5 cuộc phỏng vấn và 2 giả thuyết.',
        check: 'Ghi lại tối thiểu 5 câu trả lời thực tế, không chỉ ý kiến cá nhân.',
        club: 'Nhờ CLB diễn tập phỏng vấn và góp ý 2 câu hỏi.',
      },
      {
        do: 'Tự khảo sát 10 người, phỏng vấn sâu 3 người; lập 1 chân dung khách hàng có dẫn chứng.',
        first: 'Chọn nhóm mục tiêu và viết 3 giả định cần kiểm tra.',
        proof: '1 trang chân dung khách hàng kèm bảng dữ liệu gốc.',
        check: 'Có ít nhất 2 insight truy ngược được về câu trả lời thực tế.',
        club: 'Trình bày persona trong nhóm, nhận tối thiểu 2 góp ý.',
      },
      {
        do: 'Viết 2 thông điệp cho cùng phân khúc, xin phản hồi từ ít nhất 10 người về sự rõ ràng và sức hấp dẫn.',
        first: 'Soạn 2 tiêu đề khác nhau cho cùng một sản phẩm.',
        proof: 'Bảng phản hồi theo từng thông điệp và 1 bản điều chỉnh.',
        check: 'Nêu được lý do chọn bản điều chỉnh dựa trên phản hồi.',
        club: 'Nhờ CLB thực hiện khảo sát phản hồi có cùng bộ câu hỏi.',
      },
      {
        do: 'So sánh 2 nhóm khách hàng, kiểm tra 2 giả thuyết về nhu cầu rồi đề xuất cách tiếp cận khác nhau.',
        first: 'Chọn 2 phân khúc và 1 câu hỏi nghiên cứu chung.',
        proof: 'Mini case 2 trang: dữ liệu, nhận định, đề xuất, giới hạn.',
        check: 'Mỗi đề xuất gắn với dữ liệu kiểm chứng và một cách đo hiệu quả.',
        club: 'Dẫn dắt 15 phút phản biện insight với nhóm.',
      },
    ],
  },
  {
    id: 'q2',
    key: 'execution',
    shortLabel: 'Thực thi',
    pillarEn: 'Execution',
    pillarVi: 'Thực thi Marketing',
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
    steps: [
      {
        do: 'Viết 1 brief cho bài đăng giới thiệu một sản phẩm: mục tiêu, người xem, thông điệp, CTA.',
        first: 'Chọn 1 sản phẩm và viết mục tiêu trong 1 câu.',
        proof: 'Brief 1 trang và dàn ý bài đăng.',
        check: 'Brief đủ 4 thành phần; một bạn khác đọc hiểu được.',
        club: 'Nhờ thành viên CLB góp ý để hoàn thiện brief.',
      },
      {
        do: 'Sản xuất 1 bài đăng kèm hình ảnh theo brief mẫu; chỉnh sửa theo ít nhất 2 góp ý.',
        first: 'Tải mẫu brief và phác 3 ý chính của bài.',
        proof: '1 bài đăng hoàn chỉnh, ảnh minh họa và bản sửa.',
        check: 'Nội dung đúng nhóm người xem, CTA rõ, không có thông tin sai.',
        club: 'Làm cặp đôi: một bạn tạo, một bạn duyệt nội dung.',
      },
      {
        do: 'Tự lên lịch và tạo 3 bài đăng trong 7 ngày cho một chủ đề chung.',
        first: 'Lập lịch gồm ngày đăng, định dạng và mục tiêu từng bài.',
        proof: 'Content calendar 7 ngày + 3 sản phẩm hoàn thiện.',
        check: 'Hoàn thành đúng 3 đầu ra đúng hạn và cùng thông điệp.',
        club: 'Phân công người đọc duyệt chéo từng bài.',
      },
      {
        do: 'Triển khai một mini-campaign 7 ngày với ít nhất 3 nội dung và một chỉ số theo dõi.',
        first: 'Chọn 1 mục tiêu và 1 chỉ số phù hợp (VD: tương tác).',
        proof: 'Lịch triển khai, 3 nội dung và báo cáo 1 trang.',
        check: 'Có số liệu theo dõi, 1 thay đổi sau quan sát và lý do.',
        club: 'Phối hợp nhóm 2–3 người, họp kiểm tra giữa tuần.',
      },
      {
        do: 'Thực hiện 2 vòng cải thiện cho mini-campaign trong 14 ngày dựa trên số liệu/phản hồi.',
        first: 'Chọn chiến dịch từng làm, xác định 1 điểm cần nâng.',
        proof: 'Case study 2 trang: mục tiêu, 2 vòng thử, số liệu, bài học.',
        check: 'Mô tả rõ đã thay gì và khác biệt quan sát được; không suy diễn nhân quả.',
        club: 'Chia sẻ quy trình và bàn giao 1 mẫu checklist cho CLB.',
      },
    ],
  },
  {
    id: 'q3',
    key: 'data_literacy',
    shortLabel: 'Dữ liệu',
    pillarEn: 'Data Literacy',
    pillarVi: 'Phân tích dữ liệu',
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
    steps: [
      {
        do: 'Lấy số liệu 5 bài đăng công khai (lượt xem, tương tác) và xác định ý nghĩa từng chỉ số.',
        first: 'Chọn 1 fanpage có số liệu được công khai.',
        proof: 'Bảng 5 bài, nguồn số liệu, giải thích 2 chỉ số.',
        check: 'Không nhầm số lượt xem với số người tiếp cận.',
        club: 'Cùng CLB kiểm tra cách đọc 2 chỉ số.',
      },
      {
        do: 'Lập Google Sheet ghi số liệu 10 bài đăng từ nguồn được phép sử dụng.',
        first: 'Tạo cột ngày đăng, dạng bài, lượt xem, lượt tương tác.',
        proof: 'Sheet 10 dòng, có nguồn dữ liệu và không bỏ trống tùy tiện.',
        check: 'Bảng nhất quán đơn vị và định nghĩa chỉ số.',
        club: 'Đổi Sheet với 1 bạn để kiểm tra lỗi nhập liệu.',
      },
      {
        do: 'Vẽ 2 biểu đồ từ 10 bài đăng và viết 3 nhận xét có dẫn số liệu.',
        first: 'Chọn 2 chỉ số để so sánh và nêu lý do.',
        proof: '2 biểu đồ và 1 trang báo cáo gồm 3 phát hiện.',
        check: 'Nhận xét dẫn ít nhất 1 con số; phân biệt quan sát với kết luận.',
        club: 'Trình bày 3 phút để nhóm đặt câu hỏi phản biện.',
      },
      {
        do: 'Từ báo cáo, đề xuất 1 thay đổi nội dung rồi so sánh chỉ số trước–sau.',
        first: 'Chọn 1 vấn đề cụ thể (VD: mở đầu video giữ chân kém).',
        proof: 'Phiếu giả thuyết, 2 phiên bản nội dung, bảng so sánh.',
        check: 'Có cùng định nghĩa chỉ số và nêu các yếu tố khác có thể ảnh hưởng.',
        club: 'Nhờ CLB thống nhất chỉ số trước khi thử.',
      },
      {
        do: 'Tạo mini-dashboard theo dõi 4 tuần nội dung và đề xuất 2 quyết định cải thiện.',
        first: 'Chọn bộ 3 chỉ số và lịch cập nhật cố định.',
        proof: 'Dashboard 4 tuần + 2 khuyến nghị có căn cứ.',
        check: 'Có nguồn, mốc thời gian, giải thích giới hạn dữ liệu.',
        club: 'Hướng dẫn 1 thành viên CLB cập nhật Dashboard bằng checklist.',
      },
    ],
  },
  {
    id: 'q4',
    key: 'ai_literacy',
    shortLabel: 'Dùng AI',
    pillarEn: 'AI Literacy',
    pillarVi: 'Ứng dụng AI',
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
    steps: [
      {
        do: 'Dùng AI đề xuất 5 ý tưởng bài đăng theo 1 brief; tự chọn 2 ý tưởng và kiểm tra thông tin.',
        first: 'Viết brief gồm sản phẩm, người xem, mục tiêu.',
        proof: '5 ý tưởng AI, 2 ý tưởng chọn, ghi chú kiểm chứng.',
        check: 'Không sao chép thông tin chưa xác minh; giải thích vì sao chọn.',
        club: 'So sánh ý tưởng với 1 bạn trong CLB.',
      },
      {
        do: 'Viết 2 phiên bản prompt cho cùng 1 brief và so sánh 2 đầu ra AI.',
        first: 'Viết prompt A rồi thêm tiêu chí đối tượng, giọng điệu ở prompt B.',
        proof: 'Bảng A/B gồm prompt, đầu ra và 3 nhận xét.',
        check: 'Nêu rõ đầu ra nào đáp ứng brief tốt hơn và lý do.',
        club: 'CLB cùng chấm chất lượng theo checklist 3 tiêu chí.',
      },
      {
        do: 'Tự xây 1 prompt mẫu để tạo 3 bài đăng, rồi biên tập và kiểm chứng từng bài.',
        first: 'Chọn 1 cấu trúc prompt có mục tiêu, đầu vào, giới hạn.',
        proof: 'Prompt mẫu, 3 bản AI và 3 bản đã biên tập.',
        check: 'Ghi rõ ít nhất 1 lỗi/điểm sửa cho mỗi bài.',
        club: 'Nhờ CLB phản biện 1 sản phẩm trước khi dùng.',
      },
      {
        do: 'Thiết kế quy trình 4 bước brief → AI → kiểm chứng → xuất bản cho 1 dự án nhỏ.',
        first: 'Liệt kê các rủi ro về sai thông tin, giọng điệu, bản quyền.',
        proof: 'Sơ đồ quy trình, checklist và 2 sản phẩm mẫu.',
        check: 'Một bạn khác có thể làm lại quy trình theo hướng dẫn.',
        club: 'Chạy thử quy trình với 2 thành viên CLB, nhận góp ý.',
      },
      {
        do: 'So sánh 2 quy trình có/không có AI cho cùng loại đầu ra; đo thời gian và đánh giá chất lượng.',
        first: 'Chọn 1 nhiệm vụ lặp lại và quy định 3 tiêu chí chấm chất lượng.',
        proof: 'Bảng thời gian, rubric chất lượng và quy trình tối ưu.',
        check: 'Báo cáo được cả lợi ích lẫn lỗi/rủi ro; không chỉ đo nhanh.',
        club: 'Tập huấn 15 phút cho CLB và thu 2 phản hồi.',
      },
    ],
  },
  {
    id: 'q5',
    key: 'learning_agility',
    shortLabel: 'Thích nghi',
    pillarEn: 'Collaboration & Learning',
    pillarVi: 'Phối hợp & học hỏi',
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
    steps: [
      {
        do: 'Tham gia 1 nhóm dự án/CLB và nhận 1 việc nhỏ có thời hạn, ví dụ viết caption hoặc dựng 1 slide.',
        first: 'Nhắn trưởng nhóm xin nhận 1 đầu việc có deadline.',
        proof: 'Đầu ra được giao + xác nhận đã bàn giao.',
        check: 'Có yêu cầu, deadline và người nhận rõ ràng.',
        club: 'Tham gia 1 cuộc họp phân công và ghi lại phần việc.',
      },
      {
        do: 'Phối hợp với 1 bạn để hoàn thành 1 bài đăng: phân vai, thống nhất hạn và phản hồi nhau.',
        first: 'Nhắn đối tác 3 thông tin: ai làm gì, khi nào xong, cách góp ý.',
        proof: 'Checklist phân vai và bài đăng hoàn thiện.',
        check: 'Không bỏ sót trách nhiệm; mỗi người cho ít nhất 1 góp ý.',
        club: 'Dùng chung 1 bảng công việc hoặc Google Doc.',
      },
      {
        do: 'Nhận trách nhiệm 1 đầu việc trong nhóm, xin 2 góp ý và hoàn thành phiên bản sửa.',
        first: 'Gửi bản nháp trước hạn cho 2 người để lấy phản hồi.',
        proof: 'Bản V1/V2 và nhật ký 2 góp ý đã xử lý.',
        check: 'Có dấu vết điều chỉnh, không chỉ xác nhận đã nghe góp ý.',
        club: 'Nhờ CLB tổ chức 10 phút review chéo.',
      },
      {
        do: 'Điều phối nhóm ít nhất 3 người làm 1 đầu ra chung với 2 mốc kiểm tra tiến độ.',
        first: 'Lập bảng việc gồm người phụ trách, hạn, trạng thái.',
        proof: 'Bảng phân công, biên bản 2 checkpoint, sản phẩm chung.',
        check: 'Giải quyết ít nhất 1 vướng mắc phối hợp và rút kinh nghiệm.',
        club: 'Tổ chức họp 15 phút đầu tuần, 10 phút cuối tuần.',
      },
      {
        do: 'Dẫn dắt 1 buổi retrospective sau dự án, chọn 2 cải tiến rồi áp dụng ở lần triển khai tiếp theo.',
        first: 'Mời 3 thành viên trả lời: giữ gì, bỏ gì, thử gì.',
        proof: 'Biên bản retrospective, 2 hành động cải tiến, bằng chứng áp dụng.',
        check: 'Có chủ sở hữu, hạn hoàn thành và phản hồi sau cải tiến.',
        club: 'Chia sẻ template retrospective cho thành viên CLB.',
      },
    ],
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
