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
  # 月の初めの日（直接Date.newに代入してもいいが、マジックナンバー化してしまうことを回避）
  initial_date = 1
  month_to_display = ARGV[1] ? ARGV[1].to_i : current_month
  date = Date.new(current_year, month_to_display, initial_date)
  # カレンダーの表紙
  calendar_top_month = date.strftime('%m')
  calendar_top_space = '      '
  puts "#{calendar_top_space}#{calendar_top_month.to_i}月 #{date.year}"

  week_day = %w(日 月 火 水 木 金 土)

  # 曜日を表示
  week_day.each do |wday|
    # 曜日を表示したあと、空欄を入れてprintする
    print "#{wday} "
  end

  # 改行
  print "\n"

  # 該当月の初日
  first_date = Date.new(date.year, month_to_display.to_i, 1)

  #  該当月の初日の曜日の番号を取得
  week_day_to_number = first_date.wday.to_i

  # 月の最初の土曜日を求める
  first_saturday = 7 - week_day_to_number

  # 該当月の最終日
  last_date = Date.new(date.year, month_to_display.to_i, -1)
  # 該当月の最終日をInteger型に変換
  numbered_last_date = last_date.day.to_i

  # 月の土曜日に変数名を置き換える
  saturdays = first_saturday
  (initial_date..numbered_last_date).each do |num|
    if num == saturdays
      saturdays += 7
      puts num
    else
      print "#{num} "
    end
  end
end

if ARGV[1].nil?
  show_calendar
  exit
end

if ARGV[1].to_i > 12 || ARGV[1].to_i < 1
  puts "#{ARGV[1]} is neither a month number (1..12) nor a name"
  exit
end
