IDCITaskBundle
=============

Symfony's IDCI Task Bundle

Installation
------------

Add dependencies in your `composer.json` file:
```json
"repositories": [
    {
        "type": "vcs",
        "url": "https://github.com/Tessi-Tms/TmsLoggerBundle.git"
    },
    ...
],
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
        new Tms\Bundle\LoggerBundle\TmsLoggerBundle(),
    );
}
```

Import the bundle configuration:
```yml
# app/config/config.yml

imports:
    - { resource: @IDCITaskBundle/Resources/config/config.yml }
```

Update your parameters.yml file
```yml
rabbitmq_host: localhost
rabbitmq_port: 5672
rabbitmq_user: user
rabbitmq_password: password
rabbitmq_lazy: false
rabbitmq_vhost: /
mongo_database_name: task
mongo_database_host: localhost
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
