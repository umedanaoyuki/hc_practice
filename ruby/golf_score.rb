# frozen_string_literal: true

# 1番目の標準入力を受けとる変数
input_line = gets.split(',')

# 2番目の標準入力を受け取る変数
numbered_s = 0
numbered_t = 0

temp_number = 1
temp_number.times do
  s = gets.chomp.split(',')
  # 2番目に入力した文字をintegerに変換
  numbered_s = s[0].to_i
  numbered_t = s[1].to_i
end

puts 'input_line[0]'
puts input_line[0].to_i

puts 'numbered_s'
puts numbered_s
puts 'numbered_t'
puts numbered_t

puts 'numbered_s実行'
case numbered_s
when 1
  puts 'ホールインワン'
when input_line[0].to_i
  puts 'パー'
when input_line[0].to_i - 1
  puts 'バーディ'
when input_line[0].to_i - 2
  puts 'イーグル'
when input_line[0].to_i - 3
  puts 'アルバトロス'
when input_line[0].to_i - 4
  puts 'コンドル'
when input_line[0].to_i < numbered_s
  puts 'ボギー'
end

puts 'numbered_t実行'
case numbered_t
when 1
  puts 'ホールインワン'
when input_line[1].to_i
  puts 'パー'
when input_line[1].to_i - 1
  puts 'バーディ'
when input_line[1].to_i - 2
  puts 'イーグル'
when input_line[1].to_i - 3
  puts 'アルバトロス'
when input_line[1].to_i - 4
  puts 'コンドル'
when input_line[1].to_i < numbered_s
  puts 'ボギー'
end
