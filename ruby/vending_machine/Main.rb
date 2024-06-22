# 自動販売機はペプシが購入できるかどうかを取得できる。
# ジュース値段以上のチャージ残高がある条件下で購入操作を行うと以下の動作をする
# 自動販売機はジュースの在庫を減らす
# 売り上げ金額を増やす
# Suicaのチャージ残高を減らす
# チャージ残高が足りない場合もしくは在庫がない場合、購入操作を行った場合は例外を発生させる
# 自動販売機は現在の売上金額を取得できる

require './Suica'
require './Juice'
require './Machine'

suica = Suica.new
pepsi = Juice.new('ペプシ', 150, 5)
monster = Juice.new('モンスター', 230, 5)
irohas = Juice.new('いろはす', 120, 5)
machine = Machine.new
machine.purchase(suica, pepsi)

# 現在の売上金額合計
puts "現在の売上金額合計は#{machine.sales}円です"

# puts '在庫確認'
# puts machine.inventory
