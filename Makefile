# Variables

target_container    ?= php
php_sources         ?= .
js_sources          ?= Resources/public/js
phpcs_ignored_files ?= vendor/*,app/cache/*,Tests/cache/*

# NodeJs commands

.PHONY: yarn
yarn:
	docker-compose run --rm node yarn $(cmd) $(options)

.PHONY: npm-install
npm-install:
	docker-compose run --rm node npm install $(options)

.PHONY: karma
karma:
	docker-compose run --rm node ./node_modules/karma/bin/karma start $(options)

.PHONY: gulp
gulp:
	docker-compose run --rm node gulp $(task)

.PHONY: eslint
eslint:
	docker-compose run --rm node eslint $(js_sources)

.PHONY: eslint
csslint:
	docker-compose run --rm node csslint $(css_sources)

# PHP commands

.PHONY: composer-add-github-token
composer-add-github-token:
	docker-compose run --rm php composer config --global github-oauth.github.com $(token)

.PHONY: composer-update
composer-update:
	docker-compose run --rm php composer update $(options)

.PHONY: composer-install
composer-install:
	docker-compose run --rm php composer install $(options)

.PHONY: phploc
phploc:
	docker run --rm -i -v `pwd`:/project jolicode/phaudit bash -c "phploc $(php_sources); exit $$?"

.PHONY: phpcs
phpcs:
	docker run --rm -i -v `pwd`:/project jolicode/phaudit bash -c "phpcs $(php_sources) --extensions=php --ignore=$(phpcs_ignored_files) --standard=PSR2; exit $$?"

.PHONY: phpcpd
phpcpd:
	docker run --rm -i -v `pwd`:/project jolicode/phaudit bash -c "phpcpd $(php_sources); exit $$?"

.PHONY: phpdcd
phpdcd:
	docker run --rm -i -v `pwd`:/project jolicode/phaudit bash -c "phpdcd $(php_sources); exit $$?"

.PHONY: phpcs-fix
phpcs-fix:
	docker run --rm -i -v `pwd`:`pwd` -w `pwd` grachev/php-cs-fixer --rules=@Symfony --verbose fix $(sources)

# Symfony bundle commands

.PHONY: phpunit
phpunit: ./vendor/bin/phpunit
	docker-compose run --rm php ./vendor/bin/phpunit --coverage-text $(options)
