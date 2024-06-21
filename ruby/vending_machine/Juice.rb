# 自動販売機はジュースを１種類格納できる
# ジュースは名前と値段の情報をもつ
# 初期状態で、ペプシ(150円)を5本格納している。
# 自動販売機は在庫を取得できる

class Machine
  attr_reader :juice, :inventory
  attr_writer :juice, :inventory

  def initialize(juice = { name: 'ペプシ', price: 150 }, inventory = 5)
    @juice = juice
    @inventory = inventory
  end
end

machine = Machine.new

puts machine.juice
# 在庫確認
puts machine.inventory
