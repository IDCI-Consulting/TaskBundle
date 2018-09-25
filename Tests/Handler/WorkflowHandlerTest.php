<?php

/**
 * @author: Brahim Boukoufallah <brahim.boukoufallah@idci-consulting.fr>
 */

namespace IDCI\Bundle\TaskBundle\Tests\Handler;

use PHPUnit\Framework\TestCase;
use IDCI\Bundle\TaskBundle\Handler\WorkflowHandler;
use IDCI\Bundle\TaskBundle\Document\Action;

class WorkflowHandlerTest extends TestCase
{
    public function testGetNextActions()
    {
        $task = ActionHandlerTest::createTask();
        $workflowHandler = new WorkflowHandler(new \Twig_Environment(new \Twig_Loader_Array()));

        $action = new Action();
        $action->setName('participation_notification');
        
        $this->assertEquals($action, $workflowHandler->getNextAction($task));
    }
}
