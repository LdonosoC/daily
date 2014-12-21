Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/trusty64"
  config.vm.provision :shell, path: "provision.sh"
  config.vm.network :forwarded_port, host: 8282, guest: 8282
  config.vm.network :forwarded_port, host: 5984, guest: 5984
  config.vm.network :forwarded_port, host: 6984, guest: 6984
  config.vm.network :forwarded_port, host: 27017, guest: 27017
end