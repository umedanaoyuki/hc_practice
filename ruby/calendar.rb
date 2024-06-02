# frozen_string_literal: true

require 'date'
require 'optparse'

opt = OptionParser.new
opt.on('-m') { |v| p v }

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

# カレンダーの上部を表示する
def show_calender_upper_area(date)
  # カレンダーの表紙
  calendar_cover_month = date.strftime('%m').to_i
  # 真ん中に年月をするための空欄
  calendar_cover_space = '      '
  puts "#{calendar_cover_space}#{calendar_cover_month}月 #{date.year}"

  week_day = %w(日 月 火 水 木 金 土)
  puts week_day.join(' ')
end

# カレンダーの日付の表示のメソッド
def show_calendar_dates(first_date, last_date)
  # 該当月の初日の曜日を取得
  # 0:日曜日, 1:月曜日, 2:火曜日, 3:水曜日, 4:木曜日, 5:金曜日, 6:土曜日
  week_day_of_first_date = first_date.wday.to_i

  # 月の最初の土曜日の日付を求める
  # 月の最初の土曜日の日付 = 7 - 該当月の初日の曜日の番号
  first_saturday = 7 - week_day_of_first_date

  initial_empty = '   ' * week_day_of_first_date

  first_week_days = (1..first_saturday).to_a
  # print "#{initial_empty}#{first_week_days[0].to_s.rjust(2)} "
  print initial_empty
  first_week_days.each do |day|
    print "#{day.to_s.rjust(2)} "
  end


  # temp_array = [1,2,3]
  # print "#{initial_empty}#{temp_array[0].to_s.rjust(2)} "
  puts ''
  # puts '完了'

  # 土曜日ごとの日付をこの変数に格納していくため、変数名を置き換える
  # 2回目以降の土曜日
  saturdays = first_saturday + 7
  # 1日から月末までの日付を表示する
  # 土曜日になったら改行して表示する
  first_sunday = first_saturday + 1
  (first_sunday..last_date).each do |num|
    # initial_empty = '   ' * week_day_of_first_date
    # {initial_empty.to_s.rjust(2)}

    if num == saturdays
      saturdays += 7
      puts num.to_s.rjust(2)
    else
      print "#{num.to_s.rjust(2)} "
    end
  end
end

# 引数がない場合、でもカレンダーを表示
if ARGV[1].nil?
  show_calender_upper_area(date)
  show_calendar_dates(first_date, last_date)
  exit
end

# 引数が適切でない場合、エラーメッセージを表示
if ARGV[1].to_i > 12 || ARGV[1].to_i < 1
  puts "#{ARGV[1]} is neither a month number (1..12) nor a name"
end

# 引数が適切な場合、カレンダーを表示
show_calender_upper_area(date)
show_calendar_dates(first_date, last_date)
