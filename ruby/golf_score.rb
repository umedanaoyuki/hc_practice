# frozen_string_literal: true

# 1番目の標準入力を受けとる変数
golf_scores = gets.split(',')
# 2番目の標準入力を受け取る
par_numbers = gets.split(',')



# 2番目の標準入力を受け取る配列
# par_number_array = []

# array_num = 0
# par_numbers.each do |n|
#   par_number_array[array_num] = n.to_i
#   array_num += 1
# end

puts 'デバッグスタート'

number = 0
golf_scores.each do |golf_score|
    case golf_score.to_i
    when 1
      puts 'ホールインワン'
    when par_numbers[number].to_i
      puts 'パー'
    when par_numbers[number].to_i - 1
      puts 'バーディ'
    when par_numbers[number].to_i - 2
      puts 'イーグル'
    when par_numbers[number].to_i - 3
      puts 'アルバトロス'
    when par_numbers[number].to_i - 4
      puts 'コンドル'
    else
    # when (golf_score.to_i - par_numbers[number].to_i).positive?
      puts 'ボギー'
    end
    number += 1
end

puts '一旦終了'

case par_number_array[0]
when 1
  puts 'ホールインワン'
when golf_scores[0].to_i
  puts 'パー'
when golf_scores[0].to_i - 1
  puts 'バーディ'
when golf_scores[0].to_i - 2
  puts 'イーグル'
when golf_scores[0].to_i - 3
  puts 'アルバトロス'
when golf_scores[0].to_i - 4
  puts 'コンドル'
when golf_scores[0].to_i < par_number_array[0]
  puts 'ボギー'
end

puts 'numbered_s実行'
case par_number_array[1]
when 1
  puts 'ホールインワン'
when golf_scores[1].to_i
  puts 'パー'
when golf_scores[1].to_i - 1
  puts 'バーディ'
when golf_scores[1].to_i - 2
  puts 'イーグル'
when golf_scores[1].to_i - 3
  puts 'アルバトロス'
when golf_scores[1].to_i - 4
  puts 'コンドル'
when golf_scores[1].to_i < par_number_array[1]
  puts 'ボギー'
end
