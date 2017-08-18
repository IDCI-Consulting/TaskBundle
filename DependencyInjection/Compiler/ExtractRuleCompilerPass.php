<?php

/**
 * @author: Brahim Boukoufallah <brahim.boukoufallah@idci-consulting.fr>
 */

namespace IDCI\Bundle\TaskBundle\DependencyInjection\Compiler;

use Symfony\Component\DependencyInjection\Compiler\CompilerPassInterface;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\DependencyInjection\Reference;
use IDCI\Bundle\TaskBundle\Exception\MissingExtractRuleParametersDefinitionException;
use IDCI\Bundle\TaskBundle\Exception\UndefinedExtractRuleException;

class ExtractRuleCompilerPass implements CompilerPassInterface
{
    /**
     * {@inheritdoc}
     */
    public function process(ContainerBuilder $container)
    {
        if (!$container->hasDefinition('idci_task.extract_rule_registry')) {
            return;
        }

        $registryDefinition = $container->getDefinition('idci_task.extract_rule_registry');
        $extractRules = $container->getParameter('idci_task.extract_rules');

        foreach ($container->findTaggedServiceIds('idci_task.extract_rule') as $id => $tags) {
            foreach ($tags as $attributes) {
                $alias = isset($attributes['alias'])
                    ? $attributes['alias']
                    : $id
                ;

                if (!isset($extractRules[$alias])) {
                    throw new MissingExtractRuleParametersDefinitionException($alias);
                }

                $registryDefinition->addMethodCall(
                    'setRule',
                    array($alias, new Reference($id))
                );
            }
        }

        foreach ($extractRules as $name => $configuration) {
            $parent = null;
            $serviceDefinition = $container->getDefinition($this->getDefinitionName($name));

            if (null !== $configuration['parent']) {
                if (!$container->hasDefinition($this->getDefinitionName($configuration['parent']))) {
                    throw new UndefinedExtractRuleException($configuration['parent']);
                }

                $serviceDefinition->addMethodCall(
                    'setParent',
                    array(new Reference(
                        $this->getDefinitionName($configuration['parent'])
                    ))
                );
            }

            $serviceDefinition->addMethodCall(
                'setExtractRuleParameters',
                array($configuration)
            );
        }
    }

    /**
     * Get definition name.
     *
     * @param string $name
     *
     * @return string
     */
    protected function getDefinitionName($name)
    {
        return sprintf('idci_task.extract_rule.%s', $name);
    }
}
