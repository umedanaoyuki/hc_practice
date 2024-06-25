require './juice'
require './machine'
require './suica'

# このファイルで、３つのクラスを使用してSuicaを使用して自動販売機でジュースを購入する処理を実施する
suica = Suica.new
machine = Machine.new

# 在庫を追加（各種5本ずつ在庫に追加）
machine.add_juice_stocks(5)

# 購入可能なジュース一覧の表示
machine.count_juice_stock

# 改行
puts ''

pepsi = Juice.new('ペプシ', 150)
monster = Juice.new('モンスター', 230)
irohas = Juice.new('いろはす', 120)

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

# 在庫確認（購入可能なジュース一覧の表示）
machine.count_juice_stock
