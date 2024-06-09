# frozen_string_literal: true

require 'date'
require 'optparse'

opt = OptionParser.new
opt.on('-m') { |v| p v }

# 引数が適切な場合、カレンダーを表示する処理に進む
if ARGV[1].nil? || ARGV[1].to_i >= 1 && ARGV[1].to_i <= 12
  # 今年の年の取得
  current_year = Date.today.year.to_i
  # カレンダーの表示する月を決める（引数がない場合、現在の月を表示）
  month_to_display = ARGV[1] ? ARGV[1].to_i : Date.today.month.to_i
  # カレンダーに表示する年月日を作成
  date = Date.new(current_year, month_to_display, 1)

  # 該当月の初日
  first_date = Date.new(date.year, month_to_display, 1)

  # 該当月の最終日を求める
  last_date = Date.new(date.year, month_to_display, -1).day.to_i

else
  # 引数が適切でない場合、エラーメッセージを表示
  raise "#{ARGV[1]} is neither a month number (1..12) nor a name"
end

# カレンダーの上部を表示するメソッド
def show_calender_upper_area(date)
  # カレンダーの表紙
  calendar_cover_month = date.strftime('%m').to_i
  # 真ん中に年月をするための空欄
  calendar_cover_space = '      '
  puts "#{calendar_cover_space}#{calendar_cover_month}月 #{date.year}"

  # 月曜日始まり
  week_day = %w(月 火 水 木 金 土 日)
  puts week_day.join(' ')
end

# カレンダーの日付箇所の表示メソッド
def show_calendar_dates(first_date, last_date)
  # 該当月の初日の曜日を取得
  # 0:日曜日, 1:月曜日, 2:火曜日, 3:水曜日, 4:木曜日, 5:金曜日, 6:土曜日
  week_day_of_first_date = first_date.wday.to_i

  # 月の最初の日曜日の初期値
  first_sunday = 1

  # 該当月の最初の日曜日の日付を求める
  # 月初が日曜日でない場合の処理（月初が日曜日の場合は、first_sundayは1のまま）
  if week_day_of_first_date != 0
    # 月の最初の日曜日の日付 = 8 - 該当月の初日の曜日の番号
    first_sunday = 8 - week_day_of_first_date
  end

  # 初日の日にちを適切な曜日の下に表示するための空欄を作成
  initial_empty = '   ' * (7 - first_sunday)

  # 1週目の日付を格納する配列を作成
  first_week_days = (1..first_sunday).to_a
  # 空白と1週目の日付を表示
  print initial_empty
  first_week_days.each do |day|
    print "#{day.to_s.rjust(2)} "
  end
  # 改行
  print "\n"

  # 2回目の日曜日
  sundays = first_sunday + 7
  # 2回目の土曜日が存在する日曜日から月末までの日付を表示する
  # 日曜日になったら改行して日付を表示
  first_monday = first_sunday + 1
  (first_monday..last_date).each do |num|
    if num == sundays
      sundays += 7
      puts num.to_s.rjust(2)
    else
      print "#{num.to_s.rjust(2)} "
    end
  end
end

# 引数が適切な場合、カレンダーを表示
show_calender_upper_area(date)
show_calendar_dates(first_date, last_date)
