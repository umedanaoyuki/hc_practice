require './Suica'
require './Juice'
require './Machine'

suica = Suica.new
machine = Machine.new
pepsi = Juice.new('ペプシ', 150, 5)
monster = Juice.new('モンスター', 230, 5)
irohas = Juice.new('いろはす', 120, 5)

# ペプシ1本購入
machine.purchase(suica, pepsi)
# 現在の売上金額合計
puts "現在の販売機の売上金額合計は#{machine.sales}円です"

# モンスター1本購入
machine.purchase(suica, monster)
# 現在の売上金額合計
puts "現在の販売機の売上金額合計は#{machine.sales}円です"

# いろはす1本購入
machine.purchase(suica, irohas)
# 現在の売上金額合計
puts "現在の販売機の売上金額合計は#{machine.sales}円です"

# 200円のチャージ
suica.charge(200)
puts "Suica残高は#{suica.show_balance}円です"

# 在庫補填をする
pepsi.add_inventory(5)

puts '在庫確認'
puts "#{pepsi.name}の在庫は#{pepsi.inventory}本です"
puts "#{monster.name}の在庫は#{monster.inventory}本です"
puts "#{irohas.name}の在庫は#{irohas.inventory}本です"
