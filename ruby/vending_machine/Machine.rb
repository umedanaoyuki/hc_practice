# 販売機クラス
class Machine
  attr_reader :sales

  def initialize(sales = 0)
    @sales = sales
  end

def purchase(suica, juice)
  if suica.balance >= juice.price
    # ジュースの在庫を減らす
    juice.inventory -= 1
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
