# frozen_string_literal: true

require 'date'

date = Date.today
# カレンダーの表紙
puts "#{date.strftime('%B')} #{date.year}"

week_day = ['月', '火', '水', '木', '金', '土', '日']

# p date.strftime('%a')
p week_day[date.wday - 1]

# a = Date.new(1993, 2, 24)
# p a
# b = Date.parse('1993-02-25')
# p b
# b += 10

# p a
# p b

# p b - a
# #=> 10

# p b.year
# #=> 1993

# p b.strftime('%a')
# #=> "Sat"

# yesterday = Date.today - 1
# p yesterday
