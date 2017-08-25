<?php

/**
 * @author: Brahim Boukoufallah <brahim.boukoufallah@idci-consulting.fr>
 */

namespace IDCI\Bundle\TaskBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;
use Tms\Bundle\LoggerBundle\Logger\LoggableInterface;

/**
 * @ORM\Entity(repositoryClass="IDCI\Bundle\TaskBundle\Entity\Repository\TaskConfigurationRepository")
 * @ORM\Table(name="task_configuration", indexes={
 *     @ORM\Index(name="name", columns="name")
 * })
 * @ORM\HasLifecycleCallbacks()
 */
class TaskConfiguration implements LoggableInterface
{
    const STATE_ENABLE = '1';
    const STATE_DISABLE = '0';

    /**
     * @var int
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="name", unique=true, type="string", length=100)
     */
    private $name;

    /**
     * @var string
     *
     * @ORM\Column(name="extract_rule", type="text")
     */
    private $extractRule;

    /**
     * @var string
     *
     * @ORM\Column(name="workflow", type="text")
     */
    private $workflow;

    /**
     * @var bool
     *
     * @ORM\Column(name="enable", type="boolean")
     */
    private $enable;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="created_at", type="datetime")
     */
    private $createdAt;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="updated_at", type="datetime")
     */
    private $updatedAt;

    /**
     * @var int
     *
     * @ORM\Column(name="cron_expression", type="string", length=120)
     */
    private $cronExpression;

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
     *
     * @ORM\PrePersist()
     */
    public function onCreate()
    {
        $now = new \DateTime();
        $this
            ->setCreatedAt($now)
            ->setUpdatedAt($now)
        ;
    }

    /**
     * On update.
     *
     * @ORM\PreUpdate()
     */
    public function onUpdate()
    {
        $now = new \DateTime();
        $this
            ->setUpdatedAt($now)
        ;
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
     * Get id.
     *
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set name.
     *
     * @param string $name
     *
     * @return Task
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
     * @return Task
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
     * @param string $actions
     *
     * @return TaskConfiguration
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
     * @return Task
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
     * Set createdAt.
     *
     * @param \DateTime $createdAt
     *
     * @return Task
     */
    public function setCreatedAt($createdAt)
    {
        $this->createdAt = $createdAt;

        return $this;
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
     * Set updatedAt.
     *
     * @param \DateTime $updatedAt
     *
     * @return Task
     */
    public function setUpdatedAt($updatedAt)
    {
        $this->updatedAt = $updatedAt;

        return $this;
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
     * @return Task
     */
    public function setCronExpression($cronExpression)
    {
        $this->cronExpression = $cronExpression;

        return $this;
    }
}
