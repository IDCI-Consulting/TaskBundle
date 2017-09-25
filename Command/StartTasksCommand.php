<?php

/**
 * @author:  Brahim Boukoufallah <brahim.boukoufallah@idci-consulting.fr>
 */

namespace IDCI\Bundle\TaskBundle\Command;

use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;
use Symfony\Component\Console\Helper\Table;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use IDCI\Bundle\TaskBundle\Entity\AbstractTaskConfiguration;
use IDCI\Bundle\TaskBundle\Processor\ProcessorInterface;
use Cron\CronExpression;

class StartTasksCommand extends ContainerAwareCommand
{
    protected function configure()
    {
        $this
            ->setName('idci-task:start')
            ->setDescription('Starts tasks from enabled task configuration.')
            ->addOption(
                'processor',
                'p',
                InputOption::VALUE_OPTIONAL,
                'Processor that process tasks (rabbitmq)',
                'rabbitmq'
            )
            ->setHelp(<<<EOT
The <info>%command.name%</info> command starts tasks from all enabled task configuration.
Here is example of usages of this command:

Run tasks by using RabbitMQ queuing.
<info>php app/console %command.name% --force</info>
EOT
            )
        ;
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $table = new Table($output);

        /** @var ProcessorInterface $processor */
        $processor = $this->getContainer()->get(sprintf('idci_task.processor.%s', $input->getOption('processor')));

        $table->setHeaders(array(
            'Task',
            'Name',
            'Previous run date',
            'Next run date',
        ));

        $taskConfigurations = $this
            ->getContainer()
            ->get('doctrine.orm.entity_manager')
            ->getRepository($this->getContainer()->getParameter('idci_task.task_configuration_class'))
            ->findBy(array('enable' => AbstractTaskConfiguration::STATE_ENABLE))
        ;

        /** @var AbstractTaskConfiguration $configuration */
        foreach ($taskConfigurations as $configuration) {
            $cron = CronExpression::factory($configuration->getCronExpression());

            if ($processor instanceof ProcessorInterface) {
                if ($cron->isDue()) {
                    $this->addRow(
                        $table,
                        $configuration,
                        $cron
                    );

                    $processor->startTasks($configuration);
                }
            }
        }

        $table->render();
    }

    /**
     * Add a row.
     *
     * @param Table                     $table
     * @param AbstractTaskConfiguration $configuration
     * @param CronExpression            $cron
     *
     * @return Table
     */
    private function addRow(Table $table, AbstractTaskConfiguration $configuration, CronExpression $cron)
    {
        $table->addRow(array(
            'task' => $configuration->getId(),
            'name' => $configuration->getName(),
            'previous_date' => $cron->getPreviousRunDate()->format('Y-m-d H:i:s'),
            'next_date' => $cron->getNextRunDate()->format('Y-m-d H:i:s')
        ));

        return $table;
    }
}
