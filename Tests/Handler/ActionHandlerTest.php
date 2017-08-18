<?php

/**
 * @author: Brahim Boukoufallah <brahim.boukoufallah@idci-consulting.fr>
 */

namespace IDCI\Bundle\TaskBundle\Tests\Handler;

use Symfony\Component\EventDispatcher\EventDispatcher;
use PHPUnit\Framework\TestCase;
use OldSound\RabbitMqBundle\RabbitMq\ProducerInterface;
use IDCI\Bundle\TaskBundle\Handler\ActionHandler;
use IDCI\Bundle\TaskBundle\Handler\WorkflowHandler;
use IDCI\Bundle\TaskBundle\Action\ActionRegistry;
use IDCI\Bundle\TaskBundle\Document\Task;
use IDCI\Bundle\TaskBundle\Document\TaskData;
use IDCI\Bundle\TaskBundle\Document\Configuration;
use IDCI\Bundle\TaskBundle\Document\Action;
use IDCI\Bundle\TaskBundle\Document\ActionStatus;
use IDCI\Bundle\TaskBundle\Event\TaskEvent;
use IDCI\Bundle\TaskBundle\Event\TaskEvents;

class ActionHandlerTest extends TestCase
{
    private $actionRegistry;
    private $actionProducer;
    private $taskLogger;
    private $action;
    private $merger;

    public function setUp()
    {
        $this->actionRegistry = $this
            ->getMockBuilder(ActionRegistry::class)
            ->setMethods(array('hasAction', 'getAction'))
            ->getMock()
        ;

        $this->actionProducer = $this
            ->getMockBuilder(ProducerInterface::class)
            ->disableOriginalConstructor()
            ->setMethods(array('publish'))
            ->getMock()
        ;

        $this->eventDispatcher = $this
            ->getMockBuilder(EventDispatcher::class)
            ->setMethods(array('dispatch'))
            ->getMock()
        ;

        $this->action = $this
            ->getMockBuilder(ActionInterface::class)
            ->setMethods(array('execute'))
            ->getMock()
        ;

        $this->merger = new \Twig_Environment(new \Twig_Loader_Array());
        $this->workflowHandler = new WorkflowHandler($this->merger);

        $this->actionHandler = new ActionHandler(
            $this->actionRegistry,
            $this->eventDispatcher,
            $this->merger,
            $this->actionProducer,
            $this->workflowHandler
        );
    }

    public function testExecute()
    {
        $task = self::createTask();

        $actionData = array(
            'error' => false,
            'data' => array('Dummy value returned by action execute method'),
        );

        $action = $task->getConfiguration()->getAction($task->getActions()->first()->getName());
        $this->actionRegistry
            ->expects($this->once())
            ->method('hasAction')
            ->with($this->equalTo($action['action']))
            ->will($this->returnValue(true))
        ;

        $this->eventDispatcher
            ->expects($this->exactly(3))
            ->method('dispatch')
            ->withConsecutive(
                array($this->equalTo(TaskEvents::RUNNING), $this->equalTo(new TaskEvent($task))),
                array($this->equalTo(TaskEvents::PASSED), $this->equalTo(new TaskEvent($task))),
                array($this->equalTo(TaskEvents::PENDING), $this->equalTo(new TaskEvent($task)))
            )
        ;

        $this->actionRegistry
            ->expects($this->once())
            ->method('getAction')
            ->with($this->equalTo($action['action']))
            ->will($this->returnValue($this->action))
        ;

        $this->action
            ->expects($this->once())
            ->method('execute')
            ->will($this->returnValue($actionData))
        ;

        $this->assertTrue($this->actionHandler->execute($task));
    }

    public function testLastActionExecution()
    {
        $task = self::createTask();

        $task->getConfiguration()->setWorkflow(array(
            "name" => "workflow_1",
            "first_action_name" => "generated_document",
            "actions" => array()
        ));

        $actionData = array(
            'error' => false,
            'data' => array('Dummy value returned by action execute method'),
        );

        $action = $task->getConfiguration()->getAction($task->getActions()->first()->getName());
        $this->actionRegistry
            ->expects($this->once())
            ->method('hasAction')
            ->with($this->equalTo($action['action']))
            ->will($this->returnValue(true))
        ;

        $this->eventDispatcher
            ->expects($this->exactly(2))
            ->method('dispatch')
            ->withConsecutive(
                array($this->equalTo(TaskEvents::RUNNING), $this->equalTo(new TaskEvent($task))),
                array($this->equalTo(TaskEvents::PASSED), $this->equalTo(new TaskEvent($task)))
            )
        ;

        $this->actionRegistry
            ->expects($this->once())
            ->method('getAction')
            ->with($this->equalTo($action['action']))
            ->will($this->returnValue($this->action))
        ;

        $this->action
            ->expects($this->once())
            ->method('execute')
            ->will($this->returnValue($actionData))
        ;

        $this->assertTrue($this->actionHandler->execute($task));
    }

    public function testExecutionErrored()
    {
        $task = self::createTask();

        $actionData = array(
            'error' => true,
            'data' => array('Dummy value returned by action execute method'),
        );

        $action = $task->getConfiguration()->getAction($task->getActions()->first()->getName());
        $this->actionRegistry
            ->expects($this->once())
            ->method('hasAction')
            ->with($this->equalTo($action['action']))
            ->will($this->returnValue(true))
        ;

        $this->eventDispatcher
            ->expects($this->exactly(2))
            ->method('dispatch')
            ->withConsecutive(
                array($this->equalTo(TaskEvents::RUNNING), $this->equalTo(new TaskEvent($task))),
                array($this->equalTo(TaskEvents::ERROR), $this->equalTo(new TaskEvent($task)))
            )
        ;

        $this->actionRegistry
            ->expects($this->once())
            ->method('getAction')
            ->with($this->equalTo($action['action']))
            ->will($this->returnValue($this->action))
        ;

        $this->action
            ->expects($this->once())
            ->method('execute')
            ->will($this->returnValue($actionData))
        ;

        $this->assertFalse($this->actionHandler->execute($task));
    }

    public function testMerge()
    {
        $parameters = array(
            'data' => array(
                'participation' => '{{ extracted_data.id }}',
            ),
        );

        $extractedData = array(
            'id' => '52f928b95e81b7588a8b458a',
        );

        $this->assertEquals(
            array(
                'data' => array(
                    'participation' => '52f928b95e81b7588a8b458a',
                ),
            ),
            $this->actionHandler->merge($parameters, $extractedData, array())
        );

        $parameters = array(
            'data' => array(
                'participation' => '{{ extracted_data.id }}',
                'test' => '{{ action_data.test }}',
            ),
        );

        $extractedData = array(
            'id' => '52f928b95e81b7588a8b458a',
        );

        $actionData = array(
            'test' => 'dummy',
        );

        $this->assertEquals(
            array(
                'data' => array(
                    'participation' => '52f928b95e81b7588a8b458a',
                    'test' => 'dummy',
                ),
            ),
            $this->actionHandler->merge($parameters, $extractedData, $actionData)
        );
    }

    public static function createTask()
    {
        $configuration = new Configuration();
        $configuration
            ->setWorkflow(array(
                "name" => "workflow_1",
                "first_action_name" => "generated_document",
                "actions" => array(
                    "generated_document" => array(
                        "next" => array(
                            array(
                                "name" => "participation_notification",
                                "condition" => "{{ extracted_data.id|default(false) ? 1 : 0 }}"
                            ),
                        ),
                        "default_next" => "participation_notification_2"
                    )
                )
            ))
            ->setActions(array(
                array(
                    'name' => 'generated_document',
                    'action' => 'generate_document',
                    'parameters' => array(
                        'document_id' => 'test-task',
                        'data' => array(
                            'firstname' => 'Dummy'
                        )
                    )
                ),
                array(
                    'name' => 'participation_notification',
                    'action' => 'notify',
                    'parameters' => array(
                        'notifierAlias' => 'test',
                        'subject' => 'participation {{ extracted_data.id }}',
                        'htmlMessage' => 'Blabla',
                        'to' => 'dummy@dummy.com',
                    )
                ),
                array(
                    'name' => 'participation_notification_2',
                    'action' => 'notify',
                    'parameters' => array(
                        'notifierAlias' => 'test',
                        'subject' => 'participation {{ extracted_data.id }}',
                        'htmlMessage' => '{{ action_data.generated_document }}',
                        'to' => 'dummy@dummy.com',
                    )
                ),
            ))
        ;

        $data = new TaskData();
        $data
            ->setExtractedData(array(
                'id' => 'dummy_id',
            ))
            ->setActionData(array(
                'generated_document' => 'dummy_content'
            ))
        ;

        $actionStatus = new ActionStatus();
        $actionStatus
            ->setDate(new \DateTime())
            ->setStatus(TaskEvents::PENDING)
        ;

        $action = new Action();
        $action
            ->setName('generated_document')
            ->addStatus($actionStatus)
        ;

        $task = new Task();
        $task
            ->setConfiguration($configuration)
            ->setData($data)
            ->addAction($action)
        ;

        return $task;
    }
}
