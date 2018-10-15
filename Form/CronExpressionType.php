<?php

namespace IDCI\Bundle\TaskBundle\Form;

use IDCI\Bundle\TaskBundle\Form\DataTransformer\CronExpressionToPartsTransformer;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\FormBuilderInterface;

class CronExpressionType extends AbstractType
{
    const MINUTES = 'minutes';
    const HOURS = 'hours';
    const DAYS = 'days';
    const MONTHS = 'months';
    const WEEKDAYS = 'weekdays';

    protected $rangeMap;

    public function __construct()
    {
        $this->rangeMap = array(
            self::MINUTES => $this->getIndexedRange(59, false),
            self::HOURS => $this->getIndexedRange(23, false),
            self::DAYS => $this->getIndexedRange(31),
            self::MONTHS => array(
                'JAN' => 'january',
                'FEB' => 'february',
                'MAR' => 'march',
                'APR' => 'april',
                'MAY' => 'may',
                'JUN' => 'june',
                'JUL' => 'july',
                'AUG' => 'august',
                'SEP' => 'september',
                'OCT' => 'october',
                'NOV' => 'november',
                'DEC' => 'december',
            ),
            self::WEEKDAYS => array(
                'SUN' => 'sunday',
                'MON' => 'monday',
                'TUE' => 'tuesday',
                'WED' => 'wednesday',
                'THU' => 'thursday',
                'FRI' => 'friday',
                'SAT' => 'satuday',
            ),
        );
    }

    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->addViewTransformer(new CronExpressionToPartsTransformer())
            ->add(self::MINUTES, ChoiceType::class, [
                'label' => self::MINUTES,
                'choices' => $this->getRange(self::MINUTES),
                'multiple' => true,
                'required' => false,
            ])
            ->add(self::HOURS, ChoiceType::class, [
                'label' => self::HOURS,
                'choices' => $this->getRange(self::HOURS),
                'multiple' => true,
                'required' => false,
            ])
            ->add(self::DAYS, ChoiceType::class, [
                'label' => self::DAYS,
                'choices' => $this->getRange(self::DAYS),
                'multiple' => true,
                'required' => false,
            ])
            ->add(self::MONTHS, ChoiceType::class, [
                'label' => self::MONTHS,
                'choices' => $this->getRange(self::MONTHS),
                'multiple' => true,
                'required' => false,
            ])
            ->add(self::WEEKDAYS, ChoiceType::class, [
                'label' => self::WEEKDAYS,
                'choices' => $this->getRange(self::WEEKDAYS),
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

    private function getRange($type = self::MINUTES)
    {
        if (!isset($this->rangeMap[$type])) {
            throw new \Exception(sprintf(
                'The type "%s" does not exists. Available types are %s',
                $type,
                implode(', ', array(self::MINUTES, self::HOURS, self::DAYS, self::MONTHS, self::WEEKDAYS))
            ));
        }

        return $this->rangeMap[$type];
    }

    /**
     * Get indexed range array
     *
     * @param int  $end
     * @param bool $startAtOne
     * @param int  $start
     *
     * @return array
     */
    private function getIndexedRange($end, $startAtOne = true, $start = 0)
    {
        $array = range($start, $end);

        if ($startAtOne) {
            unset($array[0]);
        }

        return $array;
    }
}
