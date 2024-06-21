# 自動販売機はジュースを１種類格納できる
# ジュースは名前と値段の情報をもつ
# 初期状態で、ペプシ(150円)を5本格納している。
# 自動販売機は在庫を取得できる

# 自動販売機
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
