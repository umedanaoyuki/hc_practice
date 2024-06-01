# frozen_string_literal: true

require 'date'
require 'optparse'

opt = OptionParser.new
opt.on('-m') { |v| p v }

# カレンダー表示のメソッド
def show_calendar
  # 今年の年の取得
  current_year = Date.today.year.to_i
  # 現在の月を取得
  current_month = Date.today.month.to_i
  # 月の初めの日
  initial_date = 1
  # カレンダーの表示する月を決める（引数がない場合、現在の月を表示）
  month_to_display = ARGV[1] ? ARGV[1].to_i : current_month
  date = Date.new(current_year, month_to_display, initial_date)
  # カレンダーの表紙
  calendar_cover_month = date.strftime('%m').to_i
  # 真ん中に年月をするための空欄
  calendar_cover_space = '      '
  puts "#{calendar_cover_space}#{calendar_cover_month}月 #{date.year}"

  week_day = %w(日 月 火 水 木 金 土)

  # 曜日を表示
  week_day.each do |wday|
    # 曜日を表示したあと、空欄を入れてprintする
    print "#{wday} "
  end

  # 改行
  print "\n"

  # 該当月の初日
  first_date = Date.new(date.year, month_to_display, initial_date)

  # 該当月の初日の曜日を取得
  # 0:日曜日, 1:月曜日, 2:火曜日, 3:水曜日, 4:木曜日, 5:金曜日, 6:土曜日
  week_day_of_first_date = first_date.wday.to_i

  # 月の最初の土曜日の日付を求める
  # 月の最初の土曜日の日付 = 7 - 該当月の初日の曜日の番号
  first_saturday = 7 - week_day_of_first_date

  # 該当月の最終日を求める
  last_date = Date.new(date.year, month_to_display, -1).day.to_i

  # 月の土曜日に変数名を置き換える
  saturdays = first_saturday
  # 土曜日になったら改行して表示する
  (initial_date..last_date).each do |num|
    if num == saturdays
      saturdays += 7
      puts num
    else
      print "#{num} "
    end
  end
end

# 引数がない場合、でもカレンダーを表示
if ARGV[1].nil?
  show_calendar
  exit
end

# 引数が適切でない場合、エラーメッセージを表示
if ARGV[1].to_i > 12 || ARGV[1].to_i < 1
  puts "#{ARGV[1]} is neither a month number (1..12) nor a name"
end

# 引数が適切な場合、カレンダーを表示
show_calendar
