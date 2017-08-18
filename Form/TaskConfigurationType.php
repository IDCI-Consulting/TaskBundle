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
     * {@inheritdox}.
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $task = $builder->getData();

        $builder
            ->add('name')
            ->add('extractRule', 'textarea', array(
                'constraints' => array(
                    new IDCITaskConstraint\CheckJson(),
                    new CheckConfiguration(array(
                        'rule' => 'extract_rule',
                    )),
                ),
            ))
            ->add('workflow', 'textarea', array(
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
              'data_class' => 'IDCI\Bundle\TaskBundle\Entity\TaskConfiguration',
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
