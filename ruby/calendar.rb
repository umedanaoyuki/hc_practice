# frozen_string_literal: true

require 'date'
require 'optparse'
require 'active_support/all'

opt = OptionParser.new
opt.on('-m') { |v| p v }

# 引数が適切でない場合、エラーメッセージを表示
if ARGV[1].present? && !(1..12).cover?(ARGV[1].to_i)
  raise "#{ARGV[1]} is neither a month number (1..12) nor a name"
end

# 今年の年の取得
current_year = Date.today.year.to_i
# カレンダーの表示する月を決める（引数がない場合、現在の月を表示）
month_to_display = ARGV[1].present? ? ARGV[1].to_i : Date.today.month.to_i
# カレンダーに表示する月の初日を求める
first_date = Date.new(current_year, month_to_display, 1)
# 該当月の最終日を求める
last_date = Date.new(first_date.year, month_to_display, -1)

# カレンダーの上部を表示するメソッド
def show_calender_upper_area(date)
  # カレンダーの表紙
  calendar_cover_month = date.strftime('%m').to_i
  # カレンダーの表紙を中央の位置に表示
  puts "#{calendar_cover_month}月 #{date.year}".center(20)

  # 月曜日始まり
  week_day = %w(月 火 水 木 金 土 日)
  puts week_day.join(' ')
end

# カレンダーの日付箇所の表示メソッド
def show_calendar_dates(first_date, last_date)
  # 該当月の初日の曜日を取得
  # 0:日曜日, 1:月曜日, 2:火曜日, 3:水曜日, 4:木曜日, 5:金曜日, 6:土曜日
  week_day_of_first_date = first_date.wday.to_i

  # 月の最初の日曜日の日付の初期値
  first_sunday = 1

  # 該当月の最初の日曜日の日付を求める
  # 月初が日曜日でない場合の処理（月初が日曜日の場合は、first_sundayは1のまま）
  if week_day_of_first_date != 0
    # 月の最初の日曜日の日付 = 8 - 該当月の初日の曜日の番号
    first_sunday = 8 - week_day_of_first_date
  end

  # 初日の日にちを適切な曜日の下に表示するための空欄を作成
  initial_empty = '   ' * (7 - first_sunday)

  # 日曜日になったら改行して日付を表示
  print initial_empty
  (first_date..last_date).each do |date|
    if date.wday.zero?
      puts date.day.to_s.rjust(2)
    else
      print "#{date.day.to_s.rjust(2)} "
    end
  end
end

# 引数が適切な場合、カレンダーを表示
show_calender_upper_area(first_date)
show_calendar_dates(first_date, last_date)
