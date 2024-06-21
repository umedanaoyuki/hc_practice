require './Suica'
require './Juice'

class Machine
  attr_reader :inventory, :sales

  def initialize(inventory = 5, sales = 0)
    @inventory = inventory
    @sales = sales
  end

  suica = Suica.new
  # puts suica.balance

  juice = Juice.new
  # puts juice.price

# 自動販売機はジュースの在庫を減らす
# 売り上げ金額を増やす
# Suicaのチャージ残高を減らす
def purchase(suica, juice)
  if suica.balance >= juice.price
    @inventory -= 1
    @sales += juice.price
    suica.change_balance(juice.price)
    puts 'OK'
  else
  puts 'NG'
  end
end
end

suica = Suica.new
juice = Juice.new
machine = Machine.new
machine.purchase(suica, juice)

# puts '在庫確認'
# puts machine.inventory
