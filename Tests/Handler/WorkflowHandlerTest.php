<?php

namespace IDCI\Bundle\TaskBundle\Tests\Handler;

use Doctrine\ODM\MongoDB\DocumentManager;
use IDCI\Bundle\TaskBundle\Document\Action;
use IDCI\Bundle\TaskBundle\Handler\WorkflowHandler;
use IDCI\Bundle\TaskBundle\Action\ActionRegistry;
use PHPUnit\Framework\TestCase;

/**
 * @author: Brahim Boukoufallah <brahim.boukoufallah@idci-consulting.fr>
 */
class WorkflowHandlerTest extends TestCase
{
    public function setUp()
    {
        $dm = $this->getMockBuilder(DocumentManager::class)
            ->disableOriginalConstructor()
            ->getMock()
        ;

        $registry = $this->getMockBuilder(ActionRegistry::class)
            ->disableOriginalConstructor()
            ->getMock()
        ;

        $this->workflowHandler = new WorkflowHandler(new \Twig_Environment(new \Twig_Loader_Array()), $dm, $registry);
    }

    public function testGetNextActions()
    {
        $task = ActionHandlerTest::createTask();

        $action = new Action();
        $action->setName('participation_notification');

        $this->assertEquals($action, $this->workflowHandler->getNextAction($task));
    }

    public function testIsTrue()
    {
        $this->assertTrue($this->workflowHandler->isTrue('true '));
        $this->assertTrue($this->workflowHandler->isTrue(true));
        $this->assertTrue($this->workflowHandler->isTrue('1'));
        $this->assertTrue($this->workflowHandler->isTrue('        1 '));
        $this->assertFalse($this->workflowHandler->istrue('false '));
        $this->assertFalse($this->workflowHandler->istrue(false));
        $this->assertFalse($this->workflowHandler->istrue('0'));
        $this->assertFalse($this->workflowHandler->isTrue('        0 '));
        $this->assertNull($this->workflowHandler->isTrue('foo', true));
        $this->assertFalse($this->workflowHandler->istrue('foo'));
    }
}
