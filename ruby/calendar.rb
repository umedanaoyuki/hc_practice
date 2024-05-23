# frozen_string_literal: true

require 'date'

date = Date.today
# カレンダーの表紙
month = date.strftime('%m')
puts "      #{month.to_i}月 #{date.year}"

week_day = %w(日 月 火 水 木 金 土)

# 曜日を表示
week_day.each do |wday|
  print "#{wday} "
end

print "\n"
p '該当月の初日'
first_date = Date.new(date.year, month.to_i, 1)
p first_date

p '該当月の初日の曜日'
puts week_day[first_date.wday]

p '該当月の最終日'
last_date = Date.new(date.year, month.to_i, -1)
p last_date

p 'その月の日数'
total_days = last_date - first_date
p total_days.to_i
