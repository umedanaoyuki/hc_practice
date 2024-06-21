# 預かり金(デポジット)として500円がデフォルトでチャージされているものとする
# Suicaには100円以上の任意の金額をチャージできる
# 100円未満をチャージしようとした場合は例外を発生させる
# Suicaは現在のチャージ残高を取得できる

# Suica
class Suica
  attr_reader :deposit

  def initialize(deposit = 500)
    @deposit = deposit
  end

  def show_balance(charge)
    if charge < 100
      raise "100円未満はチャージできません"
    end

    balance = deposit + charge
    puts "Suica残高は#{balance}円です"
  end
end

suica = Suica.new

suica.show_balance(100)
puts 'depositの表示'
## うまくdepositが表示されない
suica.deposit
