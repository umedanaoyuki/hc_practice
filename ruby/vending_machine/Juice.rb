# Juiceクラス
class Juice
  attr_reader :name, :price

  def initialize(name = 'ペプシ', price = 150)
    @name = name
    @price = price
  end

  # if @inventory === 0
  #   raise "#{name}の在庫がありません"
  # end

  # def add_inventory(number)
  #   @inventory += number
  #   puts "#{name}の在庫は#{inventory}本です"
  # end
end
