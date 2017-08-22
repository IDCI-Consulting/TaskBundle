<?php

namespace IDCI\Bundle\TaskBundle\Form\Type;

use IDCI\Bundle\AssetLoaderBundle\AssetProvider\AssetProviderInterface;
use IDCI\Bundle\AssetLoaderBundle\Model\Asset;
use IDCI\Bundle\AssetLoaderBundle\Model\AssetCollection;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormView;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;
use IDCI\Bundle\ConfigurationValidatorBundle\Validator\Constraints\CheckConfiguration;
use IDCI\Bundle\TaskBundle\Validator\Constraints as IDCITaskConstraint;

class ActionEditorType extends AbstractType implements AssetProviderInterface
{
    /**
     * @var AssetCollection
     */
    private $assetCollection;

    public function __construct()
    {
        $this->assetCollection = new AssetCollection();
    }

    /**
     * {@inheritDoc}
     */
    public function getAssetCollection()
    {
        return $this->assetCollection;
    }

    /**
     * {@inheritdox}.
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder;
    }

    /**
     * {@inheritdoc}
     */
    public function buildView(FormView $view, FormInterface $form, array $options)
    {
        $this->assetCollection->add(new Asset('IDCITaskBundle:Form:action_configuration.html.twig', array(
            'options' => $options,
            'form'    => $view
        ), 0));

        $attrClass = 'action-editor';

        if (isset($options['attr']) && isset($options['attr']['class'])) {
            $attrClass .= ' ' . $options['attr']['class'];
        }

        $view->vars['attr']['class'] = $attrClass;

        return $view->vars;
    }

    /**
     * @param OptionsResolverInterface $resolver
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver
          ->setDefaults(array(
              'required' => true,
          ))
        ;
    }

    /**
     * {@inheritdoc}
     */
    public function getParent()
    {
        return 'textarea';
    }

    /**
     * {@inheritdoc}
     */
    public function getBlockPrefix()
    {
        return 'action_editor';
    }

    /**
     * {@inheritdoc}
     *
     * @deprecated
     */
    public function getName()
    {
        return $this->getBlockPrefix();
    }
}
