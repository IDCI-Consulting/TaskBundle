<?php

/**
 * @author: Brahim Boukoufallah <brahim.boukoufallah@idci-consulting.fr>
 */

namespace IDCI\Bundle\TaskBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

abstract class AbstractTaskConfiguration
{
    const STATE_ENABLE = '1';
    const STATE_DISABLE = '0';

    /**
     * @var string
     *
     * @ORM\Column(name="name", unique=true, type="string", length=100)
     */
    protected $name;

    /**
     * @var string
     *
     * @ORM\Column(name="extract_rule", type="text")
     */
    protected $extractRule;

    /**
     * @var string
     *
     * @ORM\Column(name="workflow", type="text")
     */
    protected $workflow;

    /**
     * @var bool
     *
     * @ORM\Column(name="enable", type="boolean")
     */
    protected $enable;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="created_at", type="datetime")
     */
    protected $createdAt;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="updated_at", type="datetime")
     */
    protected $updatedAt;

    /**
     * @var int
     *
     * @ORM\Column(name="cron_expression", type="string", length=120)
     */
    protected $cronExpression;

    /**
     * toString.
     */
    public function __toString()
    {
        return $this->getName();
    }

    /**
     * Constructor.
     */
    public function __construct()
    {
        $this->extractRule = $this->actions = '{}';
        $now = new \DateTime();
        $this->createdAt = $now;
        $this->updatedAt = $now;
    }

    /**
     * Is enable.
     *
     * @return bool
     */
    public function isEnable()
    {
        return in_array(
            $this->getState(),
            array(self::STATE_ENABLE)
        );
    }

    /**
     * On update.
     *
     * @ORM\PreUpdate()
     */
    public function onUpdate()
    {
        $this->updatedAt = new \DateTime();
    }

    /**
     * Get states.
     *
     * @return array
     */
    public static function getEnables()
    {
        return array(
            self::STATE_ENABLE => self::STATE_ENABLE,
            self::STATE_DISABLE => self::STATE_DISABLE,
        );
    }

    /**
     * Set name.
     *
     * @param string $name
     *
     * @return AbstractTaskConfiguration
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get name.
     *
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set extractRule.
     *
     * @param string $extractRule
     *
     * @return AbstractTaskConfiguration
     */
    public function setExtractRule($extractRule)
    {
        $this->extractRule = $extractRule;

        return $this;
    }

    /**
     * Get extractRule.
     *
     * @return string
     */
    public function getExtractRule()
    {
        return $this->extractRule;
    }

    /**
     * Set workflow.
     *
     * @param string $workflow
     *
     * @return AbstractTaskConfiguration
     */
    public function setWorkflow($workflow)
    {
        $this->workflow = $workflow;

        return $this;
    }

    /**
     * Get workflow.
     *
     * @return string
     */
    public function getWorkflow()
    {
        return $this->workflow;
    }

    /**
     * Set enable.
     *
     * @param bool $enable
     *
     * @return AbstractTaskConfiguration
     */
    public function setEnable($enable)
    {
        $this->enable = $enable;

        return $this;
    }

    /**
     * Get enable.
     *
     * @return bool
     */
    public function getEnable()
    {
        return $this->enable;
    }

    /**
     * Get createdAt.
     *
     * @return \DateTime
     */
    public function getCreatedAt()
    {
        return $this->createdAt;
    }

    /**
     * Get updatedAt.
     *
     * @return \DateTime
     */
    public function getUpdatedAt()
    {
        return $this->updatedAt;
    }

    /**
     * Get CronExpression.
     *
     * @return string
     */
    public function getCronExpression()
    {
        return $this->cronExpression;
    }

    /**
     * Set CronExpression.
     *
     * @param string $cronExpression
     *
     * @return AbstractTaskConfiguration
     */
    public function setCronExpression($cronExpression)
    {
        $this->cronExpression = $cronExpression;

        return $this;
    }
}
