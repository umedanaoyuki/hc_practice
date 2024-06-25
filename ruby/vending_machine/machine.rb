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

  # 各ドリンクの在庫を表示する
  def count_juice_stock
    pepsi = inventory.select { |element| element.name == 'ペプシ' }
    monster = inventory.select { |element| element.name == 'モンスター' }
    irohas = inventory.select { |element| element.name == 'いろはす' }

    puts '各ドリンクの在庫は以下になります。'
    puts "ペプシ: #{pepsi.count}本"
    puts "モンスター: #{monster.count}本"
    puts "いろはす: #{irohas.count}本"
  end

  # [Juice.new('ペプシ', 150), Juice.new('モンスター', 230), Juice.new('いろはす', 120)]
  # ジュースの在庫を追加するメソッド
  def add_juice_stocks(number)
    number.times do
      @inventory << Juice.new('ペプシ', 150)
      # puts inventory.name
      @inventory << Juice.new('モンスター', 230)
      # puts inventory.name
      @inventory << Juice.new('いろはす', 120)
      # puts inventory.name
    end
    puts 'ジュースの補充が完了しました。'
  end

  # ジュース購入のメソッド
  # def purchase(suica, juice)
  #   raise 'Suicaの残高が足りません' if suica.balance < juice.price
  #   raise "#{juice.name}の在庫はありません" if @inventory[juice][:stock].zero?

  #   # ジュースの在庫を減らす
  #   inventory[juice][:stock] -= 1
  #   # 売り上げ金額を増やす
  #   @sales += juice.price
  #   # Suicaのチャージ残高を減らす
  #   suica.change_balance(juice.price)
  #   puts "#{juice.name}の購入完了"
  # end

  # 自動販売機で購入できるジュース一覧を表示するメソッド
  # def show_available_drinks
  #   puts '購入可能な飲み物は以下になります。'
  #   # @inventory.each { |item| puts item.name }
  #   pepsi


  # end
end

test = Machine.new

# test.count_juice_stock
test.add_juice_stocks(5)
test.count_juice_stock
# test.show_available_drinks
