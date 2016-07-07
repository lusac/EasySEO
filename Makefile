all: help

help:
	@echo
	@echo "Uso: make [target]"
	@echo
	@echo "setup ............... Static dist generate"
	@echo "npm ............... Install npm dependencies"
	@echo "start ............... Run local server"
	@echo "dist ............... Build dist"
	@echo

setup:
	@echo "\n*** SETUP ***\n"
	$(MAKE) npm
	$(MAKE) start

start:
	@echo "\n*** Runing server ***\n"
	@npm start

npm:
	@echo "\n*** Installing npm dependencies ***\n"
	@npm install

dist:
	@echo "\n*** Building dist ***\n"
	@npm run-script dist
