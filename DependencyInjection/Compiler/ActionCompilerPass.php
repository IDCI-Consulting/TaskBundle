<?php

/**
 * @author: Brahim Boukoufallah <brahim.boukoufallah@idci-consulting.fr>
 */

namespace IDCI\Bundle\TaskBundle\DependencyInjection\Compiler;

use Symfony\Component\DependencyInjection\Compiler\CompilerPassInterface;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\DependencyInjection\Reference;
use IDCI\Bundle\TaskBundle\Exception\MissingActionParametersDefinitionException;
use IDCI\Bundle\TaskBundle\Exception\UndefinedActionException;

class ActionCompilerPass implements CompilerPassInterface
{
    /**
     * {@inheritdoc}
     */
    public function process(ContainerBuilder $container)
    {
        if (!$container->hasDefinition('idci_task.action_registry')) {
            return;
        }

        $registryDefinition = $container->getDefinition('idci_task.action_registry');
        $actions = $container->getParameter('idci_task.actions');

        foreach ($container->findTaggedServiceIds('idci_task.action') as $id => $tags) {
            foreach ($tags as $attributes) {
                $alias = isset($attributes['alias'])
                    ? $attributes['alias']
                    : $id
                ;

                if (!isset($actions[$alias])) {
                    throw new MissingActionParametersDefinitionException($alias);
                }

                $registryDefinition->addMethodCall(
                    'setAction',
                    array($alias, new Reference($id))
                );
            }
        }

        foreach ($actions as $name => $configuration) {
            $parent = null;
            $serviceDefinition = $container->getDefinition($this->getDefinitionName($name));

            if (null !== $configuration['parent']) {
                if (!$container->hasDefinition($this->getDefinitionName($configuration['parent']))) {
                    throw new UndefinedActionException($configuration['parent']);
                }

                $serviceDefinition->addMethodCall(
                    'setParent',
                    array(new Reference(
                        $this->getDefinitionName($configuration['parent'])
                    ))
                );
            }

            $serviceDefinition->addMethodCall(
                'setActionParameters',
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
        return sprintf('idci_task.action.%s', $name);
    }
}
