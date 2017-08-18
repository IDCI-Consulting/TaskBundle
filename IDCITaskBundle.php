<?php

/**
 * @author: Brahim Boukoufallah <brahim.boukoufallah@idci-consulting.fr>
 */

namespace IDCI\Bundle\TaskBundle;

use Symfony\Component\HttpKernel\Bundle\Bundle;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use IDCI\Bundle\TaskBundle\DependencyInjection\Compiler\ActionCompilerPass;
use IDCI\Bundle\TaskBundle\DependencyInjection\Compiler\ExtractRuleCompilerPass;

class IDCITaskBundle extends Bundle
{
    public function build(ContainerBuilder $container)
    {
        parent::build($container);

        $container
            ->addCompilerPass(new ActionCompilerPass())
            ->addCompilerPass(new ExtractRuleCompilerPass())
        ;
    }
}
