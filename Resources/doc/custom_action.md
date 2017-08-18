How to create a custom action
=============================

You can create a custom action by extending the abstract action class,
[AbstractAction](../../Action/AbstractAction.php). As an example
you're going to create a simple action that multiplies.

Creating the Action Class
-------------------------

First you need to create an Action class and extend [AbstractAction](../../Action/AbstractAction.php).
The action class only has two required method `setDefaultParameters()` and `doExtract()`:

```php
<?php
// IDCI/Bundle/TaskBundle/Action/MultipliesAction.php
namespace IDCI\Bundle\TaskBundle\Action;

use Symfony\Component\OptionsResolver\OptionsResolver;

class MultipliesAction extends AbstractAction
{
    /**
     * {@inheritdoc}
     */
    public function setDefaultParameters(OptionsResolver $resolver)
    {
        $resolver
            ->setRequired(array('number_one', 'number_two'))
            ->setAllowedTypes(array(
                'number_one' => array('int'),
                'number_two' => array('int'),
            ))
        ;
    }

    /**
     * {@inheritdoc}
     */
    public function doExecute(array $options)
    {
        try {
            $result = $options['number_one'] * $options['number_two'];

            return array(
                'error' => false,
                'data'  => $result,
            );
        } catch (\Exception $e) {
            return array(
                'error' => true,
                'error_message' => $e->getMessage(),
            );
        }
    }
}
```

Inside `setDefaultParameters`, you can use the [Symfony OptionResolver component](http://symfony.com/doc/current/components/options_resolver.html)
and define the Action configuration structure.

Inside `doExecute`, you have your core instructions. It is **mandatory** to return an array with 
at least `error` as key. (See [configureReturnedData](../../Action/AbstractAction.php) method to understand).
When it succeed, add the `data` key with your result. When it failed, add the `error_message` key   

Its _highly recommended_ to encapsulate the instructions in a `try` and `catch`.

Unit testing Action
-------------------

After creating the Action, you have to create its unit tests class. It is **mandatory** !! :)

See this [folder](../../Tests/Action) to have inspiration.
