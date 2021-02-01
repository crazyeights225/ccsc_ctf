# -*- mode: ruby -*-
# vi: set ft=ruby :
Vagrant.configure("2") do |config|
  config.vm.box = "generic/ubuntu2010"

  config.vm.network "private_network", ip: "192.168.99.98"
  
  config.vm.provision :file, source: 'assets/', destination: '/tmp/'
  
  # Define the bootstrap file
  config.vm.provision :shell, path: "bootstrap.sh"

end