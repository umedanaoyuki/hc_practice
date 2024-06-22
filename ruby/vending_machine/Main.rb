require './juice'
require './machine'
require './suica'

suica = Suica.new
machine = Machine.new
pepsi = Juice.new('ペプシ', 150)
monster = Juice.new('モンスター', 230)
irohas = Juice.new('いろはす', 120)

puts pepsi.name
puts pepsi.price
puts monster.name
puts monster.price
puts irohas.name
puts irohas.price

# # ペプシ1本購入
# machine.purchase(suica, pepsi)
# # 現在の売上金額合計
# puts "現在の販売機の売上金額合計は#{machine.sales}円です"

# 在庫を追加
machine.add_juice(pepsi, 5)
# puts machine.inventory[pepsi][:stock]
puts '在庫を追加'
machine.add_juice(monster, 6)
machine.add_juice(irohas, 6)

# puts "検証スタート"
# puts machine.inventory[pepsi][:juice].name
# puts machine.inventory[pepsi][:stock]
# puts machine.inventory[monster][:juice].name
# puts machine.inventory[monster][:stock]
# puts machine.inventory[irohas][:juice].name
# puts machine.inventory[irohas][:stock]
# puts "終了"

# # モンスター1本購入
machine.purchase(suica, monster)
# # 現在の売上金額合計
# puts "現在の販売機の売上金額合計は#{machine.sales}円です"

# # いろはす1本購入
# machine.purchase(suica, irohas)
# # 現在の売上金額合計
# puts "現在の販売機の売上金額合計は#{machine.sales}円です"

# # 200円のチャージ
# suica.charge(200)
# puts "Suica残高は#{suica.show_balance}円です"

# # 在庫補填をする
# pepsi.add_inventory(5)

# puts '在庫確認'
# puts "#{pepsi.name}の在庫は#{pepsi.inventory}本です"
# puts "#{monster.name}の在庫は#{monster.inventory}本です"
# puts "#{irohas.name}の在庫は#{irohas.inventory}本です"
