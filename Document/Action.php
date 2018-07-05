<?php

namespace IDCI\Bundle\TaskBundle\Document;

use Doctrine\Common\Collections\ArrayCollection;
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
        $this->statuses = new ArrayCollection();
    }

    /**
     * Set name.
     *
     * @param string $name
     *
     * @return $this
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get name.
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
     * @param string $status
     *
     * @return Action
     */
    public function addStatus($status)
    {
        $actionStatus = new ActionStatus($status);
        $actionStatuses = $this->statuses->toArray();
        array_unshift($actionStatuses, $actionStatus);

        $this->statuses = new ArrayCollection($actionStatuses);

        return $this;
    }

    /**
     * Remove status.
     *
     * @param ActionStatus $status
     *
     * @return Action
     */
    public function removeStatus(ActionStatus $status)
    {
        $this->statuses->removeElement($status);

        return $this;
    }

    /**
     * Get statuses.
     *
     * @return ArrayCollection $statuses
     */
    public function getStatuses()
    {
        return $this->statuses;
    }

    /**
     * Get current status.
     *
     * @return ActionStatus
     */
    public function getCurrentStatus()
    {
        return $this->statuses->first();
    }
}
