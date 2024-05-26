# frozen_string_literal: true

# 1番目の標準入力を受けとる変数
input_line = gets.split(',')

# 2番目の標準入力を受け取る配列
numbered_s = []

# temp_number = 1
# temp_number.times do
s = gets.chomp.split(',')

# puts s

temp_num = 0
s.each do |n|
  numbered_s[temp_num] = n.to_i
  temp_num += 1
end

puts 'numbered_s'
puts numbered_s

puts 'numbered_s実行'
case numbered_s[0]
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
when input_line[0].to_i < numbered_s[0]
  puts 'ボギー'
end

puts 'numbered_s実行'
case numbered_s[1]
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
when input_line[1].to_i < numbered_s[1]
  puts 'ボギー'
end
