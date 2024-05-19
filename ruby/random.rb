# グループ分け
group = ['A', 'B', 'C', 'D', 'E', 'F']
# シャッフル
shuffledGroup = group.shuffle

puts shuffledGroup

# ２種類の配列を決める
key = [2, 3].shuffle

puts key[0]

# １つ目のグループの長さ
groupOneLength = key[0]
# １つ目のグループの配列作成

puts '1つ目のグループ'
groupOne = shuffledGroup[0 .. groupOneLength - 1]
puts groupOne


# 2つ目のグループの長さ
groupTwoLength = 6 - key[0]
# ２つ目のグループの配列作成
groupTwo = shuffledGroup[groupOneLength .. 5]

puts '2つ目のグループ'
puts  groupTwo
