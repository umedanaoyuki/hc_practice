# 販売機クラス
class Machine
  attr_reader :inventory, :sales

  def initialize(inventory = 5, sales = 0)
    @inventory = inventory
    @sales = sales
  end

# 自動販売機はジュースの在庫を減らす
# 売り上げ金額を増やす
# Suicaのチャージ残高を減らす
def purchase(suica, juice)
  if @inventory == 0
    raise "#{juice}の在庫がありません"
  end

  if suica.balance >= juice.price
    @inventory -= 1
    @sales += juice.price
    suica.change_balance(juice.price)
    puts "#{juice.name}の購入完了"
  else
    raise "Suicaの残高が足りません"
  end
end
end
