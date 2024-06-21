class Machine
  attr_reader :juice, :stock
  attr_writer :juice, :stock

  def initialize(juice = { name: 'ペプシ', price: 150 }, stock = 5)
    @juice = juice
    @stock = stock
  end
end

machine = Machine.new

puts machine.juice
# 在庫確認
puts machine.stock
