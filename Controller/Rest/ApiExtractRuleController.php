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
 * ExtractRule API REST controller
 */
class ApiExtractRuleController extends FOSRestController
{
    /**
     * [GET] /extract-rules
     * Retrieve actions.
     *
     * @Get("/extract-rules")
     *
     * @return Response
     */
    public function getExtractRulesAction($_format)
    {
        $view = View::create()->setFormat($_format);

        $extractRules = $this->get('idci_task.extract_rule_registry')->getRules();
        ksort($extractRules);
        $view->setData(array_keys($extractRules));

        return $this->handleView($view);
    }

    /**
     * [GET] /extract-rules/{name}/options.{_format}
     * Retrieve extra rule options
     *
     * @Get("/extract-rules/{name}/parameters")
     *
     * @param string $name
     *
     * @return Response
     */
    public function getExtractRulesParametersAction($name, $_format)
    {
        $registry = $this->get('idci_task.extract_rule_registry');
        if (!($registry->hasRule($name))) {
            throw new NotFoundHttpException(sprintf(
                'The extract rule `%s` was not found',
                $name
            ));
        }

        $view = View::create()->setFormat($_format);
        $extractRule = $this->get(sprintf('idci_task.extract_rule_configuration.%s', $name));

        $view->setData($extractRule);

        return $this->handleView($view);
    }
}
