Vagrant.configure("2") do |config|
  config.vm.box = "parallels/ubuntu-20.04" 

  # Configurer le fournisseur Parallels
  config.vm.provider "parallels" do |prl|
    prl.memory = 2048  
    prl.cpus = 2       
  end

  # Définir un nom d'hôte personnalisé
  config.vm.hostname = "crude-maker"

  # Redirection des ports pour chaque service
  config.vm.network "forwarded_port", guest: 5000, host: 5050  # Inventory API
  config.vm.network "forwarded_port", guest: 5001, host: 5051  # Billing API
  config.vm.network "forwarded_port", guest: 8000, host: 8080  # API Gateway

  
  config.vm.provision "shell", path: "scripts/setup.sh"

  # Démarrer les services après le provisionnement
  config.vm.provision "shell", path: "scripts/start_services.sh", privileged: false
end
