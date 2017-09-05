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

class ExtractRuleEditorType extends AbstractType implements AssetProviderInterface
{
    /**
     * @var AssetCollection
     */
    private $assetCollection;

    /**
     * Constructor.
     */
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
     * {@inheritdoc}
     */
    public function buildView(FormView $view, FormInterface $form, array $options)
    {
       $this->assetCollection->add(new Asset('IDCITaskBundle:Form:extract_rule_editor_assets.html.twig', array(), 0));
       $this->assetCollection->add(new Asset('IDCITaskBundle:Form:extract_rule_editor_configuration.html.twig', array(
           'options' => $options,
           'form'    => $view
       ), 1));

        $attrClass = 'extract-rule-editor';

        if (isset($options['attr']) && isset($options['attr']['class'])) {
            $attrClass .= ' ' . $options['attr']['class'];
        }

        $view->vars['attr']['class'] = $attrClass;
        $view->vars['attr']['data-configuration-variable']  = $view->vars['id'] . '_configuration';

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
        return 'extract_rule_editor';
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
