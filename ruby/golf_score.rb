# frozen_string_literal: true

# 1番目の入力を受けとる変数(18ホールの各ホールの規定打数)
par_numbers = gets.split(',')
# 2番目の入力を受け取る(プレイヤーの打数)
golf_scores = gets.split(',')

# 出力を格納する配列
score_judge = []

# 配列を回すための変数
number = 0

golf_scores.each do |golf_score|
  cal_score = par_numbers[number].to_i - golf_score.to_i

  if golf_score.to_i == 1
    score_judge.push('ホールインワン')
  elsif cal_score.zero?
    score_judge.push('パー')
  elsif cal_score == 1
    score_judge.push('バーディ')
  elsif cal_score == 2
    score_judge.push('イーグル')
  elsif cal_score == 3
    score_judge.push('アルバトロス')
  elsif cal_score == 4
    score_judge.push('コンドル')
  elsif cal_score == -1
    score_judge.push('ボギー')
  else
    score_judge.push("#{cal_score}ボギー")
  end
  number += 1
end

array_count = score_judge.length
for i in 0..array_count.to_i - 2
  print "#{score_judge[i]},"
end

print score_judge[array_count - 1]
