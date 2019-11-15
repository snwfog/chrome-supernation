#!/usr/bin/env ruby

require 'socket'

s = TCPServer.new 2222
loop do
  client = s.accept
  puts client.gets

  client.print "HTTP/1.1 200\r\n"
  client.print "Content-Type: application/json\r\n"
  client.print "Access-Control-Allow-Origin: *\r\n"
  client.print "\r\n"
  client.print %Q([{"id":1,"first_name":"Marc","last_name":"Poulin","email":"demo@test-stackadapt.com","company_name":"StackAdapt","avatar":"https://cdn.stackadapt.com/public/avatars/navi.svg"},{"id":3,"first_name":"","last_name":"","email":"ildar@test-stackadapt.com","company_name":"StackAdapt","avatar":"https://cdn.stackadapt.com/public/avatars/cat.svg"},{"id":4,"first_name":"Ildar","last_name":"Shar","email":"ildar@test-collectiveroll.com","company_name":"hello","avatar":"https://cdn.stackadapt.com/public/avatars/ironman.svg"},{"id":35,"first_name":"Elkin","last_name":"Rodriguez","email":"elkin@test-wowmn.com","company_name":"Wow Wedia Networks","avatar":"https://cdn.stackadapt.com/public/avatars/ironman.svg"},{"id":53,"first_name":"Techvibes","last_name":"Inc.","email":"rob@test-techvibes.com","company_name":"Techvibes","avatar":"https://cdn.stackadapt.com/public/avatars/none.svg"},{"id":78,"first_name":"Nicolas","last_name":"Test","email":"sales@test-stackadapt.com","company_name":"StackAdapt","avatar":"https://cdn.stackadapt.com/public/avatars/sports.svg"},{"id":206,"first_name":"","last_name":"","email":"vabril-gutierrez@test-maddenmedia.com","company_name":"Madden Media","avatar":"https://cdn.stackadapt.com/public/avatars/batgirl.svg"},{"id":306,"first_name":"Jordan","last_name":"Terry","email":"helena@test-chipchick.com","company_name":"Chip Chick","avatar":"https://cdn.stackadapt.com/public/avatars/none.svg"},{"id":330,"first_name":"","last_name":"","email":"jamie.atherton@test-adzouk.com","company_name":"Adzouk","avatar":"https://cdn.stackadapt.com/public/avatars/navi.svg"},{"id":339,"first_name":"Derek","last_name":"Rogers","email":"info@test-jaxvirtualreps.com","company_name":"CoffeeCupGeek, LLC.","avatar":"https://cdn.stackadapt.com/public/avatars/ninja.svg"},{"id":413,"first_name":"","last_name":"","email":"yang+admin@test-stackadapt.com","company_name":"StackAdapt","avatar":"https://cdn.stackadapt.com/public/avatars/none.svg"},{"id":422,"first_name":"Marco","last_name":"Belerique","email":"marco.belerique@test-cadreon.com","company_name":"Cadreon","avatar":"https://cdn.stackadapt.com/public/avatars/none.svg"},{"id":442,"first_name":"","last_name":"","email":"jason@test-visitthelab.com","company_name":"Chemistry","avatar":"https://cdn.stackadapt.com/public/avatars/navi.svg"},{"id":488,"first_name":"Ildar","last_name":"Shar","email":"ildar-shar@test-hotmail.com","company_name":"StackAdapt","avatar":"https://cdn.stackadapt.com/public/avatars/ironman.svg"},{"id":503,"first_name":"","last_name":"","email":"ptoppan@test-crucialinteractive.com","company_name":"Crucial Interactive","avatar":"https://cdn.stackadapt.com/public/avatars/dog.svg"}])
  client.close
end
