# インターフェース
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

# ポケモンクラスを継承したピカチュウクラス
class Pikachu < Pokemon
  def attack
    puts "#{name}の10万ボルト"
  end
end

class Main
  pokemon = Pokemon.new("リザードン", "ほのお", "ひこう", 100)
  pikachu = Pikachu.new("ピカチュウ", "でんき", "", 100)

  # ポケモンクラスの内容
  pokemon.attack
  puts pokemon.name
  puts pokemon.type1
  puts pokemon.type2
  puts pokemon.hp

  # ピカチュウクラスの内容
  pikachu.attack
  puts pikachu.name
  puts pikachu.type1
  puts pikachu.type2
  puts pikachu.hp
end
