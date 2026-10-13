const FALLBACK_DATA = {
  "dishes": [
    {
      "id": "dau_sot_ca_chua",
      "name": "Đậu hũ sốt cà chua",
      "category": "Món mặn",
      "mealType": [
        "Bữa trưa",
        "Bữa tối"
      ],
      "cookTime": 15,
      "difficulty": "Dễ",
      "baseServings": 2,
      "basePrice": 22000,
      "image": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=700&auto=format&fit=crop&q=80",
      "description": "Món ăn thanh đạm, sốt chua ngọt đậm đà, đậu hũ mềm thơm ngấm đẫm nước sốt cà chua rắc hành lá bắt cơm tuyệt đối.",
      "calories": 280,
      "tags": [
        "Tiết kiệm",
        "Nhanh gọn",
        "Sinh viên",
        "Thanh đạm"
      ],
      "ingredients": [
        {
          "ingredientId": "dau_phu",
          "name": "Đậu phụ trắng",
          "amount": "3 bìa",
          "unit": "bìa",
          "estimatedPrice": 12000,
          "isEssential": true
        },
        {
          "ingredientId": "ca_chua",
          "name": "Cà chua chín",
          "amount": "2 quả",
          "unit": "quả",
          "estimatedPrice": 6000,
          "isEssential": true
        },
        {
          "ingredientId": "hanh_la",
          "name": "Hành lá",
          "amount": "2 nhánh",
          "unit": "mớ",
          "estimatedPrice": 2000,
          "isEssential": false
        },
        {
          "ingredientId": "gia_vi_co_ban",
          "name": "Mắm, hạt nêm, dầu ăn",
          "amount": "vừa đủ",
          "unit": "phần",
          "estimatedPrice": 2000,
          "isEssential": true
        }
      ],
      "steps": [
        {
          "stepNumber": 1,
          "title": "Sơ chế nguyên liệu",
          "detail": "Đậu hũ rửa nhẹ nước, cắt miếng vuông vừa ăn. Cà chua rửa sạch bổ múi cau nhỏ. Hành lá cắt nhỏ.",
          "tip": "Thấm ráo nước trên mặt đậu trước khi rán để tránh bắn dầu."
        },
        {
          "stepNumber": 2,
          "title": "Rán vàng đậu hũ",
          "detail": "Bắc chảo lên bếp cùng 2 muỗng dầu ăn, thả đậu vào chiên vàng đều 2 mặt rồi vớt ra đĩa.",
          "tip": "Không cần chiên quá già, chỉ cần vỏ ngoài se vàng để đậu giữ được độ mềm ngọt bên trong."
        },
        {
          "stepNumber": 3,
          "title": "Làm sốt cà chua",
          "detail": "Phi thơm đầu hành, trút cà chua vào xào nhuyễn cùng 1 muỗng hạt nêm, 1 muỗng nước mắm và xíu đường. Thêm 3 muỗng canh nước lọc đun sôi lăn tăn.",
          "tip": "Dầm nhẹ cho cà chua mau nhuyễn mịn tạo màu đỏ óng tự nhiên."
        },
        {
          "stepNumber": 4,
          "title": "Om đậu và hoàn thành",
          "detail": "Thả đậu đã rán vào đảo đều cho thấm sốt trong 3-5 phút với lửa nhỏ. Nêm lại vừa khẩu vị, rắc hành lá cắt nhỏ rồi tắt bếp.",
          "tip": "Nước sốt chan cùng cơm nóng cực kỳ đưa cơm."
        }
      ]
    },
    {
      "id": "trung_chien_thit_bam",
      "name": "Trứng chiên thịt băm hành lá",
      "category": "Món mặn",
      "mealType": [
        "Bữa trưa",
        "Bữa tối",
        "Bữa sáng"
      ],
      "cookTime": 12,
      "difficulty": "Dễ",
      "baseServings": 2,
      "basePrice": 28000,
      "image": "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=700&auto=format&fit=crop&q=80",
      "description": "Món trứng chiên vàng xốp, nhân thịt heo băm ngọt đậm vị hòa quyện mùi thơm lừng của hành lá và tiêu xay.",
      "calories": 360,
      "tags": [
        "Nhanh gọn",
        "Giàu đạm",
        "Sinh viên",
        "Tiết kiệm"
      ],
      "ingredients": [
        {
          "ingredientId": "trung_ga",
          "name": "Trứng gà",
          "amount": "3 quả",
          "unit": "quả",
          "estimatedPrice": 10500,
          "isEssential": true
        },
        {
          "ingredientId": "thit_heo_bam",
          "name": "Thịt heo xay",
          "amount": "100g",
          "unit": "100g",
          "estimatedPrice": 13000,
          "isEssential": true
        },
        {
          "ingredientId": "hanh_la",
          "name": "Hành lá",
          "amount": "2 nhánh",
          "unit": "mớ",
          "estimatedPrice": 2000,
          "isEssential": false
        },
        {
          "ingredientId": "gia_vi_co_ban",
          "name": "Nước mắm, hạt tiêu",
          "amount": "vừa đủ",
          "unit": "phần",
          "estimatedPrice": 2500,
          "isEssential": true
        }
      ],
      "steps": [
        {
          "stepNumber": 1,
          "title": "Sơ chế & Trộn hỗn hợp",
          "detail": "Ướp thịt băm với chút tiêu, 1 thìa nước mắm trong 5 phút. Đập 3 quả trứng vào tô, thêm hành lá cắt nhỏ, trút thịt vào đánh bông nhẹ.",
          "tip": "Thêm nửa thìa cà phê nước lọc giúp trứng rán mềm xốp không bị khô xác."
        },
        {
          "stepNumber": 2,
          "title": "Chiên trứng chín đều",
          "detail": "Đun nóng dầu ăn trong chảo, đổ hỗn hợp trứng vào láng đều mặt chảo. Giữ lửa vừa nhỏ để thịt chín từ từ.",
          "tip": "Đậy nắp chảo khoảng 2 phút đầu để mặt trên nhanh chín se lại dễ lật."
        },
        {
          "stepNumber": 3,
          "title": "Lật mặt và thưởng thức",
          "detail": "Khi mặt dưới vàng đều, lật mặt chiên thêm 1-2 phút rồi trượt ra đĩa.",
          "tip": "Cắt thành từng miếng tam giác vừa đẹp mắt vừa dễ gắp."
        }
      ]
    },
    {
      "id": "thit_kho_tau_trung_cut",
      "name": "Thịt kho tàu nước dừa trứng cút",
      "category": "Món mặn",
      "mealType": [
        "Bữa trưa",
        "Bữa tối"
      ],
      "cookTime": 40,
      "difficulty": "Trung bình",
      "baseServings": 2,
      "basePrice": 52000,
      "image": "https://images.unsplash.com/photo-1544025162-d76694265947?w=700&auto=format&fit=crop&q=80",
      "description": "Thịt ba chỉ béo ngậy mềm tan kết hợp trứng cút bùi bùi, nước kho màu cánh gián vàng óng ánh đậm đà vị truyền thống.",
      "calories": 520,
      "tags": [
        "Cơm nhà",
        "Đậm đà",
        "Món truyền thống"
      ],
      "ingredients": [
        {
          "ingredientId": "thit_heo_ba_chi",
          "name": "Thịt ba chỉ heo",
          "amount": "250g",
          "unit": "100g",
          "estimatedPrice": 40000,
          "isEssential": true
        },
        {
          "ingredientId": "trung_cut",
          "name": "Trứng cút luộc",
          "amount": "10 quả",
          "unit": "10 quả",
          "estimatedPrice": 8000,
          "isEssential": true
        },
        {
          "ingredientId": "toi",
          "name": "Tỏi, hành tím",
          "amount": "vài tép",
          "unit": "củ",
          "estimatedPrice": 2000,
          "isEssential": false
        },
        {
          "ingredientId": "gia_vi_co_ban",
          "name": "Nước mắm, đường thắng màu, tiêu",
          "amount": "vừa đủ",
          "unit": "phần",
          "estimatedPrice": 2000,
          "isEssential": true
        }
      ],
      "steps": [
        {
          "stepNumber": 1,
          "title": "Sơ chế & Ướp thịt",
          "detail": "Thịt rửa sạch, chần sơ nước sôi, cắt khúc vuông 3x3cm. Ướp với hành tỏi băm, 2 thìa nước mắm ngon, 1 thìa đường, tiêu trong 20 phút.",
          "tip": "Chần thịt giúp loại bỏ bọt bẩn và nước kho trong veo óng ả."
        },
        {
          "stepNumber": 2,
          "title": "Luộc bóc vỏ trứng cút",
          "detail": "Luộc chín trứng cút trong 6 phút, vớt ra ngâm nước đá rồi lột sạch vỏ.",
          "tip": "Có thể rán sơ trứng cút để vỏ ngoài dai giòn thấm gia vị hơn."
        },
        {
          "stepNumber": 3,
          "title": "Thắng nước màu & Đảo săn thịt",
          "detail": "Cho 1 thìa đường vào nồi thắng đến khi chuyển màu cánh gián thì cho thịt vào đảo săn đều.",
          "tip": "Canh màu vừa tới, không để quá lửa tránh bị đắng."
        },
        {
          "stepNumber": 4,
          "title": "Kho thịt chín mềm",
          "detail": "Đổ nước xâm xấp mặt thịt, đun sôi rồi hớt bọt. Hạ lửa liu riu trong 25 phút. Cho trứng cút vào kho thêm 10 phút đến khi nước cạn sánh sệt.",
          "tip": "Không đậy vung lúc kho để mỡ thịt trong veo đẹp mắt."
        }
      ]
    },
    {
      "id": "canh_ca_chua_trung",
      "name": "Canh mây cà chua trứng gà",
      "category": "Món canh",
      "mealType": [
        "Bữa trưa",
        "Bữa tối"
      ],
      "cookTime": 10,
      "difficulty": "Dễ",
      "baseServings": 2,
      "basePrice": 16000,
      "image": "https://images.unsplash.com/photo-1547592180-85f173990554?w=700&auto=format&fit=crop&q=80",
      "description": "Bát canh mây bồng bềnh thanh nhẹ, vị chua thanh dịu mát từ cà chua kết hợp vân trứng mềm mịn, giải ngấy cực tốt.",
      "calories": 140,
      "tags": [
        "Tiết kiệm",
        "Nhanh gọn",
        "Sinh viên",
        "Thanh mát"
      ],
      "ingredients": [
        {
          "ingredientId": "trung_ga",
          "name": "Trứng gà",
          "amount": "2 quả",
          "unit": "quả",
          "estimatedPrice": 7000,
          "isEssential": true
        },
        {
          "ingredientId": "ca_chua",
          "name": "Cà chua chín",
          "amount": "2 quả",
          "unit": "quả",
          "estimatedPrice": 6000,
          "isEssential": true
        },
        {
          "ingredientId": "hanh_la",
          "name": "Hành lá, ngò",
          "amount": "1 mớ nhỏ",
          "unit": "mớ",
          "estimatedPrice": 1500,
          "isEssential": false
        },
        {
          "ingredientId": "gia_vi_co_ban",
          "name": "Hạt nêm, mắm, dầu ăn",
          "amount": "vừa đủ",
          "unit": "phần",
          "estimatedPrice": 1500,
          "isEssential": true
        }
      ],
      "steps": [
        {
          "stepNumber": 1,
          "title": "Sơ chế",
          "detail": "Cà chua bổ múi cau. Trứng gà đánh tan trong bát. Hành lá thái nhỏ.",
          "tip": "Chọn cà chua chín mọng đỏ để canh có màu nước đẹp tự nhiên."
        },
        {
          "stepNumber": 2,
          "title": "Nấu nước dùng cà chua",
          "detail": "Phi thơm đầu hành với 1 thìa dầu, xào cà chua mềm nhuyễn rồi đổ 600ml nước lọc đun sôi.",
          "tip": "Nêm 1.5 thìa hạt nêm ngay lúc này để nước ngọt đậm vị."
        },
        {
          "stepNumber": 3,
          "title": "Tạo vân mây trứng bồng bềnh",
          "detail": "Khi nước sôi sùng sục, một tay rót từ từ trứng vào, một tay dùng đũa khuấy tròn một chiều tạo vân mây mỏng tang.",
          "tip": "Khuấy nhẹ nhàng theo một chiều giúp vân trứng không bị nát vụn."
        },
        {
          "stepNumber": 4,
          "title": "Rắc hành lá & Tắt bếp",
          "detail": "Tắt bếp ngay, rắc hành ngò thái nhỏ và chút tiêu xay rồi múc ra bát.",
          "tip": "Trứng không đun lâu để giữ được độ mềm mịn tan trong miệng."
        }
      ]
    },
    {
      "id": "rau_muong_xao_toi",
      "name": "Rau muống xào tỏi xanh giòn",
      "category": "Món xào/rau",
      "mealType": [
        "Bữa trưa",
        "Bữa tối"
      ],
      "cookTime": 8,
      "difficulty": "Dễ",
      "baseServings": 2,
      "basePrice": 12000,
      "image": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=700&auto=format&fit=crop&q=80",
      "description": "Rau muống xanh mướt giòn sần sật bốc khói nghi ngút, thơm nức mũi mùi tỏi phi giòn rụm chấm mắm ớt cay tê.",
      "calories": 110,
      "tags": [
        "Tiết kiệm",
        "Nhanh gọn",
        "Healthy",
        "Cơm nhà"
      ],
      "ingredients": [
        {
          "ingredientId": "rau_muong",
          "name": "Rau muống non",
          "amount": "1 bó",
          "unit": "bó",
          "estimatedPrice": 8000,
          "isEssential": true
        },
        {
          "ingredientId": "toi",
          "name": "Tỏi tép",
          "amount": "1 củ",
          "unit": "củ",
          "estimatedPrice": 2000,
          "isEssential": true
        },
        {
          "ingredientId": "gia_vi_co_ban",
          "name": "Dầu hào, hạt nêm, dầu ăn",
          "amount": "vừa đủ",
          "unit": "phần",
          "estimatedPrice": 2000,
          "isEssential": true
        }
      ],
      "steps": [
        {
          "stepNumber": 1,
          "title": "Nhặt và rửa rau",
          "detail": "Rau muống nhặt khúc non, bỏ bớt lá già, rửa sạch để ráo nước. Tỏi đập dập.",
          "tip": "Để rau ráo nước trước khi xào giúp rau giòn không bị ỉu thâm."
        },
        {
          "stepNumber": 2,
          "title": "Chần sơ (bí quyết xanh mướt)",
          "detail": "Đun sôi nồi nước có chút muối, thả rau vào chần nhanh 30 giây rồi vớt ngay ra thau nước đá lạnh.",
          "tip": "Nước đá giữ diệp lục giúp rau muống giữ màu xanh ngọc bích cực lâu."
        },
        {
          "stepNumber": 3,
          "title": "Xào lửa lớn",
          "detail": "Làm nóng chảo, cho dầu ăn và phi thơm 2/3 lượng tỏi. Trút rau vào xào lửa lớn đảo thật nhanh tay. Nêm dầu hào, hạt nêm.",
          "tip": "Xào trong 1-2 phút ở nhiệt độ cao nhất của bếp."
        },
        {
          "stepNumber": 4,
          "title": "Thêm tỏi phi thơm",
          "detail": "Cho nốt phần tỏi còn lại vào đảo đều rồi tắt bếp, trút ra đĩa.",
          "tip": "Món này ăn kèm nước mắm tỏi ớt chanh ngon ngất ngây."
        }
      ]
    },
    {
      "id": "thit_bam_sot_ca_chua",
      "name": "Thịt băm sốt cà chua đậm vị",
      "category": "Món mặn",
      "mealType": [
        "Bữa trưa",
        "Bữa tối"
      ],
      "cookTime": 15,
      "difficulty": "Dễ",
      "baseServings": 2,
      "basePrice": 32000,
      "image": "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=700&auto=format&fit=crop&q=80",
      "description": "Thịt băm ngọt bùi hòa cùng sốt cà chua sánh mịn sánh quyện, món ăn khoái khẩu của cả gia đình và sinh viên vì siêu nhanh.",
      "calories": 340,
      "tags": [
        "Nhanh gọn",
        "Cơm nhà",
        "Sinh viên",
        "Giàu đạm"
      ],
      "ingredients": [
        {
          "ingredientId": "thit_heo_bam",
          "name": "Thịt heo băm",
          "amount": "150g",
          "unit": "100g",
          "estimatedPrice": 19500,
          "isEssential": true
        },
        {
          "ingredientId": "ca_chua",
          "name": "Cà chua",
          "amount": "3 quả",
          "unit": "quả",
          "estimatedPrice": 9000,
          "isEssential": true
        },
        {
          "ingredientId": "hanh_la",
          "name": "Hành tím & Hành lá",
          "amount": "vừa đủ",
          "unit": "mớ",
          "estimatedPrice": 2000,
          "isEssential": false
        },
        {
          "ingredientId": "gia_vi_co_ban",
          "name": "Nước mắm, đường, hạt tiêu",
          "amount": "vừa đủ",
          "unit": "phần",
          "estimatedPrice": 1500,
          "isEssential": true
        }
      ],
      "steps": [
        {
          "stepNumber": 1,
          "title": "Ướp thịt băm",
          "detail": "Ướp thịt cùng hành tím băm, 1 thìa nước mắm ngon và tiêu xay trong 10 phút.",
          "tip": "Trộn đều tay để thịt ngấm mắm dậy mùi thơm."
        },
        {
          "stepNumber": 2,
          "title": "Xào nhuyễn cà chua",
          "detail": "Cà chua bổ hạt lựu, cho vào chảo dầu xào với xíu muối đến khi nhuyễn sánh.",
          "tip": "Thêm nửa bát con nước để có nước sốt sánh đặc chan cơm."
        },
        {
          "stepNumber": 3,
          "title": "Nấu thịt cùng sốt",
          "detail": "Trút thịt băm vào xào tơi cùng sốt cà chua, đun liu riu 5 phút cho thịt thấm vị chua ngọt.",
          "tip": "Dùng đũa dầm tơi thịt, tránh vón cục."
        },
        {
          "stepNumber": 4,
          "title": "Rắc hành lá & Hoàn tất",
          "detail": "Nêm lại chút đường mắm cho cân bằng vị chua, rắc hành lá thái nhỏ rồi tắt bếp.",
          "tip": "Có thể trộn cùng cơm hoặc chan bún ăn đều ngon tuyệt."
        }
      ]
    },
    {
      "id": "canh_cai_nau_thit_bam",
      "name": "Canh cải ngọt nấu thịt băm gừng ấm",
      "category": "Món canh",
      "mealType": [
        "Bữa trưa",
        "Bữa tối"
      ],
      "cookTime": 15,
      "difficulty": "Dễ",
      "baseServings": 2,
      "basePrice": 23000,
      "image": "https://images.unsplash.com/photo-1541832676-9b763b0239ab?w=700&auto=format&fit=crop&q=80",
      "description": "Nước canh ngọt thanh tự nhiên từ thịt băm, rau cải xanh mướt kết hợp vài lát gừng tươi ấm bụng ngày se lạnh.",
      "calories": 160,
      "tags": [
        "Thanh mát",
        "Tiết kiệm",
        "Nhanh gọn",
        "Healthy"
      ],
      "ingredients": [
        {
          "ingredientId": "thit_heo_bam",
          "name": "Thịt heo băm",
          "amount": "80g",
          "unit": "100g",
          "estimatedPrice": 10500,
          "isEssential": true
        },
        {
          "ingredientId": "rau_cai",
          "name": "Rau cải ngọt",
          "amount": "1 bó (300g)",
          "unit": "bó",
          "estimatedPrice": 9000,
          "isEssential": true
        },
        {
          "ingredientId": "gung",
          "name": "Gừng tươi",
          "amount": "vài lát mỏng",
          "unit": "củ",
          "estimatedPrice": 1500,
          "isEssential": false
        },
        {
          "ingredientId": "gia_vi_co_ban",
          "name": "Hạt nêm, muối, tiêu",
          "amount": "vừa đủ",
          "unit": "phần",
          "estimatedPrice": 2000,
          "isEssential": true
        }
      ],
      "steps": [
        {
          "stepNumber": 1,
          "title": "Sơ chế",
          "detail": "Rau cải rửa sạch cắt khúc 3-4cm. Gừng thái sợi chỉ mỏng. Thịt ướp nhẹ hạt nêm.",
          "tip": "Ngâm rau cải với nước muối loãng 5 phút cho sạch bụi bẩn."
        },
        {
          "stepNumber": 2,
          "title": "Xào sơ thịt",
          "detail": "Bắc nồi lên bếp, phi thơm chút hành xào thịt băm săn lại rồi đổ 700ml nước lọc.",
          "tip": "Hớt bọt khi nước sôi để nước canh thật trong."
        },
        {
          "stepNumber": 3,
          "title": "Nấu chín rau",
          "detail": "Nước sôi thả rau cải và gừng thái sợi vào, đun lửa to trong 2-3 phút cho rau vừa chín tới giòn ngọt.",
          "tip": "Không đậy vung để rau cải không bị nồng và úa vàng."
        },
        {
          "stepNumber": 4,
          "title": "Nêm gia vị",
          "detail": "Nêm hạt nêm, chút nước mắm dậy mùi rồi múc ra tô thưởng thức nóng.",
          "tip": "Món canh giải cảm cực tốt nhờ hương vị gừng ấm áp."
        }
      ]
    },
    {
      "id": "thit_ga_rim_gung_sa",
      "name": "Gà rim gừng sả thơm lừng",
      "category": "Món mặn",
      "mealType": [
        "Bữa trưa",
        "Bữa tối"
      ],
      "cookTime": 25,
      "difficulty": "Dễ",
      "baseServings": 2,
      "basePrice": 38000,
      "image": "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=700&auto=format&fit=crop&q=80",
      "description": "Thịt gà săn chắc đẫm màu vàng óng, nồng nàn mùi gừng giòn cay và sả phi thơm phức, cực kỳ tốn cơm.",
      "calories": 420,
      "tags": [
        "Đậm đà",
        "Cơm nhà",
        "Giàu đạm"
      ],
      "ingredients": [
        {
          "ingredientId": "thit_ga",
          "name": "Thịt gà chặt miếng",
          "amount": "300g",
          "unit": "100g",
          "estimatedPrice": 30000,
          "isEssential": true
        },
        {
          "ingredientId": "gung",
          "name": "Gừng củ thái sợi",
          "amount": "1 củ",
          "unit": "củ",
          "estimatedPrice": 2000,
          "isEssential": true
        },
        {
          "ingredientId": "sa",
          "name": "Sả băm",
          "amount": "2 cây",
          "unit": "bó",
          "estimatedPrice": 2000,
          "isEssential": true
        },
        {
          "ingredientId": "gia_vi_co_ban",
          "name": "Nước mắm, đường, tiêu, hạt nêm",
          "amount": "vừa đủ",
          "unit": "phần",
          "estimatedPrice": 4000,
          "isEssential": true
        }
      ],
      "steps": [
        {
          "stepNumber": 1,
          "title": "Sơ chế & Ướp gà",
          "detail": "Gà rửa với nước muối gừng khử mùi hôi, chặt miếng vừa ăn. Ướp gà với sả băm, 1 nửa gừng sợi, 1.5 thìa nước mắm, tiêu trong 15 phút.",
          "tip": "Ráo nước hoàn toàn để khi rim thịt gà săn chắc không bị bở."
        },
        {
          "stepNumber": 2,
          "title": "Phi thơm gia vị",
          "detail": "Cho dầu ăn vào chảo, phi thơm phần sả và gừng còn lại cho vàng ruộm.",
          "tip": "Sả phi vàng dậy mùi tinh dầu là bí quyết làm món ăn hấp dẫn."
        },
        {
          "stepNumber": 3,
          "title": "Đảo săn và rim thịt gà",
          "detail": "Trút gà vào đảo lửa lớn cho thịt săn lại và se các mặt. Cho xíu nước màu và nửa chén nước con, hạ nhỏ lửa rim 15 phút.",
          "tip": "Đảo đều tay để nước kho áo đều lớp bóng đẹp lên từng miếng gà."
        },
        {
          "stepNumber": 4,
          "title": "Cạn sánh sền sệt",
          "detail": "Rim đến khi nước sốt keo lại bám đều quanh thịt gà, rắc tiêu xay rồi múc ra đĩa.",
          "tip": "Món này ăn cùng dưa leo hoặc cơm nóng thì hết sẩy."
        }
      ]
    },
    {
      "id": "bo_xao_hoa_thien_ly",
      "name": "Bò xào hoa thiên lý thanh mát",
      "category": "Món mặn",
      "mealType": [
        "Bữa trưa",
        "Bữa tối"
      ],
      "cookTime": 15,
      "difficulty": "Dễ",
      "baseServings": 2,
      "basePrice": 68000,
      "image": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=700&auto=format&fit=crop&q=80",
      "description": "Thịt bò mềm ngọt không dai, hoa thiên lý xanh mát thơm ngát dịu dàng giòn ngọt thanh tao giúp ngủ ngon, giải nhiệt.",
      "calories": 310,
      "tags": [
        "Healthy",
        "Món bổ dưỡng",
        "Nhanh gọn"
      ],
      "ingredients": [
        {
          "ingredientId": "thit_bo",
          "name": "Thịt bò mềm",
          "amount": "180g",
          "unit": "100g",
          "estimatedPrice": 50000,
          "isEssential": true
        },
        {
          "ingredientId": "hoa_thien_ly",
          "name": "Hoa thiên lý tươi",
          "amount": "150g",
          "unit": "100g",
          "estimatedPrice": 12000,
          "isEssential": true
        },
        {
          "ingredientId": "toi",
          "name": "Tỏi băm",
          "amount": "1 củ",
          "unit": "củ",
          "estimatedPrice": 2000,
          "isEssential": true
        },
        {
          "ingredientId": "gia_vi_co_ban",
          "name": "Dầu hào, tiêu, hạt nêm, dầu ăn",
          "amount": "vừa đủ",
          "unit": "phần",
          "estimatedPrice": 4000,
          "isEssential": true
        }
      ],
      "steps": [
        {
          "stepNumber": 1,
          "title": "Thái & Ướp bò",
          "detail": "Thịt bò thái lát mỏng ngang thớ. Ướp với tỏi băm, 1 thìa dầu hào, nửa thìa hạt nêm và 1 thìa dầu ăn trong 15 phút.",
          "tip": "Thêm thìa dầu ăn ướp bò sẽ giúp thịt giữ nước, xào cực mềm không bị dai."
        },
        {
          "stepNumber": 2,
          "title": "Sơ chế hoa thiên lý",
          "detail": "Hoa thiên lý nhặt bỏ cuống già, rửa nhẹ nhàng với nước muối loãng rồi để ráo.",
          "tip": "Tránh vò mạnh làm dập nát cánh hoa."
        },
        {
          "stepNumber": 3,
          "title": "Xào thịt bò lửa lớn",
          "detail": "Phi thơm tỏi, cho bò vào xào lửa lớn đảo nhanh trong 1 phút vừa chín tái thì trút riêng ra đĩa.",
          "tip": "Không xào bò quá lâu trên bếp để tránh mất độ ngọt mềm."
        },
        {
          "stepNumber": 4,
          "title": "Xào hoa thiên lý & Trộn đều",
          "detail": "Thêm xíu dầu vào chảo, cho hoa thiên lý vào đảo nhanh 1-2 phút. Trút đĩa bò vào đảo đều 30 giây, nêm lại gia vị rồi tắt bếp.",
          "tip": "Rắc tiêu xay lên trên mặt đĩa bò khi dùng nóng."
        }
      ]
    },
    {
      "id": "canh_chua_ca_loc",
      "name": "Canh chua cá lóc miền Tây thanh ngọt",
      "category": "Món canh",
      "mealType": [
        "Bữa trưa",
        "Bữa tối"
      ],
      "cookTime": 30,
      "difficulty": "Trung bình",
      "baseServings": 2,
      "basePrice": 58000,
      "image": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=700&auto=format&fit=crop&q=80",
      "description": "Nồi canh chua nóng hổi chua ngọt hài hòa, cá lóc ngọt thịt chắc nịch cùng cà chua, giá đỗ và rau thơm ngò gai nức mũi.",
      "calories": 290,
      "tags": [
        "Cơm nhà",
        "Thanh mát",
        "Đặc sản"
      ],
      "ingredients": [
        {
          "ingredientId": "ca_loc",
          "name": "Cá lóc cắt khúc",
          "amount": "250g",
          "unit": "100g",
          "estimatedPrice": 35000,
          "isEssential": true
        },
        {
          "ingredientId": "ca_chua",
          "name": "Cà chua",
          "amount": "2 quả",
          "unit": "quả",
          "estimatedPrice": 6000,
          "isEssential": true
        },
        {
          "ingredientId": "gia_do",
          "name": "Giá đỗ tươi",
          "amount": "100g",
          "unit": "100g",
          "estimatedPrice": 3000,
          "isEssential": true
        },
        {
          "ingredientId": "chanh",
          "name": "Chanh / Me chua",
          "amount": "1 quả",
          "unit": "quả",
          "estimatedPrice": 2000,
          "isEssential": true
        },
        {
          "ingredientId": "hanh_la",
          "name": "Ngò gai & rau ngổ",
          "amount": "1 mớ",
          "unit": "mớ",
          "estimatedPrice": 3000,
          "isEssential": false
        },
        {
          "ingredientId": "gia_vi_co_ban",
          "name": "Mắm ngon, ớt, đường, muối",
          "amount": "vừa đủ",
          "unit": "phần",
          "estimatedPrice": 9000,
          "isEssential": true
        }
      ],
      "steps": [
        {
          "stepNumber": 1,
          "title": "Sơ chế cá lóc",
          "detail": "Cá lóc chà muối và chanh khử sạch nhớt, rửa sạch cắt khúc. Ướp chút nước mắm, tiêu trong 10 phút.",
          "tip": "Xát muối kỹ giúp thịt cá hết tanh và săn chắc thơm ngon."
        },
        {
          "stepNumber": 2,
          "title": "Nấu nước canh chua",
          "detail": "Phi thơm tỏi băm, xào cà chua lấy màu rồi đổ 800ml nước đun sôi. Cho me/chanh dầm lấy nước chua.",
          "tip": "Cân bằng vị chua ngọt bằng 2 thìa đường và 2 thìa nước mắm."
        },
        {
          "stepNumber": 3,
          "title": "Nấu chín cá lóc",
          "detail": "Thả từng khúc cá vào nồi nước sôi lăn tăn, hớt bọt cẩn thận trong 10-12 phút cho cá chín ngọt.",
          "tip": "Không khuấy mạnh tay làm nát khúc cá."
        },
        {
          "stepNumber": 4,
          "title": "Thêm giá & Rau thơm",
          "detail": "Thả giá đỗ vào nồi sôi 1 phút tắt bếp ngay. Múc ra tô rắc ngò gai, rau ngổ và vài lát ớt đỏ.",
          "tip": "Chấm cá lóc cùng chén nước mắm ớt mặn nguyên chất thơm lừng."
        }
      ]
    },
    {
      "id": "com_rang_dua_bo",
      "name": "Cơm rang dưa bò giòn ngon",
      "category": "Món một đĩa",
      "mealType": [
        "Bữa trưa",
        "Bữa tối",
        "Bữa sáng"
      ],
      "cookTime": 20,
      "difficulty": "Dễ",
      "baseServings": 2,
      "basePrice": 48000,
      "image": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=700&auto=format&fit=crop&q=80",
      "description": "Hạt cơm vàng óng tơi xốp săn hạt, thịt bò mềm đậm đà xào cùng dưa chua giòn rụm chua thanh kích thích vị giác.",
      "calories": 580,
      "tags": [
        "Nhanh gọn",
        "Cơm một đĩa",
        "Sinh viên"
      ],
      "ingredients": [
        {
          "ingredientId": "com_nguoi",
          "name": "Cơm nguội",
          "amount": "2 bát đầy",
          "unit": "bát",
          "estimatedPrice": 8000,
          "isEssential": true
        },
        {
          "ingredientId": "thit_bo",
          "name": "Thịt bò thái mỏng",
          "amount": "100g",
          "unit": "100g",
          "estimatedPrice": 28000,
          "isEssential": true
        },
        {
          "ingredientId": "dua_chua",
          "name": "Dưa cải chua",
          "amount": "150g",
          "unit": "túi",
          "estimatedPrice": 4000,
          "isEssential": true
        },
        {
          "ingredientId": "trung_ga",
          "name": "Trứng gà",
          "amount": "1 quả",
          "unit": "quả",
          "estimatedPrice": 3500,
          "isEssential": false
        },
        {
          "ingredientId": "gia_vi_co_ban",
          "name": "Tỏi băm, dầu hào, tiêu, nước tương",
          "amount": "vừa đủ",
          "unit": "phần",
          "estimatedPrice": 4500,
          "isEssential": true
        }
      ],
      "steps": [
        {
          "stepNumber": 1,
          "title": "Trộn trứng vào cơm",
          "detail": "Bóp tơi cơm nguội, đập 1 lòng đỏ trứng gà vào trộn đều để hạt cơm áo màu vàng óng.",
          "tip": "Cơm để ngăn mát tủ lạnh qua đêm rang hạt sẽ giòn tơi tuyệt đối."
        },
        {
          "stepNumber": 2,
          "title": "Xào dưa bò",
          "detail": "Phi thơm tỏi, xào bò chín tới trút ra. Cho dưa chua vào xào săn với xíu dầu hào, đổ thịt bò vào đảo chung rồi múc riêng ra đĩa.",
          "tip": "Vắt bớt nước chua trong dưa cải trước khi xào."
        },
        {
          "stepNumber": 3,
          "title": "Rang cơm săn hạt",
          "detail": "Làm nóng chảo, cho chút dầu ăn rang cơm lửa lớn đảo đều tay liên tục 5-7 phút cho hạt cơm săn se lại.",
          "tip": "Dùng chảo sâu lòng hoặc chảo chống dính tốt."
        },
        {
          "stepNumber": 4,
          "title": "Hoàn tất món ăn",
          "detail": "Trút dưa bò vào chảo cơm đảo nhanh tay 1 phút, rắc tiêu xay và hành lá rồi thưởng thức.",
          "tip": "Ăn kèm chút xì dầu ớt cay cay là chuẩn vị hàng quán Hà Nội."
        }
      ]
    },
    {
      "id": "ca_basa_kho_to",
      "name": "Cá ba sa kho tộ đậm đà keo sánh",
      "category": "Món mặn",
      "mealType": [
        "Bữa trưa",
        "Bữa tối"
      ],
      "cookTime": 30,
      "difficulty": "Dễ",
      "baseServings": 2,
      "basePrice": 36000,
      "image": "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=700&auto=format&fit=crop&q=80",
      "description": "Khúc cá basa béo ngậy ngấm đều gia vị kho tộ, nước sốt mặn ngọt cay nồng sánh kẹo quyện mùi tiêu thơm nức.",
      "calories": 440,
      "tags": [
        "Tiết kiệm",
        "Cơm nhà",
        "Đậm đà",
        "Sinh viên"
      ],
      "ingredients": [
        {
          "ingredientId": "ca_basa",
          "name": "Cá ba sa cắt khúc",
          "amount": "250g",
          "unit": "100g",
          "estimatedPrice": 27500,
          "isEssential": true
        },
        {
          "ingredientId": "ot",
          "name": "Ớt tươi",
          "amount": "2 quả",
          "unit": "quả",
          "estimatedPrice": 1000,
          "isEssential": false
        },
        {
          "ingredientId": "hanh_la",
          "name": "Đầu hành, hành tím",
          "amount": "vừa đủ",
          "unit": "mớ",
          "estimatedPrice": 2500,
          "isEssential": false
        },
        {
          "ingredientId": "gia_vi_co_ban",
          "name": "Nước mắm ngon, đường, tiêu đen, dầu ăn",
          "amount": "vừa đủ",
          "unit": "phần",
          "estimatedPrice": 5000,
          "isEssential": true
        }
      ],
      "steps": [
        {
          "stepNumber": 1,
          "title": "Ướp cá",
          "detail": "Cá rửa sạch khử tanh bằng nước muối, để ráo. Ướp cá với 2 thìa mắm, 1 thìa đường, hành tím băm, tiêu trong 20 phút.",
          "tip": "Ướp đủ thời gian giúp thịt cá săn chắc không bị nát khi kho."
        },
        {
          "stepNumber": 2,
          "title": "Thắng nước màu",
          "detail": "Đun nóng 1 thìa dầu ăn và 1 thìa đường đến khi có bọt khí nâu cánh gián đẹp mắt.",
          "tip": "Nhanh tay cho đầu hành vào phi thơm khi đường vừa đổi màu."
        },
        {
          "stepNumber": 3,
          "title": "Kho cá liu riu",
          "detail": "Xếp từng khúc cá vào tộ, đổ phần nước ướp cùng nửa chén nước nóng. Đun sôi rồi hạ lửa nhỏ liu riu 20 phút.",
          "tip": "Dùng nước nóng để cá không bị tanh."
        },
        {
          "stepNumber": 4,
          "title": "Cô đặc nước kho",
          "detail": "Khi nước kho sánh sệt lại, thả vài quả ớt hiểm và rắc thật nhiều tiêu đen xay thơm phức.",
          "tip": "Nước kho chấm rau luộc hoặc dưa chuột cực kỳ ngon miệng."
        }
      ]
    },
    {
      "id": "canh_bi_dao_thit_bam",
      "name": "Canh bí đao nấu thịt băm thanh mát",
      "category": "Món canh",
      "mealType": [
        "Bữa trưa",
        "Bữa tối"
      ],
      "cookTime": 15,
      "difficulty": "Dễ",
      "baseServings": 2,
      "basePrice": 18000,
      "image": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=700&auto=format&fit=crop&q=80",
      "description": "Bát canh bí xanh trong vắt mát ruột, từng miếng bí mềm ngọt dịu hòa quyện vị béo nhẹ của thịt băm và thơm hành ngò.",
      "calories": 130,
      "tags": [
        "Tiết kiệm",
        "Thanh mát",
        "Healthy",
        "Nhanh gọn"
      ],
      "ingredients": [
        {
          "ingredientId": "bi_dao",
          "name": "Bí đao (bí xanh)",
          "amount": "300g",
          "unit": "khúc",
          "estimatedPrice": 6000,
          "isEssential": true
        },
        {
          "ingredientId": "thit_heo_bam",
          "name": "Thịt heo băm",
          "amount": "70g",
          "unit": "100g",
          "estimatedPrice": 9000,
          "isEssential": true
        },
        {
          "ingredientId": "hanh_la",
          "name": "Hành lá, ngò rí",
          "amount": "vừa đủ",
          "unit": "mớ",
          "estimatedPrice": 1500,
          "isEssential": false
        },
        {
          "ingredientId": "gia_vi_co_ban",
          "name": "Hạt nêm, muối, tiêu",
          "amount": "vừa đủ",
          "unit": "phần",
          "estimatedPrice": 1500,
          "isEssential": true
        }
      ],
      "steps": [
        {
          "stepNumber": 1,
          "title": "Sơ chế",
          "detail": "Bí đao gọt vỏ, bỏ ruột, cắt lát mỏng hoặc khúc vừa ăn. Thịt băm ướp chút hạt nêm.",
          "tip": "Bỏ sạch ruột bí để canh không bị chua hậu vị."
        },
        {
          "stepNumber": 2,
          "title": "Xào thịt băm",
          "detail": "Phi thơm chút hành củ xào thịt băm săn lại, trút 700ml nước vào đun sôi.",
          "tip": "Hớt bọt để nước canh bí luôn trong veo."
        },
        {
          "stepNumber": 3,
          "title": "Nấu bí vừa chín tới",
          "detail": "Nước sôi cho bí đao vào nấu khoảng 3-4 phút cho bí chuyển màu trong suốt là vừa chín.",
          "tip": "Không nấu bí quá nhừ làm mất độ giòn ngọt tự nhiên."
        },
        {
          "stepNumber": 4,
          "title": "Hoàn tất",
          "detail": "Nêm lại vừa khẩu vị, tắt bếp thả hành ngò và tiêu xay thơm dịu.",
          "tip": "Món canh giải nhiệt cực kỳ tốt cho mùa hè."
        }
      ]
    },
    {
      "id": "suon_heo_xao_chua_ngot",
      "name": "Sườn heo xào chua ngọt óng ả",
      "category": "Món mặn",
      "mealType": [
        "Bữa trưa",
        "Bữa tối"
      ],
      "cookTime": 30,
      "difficulty": "Trung bình",
      "baseServings": 2,
      "basePrice": 65000,
      "image": "https://images.unsplash.com/photo-1544025162-d76694265947?w=700&auto=format&fit=crop&q=80",
      "description": "Sườn non chiên giòn bọc lớp sốt chua ngọt đỏ óng ả từ cà chua và giấm đường, cắn vào thịt mềm mọng đượm vị.",
      "calories": 480,
      "tags": [
        "Cơm nhà",
        "Đậm đà",
        "Món ngon cuối tuần"
      ],
      "ingredients": [
        {
          "ingredientId": "suon_heo",
          "name": "Sườn non heo",
          "amount": "250g",
          "unit": "100g",
          "estimatedPrice": 47500,
          "isEssential": true
        },
        {
          "ingredientId": "ca_chua",
          "name": "Cà chua",
          "amount": "1 quả",
          "unit": "quả",
          "estimatedPrice": 3000,
          "isEssential": true
        },
        {
          "ingredientId": "toi",
          "name": "Tỏi & Hành khô",
          "amount": "vài nhánh",
          "unit": "củ",
          "estimatedPrice": 2000,
          "isEssential": false
        },
        {
          "ingredientId": "chanh",
          "name": "Chanh / Giấm & Đường",
          "amount": "vừa đủ",
          "unit": "quả",
          "estimatedPrice": 2500,
          "isEssential": true
        },
        {
          "ingredientId": "gia_vi_co_ban",
          "name": "Nước mắm, dầu ăn, hạt nêm",
          "amount": "vừa đủ",
          "unit": "phần",
          "estimatedPrice": 10000,
          "isEssential": true
        }
      ],
      "steps": [
        {
          "stepNumber": 1,
          "title": "Sơ chế & Chần sườn",
          "detail": "Sườn chặt khúc vừa ăn, chần qua nước sôi 2 phút có chút muối để khử mùi hôi, rửa sạch để ráo.",
          "tip": "Chần sườn giúp thịt khi xào giữ được vị thơm nguyên bản."
        },
        {
          "stepNumber": 2,
          "title": "Rán xém vàng sườn",
          "detail": "Rán sườn trên chảo dầu lửa vừa đến khi bề mặt xém vàng giòn hai mặt rồi vớt ra.",
          "tip": "Không rán quá khô làm thịt sườn bị xác."
        },
        {
          "stepNumber": 3,
          "title": "Pha nước sốt chua ngọt thần thánh",
          "detail": "Pha theo tỉ lệ: 2 thìa mắm, 2 thìa đường, 2 thìa nước cốt chanh/giấm, 2 thìa tương cà chua, 3 thìa nước lọc khuấy tan.",
          "tip": "Khuấy đều cho tan hoàn toàn trước khi đổ vào chảo."
        },
        {
          "stepNumber": 4,
          "title": "Đảo sườn ngấm sốt",
          "detail": "Phi thơm tỏi băm, đổ bát sốt vào đun sôi sủi bọt, trút sườn đã rán vào đảo đều với lửa nhỏ cho sốt bám bóng đỏ quanh từng miếng sườn.",
          "tip": "Đảo đến khi nước sốt sền sệt bọc bóng loáng là hoàn hảo."
        }
      ]
    },
    {
      "id": "mi_xao_trung_rau_cai",
      "name": "Mì gói xào trứng và rau cải",
      "category": "Món một đĩa",
      "mealType": [
        "Bữa sáng",
        "Bữa trưa",
        "Bữa tối"
      ],
      "cookTime": 10,
      "difficulty": "Dễ",
      "baseServings": 1,
      "basePrice": 18000,
      "image": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=700&auto=format&fit=crop&q=80",
      "description": "Sợi mì dai giòn thơm phức, rau cải ngọt thanh và quả trứng ốp la lòng đào béo ngậy, cứu cánh đêm khuya cực phẩm.",
      "calories": 420,
      "tags": [
        "Sinh viên",
        "Nhanh gọn",
        "Tiết kiệm",
        "Cơm một đĩa"
      ],
      "ingredients": [
        {
          "ingredientId": "mi_tom",
          "name": "Mì ăn liền",
          "amount": "1 gói",
          "unit": "gói",
          "estimatedPrice": 5000,
          "isEssential": true
        },
        {
          "ingredientId": "trung_ga",
          "name": "Trứng gà",
          "amount": "1 quả",
          "unit": "quả",
          "estimatedPrice": 3500,
          "isEssential": true
        },
        {
          "ingredientId": "rau_cai",
          "name": "Rau cải thìa/ngọt",
          "amount": "100g",
          "unit": "bó",
          "estimatedPrice": 4000,
          "isEssential": true
        },
        {
          "ingredientId": "toi",
          "name": "Tỏi băm",
          "amount": "2 tép",
          "unit": "củ",
          "estimatedPrice": 1000,
          "isEssential": false
        },
        {
          "ingredientId": "gia_vi_co_ban",
          "name": "Dầu ăn, tương ớt, xì dầu",
          "amount": "vừa đủ",
          "unit": "phần",
          "estimatedPrice": 4500,
          "isEssential": true
        }
      ],
      "steps": [
        {
          "stepNumber": 1,
          "title": "Trần mì vừa dai",
          "detail": "Trần mì trong nước sôi khoảng 1.5 phút cho sợi mì vừa tơi ra, vớt ngay xả qua nước lạnh rồi trộn xíu dầu ăn để sợi không dính.",
          "tip": "Không trần quá kỹ khiến sợi mì bị nát khi xào."
        },
        {
          "stepNumber": 2,
          "title": "Ốp la trứng",
          "detail": "Chiên 1 quả trứng ốp la lòng đào vàng giòn viền ngoài rồi gắp riêng ra đĩa.",
          "tip": "Lòng đào béo ngậy trộn cùng mì xào tăng vị ngon gấp bội."
        },
        {
          "stepNumber": 3,
          "title": "Xào mì và rau cải",
          "detail": "Phi thơm tỏi, cho rau cải vào xào nhanh 1 phút. Trút mì vào đảo đều lửa to cùng 1 thìa xì dầu và nửa gói gia vị mì.",
          "tip": "Xào nhanh tay lửa lớn để sợi mì săn giòn dai."
        },
        {
          "stepNumber": 4,
          "title": "Bày ra đĩa",
          "detail": "Trút mì xào ra đĩa, đặt trứng ốp la lên trên, rắc tiêu và xịt tương ớt.",
          "tip": "Chỉ mất đúng 10 phút là có bữa ăn ấm bụng ngon miệng."
        }
      ]
    },
    {
      "id": "canh_bi_do_nau_thit_bam",
      "name": "Canh bí đỏ nấu thịt băm bùi ngọt",
      "category": "Món canh",
      "mealType": [
        "Bữa trưa",
        "Bữa tối"
      ],
      "cookTime": 18,
      "difficulty": "Dễ",
      "baseServings": 2,
      "basePrice": 20000,
      "image": "https://images.unsplash.com/photo-1547592180-85f173990554?w=700&auto=format&fit=crop&q=80",
      "description": "Bí đỏ ngọt bùi tán mịn hòa trong nước canh thanh đượm từ thịt băm, rắc chút rau ngổ thơm lừng ngào ngạt.",
      "calories": 210,
      "tags": [
        "Bổ dưỡng",
        "Tiết kiệm",
        "Cơm nhà"
      ],
      "ingredients": [
        {
          "ingredientId": "bi_do",
          "name": "Bí đỏ gọt vỏ",
          "amount": "300g",
          "unit": "miếng",
          "estimatedPrice": 7000,
          "isEssential": true
        },
        {
          "ingredientId": "thit_heo_bam",
          "name": "Thịt heo băm",
          "amount": "80g",
          "unit": "100g",
          "estimatedPrice": 10500,
          "isEssential": true
        },
        {
          "ingredientId": "hanh_la",
          "name": "Ngò gai & hành lá",
          "amount": "1 mớ",
          "unit": "mớ",
          "estimatedPrice": 1500,
          "isEssential": false
        },
        {
          "ingredientId": "gia_vi_co_ban",
          "name": "Hạt nêm, mắm, tiêu",
          "amount": "vừa đủ",
          "unit": "phần",
          "estimatedPrice": 1000,
          "isEssential": true
        }
      ],
      "steps": [
        {
          "stepNumber": 1,
          "title": "Sơ chế bí đỏ",
          "detail": "Bí đỏ gọt vỏ, thái miếng vuông dày khoảng 1.5cm. Hành ngò thái nhỏ.",
          "tip": "Thái miếng dày vừa phải để bí chín mềm mà không bị nát vụn."
        },
        {
          "stepNumber": 2,
          "title": "Xào sơ thịt",
          "detail": "Xào thịt băm săn thơm với chút hành khô và hạt nêm, sau đó cho bí đỏ vào xào cùng 1 phút.",
          "tip": "Xào bí đỏ trước giúp bí ngấm vị và giữ màu vàng óng."
        },
        {
          "stepNumber": 3,
          "title": "Nấu canh chín bùi",
          "detail": "Đổ 700ml nước đun sôi bùng, vặn lửa nhỏ nấu trong 8-10 phút cho bí chín mềm bùi ngọt.",
          "tip": "Dùng muỗng dầm nhẹ vài miếng bí đỏ để nước canh hơi sánh nhẹ tự nhiên."
        },
        {
          "stepNumber": 4,
          "title": "Nêm gia vị",
          "detail": "Nêm nước mắm thơm, rắc ngò gai thái sợi và múc ra tô.",
          "tip": "Bí đỏ rất giàu vitamin A tốt cho mắt và trí não."
        }
      ]
    },
    {
      "id": "thit_ba_chi_luoc_cham_mam",
      "name": "Thịt ba chỉ luộc cuốn rau chấm mắm tỏi",
      "category": "Món mặn",
      "mealType": [
        "Bữa trưa",
        "Bữa tối"
      ],
      "cookTime": 20,
      "difficulty": "Dễ",
      "baseServings": 2,
      "basePrice": 45000,
      "image": "https://images.unsplash.com/photo-1544025162-d76694265947?w=700&auto=format&fit=crop&q=80",
      "description": "Từng lát thịt ba chỉ thái mỏng mềm ngọt, mỡ giòn không ngấy, chấm cùng bát nước mắm tỏi ớt chua ngọt đánh thức mọi giác quan.",
      "calories": 420,
      "tags": [
        "Nhanh gọn",
        "Cơm nhà",
        "Dễ làm"
      ],
      "ingredients": [
        {
          "ingredientId": "thit_heo_ba_chi",
          "name": "Thịt ba chỉ ngon",
          "amount": "250g",
          "unit": "100g",
          "estimatedPrice": 40000,
          "isEssential": true
        },
        {
          "ingredientId": "toi",
          "name": "Tỏi, ớt, chanh",
          "amount": "vừa đủ",
          "unit": "củ",
          "estimatedPrice": 3000,
          "isEssential": true
        },
        {
          "ingredientId": "hanh_la",
          "name": "Hành tím củ",
          "amount": "2 củ",
          "unit": "củ",
          "estimatedPrice": 1000,
          "isEssential": false
        },
        {
          "ingredientId": "gia_vi_co_ban",
          "name": "Nước mắm ngon, đường",
          "amount": "vừa đủ",
          "unit": "phần",
          "estimatedPrice": 1000,
          "isEssential": true
        }
      ],
      "steps": [
        {
          "stepNumber": 1,
          "title": "Luộc thịt ba chỉ",
          "detail": "Rửa sạch thịt, thả vào nồi nước luộc cùng 2 củ hành tím đập dập và nửa thìa muối. Luộc sôi nhỏ lửa 15 phút.",
          "tip": "Hành tím giúp thịt luộc trắng tinh và thơm dịu không tanh."
        },
        {
          "stepNumber": 2,
          "title": "Ngâm nước đá (bí quyết mỡ giòn)",
          "detail": "Khi thịt chín tới, vớt ngay ra thả vào tô nước đá lạnh trong 5 phút.",
          "tip": "Nước đá giúp phần bì và mỡ giòn sần sật, miếng thịt không bị thâm xỉn."
        },
        {
          "stepNumber": 3,
          "title": "Thái mỏng thịt",
          "detail": "Vớt thịt ráo nước, dùng dao sắc thái lát mỏng đều tay bày ra đĩa tròn.",
          "tip": "Thái mỏng ăn sẽ mềm ngọt và không bị ngán."
        },
        {
          "stepNumber": 4,
          "title": "Pha mắm tỏi ớt",
          "detail": "Giã nhuyễn tỏi ớt với 1 thìa đường, vắt nửa quả chanh rồi thêm 2 thìa mắm ngon khuấy đều nổi bọt tỏi ớt đẹp mắt.",
          "tip": "Tỏi ớt giã sẽ nổi bồng bềnh lên mặt bát nước chấm cực hấp dẫn."
        }
      ]
    },
    {
      "id": "dau_cove_xao_thit_heo",
      "name": "Đậu cô ve xào thịt heo giòn ngọt",
      "category": "Món mặn",
      "mealType": [
        "Bữa trưa",
        "Bữa tối"
      ],
      "cookTime": 15,
      "difficulty": "Dễ",
      "baseServings": 2,
      "basePrice": 30000,
      "image": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=700&auto=format&fit=crop&q=80",
      "description": "Đậu que xanh giòn ngọt mát xào cùng thịt heo xắt mỏng đậm vị, thơm lừng mùi tỏi phi, dễ ăn và nhiều chất xơ.",
      "calories": 290,
      "tags": [
        "Cơm nhà",
        "Healthy",
        "Nhanh gọn"
      ],
      "ingredients": [
        {
          "ingredientId": "dau_cove",
          "name": "Đậu cô ve tươi",
          "amount": "250g",
          "unit": "lạng",
          "estimatedPrice": 9000,
          "isEssential": true
        },
        {
          "ingredientId": "thit_heo_ba_chi",
          "name": "Thịt heo nạc/ba chỉ",
          "amount": "100g",
          "unit": "100g",
          "estimatedPrice": 16000,
          "isEssential": true
        },
        {
          "ingredientId": "toi",
          "name": "Tỏi tép",
          "amount": "1 củ",
          "unit": "củ",
          "estimatedPrice": 2000,
          "isEssential": true
        },
        {
          "ingredientId": "gia_vi_co_ban",
          "name": "Dầu hào, hạt nêm, tiêu",
          "amount": "vừa đủ",
          "unit": "phần",
          "estimatedPrice": 3000,
          "isEssential": true
        }
      ],
      "steps": [
        {
          "stepNumber": 1,
          "title": "Tước xơ đậu",
          "detail": "Tước sạch 2 bên xơ của đậu que, rửa sạch rồi thái vát chéo.",
          "tip": "Thái vát chéo giúp đậu ngấm đều gia vị và xào nhanh chín giòn."
        },
        {
          "stepNumber": 2,
          "title": "Xào thịt săn thơm",
          "detail": "Phi thơm tỏi, cho thịt heo thái mỏng vào xào săn cùng chút mắm và tiêu rồi múc ra.",
          "tip": "Xào thịt chín tới để thịt không bị khô."
        },
        {
          "stepNumber": 3,
          "title": "Xào đậu giòn ngọt",
          "detail": "Cho đậu cô ve vào chảo lửa lớn xào nhanh tay, thêm 2 muỗng nước để đậu chín hơi không bị cháy xém.",
          "tip": "Xào nhanh trong 3 phút giữ trọn độ giòn ngọt."
        },
        {
          "stepNumber": 4,
          "title": "Hòa quyện hương vị",
          "detail": "Trút thịt vào đảo chung 1 phút, nêm 1 thìa dầu hào thơm phức rồi bày ra đĩa.",
          "tip": "Món ăn màu sắc xanh tươi kích thích bữa cơm gia đình."
        }
      ]
    }
  ],
  "stores": [
    {
      "id": "bach_hoa_xanh",
      "name": "Bách Hóa Xanh",
      "type": "Cửa hàng thực phẩm tiện lợi",
      "badge": "Tiện lợi & Giá tốt",
      "icon": "bi bi-shop",
      "avgPriceLevel": "$$",
      "description": "Rau củ thịt cá tươi sống đóng khay định lượng nhỏ (100g - 300g), rất phù hợp với sinh viên và người sống độc thân hoặc gia đình 2 người.",
      "advantages": [
        "Có khay thịt cá định lượng nhỏ từ 15k - 30k",
        "Rau củ sơ chế sẵn sạch sẽ, đóng gói tiện dụng",
        "Thường có chương trình giảm giá xả hàng rau củ sau 19h tối"
      ],
      "link": "https://www.bachhoaxanh.com"
    },
    {
      "id": "cho_truyen_thong",
      "name": "Chợ Truyền Thống / Dân Sinh",
      "type": "Chợ dân sinh địa phương",
      "badge": "Rẻ nhất & Linh hoạt",
      "icon": "bi bi-basket2-fill",
      "avgPriceLevel": "$",
      "description": "Nơi có giá thành tốt nhất và linh hoạt nhất: Bạn có thể mua 2.000đ hành lá, 10.000đ thịt băm, 1 quả cà chua mà không bị ràng buộc định lượng.",
      "advantages": [
        "Tiết kiệm chi phí từ 20% - 35% so với siêu thị",
        "Mua đúng định lượng bạn cần, không lãng phí nguyên liệu dư",
        "Rau củ và cá đồng tươi mới mỗi sáng sớm"
      ],
      "tips": "Nên đi chợ từ 6h - 8h sáng để chọn mớ rau tươi ngon nhất, hoặc sau 11h trưa để mua giá rẻ hơn."
    },
    {
      "id": "winmart",
      "name": "WinMart+ / WinMart",
      "type": "Siêu thị mini",
      "badge": "Chuẩn sạch MEATDeli",
      "icon": "bi bi-cart4",
      "avgPriceLevel": "$$$",
      "description": "Mạng lưới cửa hàng phủ khắp các khu phố và chung cư, nổi tiếng với thịt heo mát MEATDeli tươi sạch chuẩn châu Âu.",
      "advantages": [
        "Thịt sạch nguồn gốc rõ ràng, không chất bảo quản",
        "Nhiều gia vị đóng gói nhỏ và thực phẩm sơ chế",
        "Thẻ hội viên WiN giảm ngay 20% cho thịt và rau"
      ],
      "link": "https://winmart.vn"
    },
    {
      "id": "coop_food",
      "name": "Co.op Food",
      "type": "Siêu thị thực phẩm an toàn",
      "badge": "Bình ổn giá & Chuẩn VietGAP",
      "icon": "bi bi-bag-check-fill",
      "avgPriceLevel": "$$",
      "description": "Thương hiệu uy tín với nguồn thực phẩm chuẩn VietGAP, giá cả bình ổn và nhiều chương trình tích điểm.",
      "advantages": [
        "Hàng hóa kiểm định chất lượng nghiêm ngặt",
        "Nhiều món canh và combo nấu sẵn tiện dụng",
        "Giá cả niêm yết minh bạch, nhiều khuyến mãi tuần"
      ],
      "link": "https://cooponline.vn"
    },
    {
      "id": "delivery_apps",
      "name": "GrabMart / ShopeeFood / BeFood",
      "type": "Dịch vụ giao hàng tận nhà",
      "badge": "Giao nhanh 30 phút",
      "icon": "bi bi-bicycle",
      "avgPriceLevel": "$$$",
      "description": "Giải pháp hoàn hảo những ngày bận rộn hoặc thời tiết mưa gió: Shipper đi chợ hộ và mang nguyên liệu tới tận cửa trong 30-45 phút.",
      "advantages": [
        "Không cần ra ngoài, tiết kiệm thời gian",
        "Nhiều voucher giảm giá 20k - 50k và mã miễn phí vận chuyển",
        "Dễ so sánh giá giữa nhiều cửa hàng lân cận"
      ],
      "link": "https://shopeefood.vn"
    }
  ]
};