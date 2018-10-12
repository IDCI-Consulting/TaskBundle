<?php

namespace IDCI\Bundle\TaskBundle\Form;

use IDCI\Bundle\TaskBundle\Form\DataTransformer\CronExpressionToPartsTransformer;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\FormBuilderInterface;

class CronExpressionType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->addViewTransformer(new CronExpressionToPartsTransformer())
            ->add('minutes', ChoiceType::class, [
                'choices' => range(0, 59),
                'multiple' => true,
                'required' => false,
            ])
            ->add('hours', ChoiceType::class, [
                'choices' => range(0, 23),
                'multiple' => true,
                'required' => false,
            ])
            ->add('days', ChoiceType::class, [
                'choices' => $this->oneIndexedRange(31),
                'multiple' => true,
                'required' => false,
            ])
            ->add('months', ChoiceType::class, [
                'choices' => $this->oneIndexedRange(12),
                'multiple' => true,
                'required' => false,
            ])
            ->add('weekdays', ChoiceType::class, [
                'choices' => $this->oneIndexedRange(7),
                'multiple' => true,
                'required' => false,
            ])
        ;
    }
    /**
     * {@inheritdoc}
     */
    public function getBlockPrefix()
    {
        return 'idci_bundle_task_bundle_cron_expression';
    }

    public function getName()
    {
        return $this->getBlockPrefix();
    }

    /**
     * Will create an array where the first key is 1
     * oneIndexedRange(3) will return [1 => 1, 2 => 2, 3 => 3].
     *
     * @param int $end
     * @param int $start
     *
     * @return array
     */
    private function oneIndexedRange($end, $start = 0)
    {
        $arr = range($start, $end);
        unset($arr[0]);

        return $arr;
    }
}
