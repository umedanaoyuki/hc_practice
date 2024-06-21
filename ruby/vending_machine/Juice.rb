class Juice
  attr_reader :name, :price
  def initialize(name = 'ペプシ', price = 150)
    @name = name
    @price = price
  end
end
