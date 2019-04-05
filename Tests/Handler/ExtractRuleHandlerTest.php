<?php

/**
 * @author: Brahim Boukoufallah <brahim.boukoufallah@idci-consulting.fr>
 */

namespace IDCI\Bundle\TaskBundle\Tests\Handler;

use Symfony\Component\EventDispatcher\EventDispatcher;
use PHPUnit\Framework\TestCase;
use IDCI\Bundle\TaskBundle\Handler\ExtractRuleHandler;
use IDCI\Bundle\TaskBundle\ExtractRule\ExtractRuleRegistry;
use IDCI\Bundle\TaskBundle\ExtractRule\ExtractRuleInterface;
use IDCI\Bundle\TaskBundle\Model\TaskConfiguration;

class ExtractRuleHandlerTest extends TestCase
{
    public function setUp()
    {
        $this->extractRuleRegistry = $this
            ->getMockBuilder(ExtractRuleRegistry::class)
            ->setMethods(array('hasRule', 'getRule'))
            ->getMock()
        ;

        $this->extractRule = $this
            ->getMockBuilder(ExtractRuleInterface::class)
            ->getMock()
        ;

        $this->eventDispatcher = $this
            ->getMockBuilder(EventDispatcher::class)
            ->setMethods(array('dispatch'))
            ->getMock()
        ;

        $this->taskConfiguration = new TaskConfiguration();
        $this->taskConfiguration
            ->setName('configuration 1')
            ->setExtractRule('{"service": "api_participations","parameters": {"id": "58da7cc43aaa0609008b4569"}}')
            ->setWorkflow('
                {
                    "actions": [{
                        "name": "generated_document",
                        "action": "generate_document",
                        "parameters": {
                            "document_id": "test-task",
                            "data": {
                                "firstname": "Brahouuum et {{ extracted_data.id }}"
                            }
                        }
                    }, {
                        "name": "participation_notification",
                        "action": "notify",
                        "parameters": {
                            "type": "email",
                            "options": {
                                "notifierAlias": "test",
                                "subject": "participation {{ extracted_data.id }}",
                                "htmlMessage": "{{ action_data.generated_document|raw }}",
                                "to": "boukoufallah.brahim@gmail.com"
                            }
                        }
                    }, {
                        "name": "participation_notification_2",
                        "action": "notify",
                        "parameters": {
                            "type": "email",
                            "options": {
                                "notifierAlias": "test",
                                "subject": "participation {{ extracted_data.id }}",
                                "htmlMessage": "Blabla",
                                "to": "boukoufallah.brahim@gmail.com"
                            }
                        }
                    }],
                    "workflow": {
                        "name": "workflow_1",
                        "first_action_name": "generated_document",
                        "actions": {
                            "generated_document": {
                                "next": [{
                                    "name": "participation_notification",
                                    "condition": "{{ extracted_data.id|default(false) ? 1 : 0 }}"
                                }, {
                                    "name": "participation_notification",
                                    "condition": "{{ extracted_data.id|default(false) ? 1 : 0 }}"
                                }],
                                "default_next": "participation_notification_2"
                            }
                        }
                    }
                }
            ')
        ;
    }

    public function testExecute()
    {
        $extractRule = array(
            'service' => 'api_participations',
            'parameters' => array(
                'id' => '58da7cc43aaa0609008b4569',
            ),
        );

        $extractedData = array(
            array(
                'id' => '52f928b95e81b7588a8b458a',
            ),
        );

        $this->extractRuleRegistry
            ->expects($this->once())
            ->method('getRule')
            ->with($this->equalTo($extractRule['service']))
            ->will($this->returnValue($this->extractRule))
        ;

        $this->extractRule
            ->expects($this->once())
            ->method('extract')
            ->with($this->equalTo($extractRule['parameters']))
            ->will($this->returnValue($extractedData))
        ;

        $extractRuleHandler = new ExtractRuleHandler(
            $this->extractRuleRegistry,
            $this->eventDispatcher,
        );

        $extractRuleHandler->execute($this->taskConfiguration);
    }
}
