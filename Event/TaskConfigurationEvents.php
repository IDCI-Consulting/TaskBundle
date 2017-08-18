<?php

namespace IDCI\Bundle\TaskBundle\Event;

final class TaskConfigurationEvents
{
    /**
     * @var string
     */
    const PRE_CREATE = 'idci.task.pre_create';
    const POST_CREATE = 'idci.task.post_create';

    const PRE_UPDATE = 'idci.task.pre_update';
    const POST_UPDATE = 'idci.task.post_update';

    const PRE_DELETE = 'idci.task.pre_delete';
    const POST_DELETE = 'idci.task.post_delete';

    const SHOW = 'idci.task.show';
}
