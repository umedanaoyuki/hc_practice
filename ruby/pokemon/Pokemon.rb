# 抽象クラス
class Pokemon
  # ゲッター・セッター
  attr_accessor :name, :type1, :type2, :hp

  # イニシャライズメソッド
  def initialize(name, type1, type2, hp)
    @name = name
    @type1 = type1
    @type2 = type2
    @hp = hp
  end

  def attack
    puts "#{@name}のこうげき"
  end
end






class Main
  pokemon = Pokemon.new("リザードン", "ほのお", "ひこう", 100)

  pokemon.attack

  puts pokemon.name
  puts pokemon.type1
  puts pokemon.type2
  puts pokemon.hp

end
