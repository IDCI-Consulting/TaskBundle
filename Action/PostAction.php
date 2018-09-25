<?php

/**
 * @author: Brahim Boukoufallah <brahim.boukoufallah@idci-consulting.fr>
 */

namespace IDCI\Bundle\TaskBundle\Action;

use IDCI\Bundle\TaskBundle\Exception\InvalidActionDataException;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Psr\Log\LoggerInterface;
use IDCI\Bundle\TaskBundle\Document\Task;
use IDCI\Bundle\TaskBundle\Monolog\Processor\TaskLogProcessor;

abstract class PostAction extends AbstractAction
{
    /**
     * Configure Options.
     *
     * @param OptionsResolver $resolver
     */
    protected function configureOptions(OptionsResolver $resolver)
    {
        $resolver
            ->setDefined('process_key')
            ->setAllowedTypes('process_key', array('string'));
    }
}
