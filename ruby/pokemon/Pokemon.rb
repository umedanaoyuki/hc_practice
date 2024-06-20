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

# ポケモンクラスを継承したピカチュウクラス
class Pikachu < Pokemon
  def attack
    puts "#{name}の10万ボルト"
  end
end

class Main
  pokemon = Pokemon.new("リザードン", "ほのお", "ひこう", 100)
  pikachu = Pikachu.new("ピカチュウ", "でんき", "なし", 100)

  # ポケモンクラスの内容
  puts "#ポケモンクラスの内容"
  puts pokemon.name
  puts pokemon.type1
  puts pokemon.type2
  puts pokemon.hp
  pokemon.attack

  puts ''
  # ピカチュウクラスの内容
  puts "#ピカチュウクラスの内容"
  puts pikachu.name
  puts pikachu.type1
  puts pikachu.type2
  puts pikachu.hp
  pikachu.attack
end
