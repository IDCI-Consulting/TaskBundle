<?php

/**
 * @author: Brahim Boukoufallah <brahim.boukoufallah@idci-consulting.fr>
 */

namespace IDCI\Bundle\TaskBundle\Model;

use IDCI\Bundle\TaskBundle\Util\Urlizer;

abstract class AbstractTaskConfiguration implements \JsonSerializable
{
    const STATE_ENABLE = '1';
    const STATE_DISABLE = '0';

    /**
     * @var string
     */
    protected $name;

    /**
     * @var string
     */
    protected $slug;

    /**
     * @var string
     */
    protected $extractRule;

    /**
     * @var string
     */
    protected $workflow;

    /**
     * @var bool
     */
    protected $enable;

    /**
     * @var \DateTime
     */
    protected $createdAt;

    /**
     * @var \DateTime
     */
    protected $updatedAt;

    /**
     * @var string
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

        $this->setSlug($this->generateSlug());

        $now = new \DateTime();
        $this->createdAt = $now;
        $this->updatedAt = $now;
    }

    /**
     * Serialize a task configuration in json.
     *
     * @return array
     */
    public function jsonSerialize()
    {
        return array(
            'name' => $this->name,
            'slug' => $this->slug,
            'extractRule' => $this->extractRule,
            'workflow' => $this->workflow,
            'enable' => $this->enable,
            'createdAt' => $this->createdAt,
            'updatedAt' => $this->updatedAt,
            'cronExpression' => $this->cronExpression,
        );
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
     * On create.
     */
    public function onCreate()
    {
        $this->setSlug($this->generateSlug());

        $this->updatedAt = new \DateTime();
    }

    /**
     * On update.
     */
    public function onUpdate()
    {
        $this->setSlug($this->generateSlug());

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
     * Generate slug using the name.
     *
     * @return string
     */
    protected function generateSlug()
    {
        return Urlizer::urlize($this->getName());
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
     * Set slug.
     *
     * @param string $slug
     *
     * @return AbstractTaskConfiguration
     */
    public function setSlug($slug)
    {
        $this->slug = $slug;

        return $this;
    }

    /**
     * Get slug.
     *
     * @return string
     */
    public function getSlug()
    {
        return $this->slug;
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
