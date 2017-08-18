<?php

/**
 * @author:  Brahim Boukoufallah <brahim.boukoufallah@idci-consulting.fr>
 */

namespace IDCI\Bundle\TaskBundle\Action;

use Symfony\Component\Config\Definition\Builder\TreeBuilder;
use Symfony\Component\Config\Definition\ConfigurationInterface;

class ActionConfigurationRule implements ConfigurationInterface
{
    /** @var ActionRegistry */
    protected $actionRegistry;

    public function __construct(ActionRegistry $actionRegistry)
    {
        $this->actionRegistry = $actionRegistry;
    }

    /**
     * {@inheritdoc}
     */
    public function getConfigTreeBuilder()
    {
        $treeBuilder = new TreeBuilder();
        $rootNode = $treeBuilder->root('action');
        $rootNode
            ->children()
                ->arrayNode('actions')
                    ->prototype('array')
                        ->children()
                            ->scalarNode('name')->end()
                            ->enumNode('action')
                                ->isRequired()
                                ->values(array_keys($this->actionRegistry->getActions()))
                            ->end()
                            ->arrayNode('parameters')
                                ->prototype('variable')->end()
                            ->end()
                        ->end()
                    ->end()
                ->end()
                ->arrayNode('workflow')
                    ->children()
                        ->scalarNode('name')->isRequired()->cannotBeEmpty()->end()
                        ->scalarNode('first_action_name')->isRequired()->cannotBeEmpty()->end()
                        ->arrayNode('actions')
                            ->useAttributeAsKey('action_name')
                            ->isRequired()
                            ->prototype('array')
                                ->children()
                                    ->arrayNode('next')
                                        ->prototype('array')
                                            ->children()
                                                ->scalarNode('name')->isRequired()->cannotBeEmpty()->end()
                                                ->scalarNode('condition')->isRequired()->cannotBeEmpty()->end()
                                            ->end()
                                        ->end()
                                    ->end()
                                    ->scalarNode('default_next')->isRequired()->end()
                                ->end()
                            ->end()
                        ->end()
                    ->end()
                ->end()
            ->end()
        ;

        return $treeBuilder;
    }
}
