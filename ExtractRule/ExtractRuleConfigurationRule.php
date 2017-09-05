<?php

/**
 * @author:  Brahim Boukoufallah <brahim.boukoufallah@idci-consulting.fr>
 */

namespace IDCI\Bundle\TaskBundle\ExtractRule;

use Symfony\Component\Config\Definition\Builder\TreeBuilder;
use Symfony\Component\Config\Definition\ConfigurationInterface;

/**
 * This is the class that validates and merges configuration from your app/config files.
 *
 * {@link http://symfony.com/doc/current/cookbook/bundles/extension.html#cookbook-bundles-extension-config-class}
 */
class ExtractRuleConfigurationRule implements ConfigurationInterface
{
    /** @var ExtractRuleRegistry */
    protected $extractRuleRegistry;

    public function __construct(ExtractRuleRegistry $extractRuleRegistry)
    {
        $this->extractRuleRegistry = $extractRuleRegistry;
    }

    /**
     * {@inheritdoc}
     */
    public function getConfigTreeBuilder()
    {
        $treeBuilder = new TreeBuilder();
        $rootNode = $treeBuilder->root('extract_rule');
        $rootNode
            ->children()
                ->enumNode('service')
                    ->values(array_keys($this->extractRuleRegistry->getRules()))
                ->end()
                ->arrayNode('parameters')
                    ->defaultValue(array())->prototype('variable')->end()
                ->end()
            ->end()
        ;

        return $treeBuilder;
    }
}
