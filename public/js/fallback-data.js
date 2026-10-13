// Client-side fallback dataset in case of direct file opening or server disconnect
const FALLBACK_DATA = {
  dishes: [
    {
      id: "dau_sot_ca_chua",
      name: "Đậu hũ sốt cà chua",
      category: "Món mặn",
      mealType: ["Bữa trưa", "Bữa tối"],
      cookTime: 15,
      difficulty: "Dễ",
      baseServings: 2,
      basePrice: 22000,
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=700&auto=format&fit=crop&q=80",
      description: "Món ăn thanh đạm, sốt chua ngọt đậm đà, đậu hũ mềm thơm ngấm đẫm nước sốt cà chua rắc hành lá bắt cơm tuyệt đối.",
      calories: 280,
      tags: ["Tiết kiệm", "Nhanh gọn", "Sinh viên", "Thanh đạm"],
      ingredients: [
        { ingredientId: "dau_phu", name: "Đậu phụ trắng", amount: "3 bìa", unit: "bìa", estimatedPrice: 12000, isEssential: true },
        { ingredientId: "ca_chua", name: "Cà chua chín", amount: "2 quả", unit: "quả", estimatedPrice: 6000, isEssential: true },
        { ingredientId: "hanh_la", name: "Hành lá", amount: "2 nhánh", unit: "mớ", estimatedPrice: 2000, isEssential: false },
        { ingredientId: "gia_vi_co_ban", name: "Mắm, hạt nêm, dầu ăn", amount: "vừa đủ", unit: "phần", estimatedPrice: 2000, isEssential: true }
      ],
      steps: [
        { stepNumber: 1, title: "Sơ chế nguyên liệu", detail: "Đậu hũ rửa nhẹ nước, cắt miếng vuông vừa ăn. Cà chua rửa sạch bổ múi cau nhỏ. Hành lá cắt nhỏ.", tip: "Thấm ráo nước trên mặt đậu trước khi rán để tránh bắn dầu." },
        { stepNumber: 2, title: "Rán vàng đậu hũ", detail: "Bắc chảo lên bếp cùng 2 muỗng dầu ăn, thả đậu vào chiên vàng đều 2 mặt rồi vớt ra đĩa.", tip: "Không cần chiên quá già, chỉ cần vỏ ngoài se vàng để đậu giữ được độ mềm ngọt bên trong." },
        { stepNumber: 3, title: "Làm sốt cà chua", detail: "Phi thơm đầu hành, trút cà chua vào xào nhuyễn cùng 1 muỗng hạt nêm, 1 muỗng nước mắm và xíu đường. Thêm 3 muỗng canh nước lọc đun sôi lăn tăn.", tip: "Dầm nhẹ cho cà chua mau nhuyễn mịn tạo màu đỏ óng tự nhiên." },
        { stepNumber: 4, title: "Om đậu và hoàn thành", detail: "Thả đậu đã rán vào đảo đều cho thấm sốt trong 3-5 phút với lửa nhỏ. Nêm lại vừa khẩu vị, rắc hành lá cắt nhỏ rồi tắt bếp.", tip: "Nước sốt chan cùng cơm nóng cực kỳ đưa cơm." }
      ]
    },
    {
      id: "trung_chien_thit_bam",
      name: "Trứng chiên thịt băm hành lá",
      category: "Món mặn",
      mealType: ["Bữa trưa", "Bữa tối", "Bữa sáng"],
      cookTime: 12,
      difficulty: "Dễ",
      baseServings: 2,
      basePrice: 28000,
      image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=700&auto=format&fit=crop&q=80",
      description: "Món trứng chiên vàng xốp, nhân thịt heo băm ngọt đậm vị hòa quyện mùi thơm lừng của hành lá và tiêu xay.",
      calories: 360,
      tags: ["Nhanh gọn", "Giàu đạm", "Sinh viên", "Tiết kiệm"],
      ingredients: [
        { ingredientId: "trung_ga", name: "Trứng gà", amount: "3 quả", unit: "quả", estimatedPrice: 10500, isEssential: true },
        { ingredientId: "thit_heo_bam", name: "Thịt heo xay", amount: "100g", unit: "100g", estimatedPrice: 13000, isEssential: true },
        { ingredientId: "hanh_la", name: "Hành lá", amount: "2 nhánh", unit: "mớ", estimatedPrice: 2000, isEssential: false },
        { ingredientId: "gia_vi_co_ban", name: "Nước mắm, hạt tiêu", amount: "vừa đủ", unit: "phần", estimatedPrice: 2500, isEssential: true }
      ],
      steps: [
        { stepNumber: 1, title: "Sơ chế & Trộn hỗn hợp", detail: "Ướp thịt băm với chút tiêu, 1 thìa nước mắm trong 5 phút. Đập 3 quả trứng vào tô, thêm hành lá cắt nhỏ, trút thịt vào đánh bông nhẹ.", tip: "Thêm nửa thìa cà phê nước lọc giúp trứng rán mềm xốp không bị khô xác." },
        { stepNumber: 2, title: "Chiên trứng chín đều", detail: "Đun nóng dầu ăn trong chảo, đổ hỗn hợp trứng vào láng đều mặt chảo. Giữ lửa vừa nhỏ để thịt chín từ từ.", tip: "Đậy nắp chảo khoảng 2 phút đầu để mặt trên nhanh chín se lại dễ lật." },
        { stepNumber: 3, title: "Lật mặt và thưởng thức", detail: "Khi mặt dưới vàng đều, lật mặt chiên thêm 1-2 phút rồi trượt ra đĩa.", tip: "Cắt thành từng miếng tam giác vừa đẹp mắt vừa dễ gắp." }
      ]
    },
    {
      id: "thit_kho_tau_trung_cut",
      name: "Thịt kho tàu nước dừa trứng cút",
      category: "Món mặn",
      mealType: ["Bữa trưa", "Bữa tối"],
      cookTime: 40,
      difficulty: "Trung bình",
      baseServings: 2,
      basePrice: 52000,
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=700&auto=format&fit=crop&q=80",
      description: "Thịt ba chỉ béo ngậy mềm tan kết hợp trứng cút bùi bùi, nước kho màu cánh gián vàng óng ánh đậm đà vị truyền thống.",
      calories: 520,
      tags: ["Cơm nhà", "Đậm đà", "Món truyền thống"],
      ingredients: [
        { ingredientId: "thit_heo_ba_chi", name: "Thịt ba chỉ heo", amount: "250g", unit: "100g", estimatedPrice: 40000, isEssential: true },
        { ingredientId: "trung_cut", name: "Trứng cút luộc", amount: "10 quả", unit: "10 quả", estimatedPrice: 8000, isEssential: true },
        { ingredientId: "toi", name: "Tỏi, hành tím", amount: "vài tép", unit: "củ", estimatedPrice: 2000, isEssential: false },
        { ingredientId: "gia_vi_co_ban", name: "Nước mắm, đường thắng màu, tiêu", amount: "vừa đủ", unit: "phần", estimatedPrice: 2000, isEssential: true }
      ],
      steps: [
        { stepNumber: 1, title: "Sơ chế & Ướp thịt", detail: "Thịt rửa sạch chần sơ nước sôi cắt khúc. Ướp hành tỏi, 2 thìa mắm, tiêu trong 20 phút.", tip: "Chần thịt giúp nước kho trong." },
        { stepNumber: 2, title: "Luộc bóc vỏ trứng cút", detail: "Luộc 6 phút bóc sạch vỏ.", tip: "Rán sơ trứng cút nếu thích vỏ dai." },
        { stepNumber: 3, title: "Thắng nước màu", detail: "Thắng đường màu cánh gián cho thịt vào đảo săn.", tip: "Không để cháy đắng." },
        { stepNumber: 4, title: "Kho liu riu", detail: "Kho 25 phút lửa nhỏ cho trứng cút vào kho thêm 10 phút.", tip: "Nước kho chan cơm tuyệt đỉnh." }
      ]
    },
    {
      id: "canh_ca_chua_trung",
      name: "Canh mây cà chua trứng gà",
      category: "Món canh",
      mealType: ["Bữa trưa", "Bữa tối"],
      cookTime: 10,
      difficulty: "Dễ",
      baseServings: 2,
      basePrice: 16000,
      image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=700&auto=format&fit=crop&q=80",
      description: "Bát canh mây bồng bềnh thanh nhẹ, vị chua thanh dịu mát từ cà chua kết hợp vân trứng mềm mịn, giải ngấy cực tốt.",
      calories: 140,
      tags: ["Tiết kiệm", "Nhanh gọn", "Sinh viên", "Thanh mát"],
      ingredients: [
        { ingredientId: "trung_ga", name: "Trứng gà", amount: "2 quả", unit: "quả", estimatedPrice: 7000, isEssential: true },
        { ingredientId: "ca_chua", name: "Cà chua chín", amount: "2 quả", unit: "quả", estimatedPrice: 6000, isEssential: true },
        { ingredientId: "hanh_la", name: "Hành lá, ngò", amount: "1 mớ nhỏ", unit: "mớ", estimatedPrice: 1500, isEssential: false },
        { ingredientId: "gia_vi_co_ban", name: "Hạt nêm, mắm, dầu ăn", amount: "vừa đủ", unit: "phần", estimatedPrice: 1500, isEssential: true }
      ],
      steps: [
        { stepNumber: 1, title: "Sơ chế", detail: "Cà chua bổ múi cau. Trứng đánh tan. Hành lá thái nhỏ.", tip: "Chọn cà chua chín mọng đỏ." },
        { stepNumber: 2, title: "Nấu nước canh", detail: "Xào cà chua mềm, đổ 600ml nước đun sôi.", tip: "Nêm hạt nêm ngay từ đầu." },
        { stepNumber: 3, title: "Tạo vân trứng", detail: "Rót trứng từ từ khuấy tròn một chiều.", tip: "Khuấy nhẹ tạo mây mỏng." },
        { stepNumber: 4, title: "Rắc hành lá", detail: "Tắt bếp rắc hành tiêu múc ra tô.", tip: "Không đun lâu giữ trứng mềm." }
      ]
    },
    {
      id: "rau_muong_xao_toi",
      name: "Rau muống xào tỏi xanh giòn",
      category: "Món xào/rau",
      mealType: ["Bữa trưa", "Bữa tối"],
      cookTime: 8,
      difficulty: "Dễ",
      baseServings: 2,
      basePrice: 12000,
      image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=700&auto=format&fit=crop&q=80",
      description: "Rau muống xanh mướt giòn sần sật bốc khói nghi ngút, thơm nức mũi mùi tỏi phi giòn rụm chấm mắm ớt cay tê.",
      calories: 110,
      tags: ["Tiết kiệm", "Nhanh gọn", "Healthy", "Cơm nhà"],
      ingredients: [
        { ingredientId: "rau_muong", name: "Rau muống non", amount: "1 bó", unit: "bó", estimatedPrice: 8000, isEssential: true },
        { ingredientId: "toi", name: "Tỏi tép", amount: "1 củ", unit: "củ", estimatedPrice: 2000, isEssential: true },
        { ingredientId: "gia_vi_co_ban", name: "Dầu hào, hạt nêm, dầu ăn", amount: "vừa đủ", unit: "phần", estimatedPrice: 2000, isEssential: true }
      ],
      steps: [
        { stepNumber: 1, title: "Nhặt rau", detail: "Nhặt khúc non rửa sạch để ráo. Tỏi đập dập.", tip: "Để thật ráo nước." },
        { stepNumber: 2, title: "Chần nước đá", detail: "Chần nước sôi 30 giây vớt ngâm nước đá.", tip: "Giữ màu xanh ngọc bích." },
        { stepNumber: 3, title: "Xào lửa lớn", detail: "Phi tỏi xào rau lửa to đảo thật nhanh 1 phút.", tip: "Xào lửa to nhất." },
        { stepNumber: 4, title: "Thêm tỏi phi", detail: "Nêm dầu hào trút ra đĩa thưởng thức.", tip: "Ăn nóng giòn ngọt." }
      ]
    },
    {
      id: "thit_bam_sot_ca_chua",
      name: "Thịt băm sốt cà chua đậm vị",
      category: "Món mặn",
      mealType: ["Bữa trưa", "Bữa tối"],
      cookTime: 15,
      difficulty: "Dễ",
      baseServings: 2,
      basePrice: 32000,
      image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=700&auto=format&fit=crop&q=80",
      description: "Thịt băm ngọt bùi hòa cùng sốt cà chua sánh mịn quyện cơm, cực nhanh và dễ nấu.",
      calories: 340,
      tags: ["Nhanh gọn", "Cơm nhà", "Sinh viên", "Giàu đạm"],
      ingredients: [
        { ingredientId: "thit_heo_bam", name: "Thịt heo băm", amount: "150g", unit: "100g", estimatedPrice: 19500, isEssential: true },
        { ingredientId: "ca_chua", name: "Cà chua", amount: "3 quả", unit: "quả", estimatedPrice: 9000, isEssential: true },
        { ingredientId: "hanh_la", name: "Hành tím & Hành lá", amount: "vừa đủ", unit: "mớ", estimatedPrice: 2000, isEssential: false },
        { ingredientId: "gia_vi_co_ban", name: "Nước mắm, đường, hạt tiêu", amount: "vừa đủ", unit: "phần", estimatedPrice: 1500, isEssential: true }
      ],
      steps: [
        { stepNumber: 1, title: "Ướp thịt", detail: "Ướp thịt cùng hành tím, nước mắm, tiêu 10 phút.", tip: "Trộn đều tay." },
        { stepNumber: 2, title: "Xào cà chua", detail: "Xào cà chua nhuyễn sánh với xíu muối.", tip: "Dầm nhuyễn mịn." },
        { stepNumber: 3, title: "Nấu thịt cùng sốt", detail: "Cho thịt vào đảo tơi đun nhỏ lửa 5 phút.", tip: "Dầm tơi thịt không vón cục." },
        { stepNumber: 4, title: "Hoàn tất", detail: "Rắc hành lá thái nhỏ tắt bếp.", tip: "Chan cơm ăn cực ngon." }
      ]
    }
  ],
  stores: [
    {
      id: "bach_hoa_xanh",
      name: "Bách Hóa Xanh",
      type: "Cửa hàng thực phẩm tiện lợi",
      avgPriceLevel: "$$",
      description: "Rau củ thịt cá tươi sống đóng khay định lượng nhỏ (100g - 300g), rất phù hợp với sinh viên và người độc thân.",
      advantages: [
        "Có khay thịt cá định lượng nhỏ từ 15k - 30k",
        "Rau củ sơ chế sẵn sạch sẽ",
        "Giảm giá xả hàng rau củ sau 19h tối"
      ],
      link: "https://www.bachhoaxanh.com"
    },
    {
      id: "cho_truyen_thong",
      name: "Chợ Truyền Thống / Dân Sinh",
      type: "Chợ dân sinh địa phương",
      avgPriceLevel: "$",
      description: "Nơi có giá thành tốt nhất và linh hoạt nhất: Bạn có thể mua 2.000đ hành lá, 10.000đ thịt băm mà không bị ép số lượng.",
      advantages: [
        "Tiết kiệm chi phí 20% - 35% so với siêu thị",
        "Mua đúng định lượng cần, không lãng phí",
        "Rau củ tươi mới mỗi sáng"
      ],
      tips: "Đi chợ từ 6h - 8h sáng để chọn đồ tươi nhất."
    },
    {
      id: "winmart",
      name: "WinMart+ / WinMart",
      type: "Siêu thị mini",
      avgPriceLevel: "$$$",
      description: "Chuỗi cửa hàng tiện lợi phủ rộng, thịt mát MEATDeli chuẩn châu Âu và rau sạch WinEco.",
      advantages: [
        "Thịt sạch nguồn gốc an toàn",
        "Nhiều gia vị đóng gói nhỏ",
        "Hội viên WiN giảm 20% thịt và rau"
      ],
      link: "https://winmart.vn"
    }
  ]
};
