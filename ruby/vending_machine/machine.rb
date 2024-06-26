require './juice.rb'

# 自動販売機クラス
class Machine
  # 自動販売機の売上合計
  # ジュースの在庫
  attr_reader :sales, :inventory

  def initialize(sales = 0, inventory = [])
    @sales = sales
    @inventory = inventory
  end

  # 各ドリンク別の在庫を表示する
  def count_juice_stock
    pepsi = inventory.select { |element| element.name == 'ペプシ' }
    monster = inventory.select { |element| element.name == 'モンスター' }
    irohas = inventory.select { |element| element.name == 'いろはす' }

    puts '各ドリンクの在庫は以下になります。'
    puts "ペプシ: #{pepsi.count}本"
    puts "モンスター: #{monster.count}本"
    puts "いろはす: #{irohas.count}本"
  end

  # ジュースの在庫を追加するメソッド
  def add_juice_stocks(number)
    number.times do
      @inventory << Juice.new('ペプシ', 150)
      @inventory << Juice.new('モンスター', 230)
      @inventory << Juice.new('いろはす', 120)
    end
  end

  # ジュース購入のメソッド
  def purchase(suica, juice)
    raise 'Suicaの残高が足りません' if suica.balance < juice.price

    # 引数のジュースの名前と同じ名前のジュースが在庫に少なうとも1つは存在するかどうか確認
    stock_juice = @inventory.find { |item| item.name == juice.name }
    # 引数のジュースの名前が一つも存在しない場合
    raise "#{juice.name}の在庫はありません" if stock_juice.nil?

    # ジュースの在庫を減らす
    @inventory.delete(stock_juice)
    # 売り上げ金額を増やす
    @sales += juice.price
    # Suicaのチャージ残高を減らす
    suica.change_balance(juice.price)
    puts "#{juice.name}の購入完了"
  end
end
