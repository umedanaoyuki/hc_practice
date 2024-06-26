# Suicaクラス
class Suica
  # Suica残高
  attr_reader :balance

  def initialize(balance = 0)
    # デポジット500円
    @balance = 500 + balance
  end

  # Suicaに現金をチャージするメソッド
  def charge(charge)
    raise '100円未満はチャージできません。' if charge < 100

    @balance += charge
    puts "#{charge}円のチャージ完了しました"
  end

  # 飲み物購入時にSuica残高を減らすメソッド
  def change_balance(amount)
    @balance -= amount
  end
end
