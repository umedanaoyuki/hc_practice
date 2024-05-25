# frozen_string_literal: true

puts '1番目の標準入力'
input_line = gets.to_i

# 2番目の標準入力を受け取る変数
numbered_s = 0

# input_line.times do

temp_number = 1

temp_number.times do
  s = gets.chomp.split(' ')
  # 2番目に入力した文字をintegerに変換
  numbered_s = s[0].to_i
end

puts '結果出力'

puts input_line - numbered_s

# 結果 - 規定打数
cal_number = numbered_s - input_line

case cal_number
when 1
  puts 'ホールインワン'
when input_line
  puts 'パー'
when input_line - 1
  puts 'バーディ'
when input_line - 2
  puts 'イーグル'
when input_line - 3
  puts 'アルバトロス'
when input_line - 4
  puts 'コンドル'
when input_line < numbered_s
  puts 'ボギー'
end

# ホールインワン
# 1の場合

# ボギー
# 規定打数よりも多い場合
