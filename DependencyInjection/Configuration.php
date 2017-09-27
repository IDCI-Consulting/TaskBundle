<?php

/**
 * @author:  Brahim Boukoufallah <brahim.boukoufallah@idci-consulting.fr>
 */

namespace IDCI\Bundle\TaskBundle\DependencyInjection;

use Symfony\Component\Config\Definition\Builder\TreeBuilder;
use Symfony\Component\Config\Definition\ConfigurationInterface;

/**
 * This is the class that validates and merges configuration from your app/config files.
 *
 * {@link http://symfony.com/doc/current/cookbook/bundles/extension.html#cookbook-bundles-extension-config-class}
 */
class Configuration implements ConfigurationInterface
{
    /**
     * {@inheritdoc}
     */
    public function getConfigTreeBuilder()
    {
        $treeBuilder = new TreeBuilder();
        $rootNode = $treeBuilder->root('idci_task');
        $rootNode
            ->children()
                ->scalarNode('task_configuration_class')
                    ->defaultValue('IDCI\Bundle\TaskBundle\Model\TaskConfiguration')
                ->end()
            ->end()
            ->append($this->addActionsNode())
            ->append($this->addExtraRulesNode())
        ;

        return $treeBuilder;
    }

    /**
     * addActionsNode
     *
     * @return ArrayNodeDefinition|NodeDefinition
     */
    protected function addActionsNode()
    {
        $builder = new TreeBuilder();
        $node = $builder->root('actions');

        $node
            ->defaultValue(array())
            ->useAttributeAsKey('id')
            ->prototype('array')
                ->children()
                    ->scalarNode('description')->defaultNull()->end()
                    ->scalarNode('parent')->defaultNull()->end()
                    ->arrayNode('parameters')
                        ->defaultValue(array())
                        ->useAttributeAsKey('id')
                        ->prototype('array')
                            ->children()
                                ->scalarNode('form_type')->isRequired()->end()
                                ->arrayNode('options')
                                    ->defaultValue(array())->useAttributeAsKey('id')->prototype('variable')->end()
                                ->end()
                            ->end()
                        ->end()
                    ->end()
                ->end()
            ->end()
        ;

        return $node;
    }

    /**
     * addExtraRulesNode
     *
     * @return ArrayNodeDefinition|NodeDefinition
     */
    protected function addExtraRulesNode()
    {
        $builder = new TreeBuilder();
        $node = $builder->root('extract_rules');

        $node
            ->defaultValue(array())
            ->useAttributeAsKey('id')
            ->prototype('array')
                ->children()
                    ->scalarNode('description')->defaultNull()->end()
                    ->scalarNode('parent')->defaultNull()->end()
                    ->arrayNode('parameters')
                        ->defaultValue(array())
                        ->useAttributeAsKey('id')
                        ->prototype('array')
                            ->children()
                                ->scalarNode('form_type')->isRequired()->end()
                                ->arrayNode('options')
                                    ->defaultValue(array())->useAttributeAsKey('id')->prototype('variable')->end()
                                ->end()
                            ->end()
                        ->end()
                    ->end()
                ->end()
            ->end()
        ;

        return $node;
    }
}
