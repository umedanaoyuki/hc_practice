require './Juice'

# 自動販売機クラス
class Machine
  attr_accessor :sales, :inventory

  # inventoryはマシーンクラスの中で持つ
  # juice = Juice.new

  def initialize(sales = 0, inventory = {})
    @sales = sales
    @inventory = inventory
  end

 def add_juice(juice, stock)
    @inventory[juice] = { juice: juice, stock: stock }
    # puts @inventory[juice][:stock]
    # puts '印刷'
 end

def purchase(suica, juice)
  if suica.balance >= juice.price && @inventory[juice][:stock] > 0
    # ジュースの在庫を減らす
    inventory[juice][:stock] -= 1
    # 売り上げ金額を増やす
    @sales += juice.price
    # Suicaのチャージ残高を減らす
    suica.change_balance(juice.price)
    puts "#{juice.name}の購入完了"
  else
    raise "Suicaの残高が足りません"
  end
end
end
