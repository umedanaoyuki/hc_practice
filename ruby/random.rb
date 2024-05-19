# frozen_string_literal: true

# グループを定義
group = %w[A B C D E F]
shuffled_group = group.shuffle

# p shuffled_group

# １つ目のグループ（配列）の長さをランダムで決定
key = [2, 3].shuffle

# p key[0]
# p shuffled_group[0]

# １つ目のグループの長さ
group_one_length = key[0]

# １つ目のグループの配列作成
group_one = shuffled_group[0..group_one_length - 1].sort

# ２つ目のグループの配列作成
group_two = shuffled_group[group_one_length..5].sort

p '1つ目のグループ'
p group_one

p '2つ目のグループ'
p group_two
