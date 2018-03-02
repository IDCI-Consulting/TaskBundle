<?php

namespace IDCI\Bundle\TaskBundle\Event;

final class ProcessEvents
{
    /**
     * The POST event is dispatched when all tasks, with same processKey, are finished.
     *
     * @Event("IDCI\Bundle\TaskBundle\Event\ProcessEvent")
     */
    const POST = 'process.post';
}
