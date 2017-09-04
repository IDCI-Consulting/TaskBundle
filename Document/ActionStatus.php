<?php

namespace IDCI\Bundle\TaskBundle\Document;

use Doctrine\ODM\MongoDB\Mapping\Annotations as ODM;

/**
 * @ODM\EmbeddedDocument
 */
class ActionStatus
{
    /**
     * @var \DateTime
     *
     * @ODM\Field(type="date", name="date")
     */
    private $date;

    /**
     * @var string
     *
     * @ODM\Field(type="string", name="status")
     */
    private $status;

    /**
     * Set date
     *
     * @param \Datetime $date
     *
     * @return $this
     */
    public function setDate(\DateTime $date)
    {
        $this->date = $date;

        return $this;
    }

    /**
     * Get date
     *
     * @return \Datetime $date
     */
    public function getDate()
    {
        return $this->date;
    }

    /**
     * Set status
     *
     * @param string $status
     *
     * @return $this
     */
    public function setStatus($status)
    {
        $this->status = $status;

        return $this;
    }

    /**
     * Get status
     *
     * @return string $status
     */
    public function getStatus()
    {
        return $this->status;
    }
}
