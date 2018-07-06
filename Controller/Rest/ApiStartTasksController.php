<?php

/**
 * @author: Brahim Boukoufallah <brahim.boukoufallah@idci-consulting.fr>
 */

namespace IDCI\Bundle\TaskBundle\Controller\Rest;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use FOS\RestBundle\Controller\Annotations\Post;

/**
 * TaskConfiguration API REST controller.
 */
class ApiStartTasksController extends Controller
{
    /**
     * [POST] /start-tasks/{taskConfigurationId}.
     *
     * Start tasks from a configuration
     * The HTTP method used here might be controversial, as we are not treating resources, but starting process
     *
     * @Post("/start-tasks/{taskConfigurationId}")
     *
     * @return Response
     */
    public function getActionsAction(Request $request, $taskConfigurationId)
    {
        if (!$request->isXmlHttpRequest()) {
            throw new BadRequestHttpException();
        }

        $processor = $this->get('idci_task.processor.rabbitmq');
        $taskConfiguration = $this
            ->getDoctrine()
            ->getManager()
            ->getRepository($this->getParameter('idci_task.task_configuration_class'))
            ->findOneById($taskConfigurationId)
        ;
        $processor->startTasks($taskConfiguration);
        $response = new Response();
        $response->setStatusCode(Response::HTTP_NO_CONTENT);

        return $response;
    }
}
