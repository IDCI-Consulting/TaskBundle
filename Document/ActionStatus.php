<?php

namespace IDCI\Bundle\TaskBundle\Document;

use Doctrine\ODM\MongoDB\Mapping\Annotations as ODM;

/**
 * @ODM\EmbeddedDocument
 */
class ActionStatus
{
    /**
     * @var string
     */
    const PENDING = 'pending';
    const RUNNING = 'running';
    const ERROR   = 'error';
    const PASSED  = 'passed';

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
     * Constructor
     *
     * @param string $status
     * @throws \InvalidArgumentException
     */
    public function __construct($status)
    {
        if (!self::isValid($status)) {
            throw new \InvalidArgumentException(sprintf('Invalid status %s', $status));
        }

        $this->date = new \DateTime('now');
        $this->status = $status;
    }

    /**
     * Get the list of statuses
     *
     * @return array
     */
    public static function getList()
    {
        return array(
            self::PENDING,
            self::RUNNING,
            self::ERROR,
            self::PASSED
        );
    }

    /**
     * Check whether or not a given status is valid
     *
     * @param string $status
     * @return boolean
     */
    public static function isValid($status)
    {
        return in_array($status, self::getList());
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
     * Get status
     *
     * @return string $status
     */
    public function getStatus()
    {
        return $this->status;
    }
}
