# frozen_string_literal: true

# 1番目の標準入力を受けとる変数
golf_scores = gets.split(',')
# 2番目の標準入力を受け取る
par_numbers = gets.split(',')

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
    if (golf_score.to_i - par_numbers[number].to_i) > 1
      puts "#{golf_score.to_i - par_numbers[number].to_i}ボギー"
    else
      puts 'ボギー'
    end
  end
  number += 1
end
