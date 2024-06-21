# 預かり金(デポジット)として500円がデフォルトでチャージされているものとする
# Suicaには100円以上の任意の金額をチャージできる
# 100円未満をチャージしようとした場合は例外を発生させる
# Suicaは現在のチャージ残高を取得できる

# Suica
class Suica
  attr_reader :balance

  def initialize(balance = 0)
    # デポジット500円
    @balance = 500 + balance
  end

  # def show_deposit
  #   puts "デポジットは#{@deposit}円です"
  # end

  def charge(charge)
    if charge < 100
      raise "100円未満はチャージできません"
    end

    @balance = balance + charge
  end

  def show_balance
    puts "Suica残高は#{balance}円です"
  end
end

suica = Suica.new

suica.charge(500)
puts '残高表示'
suica.show_balance
# puts 'depositの表示'
# suica.show_deposit
