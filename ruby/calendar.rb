# frozen_string_literal: true

require 'date'
require 'optparse'

values = []

opt = OptionParser.new
opt.on('-a int') { |i| values << i.to_i }
opt.on('-b int') { |i| values << i.to_i }

opt.parse!(ARGV)

sum = values.sum
p sum
