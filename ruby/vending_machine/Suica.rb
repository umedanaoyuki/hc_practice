# スイカ
class Suica
  attr_accessor :deposit

  def initialize(deposit = 500)
    @deposit = deposit
  end

  def show_balance(charge)
    balance = deposit + charge
    puts balance
  end
end

suica = Suica.new

suica.show_balance(100)
