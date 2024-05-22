# frozen_string_literal: true

require 'date'

date = Date.today
# カレンダーの表紙
puts "      #{date.strftime('%B')} #{date.year}"

week_day = %w(日 月 火 水 木 金 土)

# 曜日を表示
week_day.each do |wday|
  print "#{wday} "
end

print "\n"
print 'テスト'
