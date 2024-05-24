# frozen_string_literal: true

require 'date'

date = Date.today
# カレンダーの表紙
month = date.strftime('%m')
puts "      #{month.to_i}月 #{date.year}"

week_day = %w(日 月 火 水 木 金 土)

# 曜日を表示
week_day.each do |wday|
  # 曜日を表示したあと、空欄を入れてprintする
  print "#{wday} "
end

# 改行
print "\n"

# p '該当月の初日'
first_date = Date.new(date.year, month.to_i, 1)
# p "firstDate:#{first_date}"

# 曜日の番号と日本語の曜日をマッピングするオブジェクトを作成
mapped_week_day = {
  0 => '日',
  1 => '月',
  2 => '火',
  3 => '水',
  4 => '木',
  5 => '金',
  6 => '土'
}

#  該当月の初日の曜日
w_day_number = first_date.wday.to_i
# puts mapped_week_day[w_day_number]

# 土曜日までの日数を求める
days_to_saturday = 6 - w_day_number
# p '土曜日までの日数'
# p days_to_saturday

# 該当月の最終日
last_date = Date.new(date.year, month.to_i, -1)
# 型変換
numbered_last_date = last_date.day.to_i








# empty_space = ' '
for num in 1..numbered_last_date do
  if num == 1 + days_to_saturday
      print "#{num}\n"
  else
    print "#{num} "
  end
end


# print empty_space * number
# 初日が何曜日か 曜日によって空白を出力
# i から最初の土曜日を引いた結果が7の倍数なら、iを表示後に改行する


# puts "#{empty_space * number * 2}#{first_date.day}"
