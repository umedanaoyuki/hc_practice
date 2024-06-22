# Suicaクラス
class Suica
  attr_reader :balance

  def initialize(balance = 0)
    # デポジット500円
    @balance = 500 + balance
  end

  def charge(charge)
    if charge < 100
      raise "100円未満はチャージできません"
    end
    @balance += charge
    puts "#{charge}円のチャージ完了しました"
  end

  def show_balance
    balance
  end

  def change_balance(amount)
    @balance -= amount
  end
end
