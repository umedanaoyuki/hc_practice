class Pokemon
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

pokemon = Pokemon.new("リザードン", "ほのお", "ひこう", 100)
pokemon.attack
