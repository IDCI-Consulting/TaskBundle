<?php

/**
 * @author:  Brahim Boukoufallah <brahim.boukoufallah@idci-consulting.fr>
 */

namespace IDCI\Bundle\TaskBundle\DependencyInjection;

use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\Config\FileLocator;
use Symfony\Component\DependencyInjection\Extension\PrependExtensionInterface;
use Symfony\Component\HttpKernel\DependencyInjection\Extension;
use Symfony\Component\DependencyInjection\Loader;

/**
 * This is the class that loads and manages your bundle configuration.
 *
 * To learn more see {@link http://symfony.com/doc/current/cookbook/bundles/extension.html}
 */
class IDCITaskExtension extends Extension implements PrependExtensionInterface
{
    public function prepend(ContainerBuilder $container)
    {
        $bundles = $container->getParameter('kernel.bundles');
        // Attempt to prepend the doctrine configuration only if the bundle is registered in the kernel
        // This make doctrine an optional dependency
        if (isset($bundles['DoctrineBundle'])) {
            $config = array(
                'orm' => array(
                    'mappings' => array(
                        'IDCITaskBundle' => array(
                            'prefix' => 'IDCI\Bundle\TaskBundle\Model',
                        )
                    )
                )
            );
            $container->prependExtensionConfig('doctrine', $config);
        }

        if (isset($bundles['IDCIAssetLoaderBundle'])) {
            $config = array(
                'providers' => array(
                    'load_only' => array(
                        'extract_rule_editor',
                        'workflow_editor'
                    )
                )
            );
            $container->prependExtensionConfig('idci_asset_loader', $config);
        }
    }

    /**
     * {@inheritdoc}
     */
    public function load(array $configs, ContainerBuilder $container)
    {
        $configuration = new Configuration();
        $config = $this->processConfiguration($configuration, $configs);

        $loader = new Loader\YamlFileLoader($container, new FileLocator(__DIR__.'/../Resources/config'));
        $loader->load('services.yml');

        $container->setParameter('idci_task.extract_rules', $config['extract_rules']);
        $container->setParameter('idci_task.actions', $config['actions']);
        $container->setParameter('idci_task.task_configuration_class', $config['task_configuration_class']);

        $container->setParameter('idci_task.configuration', $config);

        $loader->load('constraints.yml');
    }
}
