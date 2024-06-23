# Juiceクラス
class Juice
  # name:ジュース名
  # price:ジュースの値段
  attr_reader :name, :price

  def initialize(name = 'ペプシ', price = 150)
    @name = name
    @price = price
  end
end
