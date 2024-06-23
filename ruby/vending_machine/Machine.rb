require './Juice'

# 自動販売機クラス
class Machine
  attr_accessor :sales, :inventory

  def initialize(sales = 0, inventory = {})
    @sales = sales
    @inventory = inventory
  end

 def add_juice(juice, stock)
  @inventory[juice] = { juice: juice, stock: stock }
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

  def show_available_drinks
    puts '購入可能な飲み物は以下になります。'
    @inventory.each_value do |details|
      puts "#{details[:juice].name}: 在庫 #{details[:stock]}個"
    end
  end
end
