<?php

/**
 * @author: Brahim Boukoufallah <brahim.boukoufallah@idci-consulting.fr>
 */

namespace IDCI\Bundle\TaskBundle\Tests\Action;

use PHPUnit\Framework\TestCase;
use IDCI\Bundle\TaskBundle\Action\ActionInterface;
use IDCI\Bundle\TaskBundle\Action\ActionRegistry;

class ActionRegistryTest extends TestCase
{
    /** @var ActionInterface */
    private $action;

    protected function setUp()
    {
        $this->action = $this->createMock(ActionInterface::class);
    }

    /**
     * Test setAction.
     */
    public function testSetAction()
    {
        $registry = new ActionRegistry();

        $this->assertEquals(
            $registry->setAction('action', $this->action),
            $registry
        );

        $this->assertArrayHasKey('action', $registry->getActions());
    }

    /**
     * Test getActions.
     */
    public function testGetActions()
    {
        $registry = new ActionRegistry();

        $registry->setAction('action', $this->action);
        $this->assertArrayHasKey('action', $registry->getActions());
        $this->assertEquals(1, sizeof($registry->getActions()));
    }

    /**
     * Test getAction.
     */
    public function testGetAction()
    {
        $registry = new ActionRegistry();

        $registry->setAction('action', $this->action);
        $this->assertNotEmpty($registry->getAction('action'));

        $this->expectException('IDCI\Bundle\TaskBundle\Exception\UnexpectedTypeException');
        $registry->getAction(array());

        $this->expectException('\InvalidArgumentException');
        $registry->getAction('fake_action');
    }

    /**
     * Test hasAction.
     */
    public function testHasLotDestructionRule()
    {
        $registry = new ActionRegistry();

        $registry->setAction('action', $this->action);
        $this->assertTrue($registry->hasAction('action'));
        $this->assertFalse($registry->hasAction('calllback'));
    }
}
