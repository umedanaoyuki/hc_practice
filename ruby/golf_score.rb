# frozen_string_literal: true

# 1番目の標準入力を受けとる変数
golf_scores = gets.split(',')
# 2番目の標準入力を受け取る
par_numbers = gets.split(',')

answer = []

number = 0
golf_scores.each do |golf_score|
  case golf_score.to_i
  when 1
    answer.push('ホールインワン')
  when par_numbers[number].to_i
    answer.push('パー')
  when par_numbers[number].to_i - 1
    answer.push('バーディ')
  when par_numbers[number].to_i - 2
    answer.push('イーグル')
  when par_numbers[number].to_i - 3
    answer.push('アルバトロス')
  when par_numbers[number].to_i - 4
    answer.push('コンドル')
  else
    # when (golf_score.to_i - par_numbers[number].to_i).positive?
    if (golf_score.to_i - par_numbers[number].to_i) > 1
      answer.push("#{golf_score.to_i - par_numbers[number].to_i}ボギー")
    else
      answer.push('ボギー')
    end
  end
  number += 1
end

array_count = answer.length
for i in 0..array_count.to_i - 2
  print "#{answer[i]},"
end

print answer[array_count - 1]
