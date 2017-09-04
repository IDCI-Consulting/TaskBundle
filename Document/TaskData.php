<?php

namespace IDCI\Bundle\TaskBundle\Document;

use Doctrine\ODM\MongoDB\Mapping\Annotations as ODM;

/**
 * @ODM\EmbeddedDocument
 */
class TaskData
{
    /**
     * @var array
     *
     * @ODM\Field(type="hash", name="extracted_data")
     */
    private $extractedData = array();

    /**
     * @var array
     *
     * @ODM\Field(type="hash", name="action_data")
     */
    private $actionData = array();

    /**
     * Set extractedData
     *
     * @param array $extractedData
     * @return $this
     */
    public function setExtractedData($extractedData)
    {
        $this->extractedData = $extractedData;

        return $this;
    }

    /**
     * Get extractedData
     *
     * @return array $extractedData
     */
    public function getExtractedData()
    {
        return $this->extractedData;
    }

    /**
     * Set actionData
     *
     * @param array $actionData
     * @return $this
     */
    public function setActionData($actionData)
    {
        $this->actionData = $actionData;

        return $this;
    }

    /**
     * Get actionData
     *
     * @return array $actionData
     */
    public function getActionData()
    {
        return $this->actionData;
    }
}
