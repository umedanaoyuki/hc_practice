class Juice
  attr_reader :name, :price, :inventory
  attr_writer :inventory

  def initialize(name = 'ペプシ', price = 150, inventory = 5)
    @name = name
    @price = price
    @inventory = inventory
  end

  if @inventory === 0
    raise "#{name}の在庫がありません"
  end

end
