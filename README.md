IDCITaskBundle
=============

Symfony's IDCI Task Bundle

Installation
------------

Add dependencies in your `composer.json` file:
```json
"require": {
    ...,
    "idci/task-bundle": "dev-master",
}
```

Enable bundles in your application kernel:
```php
<?php
// app/AppKernel.php

public function registerBundles()
{
    $bundles = array(
        // ...
        new IDCI\Bundle\TaskBundle\IDCITaskBundle(),
        new Doctrine\Bundle\DoctrineBundle\DoctrineBundle(),
        new Doctrine\Bundle\MongoDBBundle\DoctrineMongoDBBundle(),
        new IDCI\Bundle\AssetLoaderBundle\IDCIAssetLoaderBundle(),
        new FOS\RestBundle\FOSRestBundle(),
        new JMS\SerializerBundle\JMSSerializerBundle(),
        new OldSound\RabbitMqBundle\OldSoundRabbitMqBundle(),
    );
}
```

Import the bundle configuration:
```yml
# app/config/config.yml

imports:
    - { resource: @IDCITaskBundle/Resources/config/config.yml }

doctrine:
    dbal:
        default_connection: default
        connections:
            default:
                driver:   pdo_mysql
                host:     "%database_host%"
                port:     "%database_port%"
                dbname:   "%database_name%"
                user:     "%database_user%"
                password: "%database_password%"
                charset:  UTF8

    orm:
        auto_generate_proxy_classes: "%kernel.debug%"
        default_entity_manager: default
        entity_managers:
            default:
                connection: default
                mappings:
                    IDCITaskBundle: ~
```

Update your parameters.yml file
```yml
application_name: 'Task Runner'
database_host: localhost
database_port: ~
database_name: task_manager
database_user: dbuser
database_password: dbpwd
rabbitmq_host: localhost
rabbitmq_port: 5672
rabbitmq_user: user
rabbitmq_password: password
rabbitmq_lazy: false
rabbitmq_vhost: /
mongo_database_name: task
mongo_database_host: 'mongodb://127.0.0.1:27017'
```

Documentation
-------------

[Read the Documentation](Resources/doc/index.md)

Tests
-----

Install bundle dependencies:
```sh
$ make composer-update
```

To execute unit tests:
```sh
$ make phpunit
```
