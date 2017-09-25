<?php

namespace IDCI\Bundle\TaskBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;
use IDCI\Bundle\ConfigurationValidatorBundle\Validator\Constraints\CheckConfiguration;
use IDCI\Bundle\TaskBundle\Validator\Constraints as IDCITaskConstraint;

class TaskConfigurationType extends AbstractType
{
    /**
     * @var string
     */
    private $taskConfigurationClass;

    /**
     * Constructor
     *
     * @param string $taskConfigurationClass
     */
    public function __construct($taskConfigurationClass)
    {
        $this->taskConfigurationClass = $taskConfigurationClass;
    }

    /**
     * {@inheritdox}.
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('name')
            ->add('extractRule', 'extract_rule_editor', array(
                'constraints' => array(
                    new IDCITaskConstraint\CheckJson(),
                    new CheckConfiguration(array(
                        'rule' => 'extract_rule',
                    )),
                ),
            ))
            ->add('workflow', 'workflow_editor', array(
                'constraints' => array(
                    new IDCITaskConstraint\CheckJson(),
                    new CheckConfiguration(array(
                        'rule' => 'action',
                    )),
                ),
            ))
            ->add('cronExpression', 'text')
            ->add('enable')
        ;
    }

    /**
     * @param OptionsResolverInterface $resolver
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver
          ->setDefaults(array(
              'data_class' => $this->taskConfigurationClass,
          ))
        ;
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'idci_bundle_task_bundle_task_configuration';
    }
}
