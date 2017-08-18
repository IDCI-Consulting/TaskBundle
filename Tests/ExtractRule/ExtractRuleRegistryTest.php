<?php

/**
 * @author: Brahim Boukoufallah <brahim.boukoufallah@idci-consulting.fr>
 */

namespace IDCI\Bundle\TaskBundle\Tests\ExtractRule;

use PHPUnit\Framework\TestCase;
use IDCI\Bundle\TaskBundle\ExtractRule\ExtractRuleInterface;
use IDCI\Bundle\TaskBundle\ExtractRule\ExtractRuleRegistry;

class ExtractRuleRegistryTest extends TestCase
{
    /** @var ExtractRuleInterface */
    private $rule;

    protected function setUp()
    {
        $this->rule = $this->createMock(ExtractRuleInterface::class);
    }

    /**
     * Test setExtractRule.
     */
    public function testSetRule()
    {
        $registry = new ExtractRuleRegistry();

        $this->assertEquals(
            $registry->setRule('rule', $this->rule),
            $registry
        );

        $this->assertArrayHasKey('rule', $registry->getRules());
    }

    /**
     * Test getExtractRules.
     */
    public function testGetRules()
    {
        $registry = new ExtractRuleRegistry();

        $registry->setRule('rule', $this->rule);
        $this->assertArrayHasKey('rule', $registry->getRules());
        $this->assertEquals(1, sizeof($registry->getRules()));
    }

    /**
     * Test getExtractRule.
     */
    public function testGetRule()
    {
        $registry = new ExtractRuleRegistry();

        $registry->setRule('rule', $this->rule);
        $this->assertNotEmpty($registry->getRule('rule'));

        $this->expectException('IDCI\Bundle\TaskBundle\Exception\UnexpectedTypeException');
        $registry->getRule(array());

        $this->expectException('\InvalidArgumentException');
        $registry->getRule('fake_rule');
    }

    /**
     * Test hasRule.
     */
    public function testHasLotDestructionRule()
    {
        $registry = new ExtractRuleRegistry();

        $registry->setRule('rule', $this->rule);
        $this->assertTrue($registry->hasRule('rule'));
        $this->assertFalse($registry->hasRule('ruuuule'));
    }
}
