<?php

/**
 * @author: Brahim Boukoufallah <brahim.boukoufallah@idci-consulting.fr>
 */

namespace IDCI\Bundle\TaskBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="IDCI\Bundle\TaskBundle\Entity\Repository\TaskConfigurationRepository")
 * @ORM\Table(name="task_configuration", indexes={
 *     @ORM\Index(name="name", columns="name")
 * })
 * @ORM\HasLifecycleCallbacks()
 */
class TaskConfiguration extends AbstractTaskConfiguration
{
    const STATE_ENABLE = '1';
    const STATE_DISABLE = '0';

    /**
     * @var int
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * Get id.
     *
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }
}
