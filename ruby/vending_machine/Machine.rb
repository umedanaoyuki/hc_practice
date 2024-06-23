# 自動販売機クラス
class Machine
  attr_reader :sales, :inventory

  def initialize(sales = 0, inventory = {})
    @sales = sales
    @inventory = inventory
  end

  # ジュースの種類ごとの在庫を追加するメソッド
  def add_juice(juice, stock = 5)
    @inventory[juice] = { juice: juice, stock: stock }
  end

  # ジュース購入のメソッド
  def purchase(suica, juice)
    raise 'Suicaの残高が足りません' if suica.balance < juice.price
    raise "#{juice.name}の在庫はありません" if @inventory[juice][:stock].zero?

    # ジュースの在庫を減らす
    inventory[juice][:stock] -= 1
    # 売り上げ金額を増やす
    @sales += juice.price
    # Suicaのチャージ残高を減らす
    suica.change_balance(juice.price)
    puts "#{juice.name}の購入完了"
  end

  # 自動販売機で購入できるジュース一覧を表示するメソッド
  def show_available_drinks
    puts '購入可能な飲み物は以下になります。'
    @inventory.each_value do |details|
      puts "#{details[:juice].name}: 在庫 #{details[:stock]}個"
    end
  end
end
