<?php

/**
 * @author: Brahim Boukoufallah <brahim.boukoufallah@idci-consulting.fr>
 */

namespace IDCI\Bundle\TaskBundle\Controller\Rest;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations\Route;
use FOS\RestBundle\Controller\Annotations\QueryParam;
use FOS\RestBundle\Controller\Annotations\RequestParam;
use FOS\RestBundle\Controller\Annotations\Get;
use FOS\RestBundle\Util\Codes;
use FOS\RestBundle\View\View;
use JMS\Serializer\SerializationContext;
use Doctrine\Common\Inflector\Inflector;
use IDCI\Bundle\RestBundle\Formatter\AbstractHypermediaFormatter;

/**
 * Action API REST controller
 */
class ApiActionController extends FOSRestController
{
    /**
     * [GET] /actions.{_format}
     * Retrieve actions.
     *
     * @Get("/actions")
     *
     * @return Response
     */
    public function getActionsAction($_format)
    {
        $view = View::create()->setFormat($_format);

        $actions = $this->get('idci_task.action_registry')->getActions();
        ksort($actions);
        $view->setData(array_keys($actions));

        return $this->handleView($view);
    }

    /**
     * [GET] /actions/{name}/parameters.{_format}
     * Retrieve an action parameters.
     *
     * @Get("/actions/{name}/parameters")
     *
     * @param string $name
     * @param string $_format
     *
     * @return Response
     */
    public function getActionParametersAction($name, $_format)
    {
        $registry = $this->get('idci_task.action_registry');
        if (!($registry->hasAction($name))) {
            throw new NotFoundHttpException(sprintf(
                'The action `%s` was not found',
                $name
            ));
        }

        $view = View::create()->setFormat($_format);
        $action = $this->get(sprintf('idci_task.action_configuration.%s', $name));

        $view->setData($action);

        return $this->handleView($view);
    }
}
