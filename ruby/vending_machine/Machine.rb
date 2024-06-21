require './Suica'

class Machine
  attr_reader :inventory

  def initialize(inventory = 5)
    @inventory = inventory
  end

  suica = Suica.new
  suica.show_balance(200)
end

# machine = Machine.new

# puts '在庫確認'
# puts machine.inventory
