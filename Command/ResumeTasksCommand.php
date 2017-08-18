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
use IDCI\Bundle\TaskBundle\Entity\TaskConfiguration;
use IDCI\Bundle\TaskBundle\Document\Task;
use IDCI\Bundle\TaskBundle\Processor\ProcessorInterface;
use Cron\CronExpression;

class ResumeTasksCommand extends ContainerAwareCommand
{
    protected function configure()
    {
        $this
            ->setName('idci:resume-tasks')
            ->setDescription('Rerun all errored tasks.')
            ->addOption(
                'processor',
                'p',
                InputOption::VALUE_OPTIONAL,
                'Processor that process tasks (rabbitmq)',
                'rabbitmq'
            )
            ->setHelp(<<<EOT
The <info>%command.name%</info> command rerun all errored tasks.
Here is example of usages of this command:

Run tasks by using RabbitMQ queuing.
<info>php app/console %command.name%</info>
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
            'Current action',
        ));

        $manager = $this->getContainer()->get('doctrine.odm.mongodb.document_manager');
        $tasks = $manager->getRepository(Task::class)->findErroredTasks();

        /** @var Task $task */
        foreach ($tasks as $task) {
             $this->addRow(
                 $table,
                 $task
             );

             $processor->resume($task);
        }

        $table->render();
    }

    /**
     * Add a row.
     *
     * @param Table     $table
     * @param Task      $task
     *
     * @return Table
     */
    private function addRow(Table $table, Task $task)
    {
        $table->addRow(array(
            'task' => $task->getId(),
            'currentAction' => $task->getCurrentAction()->getName(),
        ));

        return $table;
    }
}
