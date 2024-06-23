require './juice'
require './machine'
require './suica'

# このファイルで、３つのクラスを使用してSuicaを使用して自動販売機でジュースを購入する処理を実施する
suica = Suica.new
machine = Machine.new
pepsi = Juice.new('ペプシ', 150)
monster = Juice.new('モンスター', 230)
irohas = Juice.new('いろはす', 120)

# 在庫を追加
machine.add_juice(pepsi)
machine.add_juice(monster)
machine.add_juice(irohas)

# 購入可能なジュース一覧の表示
machine.show_available_drinks

# 改行
puts ''

# ペプシ1本購入
machine.purchase(suica, pepsi)

# モンスター1本購入
machine.purchase(suica, monster)

# いろはす1本購入
machine.purchase(suica, irohas)

puts ''

# Suicaに200円チャージ
suica.charge(200)
# いろはす追加1本購入
machine.purchase(suica, irohas)

puts ''

# 現在の売上金額合計
puts "現在の販売機の売上金額合計は#{machine.sales}円です"
# Suicaに200円チャージ
suica.charge(300)
puts "Suica残高は#{suica.balance}円です"

puts ''

# 在庫確認
puts "#{pepsi.name}の在庫は#{machine.inventory[pepsi][:stock]}本です"
puts "#{monster.name}の在庫は#{machine.inventory[monster][:stock]}本です"
puts "#{irohas.name}の在庫は#{machine.inventory[irohas][:stock]}本です"
