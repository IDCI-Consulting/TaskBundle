<?php

namespace IDCI\Bundle\TaskBundle\Document;

use Doctrine\ODM\MongoDB\Mapping\Annotations as ODM;

/**
 * @ODM\EmbeddedDocument
 */
class Action
{
    /**
     * @var string
     *
     * @ODM\Field(type="string", name="name")
     */
    private $name;

    /**
     * @var array
     *
     * @ODM\EmbedMany(targetDocument="ActionStatus")
     */
    private $statuses;

    public function __construct()
    {
        $this->statuses = new \Doctrine\Common\Collections\ArrayCollection();
    }
    
    /**
     * Set name
     *
     * @param string $name
     * @return $this
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get name
     *
     * @return string $name
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Add status
     * Insert the status in first position to build the mongo query more easily.
     *
     * @param IDCI\Bundle\TaskBundle\Document\ActionStatus $status
     */
    public function addStatus(\IDCI\Bundle\TaskBundle\Document\ActionStatus $status)
    {
        $statuses = $this->statuses->toArray();
        array_unshift($statuses, $status);

        $this->statuses = new \Doctrine\Common\Collections\ArrayCollection($statuses);

        return $this;
    }

    /**
     * Remove status
     *
     * @param IDCI\Bundle\TaskBundle\Document\ActionStatus $status
     */
    public function removeStatus(\IDCI\Bundle\TaskBundle\Document\ActionStatus $status)
    {
        $this->statuses->removeElement($status);

        return $this;
    }

    /**
     * Get statuses
     *
     * @return \Doctrine\Common\Collections\Collection $statuses
     */
    public function getStatuses()
    {
        return $this->statuses;
    }

    /**
     * Get current status
     *
     * @return ActionStatus
     */
    public function getCurrentStatus()
    {
        return $this->statuses->first();
    }
}
