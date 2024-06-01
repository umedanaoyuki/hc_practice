# frozen_string_literal: true

# 入力値X（= 18ホールの各ホールの規定打数）受けとる配列
par_numbers = gets.split(',')
# 入力値Y（= プレイヤーの打数）の入力を受け取る配列
golf_scores = gets.split(',')

# 出力を格納する配列
score_judge = []

# 配列を回すための変数
number = 0

golf_scores.each do |golf_score|
  # ゴルフの判定を行うための変数
  cal_score = par_numbers[number].to_i - golf_score.to_i

  if par_numbers[number].to_i == 5 && golf_score.to_i == 1
    score_judge.push('コンドル')
  elsif golf_score.to_i == 1
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
  elsif cal_score == - 1
    score_judge.push('ボギー')
  else
    score_judge.push("#{golf_score.to_i - par_numbers[number].to_i}ボギー")
  end
  number += 1
end

score_judge.each_with_index do |score, i|
  if i == score_judge.length - 1
    print score
    break
  end
  print "#{score},"
end
