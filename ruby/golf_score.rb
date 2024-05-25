# frozen_string_literal: true

puts '1番目の標準入力'
input_line = gets.to_i

# 2番目の標準入力を受け取る変数
numbered_s = 0

input_line.times do
  s = gets.chomp.split(' ')
  # 2番目に入力した文字をintegerに変換
  numbered_s = s[0].to_i
end

if input_line == numbered_s
  puts 'パー'
end
