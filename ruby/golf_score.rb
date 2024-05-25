# frozen_string_literal: true

input_line = gets.to_i

# 1番目に入力した文字を出力（Integer）
puts input_line
input_line.times do
  s = gets.chomp.split(' ')
  # print "hello = #{s[0]} , world = #{s[1]}\n"
  numbered_s = s[0].to_i
  # 2番目に入力した文字を出力（String）
  p numbered_s
end
