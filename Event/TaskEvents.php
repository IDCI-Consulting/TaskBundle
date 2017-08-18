<?php

namespace IDCI\Bundle\TaskBundle\Event;

final class TaskEvents
{
    /**
     * @var string
     */
    const CREATED = 'idci.task.created';
    const PENDING = 'pending';
    const RUNNING = 'running';
    const ERROR   = 'error';
    const PASSED  = 'passed';
}
